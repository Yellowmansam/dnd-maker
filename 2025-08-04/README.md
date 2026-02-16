# D&D 5e Character Builder (Starter)

This project is a multi-step character creation flow inspired by D&D Beyond, with clickable step tabs for quick navigation.

## Current Builder Flow
- **Race**: current refinement mode shows core PHB races as selectable and greys out non-core races while we finish core-sheet polish. Race details include lore, maturity, lifespan, movement speeds, language/proficiency details, and feature descriptions.
- **Class**: current refinement mode enables Fighter as the active class path and greys out other classes. Fighter progression is populated with detailed level-by-level class text, the fighting-style selector appears inline in class progression at level 1, class skill choices use dropdown selectors, and core subclass support (Champion, Battle Master, Eldritch Knight) is shown in the timeline with extra spacing for readability.
- **Ability Scores**: choose either strict **27-point buy** (8 to 15 before bonuses) or **rolled stats** (4d6 drop one die per roll slot with manual assignment to stats, max 18). For 2024-era species, ability bonuses are assigned in the ability tab (+2 and +1 to different abilities) instead of fixed racial bonuses.
- **Background**: choose a background and review grants.
- **Summary**: outputs a human-readable character sheet layout (race, classes, ability scores, background, feats, and key selections) with defensive fallback rendering if a class/race/background entry is temporarily unavailable.

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


## Data ingestion status
- Added book-by-book data batches for race/class/subclass/feat ingestion from:
  - Player's Handbook (2014)
  - Player's Handbook (2024)
  - Xanathar's Guide to Everything
  - Tasha's Cauldron of Everything
  - Sword Coast Adventurer's Guide
  - Volo's Guide to Monsters
  - Mordenkainen Presents: Monsters of the Multiverse
  - Mordenkainen's Tome of Foes
  - Eberron: Rising from the Last War
  - Explorer's Guide to Wildemount
  - Mythic Odysseys of Theros
  - Van Richten's Guide to Ravenloft
  - Strixhaven: A Curriculum of Chaos
  - Spelljammer: Astral Adventurer's Guide
  - Bigby Presents: Glory of the Giants
  - Planescape: Adventures in the Multiverse
  - The Book of Many Things
  - Fizban's Treasury of Dragons
- Species using flexible sourcebook ASI rules now use the ability tab's +2/+1 assignment panel when their race data specifies flexible bonuses.
- Completed a full race audit pass: every indexed race now has explicit maturity, lifespan, language, skills/proficiency, and feature lists (no generic lineage placeholder traits in the race UI).

## Remaining scope
- Race tab now includes expanded language coverage, movement speed display, and race-driven language/skill choice selectors. Remaining work is primarily deeper class/subclass/feat option wiring and long-form rules text polish.
