---
layout: post
title: "BRI Task Tracker"
summary: "A web app that Brookline robotics teams use to run their season: tasks, meeting logs, part requests, goals and attendance."
author: MatthewAllen
date: "2026-04-01 0:00:00 +0530"
category: ["TypeScript"]
thumbnail: assets/img/projects/bri-task-tracker/dashboard.webp
usemathjax: true
permalink: /projects/BRI-Task-Tracker/
pagination:
  enabled: true
  collection: projects
featured: true
---

BRI Task Tracker is a web app that FIRST Tech Challenge teams in the Brookline Robotics Initiative use to run their season. It handles tasks, meeting logs, part requests, skill and goal tracking, and attendance. It's built with SvelteKit and TypeScript, installs on phones, and gives each team its own database.

The app requires a login and isn't open to the public, and the repository is private, so there's no live demo or source link. This write-up covers what it does and how I built it.

### Why I built it

I'm the head mentor of FTC Team 17218, Brookline Bots, an all-girls team now in its eighth season and a founding member of the Brookline Robotics Initiative. After about a year and a half of mentoring, I wanted the team to be better organized.

The team's tools were scattered. Tasks lived in Notion. Sign-in and sign-out was a Google Sheet. Meeting logs were spread across Google Docs. There was no formal way to request parts, and the agenda was usually settled by a captain texting a few teammates. It worked, but it was hard to work with.

Any replacement had to be free and quick to learn, because of the team's finances. It also had to work across several devices and on poor internet connections. The goal was one app in place of that handful of tools, and one that's faster than Notion on every device.

### A typical meeting night

Before a meeting, a captain opens the meeting log and writes the agenda. Students sign in at the kiosk, an iPad in the shop. Then they check the agenda and the task board, pick a task and start on it. Through the night they update their tasks and the summary with what they did, where the task stands, and what they learned from mentors. Midway through, the whole team meets, finishes the summary together, and discusses part requests, which move along as they're decided.

### What it does

**Dashboard.** Everyone starts here. It shows big events that mentors add, your current tasks, the team's total hours and the attendance rate. Upcoming events are pulled from the team's Band app, where the team communicates.

**Task board.** Tasks move between To do, In progress, Needs review and Done, and can be dragged as they change. There are several views of the same tasks:

- **Kanban:** the default.
- **Inbox:** tasks ordered by time and whether they're overdue.
- **Priority:** low, medium and high sections.
- **Table:** the view closest to the old Notion setup, with plenty of sorting.
- **Calendar:** every event, and a way to put tasks on your own calendar.
- **Gantt chart.**
- **Recently added.**

Tasks can be filtered to just your own, or by status, priority, subteam and member. There's also a separate board for the leadership of Brookline Robotics Initiative teams, where members can add and remove users as needed.

![The task board in Kanban view, with tabs for the other views]({{ '/assets/img/projects/bri-task-tracker/task-board.webp' | relative_url }})

**Meeting logs.** Every event on the team calendar creates a meeting log automatically. Captains and leaders write the agenda before the meeting and students write the summary afterward. An action items section is generated from the tasks that changed, and the attendees list fills in from whoever clocked in during the meeting.

**Part requests.** Students add what they want to order under pre-review. When it's ready for a mentor or key leaders to look at, it moves to pending, then approved, ordered and received, or rejected. It tracks total spending, including taxes. Students on the finance side asked for it.

**Team roster.** Mentors add and manage members and see who is in the shop and each member's hours this season, plus their self-defined subteams. Historical data shows hours by day and time of day, with filters and export to several formats. Totals are split into team, student and mentor hours.

**Goals and skills.** One student asked for the skill and goal tracker. Goals are set week by week for each subteam, and skills are tracked per person, mentors included.

**Other pages.** A resource hub, announcements, the kiosk, and Secure Sheets, a newer, more secure replacement for the team's people database that holds contact details and other sensitive information.

<!-- SCREENSHOT: meeting log; part requests board. -->

### Editing where you're looking

The part I'm proudest of is how tasks get edited. A board with a "create task" button, an "edit task" dialog and several views is easy to build, but it never felt right. I wanted users to edit things right where they're looking, with as little friction as possible.

So there's no edit button. To change a task's title or due date, you click it, it turns into a field, you change it and move on. That works everywhere in the task board, including comments. A lot of interface work went into making this feel smooth on both desktop and mobile, since people use both.

<!-- SCREENSHOT or SHORT SCREEN RECORDING: editing a task title in place. -->

### One app, several teams

Each team gets its own database, protected with encryption and other security measures so that a user on one team can't read or change another team's data. I chose that design because teams will join and leave the Initiative over the years. At the end of a season some teams want to wipe their database and start fresh. Others never want to reset. A database per team lets each team choose, and the databases can still work together.

### Hard problems

- **The kiosk.** It has to accept sign-in data from any team fairly openly, so the work was limiting it to only sign-in and sign-out requests.
- **Real-time notes.** Many students edit the same notes at once, often without paying much attention to what they're typing, and that caused real trouble.
- **Migrating from Sheets.** Moving the team's data off spreadsheets meant deciding what to keep tightly protected and how students could edit data without seeing things they shouldn't. Much of the privacy design came out of that.

<!-- SCREENSHOT: kiosk; skill and goal tracker; mobile view. -->
