#!/usr/bin/env ruby
# scripts/generate_galleries.rb
# Generates:
#   - _data/galleries/<folder>.yml for each subfolder in assets/img/gallery
#   - _data/galleries/overview.yml with one entry per folder
#
# Behavior:
#   - Uses gallery markdown files to find titles
#   - Sets preview image to first image in folder if custom preview doesn't exist
#   - Only considers originals (ignores files ending with -thumbnail.*).
#   - Supports extensions: jpg|jpeg|png|gif|webp (case-insensitive).
#   - Writes "filename" without extension; "original" uses the same extension as source.
#   - Ensures overview preview images exist; if missing, uses first picture.
#   - Removes stale *_data/galleries/*.yml (except overview.yml) that no longer correspond to folder.

require "yaml"
require "fileutils"

ROOT       = File.expand_path(__dir__ + "/..") # repo root (scripts/..)
GALLERY    = File.join(ROOT, "Portfolio/assets/img/gallery")
GALLERY_MD = File.join(ROOT, "Portfolio/gallery") # Markdown files location
DATA_DIR   = File.join(ROOT, "Portfolio/_data/galleries")
VALID_EXTS = %w[jpg jpeg png gif webp]

# Find title from gallery markdown files
def find_title_for_folder(folder_name)
  return folder_name.capitalize unless Dir.exist?(GALLERY_MD)

  Dir.glob(File.join(GALLERY_MD, "*.md")).each do |file|
    content = File.read(file)
    if content.include?("picture_path: #{folder_name}")
      if match = content.match(/title: ["']?(.+?)["']?(\n|$)/)
        return match[1].strip
      end
    end
  end

  folder_name.capitalize # Fallback to capitalized folder name
end

def valid_image?(filename)
  ext = File.extname(filename).downcase.delete_prefix(".")
  return false unless VALID_EXTS.include?(ext)
  base = File.basename(filename, ".*")
  return false if base.end_with?("-thumbnail")
  true
end

def list_folders(path)
  return [] unless Dir.exist?(path)
  Dir.children(path)
     .map { |d| File.join(path, d) }
     .select { |p| File.directory?(p) }
     .sort_by { |p| File.basename(p).downcase }
end

def list_originals(dir)
  return [] unless Dir.exist?(dir)
  Dir.children(dir)
     .select { |f| valid_image?(f) }
     .sort_by { |f| f.downcase }
end

def filename_yaml_value(base)
  # Convert purely numeric filenames to integers
  base.match?(/\A\d+\z/) ? base.to_i : base
end

def write_yaml_file(path, data)
  yaml = YAML.dump(data)
  yaml.sub!(/\A---\s*\n/, "")
  FileUtils.mkdir_p(File.dirname(path))
  File.write(path, yaml)
  path
end

def write_gallery_yaml(folder_name, pictures)
  yml_path = File.join(DATA_DIR, "#{folder_name}.yml")
  data = {
    "picture_path" => folder_name,
    "pictures" => pictures
  }

  yaml = YAML.dump(data)
  yaml.sub!(/\A---\s*\n/, "")

  # Fix indentation for the pictures array
  fixed_yaml = []
  in_pictures = false
  yaml.each_line do |line|
    if line.start_with?("pictures:")
      in_pictures = true
      fixed_yaml << line
    elsif in_pictures && line.start_with?("- ")
      fixed_yaml << "  #{line}" # indent the `- filename:`
    elsif in_pictures && line.match?(/^\s+\w+:/)
      fixed_yaml << "  #{line}" # indent nested keys
    else
      fixed_yaml << line
      in_pictures = false if line.strip.empty?
    end
  end

  FileUtils.mkdir_p(File.dirname(yml_path))
  File.write(yml_path, fixed_yaml.join)
  yml_path
end

# Get preview image filename (either custom preview or first image)
def get_preview_filename(folder_path, folder_name, pictures)
  # Check if custom preview exists
  VALID_EXTS.each do |ext|
    filename = "#{folder_name}.#{ext}"
    if File.exist?(File.join(folder_path, filename))
      return filename
    end
  end

  # Use first image if no custom preview
  return pictures.first[:filename] unless pictures.empty?

  "default-preview.jpg" # Fallback
end

def build_pictures(folder_path, originals)
  originals.map do |fname|
    base = File.basename(fname, ".*")
    ext  = File.extname(fname).delete_prefix(".")
    {
      filename: "#{base}.#{ext}",
      original: "#{base}.#{ext}",
      ext: ext # internal only
    }
  end
end

def write_overview_yaml(entries)
  path = File.join(DATA_DIR, "overview.yml")
  write_yaml_file(path, entries)
end

def generate
  abort("Gallery folder not found: #{GALLERY}") unless Dir.exist?(GALLERY)
  FileUtils.mkdir_p(DATA_DIR)

  folders = list_folders(GALLERY)
  generated_files = []
  overview_entries = []

  folders.each do |folder_path|
    folder_name = File.basename(folder_path)
    originals = list_originals(folder_path)

    pictures = build_pictures(folder_path, originals)
    yaml_pictures = pictures.map do |p|
      {
        "filename"  => filename_yaml_value(p[:filename]),
        "original"  => p[:original]
      }
    end

    yml_path = write_gallery_yaml(folder_name, yaml_pictures)
    generated_files << File.basename(yml_path)

    # Get title from markdown file or use folder name
    title = find_title_for_folder(folder_name)

    # Get preview filename
    preview_filename = get_preview_filename(folder_path, folder_name, pictures)

    overview_entries << {
      "title" => title,
      "directory" => folder_name,
      "preview" => {
        "filename" => preview_filename,
      }
    }
  end

  overview_entries.sort_by! { |e| e["title"].downcase }
  write_overview_yaml(overview_entries)
  generated_files << "overview.yml"

  # Delete stale YAMLs
  Dir.children(DATA_DIR)
     .select { |f| f.end_with?(".yml") }
     .reject { |f| generated_files.include?(f) }
     .each do |stale|
       stale_path = File.join(DATA_DIR, stale)
       FileUtils.rm_f(stale_path) if stale != "overview.yml"
     end

  puts "Generated YAML for #{folders.size} galleries."
end

generate