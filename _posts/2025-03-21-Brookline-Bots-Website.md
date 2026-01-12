---
layout: post
title: "Brookline Bots Website"
summary: "Mentored Brookline Bots (FTC 17218) in creating their website at brooklinebots.org"
author: MatthewAllen
date: "2025-03-21 0:00:00 +0530"
category: ["HTML", "CSS", "JavaScript", "SCSS", "Ruby"]
thumbnail: assets/img/projects/BrooklineBotsWebsite.png
keywords: devlopr jekyll, how to use devlopr, devlopr, how to use devlopr-jekyll, devlopr-jekyll tutorial,best jekyll themes, multi languages and tags
usemathjax: true
permalink: /projects/Brookline-Bots/
github_url: "https://github.com/BrooklineBots/brooklinebots.org"
pagination:
  enabled: true
  collection: projects
---

### Project Description

The **Brookline Bots (FTC Team 17218)** website is a dynamic platform showcasing the team’s activities, achievements, and community impact. Built by students under my mentorship, it mirrors the structure of the FRC Team 1987 website I developed but is tailored to the needs of an FTC team. The site highlights the team’s mission, sponsors, summer camps, awards, and members, while promoting STEM outreach in Brookline, Massachusetts. Designed for scalability and ease of maintenance, it uses Jekyll for static site generation and integrates modern UI/UX principles.

---

### Key Features

1. **Responsive Layout**
   - Adapts seamlessly to mobile/desktop using Bulma CSS framework.
   - Hero sections with darkening overlays for visual impact.
2. **Interactive Elements**
   - Animated buttons with hover effects (e.g., "Team Focus," "Mission Statement").
   - JavaScript-powered content toggles for streamlined information display.
3. **Dynamic Galleries**
   - Branding assets, robot designs, and camp manuals organized in YAML-driven galleries.
   - Download links for resources (logos, camp guides).
4. **Summer Camps Portal**
   - Dedicated section for partner camps (Penguin Coding School, The Robo Hub).
   - Flyer previews, schedules, discount codes, and registration links.
5. **Sponsorship Integration**
   - Tax-deductible donation instructions with check/online options.
   - Sponsor shoutouts with customizable layouts.
6. **Awards Timeline**
   - Chronological display of competition achievements via YAML data.
7. **Team Roster**
   - Member profiles with roles, images, and bios (captains, mentors, coaches).

---

### Technical Implementation

#### Core Functionality

- **Content Management**
  - Jekyll templates reuse layouts (e.g., `page.html`, `default.html`) across sections.
  - YAML files (`awards.yml`, `team.yml`, `navigation.yml`) drive dynamic content.
- **Frontend Interactivity**
  - Custom JavaScript toggles (e.g., homepage mission/focus/history buttons).
  - CSS animations (image zoom, button hover effects).
- **Asset Optimization**
  - Image compression with responsive breakpoints (`width="650" height="auto"`).
  - SVG logos for scalability.

---

#### Technical Stack

<table style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; font-size: 16px;">
  <thead>
    <tr style="background-color: #f5f5f5;">
      <th style="border: 1px solid #ccc; padding: 12px 16px; text-align: left;">Component</th>
      <th style="border: 1px solid #ccc; padding: 12px 16px; text-align: left;">Technology</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid #ccc; padding: 12px 16px;"><strong>Static Generator</strong></td>
      <td style="border: 1px solid #ccc; padding: 12px 16px;">Jekyll</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 12px 16px;"><strong>CSS Framework</strong></td>
      <td style="border: 1px solid #ccc; padding: 12px 16px;">Bulma + Custom CSS</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 12px 16px;"><strong>Interactivity</strong></td>
      <td style="border: 1px solid #ccc; padding: 12px 16px;">JavaScript (Vanilla)</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 12px 16px;"><strong>Data Management</strong></td>
      <td style="border: 1px solid #ccc; padding: 12px 16px;">YAML/Markdown</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 12px 16px;"><strong>Hosting</strong></td>
      <td style="border: 1px solid #ccc; padding: 12px 16px;">GitHub Pages (compatible)</td>
    </tr>
  </tbody>
</table>

---

#### Key Advantages

- **Low Maintenance**  
  Non-technical team members update content via Markdown/YAML—no code changes needed.
- **Performance**  
  Static site ensures fast load times and security.
- **Community Focus**  
  Camp registration flows, sponsor visibility, and FIRST advocacy centralize outreach.

---

### Setup Instructions

1. **Prerequisites**: Ruby, Jekyll, Bundler.
2. Clone the repository:
   git clone https://github.com/brookline-bots/website.git
3. Install dependencies:
   bundle install
4. Run locally:
   bundle exec jekyll serve
5. Access at `http://localhost:4000`.

---

### Special Notes & Considerations

- **Mentorship Impact**  
  Guided high school students in version control (Git), Jekyll architecture, and UI design principles. Emphasized collaborative workflows.
- **Accessibility**  
  Semantic HTML, `alt` tags for images, and responsive breakpoints ensure WCAG compliance.
- **Scalability**  
  YAML data files allow easy addition of new awards, team members, or sponsors.
- **Design Continuity**  
  Reused Team 1987’s layout patterns but customized color schemes (`#5777a8`), fonts, and branding for Brookline Bots.

This project exemplifies how modular, static-site architecture empowers student teams to maintain professional web presence while focusing on STEM outreach. The codebase prioritizes clarity, making it ideal for educational reuse.
