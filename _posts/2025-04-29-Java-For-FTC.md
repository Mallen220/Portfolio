---
layout: post
title: "Learn Java for FTC"
summary: "Created a curriculum to teach Java to an FTC team. Focuses on the basics and quickly works up to more complex topics."
author: MatthewAllen
date: "2025-04-29 0:00:00 +0530"
category: ["Java", "FTC_SDK"]
thumbnail: /assets/img/projects/javaForFTC.png
keywords: devlopr jekyll, how to use devlopr, devlopr, how to use devlopr-jekyll, devlopr-jekyll tutorial,best jekyll themes, multi languages and tags
usemathjax: true
permalink: /projects/Java-For-FTC/
github_url: "https://github.com/Mallen220/Java-For-FTC"
pagination:
  enabled: true
  collection: projects
---

### Project Description

**Java for FTC 101** is a comprehensive 6-session curriculum I designed and taught to an FTC (FIRST Tech Challenge) robotics team, focusing on Java programming fundamentals tailored to robotics applications. The course equips students with the skills to program competition-ready robots, covering hardware integration, control logic, sensor-driven behaviors, and code optimization. It combines theoretical concepts with hands-on labs, real-world FTC use cases, and industry best practices for collaborative software development.

---

### Key Features

1. **Structured Learning Path**
   - Progressive sessions from Java basics (variables, loops) to advanced robotics (PID control, sensor integration).
   - Emphasis on FTC-specific challenges: OpModes, gamepad controls, motor/servo calibration, and autonomous behaviors.
2. **Practical Labs & Projects**
   - Build interactive programs (e.g., gamepad-controlled claw/elevator).
   - Create mecanum drive systems, sensor-reactive robots, and competition-ready TeleOp/Autonomous modes.
3. **Industry Best Practices**
   - Code organization (OOP principles, subsystems, encapsulation).
   - Version control (GitHub), Javadoc documentation, and defensive programming.
4. **Assessment & Feedback**
   - Quizzes, debugging exercises, and a final project workshop.
   - Real-time telemetry for hardware validation.

---

### Technical Implementation

#### Core Functionality:

- **Robot Control**
  - OpMode lifecycle management (`init()`, `loop()`, `start()`).
  - Gamepad input handling (buttons, joysticks, triggers).
  - Motor/servo power/position control (REV Control Hub).
- **Sensor Integration**
  - Encoders for precision movement, IMU for field-oriented driving.
  - Analog/digital sensors (touch, color, distance) for autonomous decisions.
- **Advanced Behaviors**
  - PID control, state machines, and sensor-driven logic.
  - Math-based driving (mecanum kinematics, joystick scaling/ramping).

#### Technical Stack:

- **Languages**: Java (FTC SDK).
- **Tools**: Android Studio, GitHub Desktop, OnBotJava.
- **Hardware**: REV Control Hub, motors with encoders, servos, gamepads, sensors (gyro, touch, color).
- **Libraries**: FTC SDK, Road Runner (for advanced pathing).

---

### Key Advantages

- **FTC-Specific Focus**  
  Curriculum directly addresses competition requirements (e.g., autonomous scoring, driver control optimization).
- **Modular Design**  
  Teaches reusable subsystems (e.g., `MechanumDrive.java`, claw/elevator classes) to simplify code maintenance.
- **Performance Optimization**  
  Covers encoder usage, PID tuning, and loop efficiency for reliable robot performance.
- **Collaboration-Ready**  
  GitHub workflows (branches, PRs), code documentation, and naming conventions for team-based development.

---

### Setup Instructions (Optional)

1. **Environment Setup**
   - Install Android Studio + FTC SDK ([official guide](https://ftc-docs.firstinspires.org/en/latest/programming_resources/android_studio_java/install/install.html)).
   - Clone the course repo:
     git clone https://github.com/Mallen220/Java-For-FTC.git
2. **Hardware Configuration**
   - Connect REV Control Hub via Wi-Fi (`192.168.43.1:8080`).
   - Configure motors/servos in the SDK hardware map.
3. **Deployment**
   - Upload OpModes via OnBotJava or Android Studio.
   - Test using Driver Station telemetry.

---

### Special Notes/Considerations

- **Prerequisites**: Basic programming familiarity (variables, loops). No prior robotics experience required.
- **Hardware Dependencies**: REV Control Hub, compatible motors/sensors.
- **Extensibility**: Includes optional modules (computer vision, Road Runner) for advanced teams.
- **Troubleshooting**: Common pitfalls covered (e.g., encoder drift, gamepad dead zones, loop timing issues).
- **Competition Prep**: Strategies for autonomous development, testing frameworks, and performance logging.
- **Credit**: This project draws extremely heavily on the official FTC documentation and sample code provided by FIRST as well as [_Learn Java for FTC_](https://raw.githubusercontent.com/alan412/LearnJavaForFTC/master/LearnJavaForFTC.pdf) by Alan G. Smith, published on November 24, 2024

This curriculum not only builds technical skills but fosters problem-solving and teamwork—critical for FTC success. The materials are adaptable for remote/in-person learning and include open-source resources for community reuse.
