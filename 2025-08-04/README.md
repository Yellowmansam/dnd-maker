# D&D 5e Character Builder (Starter)

This project is a multi-step character creation flow inspired by D&D Beyond.

## Current Builder Flow
1. **Race**: pick a race and review details.
2. **Class**: pick class and level plan, with hover descriptions on feature names.
3. **Ability Scores**: assign stats using a strict **27-point buy** system (8 to 15 limits before racial bonuses).
4. **Background**: choose a background and review grants.
5. **Summary**: export a JSON character sheet.

## Custom Content
Use the **Custom Content** button in the top-right to open the custom page.
- Import/export custom JSON.
- Add/edit custom races, classes, spells, backgrounds, and feats.
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
