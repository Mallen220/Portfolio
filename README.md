# Portfolio

This is the source for my personal site: [allenmc220.xyz](https://allenmc220.xyz/).

I'm Matthew Allen, a Computer Science student at Boston University. The site has my projects, my resume, and a gallery of photos I've taken around Boston and on trips.

It's a Jekyll site. Everything is Markdown and YAML, so there's no database and no backend.

## What's on it

- **Home.** A hero section, my recent projects, my work experience and my education.
- **About.** My resume. It's built from `_data/resume.yml`, so I edit one file when something changes.
- **Projects.** One Markdown file per project in `_posts/`. Each one lists its languages under `category`, and the pages in `languages/` list the projects for each language.
- **Gallery.** Photo sets from `assets/img/gallery/`, each with a page in `gallery/` and a data file in `_data/galleries/`.

## Running it locally

You need Ruby and Bundler.

```sh
git clone https://github.com/Mallen220/Portfolio.git
cd Portfolio
bundle install
```

The language pages and gallery data are generated, so I run the generators before serving:

```sh
ruby generate_language_pages.rb
ruby generate_language_map.rb
ruby gallery_generator.rb
bundle exec jekyll serve --livereload
```

The site comes up at http://localhost:4000/.

`gallery_generator.rb` builds its paths from the parent of this folder plus `Portfolio/`, so the repo has to be cloned into a folder named `Portfolio` for it to find the photos.

## Adding a project

Add a file to `_posts/` named `YYYY-MM-DD-Project-Name.md`. Copy the front matter from an existing one, such as `2025-11-01-Turtle-Tracer.md`. Set `featured: true` to pin it to the top of the Projects page. If it uses a language that isn't in the list in `generate_language_pages.rb`, add it there and rerun the script.

## Adding photos

1. Put the JPGs or PNGs in `assets/img/gallery/<gallery-name>/`.
2. Run `./image-processor.sh`. It needs ImageMagick with WebP support (`brew install imagemagick`). For each photo it makes a 1600px version for the lightbox and an 800px thumbnail for the grid, adds a "Photo by Matthew Allen" watermark, and deletes the original. Keep your originals somewhere else. Set `WATERMARK=0` to skip the watermark.
3. Add a Markdown file for the gallery in `gallery/`, then run `ruby gallery_generator.rb` to refresh the data files.

## Deploying

There are two ways this gets built:

- `.github/workflows/jekyll.yml` builds the site and publishes it to GitHub Pages whenever I push to the `Live` branch.
- `vercel.json` has the build command and cache headers for Vercel.

Prettier runs on staged files through Husky and lint-staged, so formatting is handled when I commit.

## Where it came from

I started from [devlopr-jekyll](https://github.com/sujaykundu777/devlopr-jekyll) by Sujay Kundu and have changed most of it since: the layouts, the styling, the resume page, the projects page and the gallery. The theme is MIT licensed, and the license file is in this repo.

## License

MIT. See [LICENSE](LICENSE). The photos and the writing are mine, so please ask before reusing them.
