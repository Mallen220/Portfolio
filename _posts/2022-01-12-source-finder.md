---
layout: post
title: "My first project! Source finder."
summary: "Scrapes the internet to find sources related to a topic."
author: MatthewAllen
date: "2021-02-28 0:00:00 +0530"
category: ["Python"]
thumbnail: assets/img/projects/SourceFinder.png
keywords: devlopr jekyll, how to use devlopr, devlopr, how to use devlopr-jekyll, devlopr-jekyll tutorial,best jekyll themes, multi languages and tags
usemathjax: true
permalink: /projects/source-finder/
github_url: "https://github.com/Mallen220/Source-Finder"
pagination:
  enabled: true
  collection: projects
---

## Source Finder

**Project Description:**  
This Python script automates research for speech and debate competitions by scraping sources from the web and organizing them in Prepd (a debate preparation platform). It intelligently categorizes sources by topic while handling the entire workflow from question retrieval to source organization.

**Key Features:**

- Automated question retrieval from SpeechGeek.com
- Google search integration for source discovery
- Intelligent categorization using custom keywords
- Prepd platform integration for source organization
- Image recognition for UI interaction
- Voice-guided instructions
- Scheduled research runs

### Technical Implementation

**Core Functionality:**

1. **Question Retrieval:**
   - Accesses SpeechGeek.com's extemp questions
   - Parses HTML to extract debate questions
   - Cleans and formats questions for processing

2. **Automated Research:**
   - Performs Google searches for each question
   - Opens relevant sources in Chrome
   - Uses image recognition to navigate Prepd's UI

3. **Categorization System:**
   - Maintains topic-specific keyword libraries
   - Automatically tags sources by category
   - Supports both International (IX) and US Extemp (USX) categories

4. **Platform Integration:**
   - Automated login workflow
   - Source saving with proper tagging
   - Scheduled research sessions

**Technical Stack:**

- **UI Automation:** `pymouse`, `pykeyboard`
- **Web Scraping:** `googlesearch`, `webbrowser`
- **Computer Vision:** `screen_search` for button detection
- **Clipboard Access:** `clipboard` for data transfer
- **Text-to-Speech:** `pyttsx3` for audio instructions
- **HTML Parsing:** Custom regex-based content extraction

**Key Advantages:**

1. Saves 10-15 hours/week of manual research
2. Ensures consistent source categorization
3. Voice-guided setup for new users
4. Cross-platform compatibility
5. Customizable search parameters

**Setup Instructions:**

1. Install requirements:  
   `pip install pymouse pykeyboard googlesearch pyttsx3 clipboard screen_search`
2. Configure Chrome path in script
3. Resize display to 1920x1080 resolution
4. Run: `python research_automation.py`

> **Note:** This was my first significant Python project developed during high school to support speech and debate competitions. It demonstrates early exploration of automation, web scraping, and UI interaction concepts that later formed the foundation of my programming journey.
