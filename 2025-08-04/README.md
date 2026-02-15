# D&D 5e Character Builder (Starter)

This project is a multi-step character creation flow inspired by D&D Beyond.

## Current Builder Flow
1. **Set Custom Content**: import/export custom JSON and create/edit submitted custom races, classes, spells, backgrounds, and feats. Click **Apply & Continue** to load submitted content into the builder.
2. **Race**: pick a race and review languages, features, skills/proficiencies, and racial ability bonuses.
3. **Class**: pick primary class, set class level, review level-by-level features, and optionally configure multiclass levels.
4. **Ability Scores**: assign stats using a strict **27-point buy** system (8 to 15 limits before racial bonuses).
5. **Background**: choose a background and review granted skills, feature, and equipment.
6. **Summary**: export a JSON character sheet.

The Race step includes all core PHB races (Dragonborn, Dwarf, Elf, Gnome, Half-Elf, Half-Orc, Halfling, Human, Tiefling).

## Run in browser
```bash
cd 2025-08-04
python3 -m http.server 4173
```
Then open `http://localhost:4173`.

## Build a Windows `.exe`
On Windows Command Prompt:
```bat
cd path\to\dnd-maker\2025-08-04
build_exe.bat
```
Output:
- `2025-08-04\dist\dnd-character-builder.exe`
