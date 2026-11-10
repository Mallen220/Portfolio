---
layout: post
title: "Turtle Tracer"
summary: "Open-source path planner that FTC teams use to draw, simulate and export autonomous routines."
author: MatthewAllen
date: "2025-11-01 12:00:00 +0000"
category: ["TypeScript", "Java"]
thumbnail: assets/img/projects/turtle-tracer/workspace.webp
usemathjax: true
permalink: /projects/Turtle-Tracer/
github_url: "https://github.com/Mallen220/TurtleTracer"
pagination:
  enabled: true
  collection: projects
featured: true
---

Turtle Tracer is a path planner for FIRST Tech Challenge autonomous routines. You draw a route on the field, simulate how your robot will drive it, and export the result as code. It runs in the browser at [live.turtletracer.com](https://live.turtletracer.com/) and as a desktop app for macOS, Windows and Linux, built from a single TypeScript and Svelte codebase. The project has <strong data-tt="downloads">1,723</strong> downloads and <strong data-tt="releases">60</strong> releases, with <strong data-tt="coverage">85.8</strong>% branch coverage.

Documentation is at [turtletracer.com](https://www.turtletracer.com/) and the source is on [GitHub](https://github.com/Mallen220/TurtleTracer).

<video autoplay muted loop playsinline controls width="100%" poster="{{ '/assets/img/projects/turtle-tracer/home-video-poster.webp' | relative_url }}" aria-label="Demo of Turtle Tracer: drawing paths on the field and simulating the robot driving them">
  <source src="{{ '/assets/img/projects/turtle-tracer/home-video.webm' | relative_url }}" type="video/webm">
  <source src="{{ '/assets/img/projects/turtle-tracer/home-video-hevc.mov' | relative_url }}" type="video/quicktime">
</video>

### Where it came from

Pedro Pathing is an FTC path-following library, and its developers made a visualizer for it, based on earlier work by another FTC team. I used it, and it was limiting. It lagged, it didn't work for teams with more than one programmer, it had no real file management, its code exporter was out of date, and it supported only a fraction of what Pedro Pathing itself could do.

I started working on it in November 2025 with the idea of adding a few critical features and contributing them back. I kept going. The project was called Pedro Pathing Plus for a while, then became Turtle Tracer once it was clearly its own project. Almost nothing of the original remains. Credit goes to the team whose visualizer inspired the original, and to the Pedro Pathing developers for the library and the visualizer this started from.

### Motion simulator

The first goal was only an easier interface and a few small fixes to the simulator. Over time the simulator became the core of the app.

- **Realistic timing.** The motion parameters use Pedro Pathing's own feedforward values, so the simulator models how quickly a robot speeds up and, just as important, how slowly it brakes.
- **Overshoot and chaining.** It shows what happens at chained path corners, and how far the robot is likely to swing off the path you drew. The original visualizer still can't do either.
- **Accuracy.** Across several robots and configurations, a properly tuned simulation landed within one second of the robot's real run time.

<video controls muted loop playsinline width="100%" src="{{ '/assets/img/projects/turtle-tracer/path-following.mp4' | relative_url }}"></video>

*The simulated robot driving a chained route. The dashed line is the simulator's predicted trajectory, which drifts off the planned path at the join.*

![Motion settings, with a preview of how far the robot swings past its path for a given translational P]({{ '/assets/img/projects/turtle-tracer/settings-motion.webp' | relative_url }})

### Path optimizer

The optimizer uses a genetic algorithm. It treats the endpoints you place as fixed, because those are the points that matter, and treats the way the robot gets between them as flexible unless you lock it. That lets it add control points along a path and move them to cut travel time or to steer around obstacles.

- It doesn't need to find the perfect answer first try. Early on it explores widely. After it finds a valid path that passes a threshold you can set in settings, it switches to making smaller adjustments to the control points.
- By default it optimizes the whole route at once instead of one segment at a time. That takes longer, but it finds improvements that segment-by-segment optimization can't.
- You can lock any path you don't want it to touch.

![The path optimization panel]({{ '/assets/img/projects/turtle-tracer/optimization-panel.webp' | relative_url }})

The hardest part wasn't the optimizer. It was what the optimizer exposed in the motion model. Again and again it found edge cases in the app's own motion profile: a robot turning 180 degrees instantly, jumping from 1 to 40 inches per second, or exceeding the maximum velocity set in settings. Each time I had to work out how it had reached the edge case and then add a rule to stop it. One example is that control points can't sit too close to each other, because in the right arrangement the simulated robot would slingshot, which a real robot can't do and would instead go haywire.

### Code export

Export started with one target. My team used Java OpModes with SolversLib sequential commands, so that was what the exporter produced. Then more teams started using it, and each wanted something different.

- **NextFTC**, a command library very close to SolversLib, only needed a few keywords swapped, such as sequential command groups becoming sequential groups.
- **Pedro Pathing's Ivy** command library needed a different structure: a different header and a different way of building sequential groups.
- **Kotlin** was requested by enough users that I had to restructure the exporter. There is now one code builder for Java and one for Kotlin. Each follows the same logic, and each is extended per target library.

Teams can also open their GitHub repository from a link, edit paths, and commit them back with the generated code in the same commit.

![The Java export dialog showing generated path code]({{ '/assets/img/projects/turtle-tracer/export-java.webp' | relative_url }})

### Designing for new and experienced teams

The most interesting problem was an interface problem. Pedro Pathing can do a lot, and it is easy to build an interface so full that it's hard to use. I wanted a planner that a brand-new team wouldn't be overwhelmed by and an experienced team wouldn't outgrow. The default interface stays simple, and many options are tucked away in settings, where experienced users can turn on everything and set it up their own way.
