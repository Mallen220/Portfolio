# generate_language_pages.rb

languages = [
  "Python", "JavaScript", "TypeScript", "Java", "HTML", "CSS", "SCSS",
  "Ruby", "PHP", "Swift", "Kotlin", "Go", "Rust",
  "sample_language", "guides", "jekyll", "FTC_SDK", "FRC_SDK"
]

languages.each do |lang|
  slug = lang.downcase.gsub(" ", "-").gsub("#", "sharp").gsub("++", "pp")

  File.open("languages/#{lang}.md", "w") do |file|
    file.puts <<~MARKDOWN
      ---
      layout: page
      title: #{lang}
      permalink: /projects/languages/#{lang}/
      ---

      <h5> Projects by Language : {{ page.title }} </h5>

      <div class="card">
      {% for post in site.categories.#{lang} %}
       <li class="category-posts"><span>{{ post.date | date_to_string }}</span> &nbsp; <a href="{{ post.url }}">{{ post.title }}</a></li>
      {% endfor %}

      </div>
    MARKDOWN
  end

#   puts "Generated: #{slug}.md"
end
