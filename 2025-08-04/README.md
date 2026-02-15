# D&D 5e Character Builder (Starter)

This project is a multi-step character creation flow inspired by D&D Beyond.

## Current Builder Flow
- **Race**: pick a race, review short lore, age of maturity, lifespan, and detailed features.
- **Class**: pick a starting class, submit to lock level 1, then add levels from there up to level 20. The center timeline shows each level and exact features gained with descriptions shown under each feature. Multiclass options are shown at the bottom, can be toggled open/closed, and classes you do not qualify for are greyed out based on current ability scores.
- **Ability Scores**: choose either strict **27-point buy** (8 to 15 before racial bonuses) or **rolled stats** (4d6 drop one die per roll slot with manual assignment to stats, max 18).
- **Background**: choose a background and review grants.
- **Summary**: export a JSON character sheet.

## Included Core Content
- All core PHB races with race-option support (including Dragonborn ancestry and dynamic breath/resistance descriptions).
- All core PHB classes:
  - Barbarian, Bard, Cleric, Druid, Fighter, Monk, Paladin, Ranger, Rogue, Sorcerer, Warlock, Wizard.
- Core PHB subclasses are included for each class in the class selection flow, with class progression populated through level 20.

## Custom Content
Use the **Custom Content** button in the top-right to open the custom page.
- Import/export custom JSON.
- Add/edit custom races, classes, spells, backgrounds, feats, and languages.
- Type-specific editor fields are shown based on selected type.
- Quick fill suggestions appear in appropriate list fields.
- Submitted items appear in a sidebar and can be reopened for editing.
- Click **Apply Changes** to merge submitted custom content into the builder.

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
