---
layout: post
title: "Informally"
summary: "A platform that connects high schoolers, college students and professionals for informal conversations. I'm the founding engineer."
author: MatthewAllen
date: "2026-06-01 12:00:00 +0000"
category: ["TypeScript"]
thumbnail: assets/img/projects/informally/preview.png
thumbnail_fit: contain
usemathjax: true
permalink: /projects/Informally/
pagination:
  enabled: true
  collection: projects
---

Informally is a platform for people who want to connect with others, learn about a field, or work out what to do next. A high schooler can ask a college student what college is really like and whether they should go there. A college student can ask a professional about job opportunities and what their days look like. Adults who run community groups, such as Girl Scout troop leaders, can meet each other and trade questions. The idea behind the design is to make that kind of conversation easier to start.

It's live at [informally.app](https://www.informally.app). I'm the founding engineer and the only engineer, and I built it with my partner, Adam, who is non-technical. It runs on SvelteKit, TypeScript and Supabase, and the repository is private.

![The Informally homepage, with a choice between looking for a mentor and paying it forward]({{ '/assets/img/projects/informally/homepage.webp' | relative_url }})

### Why we built it

Similar sites already exist, but the ones we found were limited to a single community, expensive to get started with, or no longer used. Many people in our community also didn't know that the option of asking a stranger for advice was open to them, and they needed someone to point them toward it.

### How it started

I spent the summer of 2026 looking for a job in Boston, and I was too young for most of the positions I applied to. Adam, a friend from the Boston robotics community, had recommended me for some of them and liked my other work. He had wanted to start a company for a long time and had run something similar for his own community, but the technology behind it was limited. He asked me to build the product, and we became partners. I built the app from scratch over the summer, with user testing and a roadmap, and we launched on September 25, 2026.

### Onboarding and matching

Onboarding was one of the hardest and most important parts. I wanted people to be able to fill in enough of a profile that it feels like them, without drowning them in options. Whatever someone enters, the app needs some automatic way to find similar people and connect them.

- **Resume parsing.** Users can upload a resume and the app fills in their profile from it.
- **Skills and occupations.** The matching is built on the ESCO skills and occupations dataset. It's large, so I spent time making it fast to process and able to scale.
- **A cold-start problem.** Skills are represented as points in a matrix, and a new site has few users. People also expect the skill they typed to show up first in the list. The data to suggest related skills only exists when other users have already picked similar ones, so early on it's easy to overcorrect or undercorrect and give strange results.

### Scheduling

Users wanted about six different ways to set up their calendars. Some connect Google Calendar and some don't. Some want a recurring schedule that isn't always recurring, and some want a fixed schedule they don't have to keep updating. Keeping all of those working together, correct and secure took a lot of carefully optimized comparisons. The two-way Google Calendar sync was the hardest part of the whole project.

### Safety

We wanted a school to be able to adopt Informally with reasonable confidence that it would be hard for someone with bad intentions to use it for anything illegal. That meant strict automated checks that look for that kind of behavior.

### Law, privacy and getting it running

This is my first startup, and a lot of the work wasn't code. Getting Twilio to approve our messaging and following US and European rules on messaging and cookies took a long time, and I worked on it with a lawyer and Adam, who had done this kind of thing before. Some of what came out of it is in the product: icons are served locally instead of through a third-party API, and email open tracking is turned off.

### Built to grow

The database has been reworked a few times so it could hold a couple of hundred users, then a couple of thousand, and now tens of thousands. The only real risk is a sudden early spike, and otherwise the system is meant to grow gradually as people arrive.

I chose Supabase after using Turso, which I found too limiting for what I wanted to do. I wanted one platform that had what I needed built in, not thirty separate services.

### Testing and shipping

As one developer, I can't test every path a user might take, and users try new features within a day of release, in ways I didn't predict. Early on, thin testing caused real outages: a migration out of sync, a local development change that reached production, a screen size that broke the layout, a bad Wi-Fi connection that broke everything.

So I put a lot of work into testing, and a few releases were mostly just that. This is the first project where I used Playwright end-to-end tests, and I made sure a few critical paths work every time. Each release checks that the database migration is compatible, runs the local tests, deploys to Vercel and then applies the migrations. I time releases for when no one is using the app, so there's no scheduled downtime. Only someone who clicks a button in the five-second window between the deploy and the migration sees a glitch, and the page refreshes itself.

### Launch

We launched to a small group: the Brookline Robotics Initiative community, one teacher and one counselor at a single school, and a few family and friends. It reached 48 users in its first six weeks, almost all through community outreach.

### What I'd do differently

Some pages feel too much like LinkedIn or Indeed. I'd redesign them to be more like us. I'd also design the database better from the start, so that it didn't need rebuilding close to launch.
