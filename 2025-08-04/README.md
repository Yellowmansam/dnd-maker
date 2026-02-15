# D&D 5e Character Builder (Starter)

This starter app gives you a foundation for a D&D Beyond/Roll20-style character creator.

## Features
- Character basics (name, level, class, subclass, race, background)
- Ability score tracking with automatic modifiers
- Spell management (add/remove known spells)
- Extensible content manager to add custom classes, subclasses, races, and spells
- Local save and JSON export

## Run locally (browser)
```bash
cd 2025-08-04
python3 -m http.server 4173
```
Then open `http://localhost:4173`.

## Build a Windows `.exe`
This project now includes a desktop launcher so you can package it as a single Windows executable.

### Option A: easiest (Windows Command Prompt)
1. Open Command Prompt.
2. Run:
   ```bat
   cd path\to\dnd-maker\2025-08-04
   build_exe.bat
   ```
3. Your file will be created at:
   - `2025-08-04\dist\dnd-character-builder.exe`

### Option B: manual command
```bat
cd path\to\dnd-maker\2025-08-04
py -m venv .venv
.venv\Scripts\activate
pip install -r requirements-desktop.txt
pyinstaller --noconfirm --clean --windowed --onefile --name dnd-character-builder desktop_launcher.py
```

## Included desktop build files
- `desktop_launcher.py` - starts a local web server and opens the app in a desktop window
- `requirements-desktop.txt` - desktop packaging dependencies
- `build_exe.bat` - one-command Windows build script

## Next suggested upgrades
- Add multi-classing support
- Add class progression tables and spell slots
- Add equipment/inventory and attack rollers
- Add server-backed storage (users/campaigns)
- Add shared real-time session state for VTT-style play
