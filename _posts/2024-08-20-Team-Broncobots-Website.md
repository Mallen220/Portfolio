---
layout: post
title: "Team Broncobots Website"
summary: "Redesigned the entirety of the Broncobots website at teambroncobots.com"
author: MatthewAllen
date: "2024-08-20 0:00:00 +0530"
category: ["HTML", "CSS", "JavaScript", "SCSS", "Ruby"]
thumbnail: assets/img/projects/teambroncobotswebsite.png
keywords: devlopr jekyll, how to use devlopr, devlopr, how to use devlopr-jekyll, devlopr-jekyll tutorial,best jekyll themes, multi languages and tags
usemathjax: true
permalink: /projects/team-broncobots/
github_url: "https://github.com/FRCTeam1987/teambroncobots.com"
pagination:
  enabled: true
  collection: projects
---

### Project Description: FRC Team 1987 Broncobots Website

A modern, content-rich website for **FIRST Robotics Competition (FRC) Team 1987 "The Broncobots"**, built using a Jekyll template. The site serves as a comprehensive hub for team information, robotics resources, competition history, and community outreach. Designed with a sleek, professional aesthetic, it hosts extensive multimedia content (images, videos, technical documents) and emphasizes user experience through responsive design and interactive elements.

---

### Key Features

1. **Robotic Showcases**:
   - Dedicated pages for each competition robot (e.g., [2022–2024 robots](2022Robot.md)), featuring specs, awards, CAD links, and embedded gameplay videos.
   - Dynamic galleries (e.g., [Robots](Assets.yml)) with downloadable technical manuals.
2. **Awards & Stats**:
   - Chronological display of team achievements (e.g., [Awards](awards.yml)) since 2007.
   - Integration with **Statbotics** for data-driven performance analytics ([Stats](Stats.md)).
3. **Branding Guidelines**:
   - Strict design standards (logos, colors, fonts) with downloadable assets ([Branding](Branding.md)).
   - JavaScript font fallback handling for Rockwell.
4. **Community Engagement**:
   - Summer robotics/engineering camps for grades 2–6 ([SummerCamps](SummerCamps.md)).
   - Sponsorship portal with tax-deductible donation workflows ([SponsorUs](SponsorUs.md)).
5. **Interactive UI**:
   - Animated text effects (e.g., "Broncobots are innovators..." on [Homepage](index.md)).
   - Expandable sections for mission statements/team history.
   - Hover-zoom effects on images.

---

### Technical Implementation

#### Core Functionality:

- **Jekyll-Powered Static Site**:
  - Uses Markdown + YAML for content management (e.g., `awards.yml` for awards data).
  - Modular layouts (`robot`, `page`, `resources`) for consistent templating.
- **Dynamic Galleries**:
  - YAML-driven image grids (e.g., `Assets.yml` populates the [Assets](assets.md) page).
- **Client-Side Interactivity**:
  - JavaScript for:
    - Text animations (`TextAnimation.js`).
    - Font detection (Rockwell fallback).
    - Collapsible content sections (Team History/Mission).
  - CSS transitions (hover effects, responsive columns).

#### Technical Stack:

- **Frontend**: HTML5, CSS3 (custom animations + Bulma-like classes), JavaScript.
- **Tools**: Jekyll (SSG), Liquid templating.
- **Integrations**:
  - Embedded YouTube videos (robot gameplay).
  - Donation form via DonorPerfect (`interland3.donorperfect.net`).
  - Statbotics API ([Stats](Stats.md)).

---

### Key Advantages

1. **Performance**:
   - Static site ensures fast load times; optimized media (SVG logos, compressed images).
2. **Maintainability**:
   - Content updates via Markdown/YAML—no code changes needed.
   - Modular components (e.g., reuse `robot` layout for yearly bots).
3. **User Experience**:
   - Mobile-responsive (flexbox columns, viewport adjustments).
   - Accessibility features (image `alt` text, semantic HTML).
4. **Community Focus**:
   - Clear pathways for sponsors, students, and FIRST partners.
   - Multilingual resources (e.g., camp manuals in DOC/PDF).

---

### Setup Instructions

1. **Prerequisites**: Ruby, Jekyll, Bundler.
2. **Steps**:
   git clone https://github.com/FRCTeam1987/website.git  
   bundle install  
   bundle exec jekyll serve

Access at `http://localhost:4000`.

---

### Special Notes

- **Content Scale**: The site hosts **15+ years** of team history (2007–2024), requiring robust data organization.
- **Sponsor Compliance**: Donation workflows adhere to tax regulations (LS Educational Foundation).
- **FIRST Alignment**: Adheres to FIRST branding guidelines while adding team personality.
- **Offline Resilience**: Fallback mechanisms (e.g., font error warnings, local image backups).

This project demonstrates advanced Jekyll customization, data architecture, and a user-first design philosophy—ideal for showcasing technical and collaborative skills in a portfolio.
