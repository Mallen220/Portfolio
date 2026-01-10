---
layout: post
title: "My first college project! BU Menu Scraper."
summary: "Scrapes the BU Menu to find the likely favorite food for a given day."
author: MatthewAllen
date: "2025-01-12 0:00:00 +0530"
category: ["Python"]
thumbnail: assets/img/projects/BUMenuScraper.png
keywords: devlopr jekyll, how to use devlopr, devlopr, how to use devlopr-jekyll, devlopr-jekyll tutorial,best jekyll themes, multi languages and tags
usemathjax: true
permalink: /projects/BU-Menu-Scraper/
github_url: "https://github.com/Mallen220/BUMenuScraper"
pagination:
  enabled: true
  collection: projects
---

### Project Description

**BU Menu Scraper & Recommendation System**  
This project scrapes Boston University's dining hall menus, analyzes user preferences, and recommends personalized meal choices. It identifies dishes a user is most likely to enjoy by combining item popularity, frequency, and station (category) ratings. Unique optimizations include **reverse-frequency weighting** (prioritizing rare items) and **station diversity** (ensuring recommendations cover multiple food stations).

---

### Key Features

1. **Automated Menu Scraping**
   - Fetches daily menus (breakfast, lunch, dinner) from BU's dining website.
   - Structures data by date, meal, item, and station (e.g., "Pizza Station").

2. **Personalized Recommendations**
   - Uses `User_Ratings.json` to weight items based on individual preferences.
   - Recommends **top 15 items** per meal, ensuring **one item per station** for variety.

3. **Smart Weighting System**
   - **Composite Score** = `Popularity (60%) + Reverse Frequency (30%) + Station Rating (10%)`:
     - **Popularity**: User-provided ratings (1–5).
     - **Reverse Frequency**: Rewards rarely appearing items (e.g., weekly specials).
     - **Station Rating**: Average user rating per station (e.g., "Grill Station: 4.2/5").

4. **Efficiency Optimizations**
   - Caches menus locally to minimize scraping.
   - Recalculates weights only when new data is available.

---

### Technical Implementation

#### Core Functionality

- **Scraping Engine** (`scraper.py`):
  - Uses `BeautifulSoup` to parse HTML from BU Dining’s website.
  - Extracts nested menu data (date → meal → item → station).
- **Significance Calculator** (`Calculate_Significance.py`):
  - Computes weights: `reverse_frequency()`, `category_weights()`, `integrate_weights()`.
  - Generates `User_Menu.json` with final composite scores.
- **Recommendation Handler** (`handler.py`):
  - API-like endpoint (e.g., `lambda_handler`).
  - Returns top 15 items for a given date/meal, filtered by unique stations.

#### Technical Stack

- **Languages**: Python
- **Libraries**: `requests`, `BeautifulSoup`, `json`, `subprocess`, `collections`
- **Data Flow**:
  Scrape → menu.json → Calculate_Significance → User_Menu.json → Recommendation

---

### Key Advantages

1. **Personalization**
   - Adapts to individual tastes via dynamic user ratings.
2. **Novelty Promotion**
   - Highlights infrequent items (reverse frequency) to avoid "menu fatigue".
3. **Bias Mitigation**
   - Avoids overrepresenting stations (e.g., recommending 5+ pizza items).
4. **Scalability**
   - Decoupled modules allow easy extensions (e.g., new scoring factors).

---

### Setup Instructions (Optional)

1. **Install Dependencies**:
   pip install requests beautifulsoup4
2. **Initialize Files**:
   - `menu.json`: Output from scraper (auto-generated).
   - `User_Ratings.json`: Manually add `{"item_name": rating}` (1–5).
3. **Run**:
   - `scraper.py` to fetch menus.
   - `handler.py` to test recommendations (simulates API event).

---

### Special Notes & Considerations

- **Reverse-Frequency Edge Case**:  
  If an item appears daily (e.g., fries), its weight approaches `1/high_frequency ≈ 0`. This intentionally de-prioritizes common items.
- **Website Dependency**:  
  BU’s HTML structure changes may break the scraper (requires maintenance).
- **Weight Adjustments**:  
  Tweak the composite formula (60%/30%/10%) in `integrate_weights()` for different behaviors.
