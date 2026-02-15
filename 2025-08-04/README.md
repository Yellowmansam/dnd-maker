# D&D 5e Character Builder (Starter)

This project is a multi-step character creation flow inspired by D&D Beyond.

## Current Builder Flow
- **Race**: pick a race, review short lore, age of maturity, lifespan, and detailed features.
- **Class**: pick a starting class, submit to lock level 1, then add or subtract levels per class up to a total of level 20. The center timeline shows each level and exact features gained with descriptions shown under each feature. Multiclass options are shown at the bottom and can be toggled open/closed; when you add a class it is removed from the multiclass list, and it only returns if that class is reduced back to level 0. Leveling a class down to 0 removes it from the build entirely. Starting-class selection at the top is hidden after level 1 is set and only returns when total level is 0. Each class can select its subclass once it reaches subclass level.
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
