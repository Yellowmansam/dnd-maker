# D&D 5e Character Builder (Starter)

This project is a multi-step character creation flow inspired by D&D Beyond, with clickable step tabs for quick navigation.

## Current Builder Flow
- **Race**: pick a race, review short lore, age of maturity, lifespan, and detailed features.
- **Class**: pick a starting class, submit to lock level 1, then add or subtract levels per class up to a total of level 20. Class cards now include a hover description for each class, multiclass options can be toggled open/closed, and picked multiclasses are removed from the multiclass list until reduced back to level 0. A class setup panel now shows saving throws, core proficiencies, and class skill-pick checkboxes for every taken class. The timeline shows class features with descriptions directly underneath (no duplicate hover tooltip on class features), subclass features appear as `Subclass Feature - ...` at subclass progression levels, and each Ability Score Improvement / Feat selector is shown inline at the exact level where it is unlocked.
- **Ability Scores**: choose either strict **27-point buy** (8 to 15 before bonuses) or **rolled stats** (4d6 drop one die per roll slot with manual assignment to stats, max 18). For 2024-era species, ability bonuses are assigned in the ability tab (+2 and +1 to different abilities) instead of fixed racial bonuses.
- **Background**: choose a background and review grants.
- **Summary**: export a JSON character sheet.

## Included Core Content
- Core PHB races remain fully playable in-app (with race-option support like Dragonborn ancestry), and the race list is expanded with a broad index of 5e/One D&D official + partnered race names and full sourcebook names. Race options are split into **2014 Rules Content** and **2024 Rules Content** sections in the UI. These race entries are grouped by rules era and include sourcebook metadata directly in the picker and detail view.
- All core PHB classes:
  - Barbarian, Bard, Cleric, Druid, Fighter, Monk, Paladin, Ranger, Rogue, Sorcerer, Warlock, Wizard.
- Core PHB subclasses are included for each class in the class selection flow, with class progression populated through level 20 and subclass feature milestones surfaced in the timeline. DMG subclasses Death Domain (Cleric) and Oathbreaker (Paladin) are included, and subclass milestone features are surfaced in both timeline and class setup panels.
- Core PHB feats are included and can be selected from Ability Score Improvement opportunities, plus several DMG epic boons are available in the same selector.

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
