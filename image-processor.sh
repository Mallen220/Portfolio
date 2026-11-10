#!/bin/bash
# image-processor.sh
# Run this before committing new gallery photos.
# Requires ImageMagick with WebP support (brew install imagemagick)
#
# Put new JPG/PNG photos in assets/img/gallery/<gallery>/ and run this script.
# For each one it writes:
#   <gallery>/<name>.webp          1600px on the long edge (shown in the lightbox)
#   <gallery>/thumbs/<name>.webp    800px on the long edge (shown in the grid)
# and then deletes the source photo (keep your originals somewhere else).
# Afterwards run `ruby gallery_generator.rb` to refresh _data/galleries.
#
# Set WATERMARK=0 to skip the "Photo by Matthew Allen" watermark, for photos
# that already have one.

GALLERY_DIR="${GALLERY_DIR:-assets/img/gallery}"
FULL_SIZE=1600
THUMB_SIZE=800
FULL_QUALITY=75
THUMB_QUALITY=72
WATERMARK="${WATERMARK:-1}"
JOBS="${JOBS:-8}"

# Font for the watermark. Set FONT to a .ttf/.ttc path to override.
if [ -z "$FONT" ]; then
  for candidate in \
    /System/Library/Fonts/Supplemental/Arial.ttf \
    /System/Library/Fonts/Helvetica.ttc \
    /usr/share/fonts/truetype/dejavu/DejaVuSans.ttf; do
    if [ -f "$candidate" ]; then FONT="$candidate"; break; fi
  done
fi

process_one() {
  image="$1"
  dir=$(dirname "$image")
  filename=$(basename "$image")
  base_name="${filename%.*}"
  full_out="$dir/$base_name.webp"
  thumb_out="$dir/thumbs/$base_name.webp"

  mkdir -p "$dir/thumbs"

  watermark_args=()
  if [ "$WATERMARK" != "0" ]; then
    # Size the watermark relative to the resized image (3% of the short edge)
    dims=$(magick identify -format "%w %h" "$image[0]" 2>/dev/null)
    if [ -z "$dims" ]; then
      echo " → Skipping $filename, cannot read dimensions"
      return 0
    fi
    pointsize=$(echo "$dims" | awk -v max="$FULL_SIZE" '{
      long = ($1 > $2) ? $1 : $2
      short = ($1 < $2) ? $1 : $2
      scale = (long > max) ? max / long : 1
      ps = int(short * scale * 0.03)
      if (ps < 12) ps = 12
      print ps
    }')
    stroke=$(awk -v p="$pointsize" 'BEGIN { s = int(p * 0.18); if (s < 2) s = 2; print s }')
    watermark_args=(
      ${FONT:+-font "$FONT"}
      -gravity south -pointsize "$pointsize"
      -stroke black -strokewidth "$stroke" -annotate +0+"$stroke" 'Photo by Matthew Allen'
      -stroke none -fill white -annotate +0+"$stroke" 'Photo by Matthew Allen'
    )
  fi

  if magick "$image" -auto-orient -resize "${FULL_SIZE}x${FULL_SIZE}>" \
       "${watermark_args[@]}" -strip -define webp:method=5 -quality "$FULL_QUALITY" "$full_out" \
     && magick "$full_out" -resize "${THUMB_SIZE}x${THUMB_SIZE}>" \
       -strip -define webp:method=5 -quality "$THUMB_QUALITY" "$thumb_out"; then
    rm -f "$image"
    echo " → $filename"
  else
    echo " → FAILED: $filename (source kept)"
    rm -f "$full_out" "$thumb_out"
  fi
}
export -f process_one
export FULL_SIZE THUMB_SIZE FULL_QUALITY THUMB_QUALITY WATERMARK FONT

echo "Processing new photos in $GALLERY_DIR..."
find "$GALLERY_DIR" -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \) -print0 \
  | xargs -0 -n 1 -P "$JOBS" bash -c 'process_one "$0"'

echo "Done. Now run: ruby gallery_generator.rb"
