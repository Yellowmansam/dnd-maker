# D&D 5e Character Builder (Starter)

This starter app gives you a foundation for a D&D Beyond/Roll20-style character creator.

## Features
- Character basics (name, level, class, subclass, race, background)
- Ability score tracking with automatic modifiers
- Spell management (add/remove known spells)
- Extensible content manager to add custom classes, subclasses, races, and spells
- Local save and JSON export

## Run locally
```bash
cd 2025-08-04
python3 -m http.server 4173
```
Then open `http://localhost:4173`.

## Next suggested upgrades
- Add multi-classing support
- Add class progression tables and spell slots
- Add equipment/inventory and attack rollers
- Add server-backed storage (users/campaigns)
- Add shared real-time session state for VTT-style play
