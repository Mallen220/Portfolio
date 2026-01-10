---
layout: post
title: "Smart Clicker (Previously Windows-Autoclicker)"
summary: "Uses a great deal of logic and user input to create a powerful cross-platform automation tool."
author: MatthewAllen
date: "2024-08-21 0:00:00 +0530"
category: ["Python"]
thumbnail: assets/img/projects/SmartClicker.png
keywords: devlopr jekyll, how to use devlopr, devlopr, how to use devlopr-jekyll, devlopr-jekyll tutorial,best jekyll themes, multi languages and tags
usemathjax: true
permalink: /projects/Smart-Clicker/
github_url: "https://github.com/Mallen220/Windows-AutoClicker"
pagination:
  enabled: true
  collection: projects
---

### Smart Clicker (Previously Windows-Autoclicker)

**A Cross-Platform Automation Powerhouse**

---

#### **Project Description**

Smart Clicker is an advanced automation tool I engineered to execute complex sequences of mouse clicks, keyboard inputs, and conditional logic across Windows, macOS, and Linux. Unlike basic autoclickers, it integrates intelligent features like screen condition detection, event chaining, and dynamic timing control. The tool features a responsive GUI with real-time overlays, preset management, and drag-and-drop event rearrangement, making it indispensable for gaming, data entry, and workflow automation.

---

#### **Key Features**

1. **Multi-Event Automation**
   - Record sequences of **clicks**, **scrolls**, **text typing**, **delays**, and **conditional jumps**.
   - Overlay markers display event positions/numbers on-screen for visual tracking.

2. **Conditional Logic Engine**
   - **If/While/If-Else statements** trigger based on screen content (e.g., "Click _only_ if image X appears").
   - Customizable confidence thresholds (0–1) for image matching.

3. **Smart Text Simulation**
   - Type text with **modifier shortcuts** (e.g., `\ctrl+c` for copy).
   - **Instant typing** (clipboard-based) or **delayed character-by-character** simulation.

4. **Dynamic Timing Control**
   - Set fixed delays or **randomized timing** (50ms–4000ms) to mimic human behavior.
   - Drag-and-drop event reordering with adjustable per-step timeouts.

5. **Preset Ecosystem**
   - Save/load event sequences as reusable presets.
   - Import/export presets via `.txt` files.

6. **Cross-Platform Core**
   - Unified codebase for Windows/macOS/Linux (handles OS-specific hotkeys, paths, and GUI rendering).
   - Auto-detects monitors and scales overlays across multi-display setups.

---

#### **Technical Implementation**

**Core Functionality:**

- **Event Loop**: Executes sequences with interrupt support (stop via `Space`).
- **Overlay System**: Renders semi-transparent event markers using `tkinter` and `screeninfo`.
- **Conditionals**: Uses OpenCV template matching to verify on-screen elements.
- **Input Simulation**: Leverages `pyautogui` for clicks/scrolls and custom logic for text parsing.
- **Preset Serialization**: Stores events as serialized dictionaries with `ast.literal_eval`.

**Technical Stack:**

- **Languages**: Python 3
- **GUI**: `tkinter` (with Pillow for image handling)
- **Automation**: `pyautogui`, `pynput`, `mss` (screenshots), `pyperclip`
- **Computer Vision**: OpenCV (`cv2`)
- **OS Abstraction**: `platform`, `os`, `sys`

---

#### **Key Advantages**

1. **Extensibility**
   - Modular design allows adding new event types (e.g., keystrokes, pixel checks).
   - Class-based structure simplifies contributions.
2. **User Experience**
   - Drag-and-drop GUI with always-on-top toggle.
   - Real-time sidebar visualizing the event stack.
3. **Anti-Detection**
   - Randomized timing and cursor movements evade simple automation detection.
4. **Efficiency**
   - Multithreaded execution keeps the GUI responsive during automation.

---

#### **Setup Instructions**

##### Clone repository and install dependencies:

git clone https://github.com/your-repo/smart-clicker.git
cd smart-clicker
pip install -r requirements.txt

##### Run:

python AutoClicker_main.py

**Build Executables**:

###### Windows:

pyinstaller --onefile --windowed --icon=AutoClicker.ico --add-data "AutoClicker.ico;." --add-data "Presets;Presets" AutoClicker_main.py

###### Ubuntu:

sudo apt-get install xclip
pyinstaller --onefile --windowed --icon=AutoClicker.ico --add-data "AutoClicker.ico:." --add-data "Presets:Presets" AutoClicker_main.py

---

#### **Special Notes & Considerations**

- **Overlay Limitation**: Overlay windows are Windows-only due to OS-specific transparency APIs.
- **Security**: All presets are stored as plaintext (future upgrade: encryption).
- **Performance**: Heavy image matching can impact speed; optimized for single-screen workflows.
- **Future Roadmap**:
  - Screen recording during automation sequences.
  - Custom hotkey bindings and plugin support.

---

**Impact**: This project demonstrates mastery of cross-platform development, GUI design, and real-world problem-solving. It handles 5K+ lines of code while prioritizing user experience and extensibility—proving capability in large-scale Python deployments.
