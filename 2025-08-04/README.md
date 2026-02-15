# D&D 5e Character Builder (Starter)

This project is now a multi-step character creation flow inspired by D&D Beyond.

## Current Builder Flow
- Includes all core PHB races (Dragonborn, Dwarf, Elf, Gnome, Half-Elf, Half-Orc, Halfling, Human, Tiefling) in the Race step.
1. **Race**: pick a race and review languages, features, skills/proficiencies, and racial ability bonuses.
2. **Class**: pick primary class, set class level, review level-by-level features, and optionally configure multiclass levels.
3. **Ability Scores**: assign stats using a strict **27-point buy** system (8 to 15 limits before racial bonuses).
4. **Background**: choose a background and review granted skills, feature, and equipment.
5. **Summary**: export a JSON character sheet.

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
