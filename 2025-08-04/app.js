const POINT_BUY_BUDGET = 27;
const STEP_ORDER = ["race", "class", "abilities", "background", "summary"];
const COST_BY_SCORE = { 8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9 };

const LANGUAGE_DESCRIPTIONS = {
  Common: "The trade tongue used across most of Faerûn and many civilized lands.",
  Dwarvish: "Language of dwarven halls and stonecraft traditions.",
  Elvish: "Ancient flowing tongue of elven cultures and lore.",
  Draconic: "Arcane language associated with dragons and magical scholarship.",
  Gnomish: "Inventive language used by gnome communities and artisans.",
  Orc: "Harsh tongue common among orc tribes and warbands.",
  Halfling: "Practical language spoken in halfling communities.",
  Infernal: "Formal infernal tongue tied to devils and contracts.",
};

const DRAGONBORN_ANCESTRY = {
  Black: { breath: "5-by-30 ft. line of acid (DEX save), 2d6 on fail, half on success.", resistance: "Resistance to acid damage." },
  Blue: { breath: "5-by-30 ft. line of lightning (DEX save), 2d6 on fail, half on success.", resistance: "Resistance to lightning damage." },
  Brass: { breath: "5-by-30 ft. line of fire (DEX save), 2d6 on fail, half on success.", resistance: "Resistance to fire damage." },
  Bronze: { breath: "5-by-30 ft. line of lightning (DEX save), 2d6 on fail, half on success.", resistance: "Resistance to lightning damage." },
  Copper: { breath: "5-by-30 ft. line of acid (DEX save), 2d6 on fail, half on success.", resistance: "Resistance to acid damage." },
  Gold: { breath: "15 ft. cone of fire (DEX save), 2d6 on fail, half on success.", resistance: "Resistance to fire damage." },
  Green: { breath: "15 ft. cone of poison (CON save), 2d6 on fail, half on success.", resistance: "Resistance to poison damage." },
  Red: { breath: "15 ft. cone of fire (DEX save), 2d6 on fail, half on success.", resistance: "Resistance to fire damage." },
  Silver: { breath: "15 ft. cone of cold (CON save), 2d6 on fail, half on success.", resistance: "Resistance to cold damage." },
  White: { breath: "15 ft. cone of cold (CON save), 2d6 on fail, half on success.", resistance: "Resistance to cold damage." },
};


const FEATURE_DESCRIPTIONS = {
  "Draconic Ancestry": "Your dragon lineage defines your breath weapon and resistance.",
  "Breath Weapon": "Exhale destructive elemental energy based on your ancestry.",
  "Damage Resistance": "Gain resistance to an ancestry-linked damage type.",
  Darkvision: "See in darkness as dim light within a limited range.",
  "Dwarven Resilience": "Advantage on poison saves and resistance to poison damage.",
  "Dwarven Combat Training": "Weapon proficiencies tied to dwarven martial tradition.",
  Stonecunning: "Strong intuition and expertise-like knowledge about stonework.",
  "Keen Senses": "Perception proficiency.",
  "Fey Ancestry": "Advantage vs charm; immunity to magical sleep.",
  Trance: "Meditative rest in place of sleeping.",
  "Gnome Cunning": "Advantage on mental saves against magic.",
  "Skill Versatility": "Additional skill proficiencies.",
  "Relentless Endurance": "Once per long rest, drop to 1 HP instead of 0 HP.",
  "Savage Attacks": "Extra weapon die damage on melee critical hits.",
  Lucky: "Reroll a natural 1 on attacks, checks, and saves.",
  Brave: "Advantage on saves against frightened.",
  "Halfling Nimbleness": "Move through spaces of larger creatures.",
  Versatile: "Broad adaptable human traits.",
  "Hellish Resistance": "Resistance to fire damage.",
  "Infernal Legacy": "Innate infernal spellcasting progression.",
  "Celestial Resistance": "Resistance to necrotic and radiant damage.",
  "Healing Hands": "Heal a creature as an action a limited number of times.",
  "Light Bearer": "You know the Light cantrip.",
  "Fey Step": "Short-range teleportation tied to fey magic.",
  "Elemental Legacy": "Innate elemental trait based on your elemental heritage.",
  "Racial Traits": "Core racial traits from the selected lineage, including movement, senses, resistances, and innate abilities.",
};

const EXPANDED_RACE_INDEX = [
  { id: "aarakocra", name: "Aarakocra", source: "Elemental Evil Player's Companion", rulesEra: "2014" },
  { id: "aasimar-vgm", name: "Aasimar (Volo's)", source: "Volo's Guide to Monsters", rulesEra: "2014" },
  { id: "astral-elf", name: "Astral Elf", source: "Spelljammer: Astral Adventurer's Guide", rulesEra: "2014" },
  { id: "autognome", name: "Autognome", source: "Spelljammer: Astral Adventurer's Guide", rulesEra: "2014" },
  { id: "bugbear", name: "Bugbear", source: "Mordenkainen Presents: Monsters of the Multiverse", rulesEra: "2014" },
  { id: "changeling", name: "Changeling", source: "Eberron: Rising from the Last War", rulesEra: "2014" },
  { id: "kalashtar", name: "Kalashtar", source: "Eberron: Rising from the Last War", rulesEra: "2014" },
  { id: "shifter", name: "Shifter", source: "Eberron: Rising from the Last War", rulesEra: "2014" },
  { id: "warforged", name: "Warforged", source: "Eberron: Rising from the Last War", rulesEra: "2014" },
  { id: "fairy", name: "Fairy", source: "The Wild Beyond the Witchlight", rulesEra: "2014" },
  { id: "firbolg", name: "Firbolg", source: "Mordenkainen Presents: Monsters of the Multiverse", rulesEra: "2014" },
  { id: "githyanki", name: "Githyanki", source: "Mordenkainen Presents: Monsters of the Multiverse", rulesEra: "2014" },
  { id: "githzerai", name: "Githzerai", source: "Mordenkainen Presents: Monsters of the Multiverse", rulesEra: "2014" },
  { id: "goblin", name: "Goblin", source: "Mordenkainen Presents: Monsters of the Multiverse", rulesEra: "2014" },
  { id: "harengon", name: "Harengon", source: "The Wild Beyond the Witchlight", rulesEra: "2014" },
  { id: "hobgoblin", name: "Hobgoblin", source: "Mordenkainen Presents: Monsters of the Multiverse", rulesEra: "2014" },
  { id: "kenku", name: "Kenku", source: "Mordenkainen Presents: Monsters of the Multiverse", rulesEra: "2014" },
  { id: "kobold", name: "Kobold", source: "Mordenkainen Presents: Monsters of the Multiverse", rulesEra: "2014" },
  { id: "lizardfolk", name: "Lizardfolk", source: "Mordenkainen Presents: Monsters of the Multiverse", rulesEra: "2014" },
  { id: "orc", name: "Orc", source: "Mordenkainen Presents: Monsters of the Multiverse", rulesEra: "2014" },
  { id: "satyr", name: "Satyr", source: "Mythic Odysseys of Theros", rulesEra: "2014" },
  { id: "tabaxi", name: "Tabaxi", source: "Mordenkainen Presents: Monsters of the Multiverse", rulesEra: "2014" },
  { id: "tortle", name: "Tortle", source: "The Tortle Package", rulesEra: "2014" },
  { id: "triton", name: "Triton", source: "Mordenkainen Presents: Monsters of the Multiverse", rulesEra: "2014" },
  { id: "yuan-ti", name: "Yuan-ti", source: "Mordenkainen Presents: Monsters of the Multiverse", rulesEra: "2014" },
  { id: "leonin", name: "Leonin", source: "Mythic Odysseys of Theros", rulesEra: "2014" },
  { id: "owlin", name: "Owlin", source: "Strixhaven: A Curriculum of Chaos", rulesEra: "2014" },
  { id: "reborn", name: "Reborn", source: "Van Richten's Guide to Ravenloft", rulesEra: "2014" },
  { id: "dhampir", name: "Dhampir", source: "Van Richten's Guide to Ravenloft", rulesEra: "2014" },
  { id: "hexblood", name: "Hexblood", source: "Van Richten's Guide to Ravenloft", rulesEra: "2014" },
  { id: "kender", name: "Kender", source: "Dragonlance: Shadow of the Dragon Queen", rulesEra: "2014" },
  { id: "plasmoid", name: "Plasmoid", source: "Spelljammer: Astral Adventurer's Guide", rulesEra: "2014" },
  { id: "thri-kreen", name: "Thri-kreen", source: "Spelljammer: Astral Adventurer's Guide", rulesEra: "2014" },
  { id: "hadozee", name: "Hadozee", source: "Spelljammer: Astral Adventurer's Guide", rulesEra: "2014" },
  { id: "giff", name: "Giff", source: "Spelljammer: Astral Adventurer's Guide", rulesEra: "2014" },
  { id: "human-2024", name: "Human (2024)", source: "Player's Handbook (2024)", rulesEra: "2024" },
  { id: "dwarf-2024", name: "Dwarf (2024)", source: "Player's Handbook (2024)", rulesEra: "2024" },
  { id: "elf-2024", name: "Elf (2024)", source: "Player's Handbook (2024)", rulesEra: "2024" },
  { id: "halfling-2024", name: "Halfling (2024)", source: "Player's Handbook (2024)", rulesEra: "2024" },
  { id: "gnome-2024", name: "Gnome (2024)", source: "Player's Handbook (2024)", rulesEra: "2024" },
  { id: "dragonborn-2024", name: "Dragonborn (2024)", source: "Player's Handbook (2024)", rulesEra: "2024" },
  { id: "orc-2024", name: "Orc (2024)", source: "Player's Handbook (2024)", rulesEra: "2024" },
  { id: "tiefling-2024", name: "Tiefling (2024)", source: "Player's Handbook (2024)", rulesEra: "2024" },
  { id: "goliath-2024", name: "Goliath (2024)", source: "Player's Handbook (2024)", rulesEra: "2024" },
  { id: "aasimar-2024", name: "Aasimar (2024)", source: "Dungeon Master's Guide (2024)", rulesEra: "2024" },
  { id: "critical-role-pallid", name: "Pallid Elf", source: "Explorer's Guide to Wildemount", rulesEra: "2014" },
  { id: "tal-dorei-luxonborn", name: "Luxonborn", source: "Tal'Dorei Campaign Setting Reborn", rulesEra: "2014" },
  { id: "glitchling", name: "Glitchling", source: "Planescape: Adventures in the Multiverse", rulesEra: "2014" },
  { id: "ghostfire-lumin", name: "Lumin", source: "Ghostfire Gaming Partner Content", rulesEra: "2014" },
  { id: "drakkenheim-draconic", name: "Draconic Lineage", source: "Dungeons of Drakkenheim", rulesEra: "2014" },
];

const BOOK_DATA_BATCHES = [
  {
    book: "Player's Handbook (2024)",
    races: [
      { id: "human-2024", shortDescription: "Adaptable and ambitious people with broad talent.", maturityAge: "Late teens", lifespan: "Less than a century", languages: ["Common", "One extra language"], features: ["Resourceful", "Versatile"], abilityScoreRule: "choose2plus1" },
      { id: "dwarf-2024", shortDescription: "Resilient folk of stone halls and ancient clans.", maturityAge: "About 50 years", lifespan: "About 350 years", languages: ["Common", "Dwarvish"], features: ["Darkvision", "Dwarven Resilience", "Stonecunning"], abilityScoreRule: "choose2plus1" },
      { id: "elf-2024", shortDescription: "Long-lived fey descendants with keen senses and grace.", maturityAge: "About 100 years", lifespan: "About 750 years", languages: ["Common", "Elvish"], features: ["Darkvision", "Fey Ancestry", "Keen Senses", "Trance"], abilityScoreRule: "choose2plus1" },
      { id: "halfling-2024", shortDescription: "Small wanderers known for luck and resolve.", maturityAge: "About 20 years", lifespan: "About 150 years", languages: ["Common", "Halfling"], features: ["Brave", "Halfling Nimbleness", "Luck"], abilityScoreRule: "choose2plus1" },
      { id: "gnome-2024", shortDescription: "Inventive and curious folk with innate magical resistance.", maturityAge: "About 40 years", lifespan: "350 to 500 years", languages: ["Common", "Gnomish"], features: ["Darkvision", "Gnome Cunning"], abilityScoreRule: "choose2plus1" },
      { id: "dragonborn-2024", shortDescription: "Draconic heirs with ancestry-based breath and resistance.", maturityAge: "Around 15 years", lifespan: "Around 80 years", languages: ["Common", "Draconic"], features: ["Draconic Ancestry", "Breath Weapon", "Damage Resistance"], abilityScoreRule: "choose2plus1" },
      { id: "orc-2024", shortDescription: "Hardy and relentless warriors with powerful endurance.", maturityAge: "Mid teens", lifespan: "Up to about 80 years", languages: ["Common", "Orc"], features: ["Adrenaline Rush", "Relentless Endurance", "Darkvision"], abilityScoreRule: "choose2plus1" },
      { id: "tiefling-2024", shortDescription: "Fiend-touched people bearing infernal legacies.", maturityAge: "Same as humans", lifespan: "Slightly longer than humans", languages: ["Common", "Infernal"], features: ["Darkvision", "Fiendish Legacy"], abilityScoreRule: "choose2plus1" },
      { id: "goliath-2024", shortDescription: "Mighty giant-kin with towering strength and endurance.", maturityAge: "Late teens", lifespan: "Less than 120 years", languages: ["Common", "Giant"], features: ["Large Form", "Powerful Build", "Giant Ancestry"], abilityScoreRule: "choose2plus1" },
    ],
  },
  {
    book: "Mordenkainen Presents: Monsters of the Multiverse",
    races: [
      { id: "bugbear", shortDescription: "Long-limbed goblinoids who strike from shadows with brutal surprise.", features: ["Darkvision", "Long-Limbed", "Powerful Build", "Sneaky", "Surprise Attack"], languages: ["Common", "Goblin", "One extra language"], abilityScoreRule: "choose2plus1" },
      { id: "goblin", shortDescription: "Cunning skirmishers with fey roots and quick escapes.", features: ["Darkvision", "Fey Ancestry", "Fury of the Small", "Nimble Escape"], languages: ["Common", "Goblin", "One extra language"], abilityScoreRule: "choose2plus1" },
      { id: "hobgoblin", shortDescription: "Disciplined goblinoids whose fey gifts support allies.", features: ["Darkvision", "Fey Ancestry", "Fey Gift"], languages: ["Common", "Goblin", "One extra language"], abilityScoreRule: "choose2plus1" },
      { id: "kenku", shortDescription: "Mimic-talented avians with excellent recall and copied craft.", features: ["Expert Duplication", "Kenku Recall", "Mimicry"], languages: ["Common", "Auran", "One extra language"], abilityScoreRule: "choose2plus1" },
      { id: "kobold", shortDescription: "Resourceful draconic tunnelfolk who rely on pack tactics and cries.", features: ["Darkvision", "Draconic Cry", "Kobold Legacy"], languages: ["Common", "Draconic", "One extra language"], abilityScoreRule: "choose2plus1" },
      { id: "lizardfolk", shortDescription: "Pragmatic reptilian survivors with natural defenses.", features: ["Bite", "Hold Breath", "Hungry Jaws", "Natural Armor"], languages: ["Common", "Draconic", "One extra language"], abilityScoreRule: "choose2plus1" },
      { id: "tabaxi", shortDescription: "Curious feline wanderers known for speed and agility.", features: ["Darkvision", "Cat's Claws", "Cat's Talent", "Feline Agility"], languages: ["Common", "One extra language"], abilityScoreRule: "choose2plus1" },
      { id: "triton", shortDescription: "Guardians from the deep sea with elemental command.", features: ["Amphibious", "Control Air and Water", "Darkvision", "Emissary of the Sea", "Guardian of the Depths"], languages: ["Common", "Primordial", "One extra language"], abilityScoreRule: "choose2plus1" },
      { id: "yuan-ti", shortDescription: "Serpentine inheritors of ancient magic and poison resilience.", features: ["Darkvision", "Magic Resistance", "Poison Resilience", "Serpentine Spellcasting"], languages: ["Common", "Abyssal", "Draconic"], abilityScoreRule: "choose2plus1" },
      { id: "orc", shortDescription: "Powerful warriors with relentless stamina and momentum.", features: ["Adrenaline Rush", "Darkvision", "Powerful Build", "Relentless Endurance"], languages: ["Common", "Orc", "One extra language"], abilityScoreRule: "choose2plus1" },
    ],
  },
  {
    book: "Player's Handbook (2014)",
    subclasses: [
      { classId: "barbarian", name: "Berserker", description: "A barbarian path focused on overwhelming fury and fear.", features: { 3: [["Subclass Feature - Frenzy", "While raging, you can make one melee weapon attack as a bonus action on each turn, gaining exhaustion after the rage ends."]], 6: [["Subclass Feature - Mindless Rage", "You cannot be charmed or frightened while raging; these effects are suspended for the rage duration."]], 10: [["Subclass Feature - Intimidating Presence", "Use your action to frighten a creature within 30 feet that can see or hear you."]], 14: [["Subclass Feature - Retaliation", "When a creature within 5 feet damages you, use your reaction to make a melee weapon attack against it."]] } },
      { classId: "barbarian", name: "Totem Warrior", description: "A spiritual barbarian who channels totemic animal powers.", features: { 3: [["Subclass Feature - Spirit Seeker", "Cast Beast Sense and Speak with Animals as rituals."], ["Subclass Feature - Totem Spirit", "Choose bear, eagle, or wolf for a rage benefit."]], 6: [["Subclass Feature - Aspect of the Beast", "Gain a utility benefit based on your chosen totem animal."]], 10: [["Subclass Feature - Spirit Walker", "Cast Commune with Nature as a ritual."]], 14: [["Subclass Feature - Totemic Attunement", "Gain a powerful combat benefit tied to your totem while raging."]] } },
      { classId: "fighter", name: "Champion", description: "A straightforward martial specialist built on superior athletics and critical hits.", features: { 3: [["Subclass Feature - Improved Critical", "Your weapon attacks score a critical hit on a roll of 19 or 20."]], 7: [["Subclass Feature - Remarkable Athlete", "Add half proficiency bonus to certain Strength, Dexterity, and Constitution checks not already using proficiency."]], 10: [["Subclass Feature - Additional Fighting Style", "Gain a second Fighting Style option from the fighter list."]], 15: [["Subclass Feature - Superior Critical", "Your weapon attacks score a critical hit on an 18–20."]], 18: [["Subclass Feature - Survivor", "At the start of your turn, regain hit points if you have fewer than half your hit points remaining."]] } },
      { classId: "fighter", name: "Battle Master", description: "A tactical fighter who uses superiority dice and maneuvers.", features: { 3: [["Subclass Feature - Combat Superiority", "Gain superiority dice and learn maneuvers to fuel tactical combat effects."], ["Subclass Feature - Student of War", "Gain proficiency with one type of artisan's tools."]], 7: [["Subclass Feature - Know Your Enemy", "After observing a creature, learn comparative combat statistics about it."]], 10: [["Subclass Feature - Improved Combat Superiority", "Your superiority dice become d10s."]], 15: [["Subclass Feature - Relentless", "Regain one superiority die when initiative is rolled if you have none."]], 18: [["Subclass Feature - Improved Combat Superiority", "Your superiority dice become d12s."]] } },
      { classId: "rogue", name: "Thief", description: "A rogue specializing in agility, utility, and item interaction.", features: { 3: [["Subclass Feature - Fast Hands", "Use Cunning Action to make Sleight of Hand checks, use thieves' tools, or use objects."], ["Subclass Feature - Second-Story Work", "Climb faster and improve your long jumps."]], 9: [["Subclass Feature - Supreme Sneak", "Gain advantage on Stealth checks when moving slowly."]], 13: [["Subclass Feature - Use Magic Device", "Ignore class, race, and level requirements on magic item use."]], 17: [["Subclass Feature - Thief's Reflexes", "Take two turns during the first round of combat."]] } },
      { classId: "wizard", name: "Evocation", description: "A wizard tradition focused on destructive elemental spellcraft.", features: { 2: [["Subclass Feature - Evocation Savant", "Copy evocation spells into your spellbook for half the usual gold and time."], ["Subclass Feature - Sculpt Spells", "Protect allies from your area evocation spells."]], 6: [["Subclass Feature - Potent Cantrip", "Your damaging cantrips can still affect targets on successful saves."]], 10: [["Subclass Feature - Empowered Evocation", "Add your Intelligence modifier to one damage roll of any wizard evocation spell."]], 14: [["Subclass Feature - Overchannel", "Maximize damage of lower-level spells and risk self-damage on repeated use."]] } },
    ],
    feats: [
      { name: "Lucky", source: "Player's Handbook (2014)" },
      { name: "Great Weapon Master", source: "Player's Handbook (2014)" },
      { name: "Sharpshooter", source: "Player's Handbook (2014)" },
    ],
  },
  {
    book: "Xanathar's Guide to Everything",
    subclasses: [
      { classId: "barbarian", name: "Zealot", description: "A divine-fury barbarian who fights with radiant or necrotic wrath.", features: { 3: [["Subclass Feature - Divine Fury", "Your first weapon hit each turn while raging deals extra radiant or necrotic damage."], ["Subclass Feature - Warrior of the Gods", "Resurrection magic cast on you requires no material components."]], 6: [["Subclass Feature - Fanatical Focus", "Reroll one failed saving throw while raging once per rage."]], 10: [["Subclass Feature - Zealous Presence", "As a bonus action, grant nearby allies advantage on attack rolls and saving throws until your next turn."]], 14: [["Subclass Feature - Rage Beyond Death", "While raging, dropping to 0 hit points does not knock you unconscious."]] } },
      { classId: "bard", name: "Glamour", description: "A fey-inspired bard college centered on enchantment and stage command.", features: { 3: [["Subclass Feature - Mantle of Inspiration", "Spend Bardic Inspiration to grant temporary hit points and immediate movement to allies."], ["Subclass Feature - Enthralling Performance", "After performing, charm nearby humanoids who watched and listened."]], 6: [["Subclass Feature - Mantle of Majesty", "Cast Command as a bonus action for 1 minute after invoking your majestic presence."]], 14: [["Subclass Feature - Unbreakable Majesty", "Assume a regal aura that imposes checks before creatures can attack you."]] } },
      { classId: "cleric", name: "Forge", description: "A divine smithing domain devoted to craft and holy armaments.", features: { 1: [["Subclass Feature - Bonus Proficiencies", "Gain heavy armor proficiency and smith's tools proficiency."], ["Subclass Feature - Blessing of the Forge", "Enchant one nonmagical weapon or armor after a long rest."]], 2: [["Subclass Feature - Channel Divinity: Artisan's Blessing", "Create a simple or martial metal item in a ritual by laying out equal-value metal."]], 6: [["Subclass Feature - Soul of the Forge", "Gain resistance to fire damage and bonus AC while in heavy armor."],], 8: [["Subclass Feature - Divine Strike", "Once on each of your turns, add fire damage to a weapon attack."]], 17: [["Subclass Feature - Saint of Forge and Fire", "Gain immunity to fire and resistance to nonmagical bludgeoning, piercing, and slashing damage while in heavy armor."]] } },
      { classId: "fighter", name: "Samurai", description: "A disciplined warrior archetype built around resolve and presence.", features: { 3: [["Subclass Feature - Bonus Proficiency", "Gain proficiency in History, Insight, Performance, or Persuasion."], ["Subclass Feature - Fighting Spirit", "As a bonus action, grant yourself advantage on weapon attacks and temporary hit points."]], 7: [["Subclass Feature - Elegant Courtier", "Add Wisdom modifier to Persuasion checks and gain Wisdom save proficiency."]], 10: [["Subclass Feature - Tireless Spirit", "Regain one use of Fighting Spirit when initiative is rolled if you have none."]], 15: [["Subclass Feature - Rapid Strike", "Trade advantage on one attack to make an additional weapon attack as part of the same action."]], 18: [["Subclass Feature - Strength Before Death", "Immediately take an extra turn when reduced to 0 hit points."]] } },
      { classId: "warlock", name: "Hexblade", description: "A patron tied to sentient weapons and shadowy martial curses.", features: { 1: [["Subclass Feature - Hexblade's Curse", "Curse one target for bonus damage, improved critical hits, and healing on its defeat."], ["Subclass Feature - Hex Warrior", "Gain medium armor, shields, martial weapons, and Charisma-based weapon attacks for one chosen weapon."]], 6: [["Subclass Feature - Accursed Specter", "When you slay a humanoid, bind its spirit as a temporary specter ally."]], 10: [["Subclass Feature - Armor of Hexes", "Your cursed target can miss you on a d6 roll when it hits."]], 14: [["Subclass Feature - Master of Hexes", "When your cursed target dies, move the curse to a new creature."]] } },
    ],
    feats: [
      { name: "Elven Accuracy", description: "Increase Dexterity, Intelligence, Wisdom, or Charisma by 1 and reroll one die when attacking with advantage using that ability.", source: "Xanathar's Guide to Everything" },
      { name: "Fey Teleportation", description: "Increase Intelligence or Charisma by 1, learn Sylvan, and cast Misty Step once per short or long rest.", source: "Xanathar's Guide to Everything" },
      { name: "Shadow Touched", description: "Increase Intelligence, Wisdom, or Charisma by 1, learn Invisibility and one 1st-level illusion or necromancy spell.", source: "Xanathar's Guide to Everything" },
    ],
  },
  {
    book: "Sword Coast Adventurer's Guide",
    subclasses: [
      { classId: "barbarian", name: "Battlerager", description: "A dwarven-heavy barbarian path focused on spiked armor aggression.", features: { 3: [["Subclass Feature - Battlerager Armor", "While raging in spiked armor, make a bonus action melee weapon attack with armor spikes."]], 6: [["Subclass Feature - Reckless Abandon", "When you use Reckless Attack while raging, gain temporary hit points."]], 10: [["Subclass Feature - Battlerager Charge", "Use Dash as a bonus action while raging."]], 14: [["Subclass Feature - Spiked Retribution", "When a creature within 5 feet hits you with a melee attack, it takes piercing damage if you are raging and wearing spiked armor."]] } },
      { classId: "cleric", name: "Arcana", description: "A cleric domain blending divine faith with arcane study.", features: { 1: [["Subclass Feature - Arcane Initiate", "Gain Arcana proficiency and two wizard cantrips that count as cleric cantrips for you."], ["Subclass Feature - Domain Spells", "You always have Arcana Domain spells prepared at the listed cleric levels."]], 2: [["Subclass Feature - Channel Divinity: Arcane Abjuration", "As an action, turn one celestial, elemental, fey, or fiend within 30 feet."]], 6: [["Subclass Feature - Spell Breaker", "When you restore hit points with a spell to an ally, you can also end one spell affecting that creature."]], 8: [["Subclass Feature - Potent Spellcasting", "Add your Wisdom modifier to damage dealt by any cleric cantrip."]], 17: [["Subclass Feature - Arcane Mastery", "Choose one 6th-, one 7th-, one 8th-, and one 9th-level wizard spell and add them to your domain spells."]] } },
      { classId: "fighter", name: "Purple Dragon Knight", description: "A knightly commander archetype also called Banneret.", features: { 3: [["Subclass Feature - Rallying Cry", "When you use Second Wind, choose up to three allies within 60 feet to regain hit points equal to your fighter level."]], 7: [["Subclass Feature - Royal Envoy", "Gain Persuasion proficiency or expertise if already proficient." ]], 10: [["Subclass Feature - Inspiring Surge", "When you use Action Surge, choose one ally within 60 feet to make one weapon attack as a reaction."]], 15: [["Subclass Feature - Bulwark", "When you use Indomitable to reroll an Intelligence, Wisdom, or Charisma save and aren’t incapacitated, one ally can also reroll."]], 18: [["Subclass Feature - Inspiring Surge (2)", "You can choose two allies instead of one when using Inspiring Surge."]] } },
      { classId: "monk", name: "Long Death", description: "A monastic tradition that studies mortality and harvests life force.", features: { 3: [["Subclass Feature - Touch of Death", "When you reduce a creature within 5 feet to 0 hit points, gain temporary hit points equal to your Wisdom modifier + monk level."]], 6: [["Subclass Feature - Hour of Reaping", "As an action, frighten creatures within 30 feet that can see you."]], 11: [["Subclass Feature - Mastery of Death", "When reduced to 0 hit points, spend 1 ki point to drop to 1 hit point instead."]], 17: [["Subclass Feature - Touch of the Long Death", "Spend 1 to 10 ki points to deal necrotic damage to a creature you touch."]] } },
      { classId: "paladin", name: "Crown", description: "A sacred oath devoted to civilization, law, and loyalty.", features: { 3: [["Subclass Feature - Oath Spells", "You always have Oath of the Crown spells prepared at the listed levels."], ["Subclass Feature - Channel Divinity: Champion Challenge", "Issue a divine challenge that keeps nearby creatures from moving far from you."], ["Subclass Feature - Channel Divinity: Turn the Tide", "As a bonus action, heal nearby badly wounded allies."]], 7: [["Subclass Feature - Divine Allegiance", "When an ally within 5 feet takes damage, use your reaction to take that damage instead."]], 15: [["Subclass Feature - Unyielding Spirit", "You have advantage on saving throws to avoid becoming paralyzed or stunned."]], 20: [["Subclass Feature - Exalted Champion", "For 1 hour, gain resistance to nonmagical bludgeoning/piercing/slashing and improve ally defenses nearby."]] } },
      { classId: "rogue", name: "Swashbuckler", description: "A charismatic duelist rogue built for mobile one-on-one combat.", features: { 3: [["Subclass Feature - Fancy Footwork", "A creature you make a melee attack against can’t make opportunity attacks against you for the rest of your turn."], ["Subclass Feature - Rakish Audacity", "Add Charisma modifier to initiative and qualify for Sneak Attack in one-on-one melee situations."]], 9: [["Subclass Feature - Panache", "Use Persuasion checks to taunt foes or charm nonhostile creatures in social play."]], 13: [["Subclass Feature - Elegant Maneuver", "Use a bonus action to gain advantage on your next Acrobatics or Athletics check this turn."]], 17: [["Subclass Feature - Master Duelist", "If you miss with an attack, spend your action to reroll with advantage."]] } },
      { classId: "warlock", name: "Undying", description: "A warlock patron focused on deathless magic and survival.", features: { 1: [["Subclass Feature - Among the Dead", "Learn Spare the Dying and gain benefits against undead targeting you." ]], 6: [["Subclass Feature - Defy Death", "When you succeed on a death save or stabilize someone, regain hit points once per long rest."]], 10: [["Subclass Feature - Undying Nature", "You can hold your breath indefinitely and no longer need food, water, or sleep; you age slower."]], 14: [["Subclass Feature - Indestructible Life", "Use a bonus action to regain hit points and reattach severed body parts."]] } },
      { classId: "wizard", name: "Bladesinging (SCAG)", description: "The original Sword Coast bladesinger tradition focused on agile arcane swordplay.", features: { 2: [["Subclass Feature - Training in War and Song", "Gain light armor and one one-handed melee weapon proficiency and Performance skill."], ["Subclass Feature - Bladesong", "Activate bladesong to boost AC, speed, and concentration checks for 1 minute."]], 6: [["Subclass Feature - Extra Attack", "Attack twice when you take the Attack action."]], 10: [["Subclass Feature - Song of Defense", "Spend spell slots to reduce incoming damage while bladesong is active."]], 14: [["Subclass Feature - Song of Victory", "Add Intelligence modifier to melee weapon damage while bladesong is active."]] } }
    ],
    races: [
      { id: "aasimar-vgm", source: "Sword Coast Adventurer's Guide", shortDescription: "Aasimar touched by celestial heritage with innate divine gifts.", maturityAge: "Same rate as humans", lifespan: "Up to 160 years", languages: ["Common", "Celestial"], features: ["Darkvision", "Healing Hands", "Light Bearer", "Celestial Resistance"], racialAbilities: { CHA: 2 }, abilityScoreRule: "fixed" },
    ],
  },
  {
    book: "Volo's Guide to Monsters",
    races: [
      { id: "aasimar-vgm", source: "Volo's Guide to Monsters", shortDescription: "Mortals marked by celestial ancestry who channel radiant gifts.", maturityAge: "Mature at the same rate as humans", lifespan: "Up to 160 years", languages: ["Common", "Celestial"], features: ["Darkvision", "Healing Hands", "Light Bearer", "Celestial Resistance"], racialAbilities: { CHA: 2 }, abilityScoreRule: "fixed" },
      { id: "bugbear", source: "Volo's Guide to Monsters", shortDescription: "Long-armed goblinoid ambushers that strike hard from stealth.", maturityAge: "By age 16", lifespan: "About 80 years", languages: ["Common", "Goblin"], features: ["Darkvision", "Long-Limbed", "Powerful Build", "Sneaky", "Surprise Attack"], racialAbilities: { STR: 2, DEX: 1 }, abilityScoreRule: "fixed" },
      { id: "firbolg", source: "Volo's Guide to Monsters", shortDescription: "Reclusive forest giant-kin with subtle nature magic.", maturityAge: "Around 30 years", lifespan: "Up to 500 years", languages: ["Common", "Elvish", "Giant"], features: ["Firbolg Magic", "Hidden Step", "Powerful Build", "Speech of Beast and Leaf"], racialAbilities: { WIS: 2, STR: 1 }, abilityScoreRule: "fixed" },
      { id: "goblin", source: "Volo's Guide to Monsters", shortDescription: "Quick and crafty goblinoids who rely on mobility and opportunism.", maturityAge: "By age 8", lifespan: "Up to 60 years", languages: ["Common", "Goblin"], features: ["Darkvision", "Fury of the Small", "Nimble Escape"], racialAbilities: { DEX: 2, CON: 1 }, abilityScoreRule: "fixed" },
      { id: "hobgoblin", source: "Volo's Guide to Monsters", shortDescription: "Martial goblinoids trained for discipline and battlefield precision.", maturityAge: "By age 20", lifespan: "Up to 100 years", languages: ["Common", "Goblin"], features: ["Darkvision", "Martial Training", "Saving Face"], racialAbilities: { CON: 2, INT: 1 }, abilityScoreRule: "fixed" },
      { id: "kenku", source: "Volo's Guide to Monsters", shortDescription: "Flightless ravenfolk known for mimicry and precise craft.", maturityAge: "By age 12", lifespan: "Up to 60 years", languages: ["Common", "Auran"], features: ["Expert Forgery", "Kenku Training", "Mimicry"], racialAbilities: { DEX: 2, WIS: 1 }, abilityScoreRule: "fixed" },
      { id: "kobold", source: "Volo's Guide to Monsters", shortDescription: "Small draconic tunnel dwellers that excel in coordinated fights.", maturityAge: "By age 6", lifespan: "Up to 120 years", languages: ["Common", "Draconic"], features: ["Darkvision", "Grovel, Cower, and Beg", "Pack Tactics", "Sunlight Sensitivity"], racialAbilities: { DEX: 2 }, abilityScoreRule: "fixed" },
      { id: "lizardfolk", source: "Volo's Guide to Monsters", shortDescription: "Stoic reptilian survivors with natural armor and feral craft.", maturityAge: "By age 14", lifespan: "Up to 60 years", languages: ["Common", "Draconic"], features: ["Bite", "Cunning Artisan", "Hold Breath", "Hungry Jaws", "Natural Armor"], racialAbilities: { CON: 2, WIS: 1 }, abilityScoreRule: "fixed" },
      { id: "orc", source: "Volo's Guide to Monsters", shortDescription: "Aggressive raiders with relentless pressure and brute force.", maturityAge: "By age 12", lifespan: "Up to 50 years", languages: ["Common", "Orc"], features: ["Aggressive", "Darkvision", "Menacing", "Powerful Build"], racialAbilities: { STR: 2, CON: 1, INT: -2 }, abilityScoreRule: "fixed" },
      { id: "tabaxi", source: "Volo's Guide to Monsters", shortDescription: "Curious catfolk travelers famed for bursts of speed.", maturityAge: "By age 18", lifespan: "Up to 90 years", languages: ["Common", "One extra language"], features: ["Cat's Claws", "Cat's Talent", "Darkvision", "Feline Agility"], racialAbilities: { DEX: 2, CHA: 1 }, abilityScoreRule: "fixed" },
      { id: "triton", source: "Volo's Guide to Monsters", shortDescription: "Sea guardians bearing innate control over wind and water.", maturityAge: "By late teens", lifespan: "Up to 200 years", languages: ["Common", "Primordial"], features: ["Amphibious", "Control Air and Water", "Emissary of the Sea", "Guardians of the Depths"], racialAbilities: { STR: 1, CON: 1, CHA: 1 }, abilityScoreRule: "fixed" },
      { id: "yuan-ti", source: "Volo's Guide to Monsters", shortDescription: "Serpentine bloodlines with potent magical and poison defenses.", maturityAge: "Same as humans", lifespan: "Same as humans", languages: ["Common", "Abyssal", "Draconic"], features: ["Darkvision", "Innate Spellcasting", "Magic Resistance", "Poison Immunity"], racialAbilities: { CHA: 2, INT: 1 }, abilityScoreRule: "fixed" },
    ],
  },
  {
    book: "Tasha's Cauldron of Everything",
    subclasses: [
      { classId: "barbarian", name: "Wild Magic", description: "A barbarian channeling unpredictable arcane surges in combat.", features: { 3: [["Subclass Feature - Magic Awareness", "As an action, sense spells and magic items nearby for one turn."], ["Subclass Feature - Wild Surge", "Each rage triggers a roll on the Wild Magic table for a random magical effect."]], 6: [["Subclass Feature - Bolstering Magic", "Empower allies with better attacks/checks or recover spell slots using your action."]], 10: [["Subclass Feature - Unstable Backlash", "When you take damage or fail a save while raging, use your reaction to reroll your Wild Surge effect."]], 14: [["Subclass Feature - Controlled Surge", "Roll twice on the Wild Surge table and choose which effect to use."]] } },
      { classId: "bard", name: "Creation", description: "A bard college that manifests inspiration into tangible creation.", features: { 3: [["Subclass Feature - Mote of Potential", "Bardic Inspiration grants extra effects on ability checks, attacks, and healing."], ["Subclass Feature - Performance of Creation", "As an action, create a nonmagical item from song."]], 6: [["Subclass Feature - Animating Performance", "Animate a Large or smaller item into a dancing construct companion."]], 14: [["Subclass Feature - Creative Crescendo", "Create more than one item and ignore gp limits for Performance of Creation."]] } },
      { classId: "cleric", name: "Twilight", description: "A guardian domain balancing light and darkness for protection.", features: { 1: [["Subclass Feature - Bonus Proficiencies", "Gain martial weapon and heavy armor proficiency."], ["Subclass Feature - Eyes of Night", "Share darkvision out to 300 feet with willing creatures."], ["Subclass Feature - Vigilant Blessing", "Grant one creature advantage on its next initiative roll."]], 2: [["Subclass Feature - Channel Divinity: Twilight Sanctuary", "Create a sphere that grants temporary hit points or ends frightened/charmed each round."]], 6: [["Subclass Feature - Steps of Night", "While in dim light or darkness, gain a flying speed equal to your walking speed."]], 8: [["Subclass Feature - Divine Strike", "Once each turn add radiant damage to a weapon hit."]], 17: [["Subclass Feature - Twilight Shroud", "Creatures in your Twilight Sanctuary gain half cover."]] } },
      { classId: "fighter", name: "Psi Warrior", description: "A martial archetype using psionic power for defense and offense.", features: { 3: [["Subclass Feature - Psionic Power", "Gain psionic energy dice fueling protective fields and kinetic strikes."], ["Subclass Feature - Telekinetic Adept", "Learn psionic movement and object manipulation options."]], 7: [["Subclass Feature - Guarded Mind", "Gain resistance to psychic damage and a way to end charm/fear effects."]], 10: [["Subclass Feature - Bulwark of Force", "Shield allies behind telekinetic cover as a bonus action."]], 15: [["Subclass Feature - Telekinetic Master", "Cast Telekinesis and make bonus-action weapon attacks while maintaining it."]], 18: [["Subclass Feature - Psionic Mastery", "Recover psionic energy dice as a bonus action once per long rest."]] } },
      { classId: "wizard", name: "Bladesinging", description: "An elven-derived wizard tradition combining swordplay and arcane focus.", features: { 2: [["Subclass Feature - Training in War and Song", "Gain light armor proficiency, one one-handed melee weapon proficiency, and Performance skill."], ["Subclass Feature - Bladesong", "Activate a magical battle dance boosting AC, speed, concentration, and Acrobatics."]], 6: [["Subclass Feature - Extra Attack", "Attack twice, or attack once and cast a cantrip, when taking Attack action."]], 10: [["Subclass Feature - Song of Defense", "Spend spell slots to reduce incoming damage while Bladesong is active."]], 14: [["Subclass Feature - Song of Victory", "Add Intelligence modifier to melee weapon damage while Bladesong is active."]] } },
    ],
    feats: [
      { name: "Fey Touched", description: "Increase Intelligence, Wisdom, or Charisma by 1, learn Misty Step and one 1st-level divination or enchantment spell.", source: "Tasha's Cauldron of Everything" },
      { name: "Telekinetic", description: "Increase Intelligence, Wisdom, or Charisma by 1, learn invisible Mage Hand, and shove creatures with your mind.", source: "Tasha's Cauldron of Everything" },
      { name: "Telepathic", description: "Increase Intelligence, Wisdom, or Charisma by 1 and gain long-range telepathic communication plus Detect Thoughts.", source: "Tasha's Cauldron of Everything" },
      { name: "Crusher", description: "Increase Strength or Constitution by 1; once per turn move a target hit with bludgeoning damage and improve crit follow-up.", source: "Tasha's Cauldron of Everything" },
      { name: "Slasher", description: "Increase Strength or Dexterity by 1; reduce target speed on slashing hit and penalize crit targets.", source: "Tasha's Cauldron of Everything" },
      { name: "Piercer", description: "Increase Strength or Dexterity by 1; reroll one piercing damage die each turn and add a die on critical hits.", source: "Tasha's Cauldron of Everything" },
    ],
  },
  {
    book: "Mordenkainen's Tome of Foes",
    races: [
      { id: "githyanki", source: "Mordenkainen's Tome of Foes", shortDescription: "Astral raiders hardened by war and psionic discipline.", languages: ["Common", "Gith"], features: ["Decadent Mastery", "Martial Prodigy", "Githyanki Psionics"], abilityScoreRule: "fixed", racialAbilities: { STR: 2, INT: 1 } },
      { id: "githzerai", source: "Mordenkainen's Tome of Foes", shortDescription: "Monastic psions devoted to inner control and mental fortitude.", languages: ["Common", "Gith"], features: ["Mental Discipline", "Githzerai Psionics"], abilityScoreRule: "fixed", racialAbilities: { WIS: 2, INT: 1 } },
    ],
  },
  {
    book: "Eberron: Rising from the Last War",
    races: [
      { id: "changeling", source: "Eberron: Rising from the Last War", shortDescription: "Shapechangers who can alter appearance and social identity.", languages: ["Common", "Two of your choice"], features: ["Changeling Instincts", "Shapechanger"], abilityScoreRule: "fixed", racialAbilities: { CHA: 2, DEX: 1 } },
      { id: "kalashtar", source: "Eberron: Rising from the Last War", shortDescription: "Humanoids bonded with quori spirits and strong mental defenses.", languages: ["Common", "Quori", "One extra language"], features: ["Dual Mind", "Mental Discipline", "Mind Link", "Severed from Dreams"], abilityScoreRule: "fixed", racialAbilities: { WIS: 2, CHA: 1 } },
      { id: "shifter", source: "Eberron: Rising from the Last War", shortDescription: "Primal shape-walkers who briefly assume beastlike traits.", languages: ["Common"], features: ["Darkvision", "Shifting", "Bestial Instincts"], abilityScoreRule: "fixed", racialAbilities: { DEX: 1 } },
      { id: "warforged", source: "Eberron: Rising from the Last War", shortDescription: "Constructed people built for war and now forging identity.", languages: ["Common", "One extra language"], features: ["Constructed Resilience", "Sentry's Rest", "Integrated Protection", "Specialized Design"], abilityScoreRule: "fixed", racialAbilities: { CON: 2, STR: 1 } },
    ],
  },
  {
    book: "Explorer's Guide to Wildemount",
    races: [
      { id: "critical-role-pallid", source: "Explorer's Guide to Wildemount", shortDescription: "A shadow-touched elven lineage adapted to twilight forests.", languages: ["Common", "Elvish"], features: ["Darkvision", "Keen Senses", "Fey Ancestry", "Blessing of the Moon Weaver"], abilityScoreRule: "fixed", racialAbilities: { DEX: 2, WIS: 1 } },
    ],
    subclasses: [
      { classId: "fighter", name: "Echo Knight", description: "A dunamancy warrior who manifests temporal echoes in combat.", features: { 3: [["Subclass Feature - Manifest Echo", "Create and command a magical echo of yourself on the battlefield."], ["Subclass Feature - Unleash Incarnation", "Make extra attacks through your echo a limited number of times per long rest."]], 7: [["Subclass Feature - Echo Avatar", "Transfer your consciousness to your echo for scouting." ]], 10: [["Subclass Feature - Shadow Martyr", "Use your reaction for your echo to intercept an attack against an ally."]], 15: [["Subclass Feature - Reclaim Potential", "Gain temporary hit points when your echo is destroyed."]], 18: [["Subclass Feature - Legion of One", "Sustain two echoes at the same time."]] } },
      { classId: "wizard", name: "Chronurgy Magic", description: "A dunamantic tradition manipulating probability and time.", features: { 2: [["Subclass Feature - Chronal Shift", "Force a reroll for a creature's attack roll, ability check, or saving throw."], ["Subclass Feature - Temporal Awareness", "Add your Intelligence modifier to initiative rolls."]], 6: [["Subclass Feature - Momentary Stasis", "Trap a Large or smaller creature in a bubble of magical stasis."]], 10: [["Subclass Feature - Arcane Abeyance", "Condense a spell into a bead another creature can release." ]], 14: [["Subclass Feature - Convergent Future", "Replace uncertain outcomes with a chosen success or failure at a cost."]] } },
    ],
  },
  {
    book: "Mythic Odysseys of Theros",
    races: [
      { id: "leonin", source: "Mythic Odysseys of Theros", shortDescription: "Proud lionfolk champions of glory and personal strength.", languages: ["Common", "Leonin"], features: ["Darkvision", "Claws", "Daunting Roar", "Hunter's Instincts"], abilityScoreRule: "fixed", racialAbilities: { CON: 2, STR: 1 } },
      { id: "satyr", source: "Mythic Odysseys of Theros", shortDescription: "Fey revelers whose charm and agility defy mortal norms.", languages: ["Common", "Sylvan"], features: ["Ram", "Mirthful Leaps", "Magic Resistance", "Reveler"], abilityScoreRule: "fixed", racialAbilities: { CHA: 2, DEX: 1 } },
    ],
  },
  {
    book: "Van Richten's Guide to Ravenloft",
    races: [
      { id: "dhampir", source: "Van Richten's Guide to Ravenloft", shortDescription: "Vampiric lineages balancing mortal will and predatory hunger.", languages: ["Common", "One extra language"], features: ["Ancestral Legacy", "Darkvision", "Deathless Nature", "Spider Climb", "Vampiric Bite"], abilityScoreRule: "choose2plus1" },
      { id: "hexblood", source: "Van Richten's Guide to Ravenloft", shortDescription: "Fey-cursed heirs marked by eerie magic and occult ties.", languages: ["Common", "One extra language"], features: ["Ancestral Legacy", "Darkvision", "Eerie Token", "Hex Magic"], abilityScoreRule: "choose2plus1" },
      { id: "reborn", source: "Van Richten's Guide to Ravenloft", shortDescription: "Reconstructed beings animated by strange science or necromancy.", languages: ["Common", "One extra language"], features: ["Ancestral Legacy", "Deathless Nature", "Knowledge from a Past Life"], abilityScoreRule: "choose2plus1" },
    ],
  },
  {
    book: "Strixhaven: A Curriculum of Chaos",
    feats: [
      { name: "Strixhaven Initiate", description: "Choose a Strixhaven college, learn cantrips and a 1st-level spell, and cast the spell once without a slot each long rest.", source: "Strixhaven: A Curriculum of Chaos" },
      { name: "Strixhaven Mascot", description: "Gain Find Familiar with expanded mascot options and magical connections to your college spirit.", source: "Strixhaven: A Curriculum of Chaos" },
    ],
  },
  {
    book: "Spelljammer: Astral Adventurer's Guide",
    races: [
      { id: "astral-elf", source: "Spelljammer: Astral Adventurer's Guide", shortDescription: "Spacefaring elves steeped in starlight and astral calm.", languages: ["Common", "Elvish", "One extra language"], features: ["Astral Fire", "Darkvision", "Fey Ancestry", "Keen Senses", "Starlight Step", "Astral Trance"], abilityScoreRule: "choose2plus1" },
      { id: "autognome", source: "Spelljammer: Astral Adventurer's Guide", shortDescription: "Clockwork gnomish constructs with built-in resilience and tools.", languages: ["Common", "Gnomish", "One extra language"], features: ["Armored Casing", "Built for Success", "Healing Machine", "Mechanical Nature", "Sentry's Rest"], abilityScoreRule: "choose2plus1" },
      { id: "giff", source: "Spelljammer: Astral Adventurer's Guide", shortDescription: "Hippo-headed mercenaries famous for discipline and firearms zeal.", languages: ["Common", "One extra language"], features: ["Astral Spark", "Firearms Mastery", "Hippo Build"], abilityScoreRule: "choose2plus1" },
      { id: "hadozee", source: "Spelljammer: Astral Adventurer's Guide", shortDescription: "Gliding simian sailors with deft movement through rigging and void.", languages: ["Common", "One extra language"], features: ["Dexterous Feet", "Glide", "Hadozee Dodge"], abilityScoreRule: "choose2plus1" },
      { id: "plasmoid", source: "Spelljammer: Astral Adventurer's Guide", shortDescription: "Amorphous oozefolk who can squeeze and reshape their bodies.", languages: ["Common", "One extra language"], features: ["Amorphous", "Darkvision", "Natural Resilience", "Shape Self"], abilityScoreRule: "choose2plus1" },
      { id: "thri-kreen", source: "Spelljammer: Astral Adventurer's Guide", shortDescription: "Insectoid nomads with secondary arms and sleepless vigilance.", languages: ["Common", "Thri-kreen"], features: ["Chameleon Carapace", "Darkvision", "Secondary Arms", "Sleepless Reverie", "Thri-kreen Telepathy"], abilityScoreRule: "choose2plus1" },
    ],
  },
  {
    book: "Bigby Presents: Glory of the Giants",
    feats: [
      { name: "Strike of the Giants", description: "Gain a giant-themed combat strike and choose a giant ancestry that grants additional on-hit effects.", source: "Bigby Presents: Glory of the Giants" },
      { name: "Ember of the Fire Giant", description: "Increase Strength or Constitution by 1 and gain fiery giant-inspired powers.", source: "Bigby Presents: Glory of the Giants" },
      { name: "Fury of the Frost Giant", description: "Increase Strength or Constitution by 1 and gain frost giant fury options.", source: "Bigby Presents: Glory of the Giants" },
      { name: "Guile of the Cloud Giant", description: "Increase Charisma or Intelligence by 1 and gain cloud giant trickery and teleport utility.", source: "Bigby Presents: Glory of the Giants" },
      { name: "Keenness of the Stone Giant", description: "Increase Wisdom or Strength by 1 and gain stone giant perceptive/combat traits.", source: "Bigby Presents: Glory of the Giants" },
      { name: "Soul of the Storm Giant", description: "Increase Strength, Constitution, or Charisma by 1 and gain storm giant lightning and movement gifts.", source: "Bigby Presents: Glory of the Giants" },
      { name: "Vigor of the Hill Giant", description: "Increase Strength or Constitution by 1 and gain hill giant resilience and crushing force.", source: "Bigby Presents: Glory of the Giants" },
    ],
  },
  {
    book: "Planescape: Adventures in the Multiverse",
    races: [
      { id: "glitchling", source: "Planescape: Adventures in the Multiverse", shortDescription: "Digital planar beings whose bodies occasionally stutter with reality glitches.", languages: ["Common", "One extra language"], features: ["Living Data", "Glitch Body", "Recursive Memory"], abilityScoreRule: "choose2plus1" },
    ],
  },
  {
    book: "The Book of Many Things",
    feats: [
      { name: "Cartomancer", description: "Imbue a card with a spell and manipulate magic through deck-based arcane tricks.", source: "The Book of Many Things" },
      { name: "Scion of the Outer Planes", description: "Gain planar-aligned magical traits tied to your extraplanar heritage.", source: "The Book of Many Things" },
    ],
  },
  {
    book: "Fizban's Treasury of Dragons",
    feats: [
      { name: "Gift of the Chromatic Dragon", description: "Imbue weapons with elemental power and gain a reactive chromatic ward.", source: "Fizban's Treasury of Dragons" },
      { name: "Gift of the Gem Dragon", description: "Gain telekinetic rebuke and improved psionic-style force options.", source: "Fizban's Treasury of Dragons" },
      { name: "Gift of the Metallic Dragon", description: "Gain protective draconic wings and healing breath-like support magic.", source: "Fizban's Treasury of Dragons" },
    ],
  },
];

const CLASS_DESCRIPTIONS = {
  Barbarian: "A fierce frontline warrior who channels rage into durability and heavy melee damage.",
  Bard: "A versatile support caster who inspires allies and adapts through skills, magic, and utility.",
  Cleric: "A divine spellcaster who blends healing, support, and offense through a sacred domain.",
  Druid: "A primal spellcaster who commands nature magic and transforms with Wild Shape.",
  Fighter: "A disciplined weapon master with excellent survivability and repeated combat actions.",
  Monk: "A mobile martial artist who uses ki for speed, control, defense, and precision strikes.",
  Paladin: "A holy champion combining weapon combat, protective auras, and divine smites.",
  Ranger: "A wilderness specialist who mixes martial skill, exploration tools, and focused hunting.",
  Rogue: "A precise skirmisher focused on stealth, skill mastery, and high-impact Sneak Attacks.",
  Sorcerer: "An innate arcane caster whose bloodline grants flexible spell shaping through Metamagic.",
  Warlock: "A pact-bound caster with short-rest spell slots and customizable eldritch powers.",
  Wizard: "A scholarly arcane caster with broad spell preparation and powerful magical traditions.",
};

const SUBCLASS_LEVELS = {
  barbarian: [3, 6, 10, 14], bard: [3, 6, 14], cleric: [1, 2, 6, 8, 17], druid: [2, 6, 10, 14], fighter: [3, 7, 10, 15, 18], monk: [3, 6, 11, 17],
  paladin: [3, 7, 15, 20], ranger: [3, 7, 11, 15], rogue: [3, 9, 13, 17], sorcerer: [1, 6, 14, 18], warlock: [1, 6, 10, 14], wizard: [2, 6, 10, 14],
};

const CLASS_SAVING_THROWS = {
  barbarian: ["Strength", "Constitution"], bard: ["Dexterity", "Charisma"], cleric: ["Wisdom", "Charisma"], druid: ["Intelligence", "Wisdom"],
  fighter: ["Strength", "Constitution"], monk: ["Strength", "Dexterity"], paladin: ["Wisdom", "Charisma"], ranger: ["Strength", "Dexterity"],
  rogue: ["Dexterity", "Intelligence"], sorcerer: ["Constitution", "Charisma"], warlock: ["Wisdom", "Charisma"], wizard: ["Intelligence", "Wisdom"],
};

const CLASS_SKILL_CHOICES = {
  barbarian: { count: 2, options: ["Animal Handling", "Athletics", "Intimidation", "Nature", "Perception", "Survival"] },
  bard: { count: 3, options: ["Acrobatics", "Animal Handling", "Arcana", "Athletics", "Deception", "History", "Insight", "Intimidation", "Investigation", "Medicine", "Nature", "Perception", "Performance", "Persuasion", "Religion", "Sleight of Hand", "Stealth", "Survival"] },
  cleric: { count: 2, options: ["History", "Insight", "Medicine", "Persuasion", "Religion"] },
  druid: { count: 2, options: ["Arcana", "Animal Handling", "Insight", "Medicine", "Nature", "Perception", "Religion", "Survival"] },
  fighter: { count: 2, options: ["Acrobatics", "Animal Handling", "Athletics", "History", "Insight", "Intimidation", "Perception", "Survival"] },
  monk: { count: 2, options: ["Acrobatics", "Athletics", "History", "Insight", "Religion", "Stealth"] },
  paladin: { count: 2, options: ["Athletics", "Insight", "Intimidation", "Medicine", "Persuasion", "Religion"] },
  ranger: { count: 3, options: ["Animal Handling", "Athletics", "Insight", "Investigation", "Nature", "Perception", "Stealth", "Survival"] },
  rogue: { count: 4, options: ["Acrobatics", "Athletics", "Deception", "Insight", "Intimidation", "Investigation", "Perception", "Performance", "Persuasion", "Sleight of Hand", "Stealth"] },
  sorcerer: { count: 2, options: ["Arcana", "Deception", "Insight", "Intimidation", "Persuasion", "Religion"] },
  warlock: { count: 2, options: ["Arcana", "Deception", "History", "Intimidation", "Investigation", "Nature", "Religion"] },
  wizard: { count: 2, options: ["Arcana", "History", "Insight", "Investigation", "Medicine", "Religion"] },
};

const CORE_FEATS = [
  ["Alert", "You gain +5 initiative, cannot be surprised while conscious, and hidden attackers do not gain advantage from being unseen."],
  ["Athlete", "Increase STR or DEX by 1 and improve climbing, jumping, and standing from prone."],
  ["Actor", "Increase CHA by 1 and gain strong mimicry and disguise performance benefits."],
  ["Charger", "After dashing, make a bonus action attack or shove with extra momentum."],
  ["Crossbow Expert", "Ignore loading on crossbows, remove close-range disadvantage, and gain bonus action hand-crossbow attacks."],
  ["Defensive Duelist", "Use reaction to add proficiency bonus to AC against one melee attack while wielding a finesse weapon."],
  ["Dual Wielder", "Use two-weapon fighting with non-light one-handed weapons and gain +1 AC while dual wielding."],
  ["Dungeon Delver", "Improve trap detection, trap saves, and resistance against trap damage."],
  ["Durable", "Increase CON by 1 and improve minimum hit point recovery from hit dice."],
  ["Elemental Adept", "Choose one damage type; ignore low damage dice results and resistance interactions for that type."],
  ["Grappler", "Gain advantage on attacks against grappled creatures and unlock pinning options."],
  ["Great Weapon Master", "Trade attack accuracy for heavy damage and gain bonus attacks on crits or kills."],
  ["Healer", "Use healer's kits to restore meaningful hit points and stabilize allies effectively."],
  ["Heavily Armored", "Increase STR by 1 and gain heavy armor proficiency."],
  ["Heavy Armor Master", "Increase STR by 1 and reduce nonmagical bludgeoning, piercing, and slashing damage while in heavy armor."],
  ["Inspiring Leader", "Grant temporary hit points to allies after motivational speeches."],
  ["Keen Mind", "Increase INT by 1 and gain strong memory and orientation benefits."],
  ["Lightly Armored", "Increase STR or DEX by 1 and gain light armor proficiency."],
  ["Linguist", "Increase INT by 1, learn three languages, and create coded writing."],
  ["Lucky", "Gain three luck points per long rest to reroll d20 outcomes."],
  ["Mage Slayer", "Punish nearby spellcasters with reactions and improved saves against their spells."],
  ["Magic Initiate", "Learn two cantrips and one 1st-level spell from a chosen class list."],
  ["Martial Adept", "Learn combat maneuvers and gain a superiority die."],
  ["Medium Armor Master", "Improve medium armor effectiveness and stealth flexibility."],
  ["Mobile", "Gain movement speed and attack-mobility benefits that reduce opportunity attacks."],
  ["Moderately Armored", "Increase STR or DEX by 1 and gain medium armor plus shield proficiency."],
  ["Mounted Combatant", "Gain mounted combat advantages and improve mount protection."],
  ["Observant", "Increase INT or WIS by 1 and gain excellent passive Perception/Investigation and lip-reading."],
  ["Polearm Master", "Gain bonus-end attacks and trigger opportunity attacks when enemies enter your reach."],
  ["Resilient", "Increase one ability score by 1 and gain saving throw proficiency in that ability."],
  ["Ritual Caster", "Gain ritual spellcasting from a chosen class list and expand your ritual book."],
  ["Savage Attacker", "Reroll melee weapon damage once per turn and keep the better result."],
  ["Sentinel", "Lock enemies in place with opportunity attacks and punish attacks against allies."],
  ["Sharpshooter", "Ignore range and cover penalties and optionally trade accuracy for large ranged damage."],
  ["Shield Master", "Use shield techniques for bonus action shoves and better Dexterity defense."],
  ["Skilled", "Gain proficiency in any combination of three skills or tools."],
  ["Skulker", "Improve stealth in light obscurity and ranged hiding behavior."],
  ["Spell Sniper", "Double spell attack range, ignore cover with spell attacks, and learn an attack cantrip."],
  ["Tavern Brawler", "Increase STR or CON by 1, improve improvised/unarmed fighting, and bonus-action grapple on hit."],
  ["Tough", "Gain +2 maximum hit points per level."],
  ["War Caster", "Improve concentration, casting with occupied hands, and reaction spellcasting on opportunity attacks."],
  ["Weapon Master", "Increase STR or DEX by 1 and gain proficiency with four weapons of choice."],
  ["Boon of Fortitude", "DMG Epic Boon: Your hit point maximum increases significantly."],
  ["Boon of Spell Mastery", "DMG Epic Boon: Pick a 1st-level and 2nd-level spell you can cast at will."],
  ["Boon of Truesight", "DMG Epic Boon: Gain truesight out to 60 feet."],
].map(([name, description]) => ({ id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"), name, description }));

const BASE_DATA = {
  races: [
    { id: "dragonborn", name: "Dragonborn", shortDescription: "Proud draconic humanoids with innate elemental might.", maturityAge: "15 years", lifespan: "~80 years", languages: ["Common", "Draconic"], skills: ["No automatic skill proficiency from race"], features: ["Draconic Ancestry", "Breath Weapon", "Damage Resistance"], racialAbilities: { STR: 2, CHA: 1 }, options: [{ key: "draconicAncestry", label: "Draconic Ancestry", help: "Select your draconic lineage. This determines both your breath weapon and your resistance.", choices: Object.keys(DRAGONBORN_ANCESTRY), descriptions: Object.fromEntries(Object.entries(DRAGONBORN_ANCESTRY).map(([k, v]) => [k, `Breath Weapon: ${v.breath} Damage Resistance: ${v.resistance}`])) }] },
    { id: "dwarf", name: "Dwarf", shortDescription: "Durable folk of mountain and stone, known for resilience and craft.", maturityAge: "50 years", lifespan: "~350 years", languages: ["Common", "Dwarvish"], skills: ["Battleaxe, handaxe, light hammer, warhammer proficiency", "Tool proficiency"], features: ["Darkvision", "Dwarven Resilience", "Dwarven Combat Training", "Stonecunning"], racialAbilities: { CON: 2 } },
    { id: "elf", name: "Elf", shortDescription: "Graceful, long-lived people attuned to magic and keen senses.", maturityAge: "100 years", lifespan: "~750 years", languages: ["Common", "Elvish"], skills: ["Perception proficiency"], features: ["Darkvision", "Keen Senses", "Fey Ancestry", "Trance"], racialAbilities: { DEX: 2 } },
    { id: "gnome", name: "Gnome", shortDescription: "Curious and bright-minded folk with magical resilience.", maturityAge: "40 years", lifespan: "350 to 500 years", languages: ["Common", "Gnomish"], skills: ["No automatic skill proficiency from race"], features: ["Darkvision", "Gnome Cunning"], racialAbilities: { INT: 2 } },
    { id: "half-elf", name: "Half-Elf", shortDescription: "Versatile bridge between human and elven heritage.", maturityAge: "20 years", lifespan: "~180 years", languages: ["Common", "Elvish"], skills: ["Two skill proficiencies of your choice"], features: ["Darkvision", "Fey Ancestry", "Skill Versatility"], racialAbilities: { CHA: 2 }, options: [{ key: "bonusLanguage", label: "Bonus Language", help: "Half-Elves learn one extra language.", choices: Object.keys(LANGUAGE_DESCRIPTIONS), descriptions: LANGUAGE_DESCRIPTIONS }] },
    { id: "half-orc", name: "Half-Orc", shortDescription: "Hardy warriors with fierce survival instincts.", maturityAge: "14 years", lifespan: "~75 years", languages: ["Common", "Orc"], skills: ["Intimidation proficiency"], features: ["Darkvision", "Relentless Endurance", "Savage Attacks"], racialAbilities: { STR: 2, CON: 1 } },
    { id: "halfling", name: "Halfling", shortDescription: "Small, nimble adventurers known for luck and courage.", maturityAge: "20 years", lifespan: "~150 years", languages: ["Common", "Halfling"], skills: ["No automatic skill proficiency from race"], features: ["Lucky", "Brave", "Halfling Nimbleness"], racialAbilities: { DEX: 2 } },
    { id: "human", name: "Human", shortDescription: "Adaptable people with broad potential and ambition.", maturityAge: "Late teens", lifespan: "<100 years", languages: ["Common"], skills: ["No automatic skill proficiency from race"], features: ["Versatile"], racialAbilities: { STR: 1, DEX: 1, CON: 1, INT: 1, WIS: 1, CHA: 1 }, options: [{ key: "bonusLanguage", label: "Bonus Language", help: "Humans learn one extra language.", choices: Object.keys(LANGUAGE_DESCRIPTIONS), descriptions: LANGUAGE_DESCRIPTIONS }] },
    { id: "tiefling", name: "Tiefling", shortDescription: "Infernal-blooded people with innate magical heritage.", maturityAge: "Same as humans", lifespan: "Slightly longer than humans", languages: ["Common", "Infernal"], skills: ["No automatic skill proficiency from race"], features: ["Darkvision", "Hellish Resistance", "Infernal Legacy"], racialAbilities: { INT: 1, CHA: 2 } },
    { id: "aasimar", name: "Aasimar (DMG)", source: "Dungeon Master's Guide (2014)", rulesEra: "2014", shortDescription: "Celestial-touched beings marked by divine power and inner radiance.", maturityAge: "Same as humans", lifespan: "Slightly longer than humans", languages: ["Common", "Celestial"], skills: ["No automatic skill proficiency from race"], features: ["Darkvision", "Celestial Resistance", "Healing Hands", "Light Bearer"], racialAbilities: { CHA: 2 } },
    { id: "eladrin", name: "Eladrin (DMG)", source: "Dungeon Master's Guide (2014)", rulesEra: "2014", shortDescription: "Fey elves strongly tied to the magic and moods of the Feywild.", maturityAge: "100 years", lifespan: "~750 years", languages: ["Common", "Elvish"], skills: ["Perception proficiency"], features: ["Darkvision", "Fey Step", "Fey Ancestry", "Trance"], racialAbilities: { DEX: 2 } },
    { id: "genasi", name: "Genasi (DMG)", source: "Dungeon Master's Guide (2014)", rulesEra: "2014", shortDescription: "Elemental-blooded wanderers with power inherited from elemental planes.", maturityAge: "Late teens", lifespan: "~120 years", languages: ["Common", "Primordial"], skills: ["No automatic skill proficiency from race"], features: ["Darkvision", "Elemental Legacy"], racialAbilities: { CON: 2 } },
  ],
  classes: [
    buildClass("barbarian", "Barbarian", "d12", "STR 13", ["Light/medium armor", "Shields", "Simple/martial weapons"], ["Berserker", "Totem Warrior"], {
      1: [["Rage", "Enter a rage for bonus melee damage, damage resistance, and advantage on Strength checks/saves."], ["Unarmored Defense", "AC = 10 + DEX mod + CON mod while unarmored."]],
      2: [["Reckless Attack", "Gain advantage on melee STR attacks, but attacks against you have advantage until your next turn."], ["Danger Sense", "Advantage on DEX saves against effects you can see."]],
      3: [["Primal Path", "Choose a barbarian subclass to define your rage style."]],
      4: [["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."]],
      5: [["Extra Attack", "Attack twice with the Attack action."], ["Fast Movement", "+10 ft speed while not in heavy armor."]],
    }),
    buildClass("bard", "Bard", "d8", "CHA 13", ["Light armor", "Simple weapons", "Hand crossbows, longswords, rapiers, shortswords"], ["Lore", "Valor"], {
      1: [["Spellcasting", "Cast bard spells using Charisma and spell slots."], ["Bardic Inspiration", "Give allies a die they can add to checks, attacks, or saves."]],
      2: [["Jack of All Trades", "Add half proficiency bonus to checks you are not proficient in."], ["Song of Rest", "Extra healing during short rests."]],
      3: [["Bard College", "Choose a bard subclass."]],
      4: [["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."]],
      5: [["Font of Inspiration", "Bardic Inspiration refreshes on short rest."], ["Bardic Inspiration d8", "Your inspiration die increases."]],
    }),
    buildClass("cleric", "Cleric", "d8", "WIS 13", ["Light/medium armor", "Shields", "Simple weapons"], ["Knowledge", "Life", "Light", "Nature", "Tempest", "Trickery", "War", "Death (DMG)"], {
      1: [["Spellcasting", "Prepare and cast cleric spells using Wisdom."], ["Divine Domain", "Choose a divine domain subclass."]],
      2: [["Channel Divinity", "Use divine power for Turn Undead and domain effects."],
      ],
      3: [["2nd-level Spells", "Access to 2nd-level cleric spell slots and spells."]],
      4: [["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."]],
      5: [["Destroy Undead (CR 1/2)", "Turn Undead can instantly destroy weak undead."], ["3rd-level Spells", "Access to 3rd-level cleric spells."]],
    }),
    buildClass("druid", "Druid", "d8", "WIS 13", ["Light/medium armor (non-metal)", "Shields (non-metal)", "Clubs, daggers, darts, javelins, maces, quarterstaffs, scimitars, sickles, slings, spears"], ["Land", "Moon"], {
      1: [["Druidic", "Learn the secret language of druids."], ["Spellcasting", "Prepare and cast druid spells using Wisdom."]],
      2: [["Wild Shape", "Transform into beasts based on level limitations."], ["Druid Circle", "Choose a druid subclass."]],
      3: [["2nd-level Spells", "Access to 2nd-level druid spells."]],
      4: [["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], ["Wild Shape Improvement", "More movement types/forms become available."]],
      5: [["3rd-level Spells", "Access to 3rd-level druid spells."]],
    }),
    buildClass("fighter", "Fighter", "d10", "STR 13 or DEX 13", ["All armor", "Shields", "Simple/martial weapons"], ["Champion", "Battle Master", "Eldritch Knight"], {
      1: [["Fighting Style", "Choose a combat style that grants a permanent bonus."], ["Second Wind", "Bonus action self-heal once per short rest."]],
      2: [["Action Surge", "Take one additional action on your turn once per short rest."]],
      3: [["Martial Archetype", "Choose a fighter subclass."]],
      4: [["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."]],
      5: [["Extra Attack", "Attack twice with the Attack action."]],
    }),
    buildClass("monk", "Monk", "d8", "DEX 13 and WIS 13", ["Shortswords", "Simple weapons"], ["Open Hand", "Shadow", "Four Elements"], {
      1: [["Unarmored Defense", "AC = 10 + DEX mod + WIS mod while unarmored."], ["Martial Arts", "Use monk weapons/unarmed strikes effectively and bonus strike."]],
      2: [["Ki", "Use ki points for Flurry, Patient Defense, and Step of the Wind."], ["Unarmored Movement", "Gain extra movement speed."]],
      3: [["Monastic Tradition", "Choose a monk subclass."], ["Deflect Missiles", "Reduce ranged weapon damage with reaction."]],
      4: [["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], ["Slow Fall", "Use reaction to reduce falling damage."]],
      5: [["Extra Attack", "Attack twice with the Attack action."], ["Stunning Strike", "Spend ki to force CON save and stun target."], ["Martial Arts Die d6", "Your martial arts damage die increases."]],
    }),
    buildClass("paladin", "Paladin", "d10", "STR 13 and CHA 13", ["All armor", "Shields", "Simple/martial weapons"], ["Devotion", "Ancients", "Vengeance", "Oathbreaker (DMG)"], {
      1: [["Divine Sense", "Detect celestials, fiends, and undead nearby."], ["Lay on Hands", "Healing pool equal to 5 × paladin level."]],
      2: [["Fighting Style", "Choose a combat style bonus."], ["Spellcasting", "Cast paladin spells using Charisma."], ["Divine Smite", "Spend spell slots to add radiant damage on weapon hits."]],
      3: [["Sacred Oath", "Choose your paladin subclass."], ["Divine Health", "Immune to disease."]],
      4: [["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."]],
      5: [["Extra Attack", "Attack twice with the Attack action."]],
    }),
    buildClass("ranger", "Ranger", "d10", "DEX 13 and WIS 13", ["Light/medium armor", "Shields", "Simple/martial weapons"], ["Hunter", "Beast Master"], {
      1: [["Favored Enemy", "Gain tracking and lore benefits against chosen enemy types."], ["Natural Explorer", "Gain exploration bonuses in favored terrain."]],
      2: [["Fighting Style", "Choose a combat style bonus."], ["Spellcasting", "Cast ranger spells using Wisdom."]],
      3: [["Ranger Archetype", "Choose a ranger subclass."], ["Primeval Awareness", "Sense certain creature types using spell slots."]],
      4: [["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."]],
      5: [["Extra Attack", "Attack twice with the Attack action."]],
    }),
    buildClass("rogue", "Rogue", "d8", "DEX 13", ["Light armor", "Simple weapons", "Hand crossbows, longswords, rapiers, shortswords"], ["Thief", "Assassin", "Arcane Trickster"], {
      1: [["Expertise", "Double proficiency bonus in selected proficient skills/tools."], ["Sneak Attack", "Deal bonus damage once per turn when conditions are met."], ["Thieves' Cant", "Learn rogue coded language."]],
      2: [["Cunning Action", "Dash, Disengage, or Hide as a bonus action."]],
      3: [["Roguish Archetype", "Choose a rogue subclass."]],
      4: [["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."]],
      5: [["Uncanny Dodge", "Use reaction to halve damage from one attacker you can see."]],
    }),
    buildClass("sorcerer", "Sorcerer", "d6", "CHA 13", ["Daggers, darts, slings, quarterstaffs, light crossbows"], ["Draconic Bloodline", "Wild Magic"], {
      1: [["Spellcasting", "Cast sorcerer spells using Charisma."], ["Sorcerous Origin", "Choose a sorcerer subclass."]],
      2: [["Font of Magic", "Gain sorcery points to fuel class features and convert slots/points."],
      ],
      3: [["Metamagic", "Modify spell behavior with sorcery points."], ["2nd-level Spells", "Access to 2nd-level sorcerer spells."]],
      4: [["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."]],
      5: [["3rd-level Spells", "Access to 3rd-level sorcerer spells."]],
    }),
    buildClass("warlock", "Warlock", "d8", "CHA 13", ["Light armor", "Simple weapons"], ["Archfey", "Fiend", "Great Old One"], {
      1: [["Otherworldly Patron", "Choose your warlock subclass patron."], ["Pact Magic", "Cast spells using pact slots that refresh on short rest."]],
      2: [["Eldritch Invocations", "Choose magical augmentations with persistent effects."],
      ],
      3: [["Pact Boon", "Choose Pact of the Chain, Blade, or Tome."], ["2nd-level Pact Slots", "Stronger pact spellcasting."]],
      4: [["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."]],
      5: [["3rd-level Pact Slots", "Pact slots scale to 3rd level."], ["Additional Invocation", "Gain another eldritch invocation known."]],
    }),
    buildClass("wizard", "Wizard", "d6", "INT 13", ["Daggers, darts, slings, quarterstaffs, light crossbows"], ["Abjuration", "Conjuration", "Divination", "Enchantment", "Evocation", "Illusion", "Necromancy", "Transmutation"], {
      1: [["Spellcasting", "Prepare and cast wizard spells from your spellbook using Intelligence."], ["Arcane Recovery", "Recover spent spell slots during a short rest once per day."]],
      2: [["Arcane Tradition", "Choose your wizard subclass school."],
      ],
      3: [["2nd-level Spells", "Access to 2nd-level wizard spells."]],
      4: [["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."]],
      5: [["3rd-level Spells", "Access to 3rd-level wizard spells."]],
    }),
  ],
  backgrounds: [
    { id: "acolyte", name: "Acolyte", skills: ["Insight", "Religion"], feature: "Shelter of the Faithful", equipment: ["Holy symbol", "Prayer book", "5 sticks of incense", "Vestments", "15 gp"], bonuses: "No direct ability bonus in core 5e" },
    { id: "soldier", name: "Soldier", skills: ["Athletics", "Intimidation"], feature: "Military Rank", equipment: ["Insignia", "Trophy", "Gaming set", "10 gp"], bonuses: "No direct ability bonus in core 5e" },
    { id: "criminal", name: "Criminal", skills: ["Deception", "Stealth"], feature: "Criminal Contact", equipment: ["Crowbar", "Dark clothes", "15 gp"], bonuses: "No direct ability bonus in core 5e" },
    { id: "sage", name: "Sage", skills: ["Arcana", "History"], feature: "Researcher", equipment: ["Ink", "Quill", "Knife", "Letter", "10 gp"], bonuses: "No direct ability bonus in core 5e" },
  ],
  spells: [], feats: structuredClone(CORE_FEATS), languages: Object.entries(LANGUAGE_DESCRIPTIONS).map(([name, description]) => ({ name, description })),
};

function buildClass(id, name, hitDie, multiclassReq, proficiencies, subclassNames, levels) {
  return {
    id,
    name,
    hitDie,
    multiclassReq,
    proficiencies,
    savingThrows: CLASS_SAVING_THROWS[id] || [],
    skillChoices: CLASS_SKILL_CHOICES[id] || { count: 0, options: [] },
    subclasses: subclassNames.map((sub) => buildSubclass(id, name, sub)),
    levels,
  };
}

function buildSubclass(classId, className, subName) {
  const levels = SUBCLASS_LEVELS[classId] || [3, 6, 10, 14];
  const features = Object.fromEntries(levels.map((lv, idx) => [lv, [[`Subclass Feature - ${subName}`, `${subName} grants ${className} subclass feature ${idx + 1} at level ${lv}.`]]]));
  return { name: subName, description: `${subName} defines a specialized ${className} path with distinct features.`, features };
}

function expandRaceCatalog() {
  BASE_DATA.races.forEach((race) => {
    if (!race.source) race.source = "Player's Handbook (2014)";
    if (!race.rulesEra) race.rulesEra = "2014";
  });
  const seen = new Set(BASE_DATA.races.map((r) => r.id));
  EXPANDED_RACE_INDEX.forEach((entry) => {
    if (seen.has(entry.id)) return;
    BASE_DATA.races.push({
      id: entry.id,
      name: entry.name,
      source: entry.source,
      rulesEra: entry.rulesEra,
      shortDescription: `${entry.name} from ${entry.source}.`,
      maturityAge: "Varies by ancestry",
      lifespan: "Varies by ancestry",
      languages: ["Common"],
      skills: ["No automatic race skill proficiency"],
      features: ["Racial Traits"],
      racialAbilities: {},
      lockedContent: false,
    });
  });
}

const COMPLETE_RACE_DETAILS = {
  "aarakocra": { maturityAge: "3 years", lifespan: "Up to 30 years", languages: ["Common", "Auran"], skills: ["No automatic race skill proficiency"], features: ["Flight", "Talons", "Wind Caller"], abilityScoreRule: "fixed", racialAbilities: { DEX: 2, WIS: 1 }, shortDescription: "Birdfolk of the Elemental Plane of Air built for speed and flight." },
  "aasimar-vgm": { maturityAge: "Matures as humans", lifespan: "Up to 160 years", languages: ["Common", "Celestial"], skills: ["No automatic race skill proficiency"], features: ["Darkvision", "Celestial Resistance", "Healing Hands", "Light Bearer", "Celestial Revelation"], abilityScoreRule: "fixed", racialAbilities: { CHA: 2 }, shortDescription: "Celestial-touched mortals whose inner radiance manifests as divine gifts." },
  "astral-elf": { maturityAge: "About 100 years", lifespan: "Can exceed 750 years", languages: ["Common", "Elvish", "One extra language"], skills: ["No automatic race skill proficiency"], features: ["Astral Trance", "Darkvision", "Fey Ancestry", "Keen Senses", "Starlight Step", "Astral Fire"], abilityScoreRule: "choose2plus1", shortDescription: "Spacefaring elves shaped by timeless life in the Astral Sea." },
  "autognome": { maturityAge: "Built adult", lifespan: "Potentially centuries with repair", languages: ["Common", "Gnomish", "One extra language"], skills: ["No automatic race skill proficiency"], features: ["Armored Casing", "Built for Success", "Healing Machine", "Mechanical Nature", "Sentry's Rest"], abilityScoreRule: "choose2plus1", shortDescription: "Clockwork gnomish constructs with self-maintenance and robust defenses." },
  "bugbear": { maturityAge: "About 16 years", lifespan: "Up to 80 years", languages: ["Common", "Goblin", "One extra language"], skills: ["Stealth proficiency"], features: ["Darkvision", "Long-Limbed", "Powerful Build", "Sneaky", "Surprise Attack"], abilityScoreRule: "choose2plus1", shortDescription: "Long-armed ambushers who hit hard from the shadows." },
  "changeling": { maturityAge: "Matures as humans", lifespan: "Around 80 years", languages: ["Common", "Two extra languages"], skills: ["Two skill proficiencies of your choice"], features: ["Shapechanger", "Changeling Instincts", "Unsettling Visage"], abilityScoreRule: "fixed", racialAbilities: { CHA: 2, DEX: 1 }, shortDescription: "Social chameleons able to shift appearance and persona." },
  "kalashtar": { maturityAge: "Matures as humans", lifespan: "About 100 years", languages: ["Common", "Quori", "One extra language"], skills: ["No automatic race skill proficiency"], features: ["Dual Mind", "Mental Discipline", "Mind Link", "Severed from Dreams"], abilityScoreRule: "fixed", racialAbilities: { WIS: 2, CHA: 1 }, shortDescription: "People bonded to quori spirits with exceptional psychic poise." },
  "shifter": { maturityAge: "Around 10 years", lifespan: "About 70 years", languages: ["Common"], skills: ["One skill proficiency tied to your shifter lineage"], features: ["Darkvision", "Shifting", "Bestial Instincts", "Lineage Trait"], abilityScoreRule: "fixed", racialAbilities: { DEX: 1 }, shortDescription: "Primal descendants who briefly assume feral traits in battle." },
  "warforged": { maturityAge: "Built adult", lifespan: "No known maximum", languages: ["Common", "One extra language"], skills: ["One skill and one tool proficiency"], features: ["Constructed Resilience", "Integrated Protection", "Sentry's Rest", "Specialized Design"], abilityScoreRule: "fixed", racialAbilities: { CON: 2, STR: 1 }, shortDescription: "Sentient constructs originally forged for war and now forging purpose." },
  "fairy": { maturityAge: "Around 20 years", lifespan: "About a century", languages: ["Common", "Sylvan"], skills: ["No automatic race skill proficiency"], features: ["Fairy Magic", "Flight", "Fey Passage"], abilityScoreRule: "choose2plus1", shortDescription: "Tiny fey folk with innate magic and nimble wings." },
  "firbolg": { maturityAge: "About 30 years", lifespan: "Up to 500 years", languages: ["Common", "Elvish", "Giant"], skills: ["No automatic race skill proficiency"], features: ["Firbolg Magic", "Hidden Step", "Powerful Build", "Speech of Beast and Leaf"], abilityScoreRule: "choose2plus1", shortDescription: "Reserved giant-kin who blend druidic magic with quiet strength." },
  "githyanki": { maturityAge: "Late teens", lifespan: "About a century", languages: ["Common", "Gith"], skills: ["One skill/tool proficiency from Astral Knowledge"], features: ["Astral Knowledge", "Martial Prodigy", "Psionic Leap", "Githyanki Psionics"], abilityScoreRule: "fixed", racialAbilities: { STR: 2, INT: 1 }, shortDescription: "Astral raiders combining martial training with psionics." },
  "githzerai": { maturityAge: "Late teens", lifespan: "About a century", languages: ["Common", "Gith"], skills: ["No automatic race skill proficiency"], features: ["Mental Discipline", "Psychic Resilience", "Githzerai Psionics"], abilityScoreRule: "fixed", racialAbilities: { WIS: 2, INT: 1 }, shortDescription: "Monastic psions focused on discipline and mental defense." },
  "goblin": { maturityAge: "About 8 years", lifespan: "Up to 60 years", languages: ["Common", "Goblin", "One extra language"], skills: ["No automatic race skill proficiency"], features: ["Darkvision", "Fey Ancestry", "Fury of the Small", "Nimble Escape"], abilityScoreRule: "choose2plus1", shortDescription: "Quick and cunning skirmishers with fey-touched luck." },
  "harengon": { maturityAge: "About 20 years", lifespan: "About a century", languages: ["Common", "One extra language"], skills: ["Perception proficiency"], features: ["Hare-Trigger", "Leporine Senses", "Lucky Footwork", "Rabbit Hop"], abilityScoreRule: "choose2plus1", shortDescription: "Rabbitfolk wanderers famous for alert instincts and sudden bursts of movement." },
  "hobgoblin": { maturityAge: "About 20 years", lifespan: "About a century", languages: ["Common", "Goblin", "One extra language"], skills: ["No automatic race skill proficiency"], features: ["Darkvision", "Fey Ancestry", "Fey Gift", "Fortune from the Many"], abilityScoreRule: "choose2plus1", shortDescription: "Disciplined tacticians who empower allies through coordinated support." },
  "kenku": { maturityAge: "Around 12 years", lifespan: "About 60 years", languages: ["Common", "Auran", "One extra language"], skills: ["Two skill proficiencies of your choice"], features: ["Expert Duplication", "Kenku Recall", "Mimicry"], abilityScoreRule: "choose2plus1", shortDescription: "Mimic-talented avians with superb memory and learned craft." },
  "kobold": { maturityAge: "Around 6 years", lifespan: "About 120 years", languages: ["Common", "Draconic", "One extra language"], skills: ["No automatic race skill proficiency"], features: ["Darkvision", "Draconic Cry", "Kobold Legacy"], abilityScoreRule: "choose2plus1", shortDescription: "Small draconic tunnelers who thrive through teamwork and guile." },
  "lizardfolk": { maturityAge: "Around 14 years", lifespan: "Up to 60 years", languages: ["Common", "Draconic", "One extra language"], skills: ["Two skills from Animal Handling, Nature, Perception, Stealth, Survival"], features: ["Bite", "Hold Breath", "Hungry Jaws", "Natural Armor"], abilityScoreRule: "choose2plus1", shortDescription: "Hardy reptilian survivors defined by practical instincts." },
  "orc": { maturityAge: "Around 12 years", lifespan: "Up to 80 years", languages: ["Common", "Orc", "One extra language"], skills: ["No automatic race skill proficiency"], features: ["Adrenaline Rush", "Darkvision", "Powerful Build", "Relentless Endurance"], abilityScoreRule: "choose2plus1", shortDescription: "Relentless warriors with explosive momentum and stamina." },
  "satyr": { maturityAge: "Matures as humans", lifespan: "About 100 years", languages: ["Common", "Sylvan"], skills: ["Performance proficiency", "Persuasion proficiency"], features: ["Mirthful Leaps", "Magic Resistance", "Ram", "Reveler"], abilityScoreRule: "fixed", racialAbilities: { CHA: 2, DEX: 1 }, shortDescription: "Fey revelers who mix charm, agility, and supernatural luck." },
  "tabaxi": { maturityAge: "Around 18 years", lifespan: "About 80 years", languages: ["Common", "One extra language"], skills: ["Perception proficiency", "Stealth proficiency"], features: ["Darkvision", "Cat's Claws", "Cat's Talent", "Feline Agility"], abilityScoreRule: "choose2plus1", shortDescription: "Curious feline explorers known for speed and graceful movement." },
  "tortle": { maturityAge: "Around 15 years", lifespan: "About 50 years", languages: ["Common", "Aquan"], skills: ["Survival proficiency"], features: ["Claws", "Hold Breath", "Natural Armor", "Shell Defense"], abilityScoreRule: "choose2plus1", shortDescription: "Nomadic shelled folk with strong natural protection." },
  "triton": { maturityAge: "Around 15 years", lifespan: "Around 200 years", languages: ["Common", "Primordial", "One extra language"], skills: ["No automatic race skill proficiency"], features: ["Amphibious", "Control Air and Water", "Darkvision", "Emissary of the Sea", "Guardian of the Depths"], abilityScoreRule: "choose2plus1", shortDescription: "Sea guardians with innate command over ocean and storm." },
  "yuan-ti": { maturityAge: "Matures as humans", lifespan: "Longer than humans", languages: ["Common", "Abyssal", "Draconic"], skills: ["No automatic race skill proficiency"], features: ["Darkvision", "Magic Resistance", "Poison Resilience", "Serpentine Spellcasting"], abilityScoreRule: "choose2plus1", shortDescription: "Serpentine inheritors of ancient magic and poisonous resilience." },
  "leonin": { maturityAge: "Matures as humans", lifespan: "About 100 years", languages: ["Common", "Leonin"], skills: ["Athletics proficiency", "Perception proficiency"], features: ["Claws", "Daunting Roar", "Darkvision", "Hunter's Instincts"], abilityScoreRule: "fixed", racialAbilities: { CON: 2, STR: 1 }, shortDescription: "Proud lionfolk champions of personal glory and might." },
  "owlin": { maturityAge: "Around 20 years", lifespan: "About a century", languages: ["Common", "One extra language"], skills: ["Stealth proficiency"], features: ["Darkvision", "Flight", "Silent Feathers"], abilityScoreRule: "choose2plus1", shortDescription: "Nocturnal owlfolk able to fly silently through darkness." },
  "reborn": { maturityAge: "Depends on original ancestry", lifespan: "Potentially ageless", languages: ["Common", "One extra language"], skills: ["No automatic race skill proficiency"], features: ["Ancestral Legacy", "Deathless Nature", "Knowledge from a Past Life"], abilityScoreRule: "choose2plus1", shortDescription: "Reconstructed beings animated by magic, alchemy, or obsession." },
  "dhampir": { maturityAge: "Depends on original ancestry", lifespan: "Potentially ageless", languages: ["Common", "One extra language"], skills: ["No automatic race skill proficiency"], features: ["Ancestral Legacy", "Darkvision", "Deathless Nature", "Spider Climb", "Vampiric Bite"], abilityScoreRule: "choose2plus1", shortDescription: "Blood-hungry lineages balancing mortal will and undead hunger." },
  "hexblood": { maturityAge: "Depends on original ancestry", lifespan: "Potentially extended by magic", languages: ["Common", "One extra language"], skills: ["No automatic race skill proficiency"], features: ["Ancestral Legacy", "Darkvision", "Eerie Token", "Hex Magic"], abilityScoreRule: "choose2plus1", shortDescription: "Fey-cursed heirs marked by occult tokens and witchcraft." },
  "kender": { maturityAge: "Around 20 years", lifespan: "Around 100 years", languages: ["Common", "Kenderspeak"], skills: ["Insight proficiency", "Sleight of Hand proficiency"], features: ["Fearless", "Kender Curiosity", "Taunt"], abilityScoreRule: "choose2plus1", shortDescription: "Curious wanderers with fearless hearts and distracting wit." },
  "plasmoid": { maturityAge: "Around 20 years", lifespan: "About a century", languages: ["Common", "One extra language"], skills: ["No automatic race skill proficiency"], features: ["Amorphous", "Darkvision", "Natural Resilience", "Shape Self"], abilityScoreRule: "choose2plus1", shortDescription: "Amorphous ooze-folk able to reshape and compress their bodies." },
  "thri-kreen": { maturityAge: "Around 3 years", lifespan: "About 30 years", languages: ["Common", "Thri-kreen"], skills: ["No automatic race skill proficiency"], features: ["Chameleon Carapace", "Darkvision", "Secondary Arms", "Sleepless Reverie", "Thri-kreen Telepathy"], abilityScoreRule: "choose2plus1", shortDescription: "Insectoid nomads with extra arms and tireless perception." },
  "hadozee": { maturityAge: "Around 18 years", lifespan: "About 80 years", languages: ["Common", "One extra language"], skills: ["No automatic race skill proficiency"], features: ["Dexterous Feet", "Glide", "Hadozee Dodge"], abilityScoreRule: "choose2plus1", shortDescription: "Gliding voidfarers skilled at climbing rigging and surviving falls." },
  "giff": { maturityAge: "Around 20 years", lifespan: "About 100 years", languages: ["Common", "One extra language"], skills: ["No automatic race skill proficiency"], features: ["Astral Spark", "Firearms Mastery", "Hippo Build"], abilityScoreRule: "choose2plus1", shortDescription: "Militant spacefaring mercenaries with explosive weapon discipline." },
  "human-2024": { maturityAge: "Late teens", lifespan: "Less than a century", languages: ["Common", "One extra language"], skills: ["No automatic race skill proficiency"], features: ["Resourceful", "Versatile"], abilityScoreRule: "choose2plus1", shortDescription: "Adaptable people with broad talents and fast ambition." },
  "dwarf-2024": { maturityAge: "Around 50 years", lifespan: "Around 350 years", languages: ["Common", "Dwarvish"], skills: ["No automatic race skill proficiency"], features: ["Darkvision", "Dwarven Resilience", "Stonecunning", "Dwarven Toughness"], abilityScoreRule: "choose2plus1", shortDescription: "Stone-hearted survivors renowned for endurance and craft." },
  "elf-2024": { maturityAge: "Around 100 years", lifespan: "Around 750 years", languages: ["Common", "Elvish"], skills: ["Perception proficiency"], features: ["Darkvision", "Fey Ancestry", "Keen Senses", "Trance"], abilityScoreRule: "choose2plus1", shortDescription: "Long-lived fey descendants with grace, senses, and magical poise." },
  "halfling-2024": { maturityAge: "Around 20 years", lifespan: "Around 150 years", languages: ["Common", "Halfling"], skills: ["No automatic race skill proficiency"], features: ["Brave", "Halfling Nimbleness", "Luck"], abilityScoreRule: "choose2plus1", shortDescription: "Small folk whose courage and luck keep them safe." },
  "gnome-2024": { maturityAge: "Around 40 years", lifespan: "350 to 500 years", languages: ["Common", "Gnomish"], skills: ["No automatic race skill proficiency"], features: ["Darkvision", "Gnome Cunning", "Gnomish Lineage"], abilityScoreRule: "choose2plus1", shortDescription: "Inventive tricksters with durable magical resistance." },
  "dragonborn-2024": { maturityAge: "Around 15 years", lifespan: "Around 80 years", languages: ["Common", "Draconic"], skills: ["No automatic race skill proficiency"], features: ["Draconic Ancestry", "Breath Weapon", "Damage Resistance", "Draconic Flight"], abilityScoreRule: "choose2plus1", shortDescription: "Dragon-descended heroes with scalable breath and ancestry powers." },
  "orc-2024": { maturityAge: "Around 12 years", lifespan: "Up to 80 years", languages: ["Common", "Orc"], skills: ["No automatic race skill proficiency"], features: ["Adrenaline Rush", "Darkvision", "Relentless Endurance"], abilityScoreRule: "choose2plus1", shortDescription: "Hardy warriors with explosive movement and hard-to-kill grit." },
  "tiefling-2024": { maturityAge: "Matures as humans", lifespan: "Slightly longer than humans", languages: ["Common", "Infernal"], skills: ["No automatic race skill proficiency"], features: ["Darkvision", "Fiendish Legacy", "Otherworldly Presence"], abilityScoreRule: "choose2plus1", shortDescription: "Fiend-touched lineages inheriting infernal, abyssal, or chthonic magic." },
  "goliath-2024": { maturityAge: "Late teens", lifespan: "Up to 120 years", languages: ["Common", "Giant"], skills: ["Athletics proficiency"], features: ["Large Form", "Powerful Build", "Giant Ancestry"], abilityScoreRule: "choose2plus1", shortDescription: "Towering giant-kin who channel ancient giant lineages." },
  "aasimar-2024": { maturityAge: "Matures as humans", lifespan: "Up to 160 years", languages: ["Common", "Celestial"], skills: ["No automatic race skill proficiency"], features: ["Darkvision", "Celestial Resistance", "Healing Hands", "Light Bearer", "Celestial Revelation"], abilityScoreRule: "choose2plus1", shortDescription: "Celestial descendants whose radiant form awakens at higher levels." },
  "critical-role-pallid": { maturityAge: "Around 100 years", lifespan: "Around 750 years", languages: ["Common", "Elvish"], skills: ["Perception proficiency", "Insight proficiency"], features: ["Blessing of the Moon Weaver", "Darkvision", "Fey Ancestry", "Keen Senses"], abilityScoreRule: "fixed", racialAbilities: { DEX: 2, WIS: 1 }, shortDescription: "Twilight-adapted elves from Wildemount with moon-warded instincts." },
  "tal-dorei-luxonborn": { maturityAge: "Matures as humans", lifespan: "About 100 years", languages: ["Common", "One extra language"], skills: ["No automatic race skill proficiency"], features: ["Luxon Spark", "Radiant Burst", "Dunamantic Echo"], abilityScoreRule: "choose2plus1", shortDescription: "Dunamancy-touched lineages tied to Luxon's cyclical mysteries." },
  "glitchling": { maturityAge: "Built adult", lifespan: "Unknown; potentially unbounded", languages: ["Common", "One extra language"], skills: ["Arcana proficiency"], features: ["Glitch Body", "Living Data", "Recursive Memory"], abilityScoreRule: "choose2plus1", shortDescription: "Planar digital beings that intermittently desync from reality." },
  "ghostfire-lumin": { maturityAge: "Around 20 years", lifespan: "About 120 years", languages: ["Common", "Celestial"], skills: ["Religion proficiency"], features: ["Luminous Aura", "Radiant Spark", "Warding Glow"], abilityScoreRule: "choose2plus1", shortDescription: "Partner-content luminous ancestry focused on radiant warding magic." },
  "drakkenheim-draconic": { maturityAge: "Around 15 years", lifespan: "Around 90 years", languages: ["Common", "Draconic"], skills: ["Intimidation proficiency"], features: ["Draconic Aspect", "Elemental Breath", "Scaled Resilience"], abilityScoreRule: "choose2plus1", shortDescription: "Partner-content draconic lineage emphasizing breath and scaled defense." },
};

function applyRaceCompletionPass() {
  BASE_DATA.races.forEach((race) => {
    const detail = COMPLETE_RACE_DETAILS[race.id];
    if (!detail) return;
    Object.assign(race, detail);
  });
}

function applyBookDataBatches() {
  const raceById = new Map(BASE_DATA.races.map((r) => [r.id, r]));
  const classByIdMap = new Map(BASE_DATA.classes.map((c) => [c.id, c]));
  const featById = new Map(BASE_DATA.feats.map((f) => [f.id, f]));

  BOOK_DATA_BATCHES.forEach((batch) => {
    (batch.races || []).forEach((incoming) => {
      const target = raceById.get(incoming.id);
      if (!target) return;
      Object.assign(target, incoming);
      target.source = target.source || batch.book;
      target.book = batch.book;
      if (!target.rulesEra) target.rulesEra = "2014";
      if (!target.abilityScoreRule) target.abilityScoreRule = target.rulesEra === "2024" ? "choose2plus1" : "fixed";
    });

    (batch.classes || []).forEach((incoming) => {
      const cls = classByIdMap.get(incoming.id);
      if (!cls) return;
      if (incoming.description) cls.description = incoming.description;
      if (incoming.proficiencies) cls.proficiencies = incoming.proficiencies;
      if (incoming.levels) {
        cls.levels = cls.levels || {};
        Object.entries(incoming.levels).forEach(([level, features]) => {
          cls.levels[level] = features;
        });
      }
    });

    (batch.subclasses || []).forEach((incoming) => {
      const cls = classByIdMap.get(incoming.classId);
      if (!cls) return;
      cls.subclasses = cls.subclasses || [];
      const found = cls.subclasses.find((s) => s.name === incoming.name);
      if (!found) {
        cls.subclasses.push({ name: incoming.name, description: incoming.description || "", features: incoming.features || {} });
        return;
      }
      if (incoming.description) found.description = incoming.description;
      if (incoming.features) {
        found.features = found.features || {};
        Object.entries(incoming.features).forEach(([level, features]) => {
          found.features[level] = features;
        });
      }
    });

    (batch.feats || []).forEach((incoming) => {
      const id = incoming.id || incoming.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const found = featById.get(id);
      if (found) {
        Object.assign(found, incoming, { id });
      } else {
        const feat = { id, ...incoming };
        BASE_DATA.feats.push(feat);
        featById.set(id, feat);
      }
    });
  });
}

function ensureClassLevelsTo20() {
  const classMilestones = {
    barbarian: { 6: ["Path Feature", "Your Primal Path grants a new defining feature."], 7: ["Feral Instinct", "Advantage on initiative and better reaction when surprised."], 8: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 9: ["Brutal Critical (1 die)", "Roll one extra weapon die on critical hits."], 10: ["Path Feature", "Another Primal Path feature unlocks."], 11: ["Relentless Rage", "Make CON save to stay at 1 HP instead of 0 while raging."], 12: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 13: ["Brutal Critical (2 dice)", "Roll two extra weapon dice on critical hits."], 14: ["Path Feature", "Late-path feature improves your subclass identity."], 15: ["Persistent Rage", "Your rage only ends early under stricter conditions."], 16: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 17: ["Brutal Critical (3 dice)", "Roll three extra weapon dice on critical hits."], 18: ["Indomitable Might", "Use Strength score as minimum on STR checks."], 19: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 20: ["Primal Champion", "STR and CON increase by 4; max for both becomes 24."] },
    bard: { 6: ["Countercharm", "Use performance to protect allies from fear/charm."], 7: ["4th-level Spells", "Access to 4th-level bard spells."], 8: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 9: ["Song of Rest d8", "Song of Rest die improves."], 10: ["Magical Secrets", "Learn spells from any class list."], 11: ["6th-level Spells", "Access to 6th-level bard spells."], 12: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 13: ["Song of Rest d10", "Song of Rest die improves again."], 14: ["Magical Secrets", "Gain additional off-list spells."], 15: ["8th-level Spells", "Access to 8th-level bard spells."], 16: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 17: ["Song of Rest d12", "Song of Rest die reaches d12."], 18: ["Magical Secrets", "Final broad spell access bump."], 19: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 20: ["Superior Inspiration", "Regain one Bardic Inspiration if none at initiative."] },
    cleric: { 6: ["Channel Divinity (2/rest)", "Use Channel Divinity twice between rests."], 7: ["4th-level Spells", "Access to 4th-level cleric spells."], 8: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 9: ["5th-level Spells", "Access to 5th-level cleric spells."], 10: ["Divine Intervention", "Call directly on your deity for miraculous aid."], 11: ["6th-level Spells", "Access to 6th-level cleric spells."], 12: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 13: ["7th-level Spells", "Access to 7th-level cleric spells."], 14: ["Destroy Undead (CR 2)", "Turn Undead destroys stronger undead."], 15: ["8th-level Spells", "Access to 8th-level cleric spells."], 16: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 17: ["9th-level Spells", "Access to 9th-level cleric spells."], 18: ["Channel Divinity (3/rest)", "Third use between rests."], 19: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 20: ["Divine Intervention Improvement", "Divine Intervention succeeds automatically."] },
    druid: { 6: ["Circle Feature", "Gain the subclass feature listed for this level in your selected subclass."], 7: ["4th-level Spells", "Access to 4th-level druid spells."], 8: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 9: ["5th-level Spells", "Access to 5th-level druid spells."], 10: ["Circle Feature", "Gain the subclass feature listed for this level in your selected subclass."], 11: ["6th-level Spells", "Access to 6th-level druid spells."], 12: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 13: ["7th-level Spells", "Access to 7th-level druid spells."], 14: ["Circle Feature", "Gain the subclass feature listed for this level in your selected subclass."], 15: ["8th-level Spells", "Access to 8th-level druid spells."], 16: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 17: ["9th-level Spells", "Access to 9th-level druid spells."], 18: ["Timeless Body", "Aging slows dramatically."], 19: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 20: ["Archdruid", "Unlimited Wild Shape uses."] },
    fighter: { 6: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 7: ["Archetype Feature", "Gain the subclass feature listed for this level in your selected subclass."], 8: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 9: ["Indomitable (1)", "Reroll a failed saving throw once per long rest."], 10: ["Archetype Feature", "Gain the subclass feature listed for this level in your selected subclass."], 11: ["Extra Attack (2)", "Attack three times when taking Attack action."], 12: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 13: ["Indomitable (2)", "Second use of Indomitable."], 14: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 15: ["Archetype Feature", "Gain the subclass feature listed for this level in your selected subclass."], 16: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 17: ["Action Surge (2)", "Two Action Surge uses between rests."], 18: ["Archetype Feature", "Gain the subclass feature listed for this level in your selected subclass."], 19: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 20: ["Extra Attack (3)", "Attack four times when taking Attack action."] },
    monk: { 6: ["Ki-Empowered Strikes", "Unarmed strikes count as magical."], 7: ["Evasion", "Take no damage on successful DEX save effects."], 8: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 9: ["Unarmored Movement Improvement", "Move along vertical surfaces and liquids while moving."], 10: ["Purity of Body", "Immune to disease and poison."], 11: ["Monastic Feature", "Gain the subclass feature listed for this level in your selected subclass."], 12: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 13: ["Tongue of Sun and Moon", "Communicate with any creature that understands a language."], 14: ["Diamond Soul", "Proficiency in all saves and ki rerolls."], 15: ["Timeless Body", "You no longer suffer frailty of old age."], 16: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 17: ["Monastic Feature", "You gain a high-level feature from your chosen subclass."], 18: ["Empty Body", "Powerful invisibility/astral projection options."], 19: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 20: ["Perfect Self", "Regain ki at initiative if empty."] },
    paladin: { 6: ["Aura of Protection", "Add CHA bonus to saving throws for you and nearby allies."], 7: ["Sacred Oath Feature", "Subclass aura/feature progression."], 8: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 9: ["3rd-level Spells", "Access to 3rd-level paladin spells."], 10: ["Aura of Courage", "You and allies near you are immune to frightened."], 11: ["Improved Divine Smite", "Each melee weapon hit gains extra radiant damage."], 12: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 13: ["4th-level Spells", "Access to 4th-level paladin spells."], 14: ["Cleansing Touch", "End spells on yourself or willing creatures."], 15: ["Sacred Oath Feature", "Gain the subclass feature listed for this level in your selected subclass."], 16: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 17: ["5th-level Spells", "Access to 5th-level paladin spells."], 18: ["Aura Improvements", "Aura range increases."], 19: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 20: ["Sacred Oath Capstone", "You gain the capstone feature from your chosen subclass."] },
    ranger: { 6: ["Favored Enemy Improvement", "Additional favored enemy and language benefit."], 7: ["Archetype Feature", "Gain the subclass feature listed for this level in your selected subclass."], 8: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 9: ["3rd-level Spells", "Access to 3rd-level ranger spells."], 10: ["Hide in Plain Sight", "Create camouflage for stealth while stationary."], 11: ["Archetype Feature", "Gain the subclass feature listed for this level in your selected subclass."], 12: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 13: ["4th-level Spells", "Access to 4th-level ranger spells."], 14: ["Vanish", "Hide as bonus action; nonmagical tracking is harder."], 15: ["Archetype Feature", "Gain the subclass feature listed for this level in your selected subclass."], 16: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 17: ["5th-level Spells", "Access to 5th-level ranger spells."], 18: ["Feral Senses", "Detect nearby unseen creatures."], 19: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 20: ["Foe Slayer", "Add WIS modifier to attack/damage once per turn vs favored enemies."] },
    rogue: { 6: ["Expertise", "Gain two more expertise choices."], 7: ["Evasion", "No damage on successful DEX save effects."], 8: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 9: ["Archetype Feature", "Gain the subclass feature listed for this level in your selected subclass."], 10: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 11: ["Reliable Talent", "Treat low d20 rolls as 10 on proficient checks."], 12: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 13: ["Archetype Feature", "Gain the subclass feature listed for this level in your selected subclass."], 14: ["Blindsense", "Sense hidden or invisible creatures nearby."], 15: ["Slippery Mind", "Gain proficiency in Wisdom saving throws."], 16: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 17: ["Archetype Feature", "Gain the subclass feature listed for this level in your selected subclass."], 18: ["Elusive", "No attack roll has advantage against you unless incapacitated."], 19: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 20: ["Stroke of Luck", "Turn a miss into a hit or a failed check into a 20."] },
    sorcerer: { 6: ["Origin Feature", "Gain the subclass feature listed for this level in your selected subclass."], 7: ["4th-level Spells", "Access to 4th-level sorcerer spells."], 8: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 9: ["5th-level Spells", "Access to 5th-level sorcerer spells."], 10: ["Metamagic", "Gain an additional Metamagic option."], 11: ["6th-level Spells", "Access to 6th-level sorcerer spells."], 12: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 13: ["7th-level Spells", "Access to 7th-level sorcerer spells."], 14: ["Origin Feature", "Gain the subclass feature listed for this level in your selected subclass."], 15: ["8th-level Spells", "Access to 8th-level sorcerer spells."], 16: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 17: ["9th-level Spells", "Access to 9th-level sorcerer spells."], 18: ["Origin Feature", "Gain the subclass feature listed for this level in your selected subclass."], 19: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 20: ["Sorcerous Restoration", "Regain sorcery points after short rest."] },
    warlock: { 6: ["Patron Feature", "Gain the subclass feature listed for this level in your selected subclass."], 7: ["4th-level Pact Slots", "Pact slots become 4th level."], 8: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 9: ["5th-level Pact Slots", "Pact slots become 5th level."], 10: ["Patron Feature", "Gain the subclass feature listed for this level in your selected subclass."], 11: ["Mystic Arcanum (6th)", "One 6th-level spell known and cast once per long rest."], 12: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 13: ["Mystic Arcanum (7th)", "One 7th-level spell known and cast once per long rest."], 14: ["Patron Feature", "Gain the subclass feature listed for this level in your selected subclass."], 15: ["Mystic Arcanum (8th)", "One 8th-level spell known and cast once per long rest."], 16: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 17: ["Mystic Arcanum (9th)", "One 9th-level spell known and cast once per long rest."], 18: ["Invocation", "Gain one additional eldritch invocation."], 19: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 20: ["Eldritch Master", "Recover pact slots by spending 1 minute entreating patron."] },
    wizard: { 6: ["Tradition Feature", "Gain the subclass feature listed for this level in your selected subclass."], 7: ["4th-level Spells", "Access to 4th-level wizard spells."], 8: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 9: ["5th-level Spells", "Access to 5th-level wizard spells."], 10: ["Tradition Feature", "Gain the subclass feature listed for this level in your selected subclass."], 11: ["6th-level Spells", "Access to 6th-level wizard spells."], 12: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 13: ["7th-level Spells", "Access to 7th-level wizard spells."], 14: ["Tradition Feature", "Gain the subclass feature listed for this level in your selected subclass."], 15: ["8th-level Spells", "Access to 8th-level wizard spells."], 16: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 17: ["9th-level Spells", "Access to 9th-level wizard spells."], 18: ["Spell Mastery", "Choose low-level spells to cast at-will without slots."], 19: ["Ability Score Improvement", "Increase one ability score by 2, increase two ability scores by 1 each, or take a feat."], 20: ["Signature Spells", "Two chosen 3rd-level spells are always prepared and easier to cast."] },
  };

  BASE_DATA.classes.forEach((cls) => {
    if (!cls.levels) cls.levels = {};
    for (let level = 1; level <= 20; level += 1) {
      if (!cls.levels[level]) cls.levels[level] = [];
      const m = classMilestones[cls.id]?.[level];
      if (m && cls.levels[level].length === 0) cls.levels[level].push(m);
      if (cls.levels[level].length === 0) cls.levels[level].push(["Class Feature", `${cls.name} gains an additional class feature at this level.`]);
    }
  });
}


function normalizeRacePlaceholderText() {
  BASE_DATA.races.forEach((race) => {
    if (race.maturityAge === "Varies by lineage" || race.maturityAge === "Varies by ancestry") race.maturityAge = "Depends on race lineage details";
    if (race.lifespan === "Varies by lineage" || race.lifespan === "Varies by ancestry") race.lifespan = "Depends on race lineage details";

    race.skills = toArray(race.skills).map((skill) => (skill === "Lineage-dependent proficiencies"
      ? "No automatic race skill proficiency"
      : skill));

    const features = toArray(race.features).map((feature) => (feature === "Lineage Traits"
      ? "Racial Traits"
      : feature));
    race.features = features.length ? features : ["Racial Traits"];
  });
}


ensureClassLevelsTo20();
expandRaceCatalog();
applyBookDataBatches();
normalizeRacePlaceholderText();
applyRaceCompletionPass();

const state = {
  step: "race",
  customOpen: false,
  data: structuredClone(BASE_DATA),
  character: {
    name: "",
    raceId: BASE_DATA.races[0].id,
    raceChoices: {},
    classPlan: { primaryClassId: BASE_DATA.classes[0].id, subclassByClass: {}, levelsByClass: {}, advancements: {}, skillPicksByClass: {} },
    originAbilityBonuses: { STR: 0, DEX: 0, CON: 0, INT: 0, WIS: 0, CHA: 0 },
    abilities: { STR: 8, DEX: 8, CON: 8, INT: 8, WIS: 8, CHA: 8 },
    backgroundId: BASE_DATA.backgrounds[0].id,
  },
  custom: { submitted: [], editingId: null },
  multiclassOpen: false,
  abilityMethod: "pointBuy",
  rolled: { slots: [null, null, null, null, null, null] },
  hoverTimer: null,
};

const els = mapEls();
bindEvents();
renderAll();

function mapEls() {
  return {
    stepper: byId("stepper"), customPage: byId("custom-page"), openCustom: byId("open-custom"), closeCustom: byId("close-custom"),
    importCustom: byId("import-custom"), exportCustom: byId("export-custom"), importCustomFile: byId("import-custom-file"),
    submittedItems: byId("submitted-items"), customType: byId("custom-type"), customStatus: byId("custom-status"), clearCustom: byId("clear-custom"), submitCustom: byId("submit-custom"), applyCustom: byId("apply-custom"),
    quickfillBox: byId("quickfill-box"), tooltip: byId("hover-tooltip"),
    panels: { race: byId("step-race"), class: byId("step-class"), abilities: byId("step-abilities"), background: byId("step-background"), summary: byId("step-summary") },
    raceOptions: byId("race-options"), raceDetails: byId("race-details"), raceOptionConfig: byId("race-option-config"),
    startingClassSetup: byId("starting-class-setup"), classOptions: byId("class-options"), classConfigPanel: byId("class-config-panel"), classValidation: byId("class-validation"),
    totalLevel: byId("total-level"), classLevelBreakdown: byId("class-level-breakdown"), classFeatureTimeline: byId("class-feature-timeline"),
    toggleMulticlass: byId("toggle-multiclass"), multiclassList: byId("multiclass-list"),
    characterName: byId("character-name"), abilityMethod: byId("ability-method"), originAsiPanel: byId("origin-asi-panel"), rolledPanel: byId("rolled-panel"), rollButtons: byId("roll-buttons"), rolledAssign: byId("rolled-assign"), resetRolls: byId("reset-rolls"), abilitiesGrid: byId("abilities-grid"), pointBuyStatus: byId("point-buy-status"),
    backgroundOptions: byId("background-options"), backgroundDetails: byId("background-details"), characterSheet: byId("character-sheet"),
  };
}

function bindEvents() {
  els.openCustom.addEventListener("click", () => { state.customOpen = true; renderAll(); });
  els.closeCustom.addEventListener("click", () => { state.customOpen = false; renderAll(); });
  els.importCustom.addEventListener("click", () => els.importCustomFile.click());
  els.importCustomFile.addEventListener("change", importCustomData);
  els.exportCustom.addEventListener("click", exportCustomData);
  els.customType.addEventListener("change", renderCustomFieldsByType);
  els.clearCustom.addEventListener("click", clearCustomEditor);
  els.submitCustom.addEventListener("click", submitCustomItem);
  els.applyCustom.addEventListener("click", () => { applyCustomDataToBuilder(); state.customOpen = false; renderAll(); });

  document.querySelectorAll(".quickfill").forEach((input) => {
    input.addEventListener("input", () => showQuickFill(input));
    input.addEventListener("blur", () => setTimeout(hideQuickFill, 120));
  });

  document.addEventListener("mouseover", handleDescriptionHover);
  document.addEventListener("mouseout", hideTooltip);

  byId("confirm-race").addEventListener("click", () => goStep("class"));
  byId("back-to-race").addEventListener("click", () => goStep("race"));
  byId("confirm-class").addEventListener("click", confirmStartingClass);
  byId("confirm-class-levels").addEventListener("click", () => goStep("abilities"));
  byId("back-to-class").addEventListener("click", () => goStep("class"));
  byId("confirm-abilities").addEventListener("click", () => goStep("background"));
  els.abilityMethod.addEventListener("change", (e) => { state.abilityMethod = e.target.value; renderAbilityStep(); renderClassProgress(); });
  els.resetRolls.addEventListener("click", resetRolledStats);
  byId("back-to-abilities").addEventListener("click", () => goStep("abilities"));
  byId("confirm-background").addEventListener("click", () => goStep("summary"));
  byId("back-to-background").addEventListener("click", () => goStep("background"));
  byId("download-json").addEventListener("click", downloadJson);

  els.characterName.addEventListener("input", (e) => { state.character.name = e.target.value; });
  els.toggleMulticlass.addEventListener("click", () => {
    state.multiclassOpen = !state.multiclassOpen;
    renderClassProgress();
  });
}

function renderAll() {
  renderStepper();
  Object.entries(els.panels).forEach(([name, panel]) => panel.classList.toggle("hidden", name !== state.step));
  els.customPage.classList.toggle("hidden", !state.customOpen);
  if (state.customOpen) { renderCustomFieldsByType(); renderSubmittedList(); }
  renderRaceStep();
  renderClassStep();
  renderAbilityStep();
  renderBackgroundStep();
  renderSummary();
}

function renderStepper() {
  els.stepper.innerHTML = "";
  STEP_ORDER.forEach((step) => {
    const li = document.createElement("li");
    li.textContent = capitalize(step);
    if (state.step === step) li.classList.add("active");
    li.tabIndex = 0;
    li.style.cursor = "pointer";
    li.addEventListener("click", () => goStep(step));
    li.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        goStep(step);
      }
    });
    els.stepper.appendChild(li);
  });
}

function goStep(step) { state.step = step; renderAll(); }

function renderRaceStep() {
  renderRaceCardsByEra(els.raceOptions, state.data.races, state.character.raceId, (id) => {
    state.character.raceId = id;
    renderRaceStep();
    renderAbilityStep();
  });

  const race = selectedRace();
  const selectedLanguages = [...toArray(race.languages)];
  (race.options || []).forEach((option) => {
    const selected = state.character.raceChoices[`${race.id}:${option.key}`];
    if (selected && option.key.toLowerCase().includes("language")) selectedLanguages.push(selected);
  });

  els.raceDetails.innerHTML = `
    <h3>${race.name}</h3>
    <p><strong>Source:</strong> ${race.source || "PHB"}</p>
    <p>${race.shortDescription || ""}</p>
    <p><strong>Age of Maturity:</strong> ${race.maturityAge || "Varies"}</p>
    <p><strong>Typical Lifespan:</strong> ${race.lifespan || "Varies"}</p>
    <p><strong>Languages:</strong> ${selectedLanguages.join(", ") || "None"}</p>
    <p><strong>Skills/Proficiencies:</strong> ${toArray(race.skills).join(", ") || "None"}</p>
    <p><strong>Features:</strong> ${toArray(race.features).map((f) => describeTermHtml(f, featureDescriptionForRace(race, f))).join(", ") || "None"}</p>
    <p><strong>Racial Ability Bonuses:</strong> ${formatAbilityBonuses(race.racialAbilities || {})}</p>
    
  `;

  renderRaceOptionSelectors(race);
}

function renderRaceCardsByEra(container, races, selectedId, onSelect) {
  container.innerHTML = "";
  const groups = [
    { label: "2014 Rules Content", races: races.filter((r) => (r.rulesEra || "2014") === "2014") },
    { label: "2024 Rules Content", races: races.filter((r) => (r.rulesEra || "2014") === "2024") },
  ];
  groups.forEach((group) => {
    if (!group.races.length) return;
    const section = document.createElement("section");
    section.className = "details";
    section.innerHTML = `<h3>${group.label}</h3>`;
    const grid = document.createElement("div");
    grid.className = "option-grid";
    group.races.forEach((race) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = `option-card ${race.id === selectedId ? "selected" : ""}`;
      b.innerHTML = `<strong>${escapeHtml(race.name)}</strong><p>${escapeHtml(race.source || "Player's Handbook (2014)")}</p>`;
      b.addEventListener("click", () => onSelect(race.id));
      grid.appendChild(b);
    });
    section.appendChild(grid);
    container.appendChild(section);
  });
}

function featureDescriptionForRace(race, feature) {
  if (race.id === "dragonborn") {
    const ancestry = state.character.raceChoices["dragonborn:draconicAncestry"];
    if (ancestry && DRAGONBORN_ANCESTRY[ancestry]) {
      if (feature === "Breath Weapon") return `(${ancestry}) ${DRAGONBORN_ANCESTRY[ancestry].breath}`;
      if (feature === "Damage Resistance") return `(${ancestry}) ${DRAGONBORN_ANCESTRY[ancestry].resistance}`;
    }
  }
  return FEATURE_DESCRIPTIONS[feature] || "Detailed feature description is shown in the race's published trait entry.";
}

function renderRaceOptionSelectors(race) {
  const options = race.options || [];
  if (!options.length) {
    els.raceOptionConfig.classList.add("hidden");
    els.raceOptionConfig.innerHTML = "";
    return;
  }
  els.raceOptionConfig.classList.remove("hidden");
  els.raceOptionConfig.innerHTML = `<h3>Race Options</h3>${options.map((option) => {
    const key = `${race.id}:${option.key}`;
    const current = state.character.raceChoices[key] || "";
    const desc = option.descriptions?.[current] || "";
    return `<label>${option.label}<select data-race-option="${key}"><option value="">Choose an option</option>${option.choices.map((choice) => `<option value="${escapeHtml(choice)}" ${choice === current ? "selected" : ""}>${escapeHtml(choice)}</option>`).join("")}</select></label><p><em>${escapeHtml(option.help || "")}</em></p><p class="option-description">${desc ? `<strong>${escapeHtml(current)}:</strong> ${escapeHtml(desc)}` : "Select an option to view its full description."}</p>`;
  }).join("<hr />")}`;

  els.raceOptionConfig.querySelectorAll("select[data-race-option]").forEach((select) => {
    select.addEventListener("change", (e) => {
      state.character.raceChoices[e.target.dataset.raceOption] = e.target.value;
      renderRaceStep();
      renderClassStep();
    });
  });
}

function renderClassStep() {
  els.characterName.value = state.character.name;
  const primaryId = state.character.classPlan.primaryClassId;
  const total = totalClassLevel();

  els.startingClassSetup.classList.toggle("hidden", total > 0);

  if (total === 0) {
    renderClassCards(primaryId);
  }

  renderClassConfiguration();

  renderClassProgress();
}

function renderClassConfiguration() {
  const rows = Object.entries(state.character.classPlan.levelsByClass);
  if (!rows.length) {
    els.classConfigPanel.innerHTML = "<h3>Class Setup</h3><p>Select and submit a starting class to configure skill proficiencies and class details.</p>";
    return;
  }

  els.classConfigPanel.innerHTML = "<h3>Class Setup & Proficiency Choices</h3>";
  rows.forEach(([classId, level]) => {
    const cls = classById(classId);
    const saved = state.character.classPlan.skillPicksByClass[classId] || [];
    const block = document.createElement("div");
    block.className = "details";
    block.innerHTML = `<h4>${escapeHtml(cls.name)} (Level ${level})</h4><p><strong>Saving Throws:</strong> ${escapeHtml(cls.savingThrows.join(", ") || "None")}</p><p><strong>Armor/Weapon Proficiencies:</strong> ${escapeHtml(toArray(cls.proficiencies).join(", ") || "None")}</p>`;

    if (cls.skillChoices?.count) {
      const wrap = document.createElement("div");
      wrap.innerHTML = `<p><strong>Choose ${cls.skillChoices.count} class skills:</strong></p>`;
      cls.skillChoices.options.forEach((skill) => {
        const id = `${classId}-skill-${slugify(skill)}`;
        const checked = saved.includes(skill) ? "checked" : "";
        wrap.insertAdjacentHTML("beforeend", `<label for="${id}"><input id="${id}" type="checkbox" data-skill-class="${classId}" value="${escapeHtml(skill)}" ${checked} /> ${escapeHtml(skill)}</label>`);
      });
      block.appendChild(wrap);
    }

    if (cls.subclasses?.length && state.character.classPlan.subclassByClass[classId]) {
      const unlocked = unlockedSubclassFeatureNames(classId);
      block.insertAdjacentHTML("beforeend", `<p><strong>Unlocked Subclass Features:</strong> ${escapeHtml(unlocked.join(", ") || "None yet")}</p>`);
    }

    els.classConfigPanel.appendChild(block);
  });

  els.classConfigPanel.querySelectorAll("input[data-skill-class]").forEach((input) => {
    input.addEventListener("change", (e) => {
      const classId = e.target.dataset.skillClass;
      const cls = classById(classId);
      const limit = cls.skillChoices?.count || 0;
      const picks = new Set(state.character.classPlan.skillPicksByClass[classId] || []);
      if (e.target.checked) {
        picks.add(e.target.value);
        if (picks.size > limit) {
          e.target.checked = false;
          return;
        }
      } else {
        picks.delete(e.target.value);
      }
      state.character.classPlan.skillPicksByClass[classId] = [...picks];
      renderClassConfiguration();
    });
  });
}

function unlockedSubclassFeatureNames(classId) {
  const cls = classById(classId);
  const selected = state.character.classPlan.subclassByClass[classId];
  const subclass = cls.subclasses?.find((s) => s.name === selected);
  const level = classLevel(classId);
  if (!subclass) return [];
  return Object.keys(subclass.features || {})
    .map(Number)
    .filter((lv) => lv <= level)
    .sort((a, b) => a - b)
    .flatMap((lv) => toFeatureObjects(subclass.features[lv] || []).map((f) => f.name));
}

function renderClassCards(selectedId) {
  els.classOptions.innerHTML = "";
  state.data.classes.forEach((item) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = `option-card ${item.id === selectedId ? "selected" : ""}`;
    const desc = CLASS_DESCRIPTIONS[item.name] || `${item.name} class.`;
    b.innerHTML = `<strong class="desc-term" data-desc="${escapeHtml(desc)}">${escapeHtml(item.name)}</strong><p>${escapeHtml(desc)}</p>`;
    b.addEventListener("click", () => {
      state.character.classPlan.primaryClassId = item.id;
      renderClassStep();
    });
    els.classOptions.appendChild(b);
  });
}

function confirmStartingClass() {
  const id = state.character.classPlan.primaryClassId;
  state.character.classPlan.levelsByClass = { [id]: 1 };
  state.character.classPlan.advancements = {};
  state.character.classPlan.subclassByClass[id] = state.character.classPlan.subclassByClass[id] || "";
  state.classValidation = "";
  renderClassStep();
}

function renderClassProgress() {
  const total = totalClassLevel();
  els.totalLevel.textContent = `Total Level: ${total}`;

  const timeline = classTimelineEntries();
  els.classFeatureTimeline.innerHTML = timeline.map((row) => `<li><strong>${escapeHtml(row.label)}</strong><ul>${row.features.map((f) => `<li><span>${escapeHtml(f.name)}</span><p class="feature-desc">${escapeHtml(f.description)}</p></li>`).join("")}</ul>${row.asiId ? `<div class="details" data-asi-inline="${escapeHtml(row.asiId)}"><strong>${escapeHtml(row.asiLabel || "Ability Score Improvement")}</strong></div>` : ""}</li>`).join("");
  renderClassLevelBreakdown();
  renderInlineAsiCards();

  if (total === 0) state.multiclassOpen = false;
  els.toggleMulticlass.disabled = total === 0;
  els.toggleMulticlass.textContent = state.multiclassOpen ? "Hide Multiclass Options" : "Multiclass Options";
  els.multiclassList.classList.toggle("hidden", !state.multiclassOpen);
  if (state.multiclassOpen) renderMulticlassList();
  els.classValidation.textContent = total > 20 ? "Total class levels cannot exceed 20." : "";
}

function renderClassLevelBreakdown() {
  const total = totalClassLevel();
  els.classLevelBreakdown.innerHTML = "";
  Object.entries(state.character.classPlan.levelsByClass).forEach(([classId, lvl]) => {
    const cls = classById(classId);
    const row = document.createElement("div");
    row.className = "row";
    row.innerHTML = `<strong>${cls.name}: Level ${lvl}</strong>`;

    const minus = document.createElement("button");
    minus.type = "button";
    minus.className = "secondary";
    minus.textContent = "Level -";
    minus.disabled = lvl <= 0;
    minus.addEventListener("click", () => {
      removeLevelFromClass(classId);
    });

    const plus = document.createElement("button");
    plus.type = "button";
    plus.textContent = "Level +";
    plus.disabled = total >= 20;
    plus.addEventListener("click", () => addLevelToClass(classId));

    row.appendChild(minus);
    row.appendChild(plus);

    const unlockLevel = subclassUnlockLevel(cls.id);
    if (lvl >= unlockLevel && (cls.subclasses || []).length) {
      const subSelect = document.createElement("select");
      cls.subclasses.forEach((sub) => {
        const opt = document.createElement("option");
        opt.value = sub.name;
        opt.textContent = sub.name;
        if (state.character.classPlan.subclassByClass[classId] === sub.name) opt.selected = true;
        subSelect.appendChild(opt);
      });
      if (!state.character.classPlan.subclassByClass[classId]) {
        state.character.classPlan.subclassByClass[classId] = cls.subclasses[0].name;
      }
      subSelect.addEventListener("change", (e) => {
        state.character.classPlan.subclassByClass[classId] = e.target.value;
        renderClassProgress();
      });
      row.appendChild(subSelect);
    }

    els.classLevelBreakdown.appendChild(row);
  });
}

function classTimelineEntries() {
  const entries = [];
  Object.entries(state.character.classPlan.levelsByClass).forEach(([classId, level]) => {
    const cls = classById(classId);
    const sub = state.character.classPlan.subclassByClass[classId];
    const subObj = cls.subclasses?.find((s) => s.name === sub);
    const subclassLevels = SUBCLASS_LEVELS[classId] || [3, 6, 10, 14];
    for (let lv = 1; lv <= level; lv += 1) {
      const features = toFeatureObjects(cls.levels?.[lv] || [["No feature listed", "No details available for this level yet."]]);
      const hasAsi = features.some((f) => /Ability Score Improvement/i.test(f.name));
      entries.push({ label: `${cls.name} Level ${lv}`, features, asiId: hasAsi ? `${classId}-lv${lv}` : null, asiLabel: hasAsi ? `${cls.name} Level ${lv}: Ability Score Improvement / Feat` : null });
      if (sub && subclassLevels.includes(lv)) {
        const subFeatures = toFeatureObjects(subObj?.features?.[lv] || [[`Subclass Feature - ${sub}`, subclassFeatureDescription(cls.id, sub, lv)]]).map((f) => ({ ...f, name: f.name.startsWith("Subclass Feature -") ? f.name : `Subclass Feature - ${f.name}` }));
        entries.push({ label: `${cls.name} Subclass Feature (Level ${lv})`, features: subFeatures });
      }
    }
  });
  return entries;
}

function renderMulticlassList() {
  const primary = state.character.classPlan.primaryClassId;
  const total = totalClassLevel();
  els.multiclassList.innerHTML = "";
  state.data.classes.filter((c) => c.id !== primary && classLevel(c.id) === 0).forEach((cls) => {
    const meets = meetsMulticlassRequirement(cls.multiclassReq);
    const canAdd = meets && total < 20;
    const card = document.createElement("div");
    card.className = `option-card ${canAdd ? "" : "disabled"}`;
    const reason = meets ? "Requirement met" : "Requirement not met with current ability scores";
    card.innerHTML = `<strong>${cls.name}</strong><p>Requirement: ${cls.multiclassReq}</p><p>${reason}</p>`;
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "+1 Level";
    button.disabled = !canAdd;
    button.addEventListener("click", () => addLevelToClass(cls.id));
    card.appendChild(button);
    els.multiclassList.appendChild(card);
  });
}

function addLevelToClass(classId) {
  if (totalClassLevel() >= 20) return;
  const wasZero = !state.character.classPlan.levelsByClass[classId];
  state.character.classPlan.levelsByClass[classId] = (state.character.classPlan.levelsByClass[classId] || 0) + 1;
  if (wasZero && classId !== state.character.classPlan.primaryClassId) state.multiclassOpen = false;
  renderClassStep();
}

function removeLevelFromClass(classId) {
  const current = state.character.classPlan.levelsByClass[classId] || 0;
  if (current <= 0) return;

  const next = current - 1;
  if (next <= 0) {
    delete state.character.classPlan.levelsByClass[classId];
    delete state.character.classPlan.subclassByClass[classId];
    delete state.character.classPlan.skillPicksByClass[classId];
    if (state.character.classPlan.primaryClassId === classId) {
      state.character.classPlan.primaryClassId = state.data.classes[0]?.id || "";
    }
  } else {
    state.character.classPlan.levelsByClass[classId] = next;
    if (next < subclassUnlockLevel(classId)) delete state.character.classPlan.subclassByClass[classId];
  }

  if (totalClassLevel() === 0) {
    state.multiclassOpen = false;
  }
  renderClassStep();
}

function classLevel(classId) {
  return state.character.classPlan.levelsByClass[classId] || 0;
}

function totalClassLevel() {
  return Object.values(state.character.classPlan.levelsByClass).reduce((sum, lv) => sum + lv, 0);
}

function meetsMulticlassRequirement(requirement) {
  if (!requirement) return true;
  const score = finalAbilityScores();
  if (requirement.includes(" or ")) {
    return requirement.split(" or ").some((cond) => meetsCondition(cond.trim(), score));
  }
  if (requirement.includes(" and ")) {
    return requirement.split(" and ").every((cond) => meetsCondition(cond.trim(), score));
  }
  return meetsCondition(requirement, score);
}

function meetsCondition(cond, scores) {
  const m = cond.match(/(STR|DEX|CON|INT|WIS|CHA)\s*(\d+)/i);
  if (!m) return true;
  return (scores[m[1].toUpperCase()] || 0) >= Number(m[2]);
}

function finalAbilityScores() {
  const race = selectedRace();
  const asi = abilityBonusesFromAdvancements();
  const origin = race.abilityScoreRule === "choose2plus1" ? state.character.originAbilityBonuses : (race.racialAbilities || {});
  return Object.fromEntries(Object.entries(state.character.abilities).map(([a, v]) => [a, Math.min(20, v + (origin?.[a] || 0) + (asi[a] || 0))]));
}

function toFeatureObjects(raw) {
  return raw.map((entry) => Array.isArray(entry) ? { name: entry[0], description: entry[1] } : { name: String(entry), description: "No description provided." });
}

function subclassDescription(classId, subName) {
  const cls = classById(classId);
  return cls.subclasses?.find((s) => s.name === subName)?.description || "Subclass specialization.";
}

function subclassFeatureDescription(classId, subName, level) {
  const cls = classById(classId);
  const style = ({ barbarian: "rage-focused", bard: "performance and support", cleric: "divine domain", druid: "nature shapecasting", fighter: "martial archetype", monk: "ki technique", paladin: "sacred oath", ranger: "hunting style", rogue: "specialist trick", sorcerer: "sorcerous origin", warlock: "patron gift", wizard: "arcane tradition" })[classId] || "subclass";
  return `${subName} grants a level ${level} ${style} feature for ${cls.name}. Apply this as the subclass-specific benefit at this level.`;
}

function subclassUnlockLevel(classId) {
  return Math.min(...(SUBCLASS_LEVELS[classId] || [3]));
}

function renderInlineAsiCards() {
  const opportunities = asiOpportunities();
  const validIds = new Set(opportunities.map((o) => o.id));
  Object.keys(state.character.classPlan.advancements || {}).forEach((id) => {
    if (!validIds.has(id)) delete state.character.classPlan.advancements[id];
  });

  document.querySelectorAll("[data-asi-inline]").forEach((mount) => {
    const id = mount.dataset.asiInline;
    const op = opportunities.find((x) => x.id === id);
    if (!op) return;
    mount.innerHTML = "";
    mount.appendChild(buildAsiCard(id, op.label));
  });
}

function buildAsiCard(id, label) {
  const choice = state.character.classPlan.advancements[id] || { kind: "ability", abilityA: "STR", abilityB: "STR", featId: "" };
  state.character.classPlan.advancements[id] = choice;

  const card = document.createElement("div");
  card.innerHTML = `<strong>${escapeHtml(label)}</strong><label>Choose Benefit<select data-asi-kind="${id}"><option value="ability" ${choice.kind === "ability" ? "selected" : ""}>Ability Score Improvement</option><option value="feat" ${choice.kind === "feat" ? "selected" : ""}>Feat</option></select></label>`;
  const featOptions = state.data.feats.length ? state.data.feats : CORE_FEATS;
  const feat = featOptions.find((f) => f.id === choice.featId);

  if (choice.kind === "ability") {
    const a = buildAbilitySelect(`data-asi-a="${id}"`, choice.abilityA || "STR");
    const b = buildAbilitySelect(`data-asi-b="${id}"`, choice.abilityB || choice.abilityA || "STR");
    card.insertAdjacentHTML("beforeend", `<label>Ability Increase 1 ${a}</label><label>Ability Increase 2 ${b}</label><p>Choose the same ability twice for +2, or two different abilities for +1/+1.</p>`);
  } else {
    card.insertAdjacentHTML("beforeend", `<label>Feat<select data-asi-feat="${id}"><option value="">Select a feat</option>${featOptions.map((f) => `<option value="${escapeHtml(f.id)}" ${choice.featId === f.id ? "selected" : ""}>${escapeHtml(f.name)}</option>`).join("")}</select></label><p>${escapeHtml(feat?.description || "Select a feat to view its description.")}</p>`);
  }

  card.querySelectorAll("select[data-asi-kind]").forEach((s) => s.addEventListener("change", (e) => {
    state.character.classPlan.advancements[e.target.dataset.asiKind] = { kind: e.target.value, abilityA: "STR", abilityB: "STR", featId: "" };
    renderClassProgress();
  }));
  card.querySelectorAll("select[data-asi-a]").forEach((s) => s.addEventListener("change", (e) => {
    state.character.classPlan.advancements[e.target.dataset.asiA].abilityA = e.target.value;
    renderAbilityStep();
    renderClassProgress();
  }));
  card.querySelectorAll("select[data-asi-b]").forEach((s) => s.addEventListener("change", (e) => {
    state.character.classPlan.advancements[e.target.dataset.asiB].abilityB = e.target.value;
    renderAbilityStep();
    renderClassProgress();
  }));
  card.querySelectorAll("select[data-asi-feat]").forEach((s) => s.addEventListener("change", (e) => {
    state.character.classPlan.advancements[e.target.dataset.asiFeat].featId = e.target.value;
    renderClassProgress();
  }));

  return card;
}

function asiOpportunities() {
  const rows = [];
  Object.entries(state.character.classPlan.levelsByClass).forEach(([classId, level]) => {
    const cls = classById(classId);
    for (let lv = 1; lv <= level; lv += 1) {
      const hasAsi = toFeatureObjects(cls.levels?.[lv] || []).some((f) => /Ability Score Improvement/i.test(f.name));
      if (hasAsi) rows.push({ id: `${classId}-lv${lv}`, label: `${cls.name} level ${lv}: Ability Score Improvement` });
    }
  });
  return rows;
}

function buildAbilitySelect(dataAttr, selected) {
  return `<select ${dataAttr}>${["STR", "DEX", "CON", "INT", "WIS", "CHA"].map((a) => `<option value="${a}" ${selected === a ? "selected" : ""}>${a}</option>`).join("")}</select>`;
}

function abilityBonusesFromAdvancements() {
  const bonuses = { STR: 0, DEX: 0, CON: 0, INT: 0, WIS: 0, CHA: 0 };
  Object.values(state.character.classPlan.advancements || {}).forEach((choice) => {
    if (choice.kind !== "ability") return;
    if (bonuses[choice.abilityA] !== undefined) bonuses[choice.abilityA] += 1;
    if (bonuses[choice.abilityB] !== undefined) bonuses[choice.abilityB] += 1;
  });
  return bonuses;
}

function renderAbilityStep() {
  const rolledMode = state.abilityMethod === "rolled";
  els.abilityMethod.value = state.abilityMethod;
  els.rolledPanel.classList.toggle("hidden", !rolledMode);
  renderOriginAsiPanel();

  if (rolledMode) renderRolledPanel();

  els.abilitiesGrid.innerHTML = "";
  const finalScores = finalAbilityScores();
  const speciesBonus = selectedRace().abilityScoreRule === "choose2plus1" ? state.character.originAbilityBonuses : (selectedRace().racialAbilities || {});
  Object.entries(state.character.abilities).forEach(([ability, score]) => {
    const bonus = speciesBonus?.[ability] || 0;
    const finalScore = finalScores[ability];
    const card = document.createElement("div");
    card.className = "ability-card";

    if (rolledMode) {
      card.innerHTML = `<h3>${ability}</h3><label>Set Score (3-18)<input type="number" min="3" max="18" value="${score}" /></label><p>Racial Bonus: ${bonus >= 0 ? "+" : ""}${bonus}</p><p><strong>Final: ${finalScore}</strong></p>`;
      card.querySelector("input").addEventListener("input", (e) => {
        const next = clamp(Number(e.target.value), 3, 18);
        state.character.abilities[ability] = next;
        renderAbilityStep();
        renderClassProgress();
      });
    } else {
      card.innerHTML = `<h3>${ability}</h3><div class="ability-controls"><button type="button" data-dir="down">-</button><strong>${score}</strong><button type="button" data-dir="up">+</button></div><p>Point Cost: ${COST_BY_SCORE[score]}</p><p>Racial Bonus: ${bonus >= 0 ? "+" : ""}${bonus}</p><p><strong>Final: ${finalScore}</strong></p>`;
      card.querySelectorAll("button").forEach((btn) => btn.addEventListener("click", () => updateAbility(ability, btn.dataset.dir === "up" ? score + 1 : score - 1)));
    }
    els.abilitiesGrid.appendChild(card);
  });

  if (rolledMode) {
    els.pointBuyStatus.textContent = "Rolled mode active. You can assign rolled totals manually to any stat (max 18).";
  } else {
    const spent = spentPoints();
    els.pointBuyStatus.textContent = `Points spent: ${spent} / ${POINT_BUY_BUDGET}. Remaining: ${POINT_BUY_BUDGET - spent}.`;
  }
}

function renderOriginAsiPanel() {
  const race = selectedRace();
  const isFlexible = race.abilityScoreRule === "choose2plus1";
  els.originAsiPanel.classList.toggle("hidden", !isFlexible);
  if (!isFlexible) {
    state.character.originAbilityBonuses = { STR: 0, DEX: 0, CON: 0, INT: 0, WIS: 0, CHA: 0 };
    return;
  }

  const bonuses = state.character.originAbilityBonuses || { STR: 2, DEX: 1, CON: 0, INT: 0, WIS: 0, CHA: 0 };
  const plusTwo = Object.keys(bonuses).find((k) => bonuses[k] === 2) || "STR";
  const plusOne = Object.keys(bonuses).find((k) => bonuses[k] === 1) || "DEX";
  els.originAsiPanel.innerHTML = `<h3>Flexible Ability Score Rules</h3><p>This species uses flexible bonuses from its sourcebook. Assign +2 to one ability and +1 to a different ability here.</p><div class="row"><label>+2<select id="origin-plus-two">${["STR", "DEX", "CON", "INT", "WIS", "CHA"].map((a) => `<option value="${a}" ${plusTwo === a ? "selected" : ""}>${a}</option>`).join("")}</select></label><label>+1<select id="origin-plus-one">${["STR", "DEX", "CON", "INT", "WIS", "CHA"].map((a) => `<option value="${a}" ${plusOne === a ? "selected" : ""}>${a}</option>`).join("")}</select></label></div>`;

  const apply = () => {
    const p2 = byId("origin-plus-two").value;
    const p1 = byId("origin-plus-one").value;
    if (p2 === p1) return;
    state.character.originAbilityBonuses = { STR: 0, DEX: 0, CON: 0, INT: 0, WIS: 0, CHA: 0, [p2]: 2, [p1]: 1 };
    renderAbilityStep();
    renderClassProgress();
  };
  byId("origin-plus-two").addEventListener("change", apply);
  byId("origin-plus-one").addEventListener("change", apply);
}

function renderRolledPanel() {
  els.rollButtons.innerHTML = "";
  els.rolledAssign.innerHTML = "";

  state.rolled.slots.forEach((slot, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = slot?.total ? `Roll ${idx + 1}: ${slot.total}` : `Roll ${idx + 1}`;
    btn.addEventListener("click", () => performRollForSlot(idx));
    els.rollButtons.appendChild(btn);

    if (slot?.total) {
      const wrap = document.createElement("div");
      wrap.className = "details";
      wrap.innerHTML = `<strong>Roll ${idx + 1}</strong><p>Dice: ${slot.dice.join(", ")}</p><p>Dropped: ${slot.dropped} • Total: ${slot.total}</p>`;
      const select = document.createElement("select");
      ["STR","DEX","CON","INT","WIS","CHA"].forEach((ab) => {
        const opt = document.createElement("option");
        opt.value = ab;
        opt.textContent = ab;
        select.appendChild(opt);
      });
      const apply = document.createElement("button");
      apply.type = "button";
      apply.textContent = `Set Stat to ${slot.total}`;
      apply.addEventListener("click", () => {
        state.character.abilities[select.value] = Math.min(18, slot.total);
        renderAbilityStep();
        renderClassProgress();
      });
      wrap.appendChild(select);
      wrap.appendChild(apply);
      els.rolledAssign.appendChild(wrap);
    }
  });
}

function performRollForSlot(index) {
  const dice = [rollD6(), rollD6(), rollD6(), rollD6()];
  const dropChoice = window.prompt(`Roll ${index + 1}: ${dice.join(", ")}
Enter die position to drop (1-4):`, "1");
  const dropIdx = clamp(Number(dropChoice) - 1, 0, 3);
  const dropped = dice[dropIdx];
  const kept = dice.filter((_, i) => i !== dropIdx);
  const total = kept.reduce((s, v) => s + v, 0);
  state.rolled.slots[index] = { dice, dropped, total };
  renderAbilityStep();
}

function resetRolledStats() {
  state.rolled.slots = [null, null, null, null, null, null];
  renderAbilityStep();
}

function rollD6() { return Math.floor(Math.random() * 6) + 1; }

function updateAbility(ability, next) {
  if (state.abilityMethod !== "pointBuy") return;
  if (next < 8 || next > 15) return;
  const prev = state.character.abilities[ability];
  state.character.abilities[ability] = next;
  if (spentPoints() > POINT_BUY_BUDGET) state.character.abilities[ability] = prev;
  renderAbilityStep();
  renderClassProgress();
}

function renderBackgroundStep() {
  renderOptionCards(els.backgroundOptions, state.data.backgrounds, state.character.backgroundId, (id) => { state.character.backgroundId = id; renderBackgroundStep(); });
  const bg = selectedBackground();
  els.backgroundDetails.innerHTML = `<h3>${bg.name}</h3><p><strong>Skills:</strong> ${toArray(bg.skills).join(", ")}</p><p><strong>Feature:</strong> ${bg.feature}</p><p><strong>Equipment:</strong> ${toArray(bg.equipment).join(", ")}</p><p><strong>Background Stats/Bonuses:</strong> ${bg.bonuses}</p>`;
}

function renderSummary() {
  const race = selectedRace();
  const chosenFeats = Object.values(state.character.classPlan.advancements || {})
    .filter((c) => c.kind === "feat" && c.featId)
    .map((c) => (state.data.feats.find((f) => f.id === c.featId) || CORE_FEATS.find((f) => f.id === c.featId))?.name)
    .filter(Boolean);
  const summary = {
    name: state.character.name || "Unnamed Adventurer",
    race: race.name,
    raceSelections: Object.fromEntries(Object.entries(state.character.raceChoices).filter(([key]) => key.startsWith(`${race.id}:`)).map(([key, val]) => [key.split(":")[1], val])),
    classes: state.character.classPlan,
    classSkillSelections: state.character.classPlan.skillPicksByClass,
    abilities: { base: state.character.abilities, final: finalAbilityScores(), pointBuySpent: spentPoints(), pointBuyBudget: POINT_BUY_BUDGET },
    feats: chosenFeats,
    background: selectedBackground().name,
  };
  els.characterSheet.textContent = JSON.stringify(summary, null, 2);
}

function handleDescriptionHover(event) {
  const target = event.target.closest(".desc-term");
  if (!target) return;
  clearTimeout(state.hoverTimer);
  state.hoverTimer = setTimeout(() => {
    els.tooltip.textContent = target.dataset.desc;
    const r = target.getBoundingClientRect();
    els.tooltip.style.left = `${r.left + window.scrollX}px`;
    els.tooltip.style.top = `${r.bottom + window.scrollY + 8}px`;
    els.tooltip.classList.remove("hidden");
    els.tooltip.classList.add("show");
  }, 500);
}
function hideTooltip(event) { if (!event.target.closest(".desc-term")) return; clearTimeout(state.hoverTimer); els.tooltip.classList.remove("show"); els.tooltip.classList.add("hidden"); }
function describeTermHtml(name, description) { return `<span class="desc-term" data-desc="${escapeHtml(description || "No description available.")}">${escapeHtml(name)}</span>`; }

function showQuickFill(input) {
  const pool = quickFillOptions(input.dataset.domain);
  const parts = input.value.split(",");
  const current = parts[parts.length - 1].trim().toLowerCase();
  if (!current) return hideQuickFill();
  const matches = pool.filter((item) => item.toLowerCase().includes(current)).slice(0, 8);
  if (!matches.length) return hideQuickFill();
  els.quickfillBox.innerHTML = "";
  const r = input.getBoundingClientRect();
  matches.forEach((m) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = m;
    b.addEventListener("click", () => {
      parts[parts.length - 1] = ` ${m}`;
      input.value = parts.map((x) => x.trim()).filter(Boolean).join(", ");
      hideQuickFill();
    });
    els.quickfillBox.appendChild(b);
  });
  els.quickfillBox.style.left = `${r.left + window.scrollX}px`;
  els.quickfillBox.style.top = `${r.bottom + window.scrollY + 4}px`;
  els.quickfillBox.classList.remove("hidden");
}
function hideQuickFill() { els.quickfillBox.classList.add("hidden"); }

function quickFillOptions(domain) {
  const source = structuredClone(BASE_DATA);
  state.custom.submitted.forEach((item) => {
    if (item.type === "races") source.races.push({ ...item.data, name: item.name });
    if (item.type === "classes") source.classes.push({ ...item.data, name: item.name });
    if (item.type === "backgrounds") source.backgrounds.push({ ...item.data, name: item.name });
    if (item.type === "languages") source.languages.push({ name: item.name, description: item.data.description || "" });
  });
  const map = {
    languages: [...new Set([...source.races.flatMap((r) => toArray(r.languages)), ...source.languages.map((l) => l.name)])],
    skills: [...new Set([...source.races.flatMap((r) => toArray(r.skills)), ...source.backgrounds.flatMap((b) => toArray(b.skills))])],
    "race-features": [...new Set(source.races.flatMap((r) => toArray(r.features)))],
    proficiencies: [...new Set(source.classes.flatMap((c) => toArray(c.proficiencies)))],
    equipment: [...new Set(source.backgrounds.flatMap((b) => toArray(b.equipment)))],
    "background-features": [...new Set(source.backgrounds.map((b) => b.feature).filter(Boolean))],
  };
  return map[domain] || [];
}

function renderOptionCards(container, items, selectedId, onSelect) {
  container.innerHTML = "";
  items.forEach((item) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = `option-card ${item.id === selectedId ? "selected" : ""}`;
    b.innerHTML = `<strong>${escapeHtml(item.name)}</strong>`;
    b.addEventListener("click", () => onSelect(item.id));
    container.appendChild(b);
  });
}

function renderCustomFieldsByType() {
  const type = els.customType.value;
  document.querySelectorAll(".type-fields").forEach((n) => n.classList.add("hidden"));
  byId(`type-${type}`)?.classList.remove("hidden");
}

function renderSubmittedList() {
  els.submittedItems.innerHTML = "";
  if (!state.custom.submitted.length) { els.submittedItems.innerHTML = "<li>No submitted items yet.</li>"; return; }
  state.custom.submitted.forEach((item) => {
    const li = document.createElement("li");
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = `${labelForType(item.type)}: ${item.name}`;
    b.addEventListener("click", () => loadCustomItem(item.id));
    li.appendChild(b);
    els.submittedItems.appendChild(li);
  });
}

function loadCustomItem(id) {
  const item = state.custom.submitted.find((x) => x.id === id);
  if (!item) return;
  state.custom.editingId = id;
  els.customType.value = item.type;
  renderCustomFieldsByType();
  fillTypeFields(item.type, item.name, item.data);
}

function clearCustomEditor() {
  state.custom.editingId = null;
  document.querySelectorAll("#custom-page input, #custom-page textarea").forEach((el) => {
    if (el.id === "spell-level") el.value = "0";
    else if (el.id === "race-abilities") el.value = '{"STR":1}';
    else if (el.type !== "file") el.value = "";
  });
  els.customType.value = "races";
  renderCustomFieldsByType();
}

function submitCustomItem() {
  const record = collectTypeFields(els.customType.value);
  if (!record) return;
  if (state.custom.editingId) {
    const existing = state.custom.submitted.find((x) => x.id === state.custom.editingId);
    if (existing) Object.assign(existing, record);
  } else {
    state.custom.submitted.push({ ...record, id: crypto.randomUUID() });
  }
  renderSubmittedList();
}

function collectTypeFields(type) {
  try {
    if (type === "races") {
      const name = byId("race-name").value.trim();
      if (!name) return fail("Race name is required.");
      return { type, name, data: { languages: csv(byId("race-languages").value), skills: csv(byId("race-skills").value), features: csv(byId("race-features").value), racialAbilities: JSON.parse(byId("race-abilities").value || "{}") } };
    }
    if (type === "classes") {
      const name = byId("class-name").value.trim();
      if (!name) return fail("Class name is required.");
      return { type, name, data: { hitDie: byId("class-hitdie").value || "d8", proficiencies: csv(byId("class-proficiencies").value), multiclassReq: byId("class-multi-req").value || "None", featureRows: byId("class-features").value } };
    }
    if (type === "backgrounds") {
      const name = byId("background-name").value.trim();
      if (!name) return fail("Background name is required.");
      return { type, name, data: { skills: csv(byId("background-skills").value), feature: byId("background-feature-name").value || "Custom Feature", featureDescription: byId("background-feature-desc").value, equipment: csv(byId("background-equipment").value), bonuses: byId("background-bonuses").value || "Custom bonuses" } };
    }
    if (type === "spells") {
      const name = byId("spell-name").value.trim();
      if (!name) return fail("Spell name is required.");
      return { type, name, data: { level: Number(byId("spell-level").value || 0), school: byId("spell-school").value, description: byId("spell-description").value } };
    }
    if (type === "feats") {
      const name = byId("feat-name").value.trim();
      if (!name) return fail("Feat name is required.");
      return { type, name, data: { prerequisite: byId("feat-prereq").value, description: byId("feat-description").value } };
    }
    if (type === "languages") {
      const name = byId("language-name").value.trim();
      if (!name) return fail("Language name is required.");
      return { type, name, data: { description: byId("language-description").value.trim() || "Custom language." } };
    }
  } catch {
    return fail("Invalid input.");
  }
  return fail("Unsupported type.");
}

function fillTypeFields(type, name, data) {
  if (type === "races") { byId("race-name").value = name; byId("race-languages").value = toArray(data.languages).join(", "); byId("race-skills").value = toArray(data.skills).join(", "); byId("race-features").value = toArray(data.features).join(", "); byId("race-abilities").value = JSON.stringify(data.racialAbilities || {}, null, 2); return; }
  if (type === "classes") { byId("class-name").value = name; byId("class-hitdie").value = data.hitDie || "d8"; byId("class-proficiencies").value = toArray(data.proficiencies).join(", "); byId("class-multi-req").value = data.multiclassReq || "None"; byId("class-features").value = data.featureRows || ""; return; }
  if (type === "backgrounds") { byId("background-name").value = name; byId("background-skills").value = toArray(data.skills).join(", "); byId("background-feature-name").value = data.feature || ""; byId("background-feature-desc").value = data.featureDescription || ""; byId("background-equipment").value = toArray(data.equipment).join(", "); byId("background-bonuses").value = data.bonuses || ""; return; }
  if (type === "spells") { byId("spell-name").value = name; byId("spell-level").value = String(data.level ?? 0); byId("spell-school").value = data.school || ""; byId("spell-description").value = data.description || ""; return; }
  if (type === "feats") { byId("feat-name").value = name; byId("feat-prereq").value = data.prerequisite || ""; byId("feat-description").value = data.description || ""; return; }
  if (type === "languages") { byId("language-name").value = name; byId("language-description").value = data.description || ""; }
}

function importCustomData(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result || "{}"));
      const items = Array.isArray(parsed.items) ? parsed.items : [];
      state.custom.submitted = items.map((it) => ({ id: crypto.randomUUID(), type: it.type, name: it.name, data: it.data || {} }));
      renderSubmittedList();
      els.customStatus.textContent = "Imported items are loaded.";
    } catch {
      els.customStatus.textContent = "Import failed: invalid JSON.";
    }
  };
  reader.readAsText(file);
  event.target.value = "";
}

function exportCustomData() {
  downloadBlob({ items: state.custom.submitted.map(({ type, name, data }) => ({ type, name, data })) }, "dnd-custom-content.json");
}

function applyCustomDataToBuilder() {
  state.data = structuredClone(BASE_DATA);
  state.custom.submitted.forEach((item) => {
    const normalized = normalizeCustomRecord(item);
    if (normalized) state.data[item.type].push(normalized);
  });
  state.data.languages.forEach((l) => { if (l.name) LANGUAGE_DESCRIPTIONS[l.name] = l.description || "Custom language."; });
}

function normalizeCustomRecord(item) {
  const id = `custom-${slugify(item.name) || crypto.randomUUID().slice(0, 8)}`;
  const { type, name, data } = item;
  if (type === "races") return { id, name, languages: data.languages || [], skills: data.skills || [], features: data.features || [], racialAbilities: data.racialAbilities || {} };
  if (type === "classes") return buildClass(id, name, data.hitDie || "d8", data.multiclassReq || "None", data.proficiencies || [], [], parseClassRows(data.featureRows));
  if (type === "backgrounds") return { id, name, skills: data.skills || [], feature: data.feature || "Custom Feature", equipment: data.equipment || [], bonuses: data.bonuses || "Custom bonuses" };
  if (type === "languages") return { id, name, description: data.description || "Custom language." };
  if (type === "spells" || type === "feats") return { id, name, ...data };
  return null;
}

function parseClassRows(rows) {
  const levels = {};
  String(rows || "").split("\n").map((r) => r.trim()).filter(Boolean).forEach((row) => {
    const [l, feat, desc] = row.split("|").map((x) => x?.trim());
    const level = Number(l);
    if (!Number.isFinite(level) || !feat) return;
    if (!levels[level]) levels[level] = [];
    levels[level].push([feat, desc || "No description provided."]);
  });
  return levels;
}

function selectedRace() { return state.data.races.find((r) => r.id === state.character.raceId) || state.data.races[0]; }
function selectedPrimaryClass() { return classById(state.character.classPlan.primaryClassId); }
function classById(id) { return state.data.classes.find((c) => c.id === id) || state.data.classes[0]; }
function selectedBackground() { return state.data.backgrounds.find((b) => b.id === state.character.backgroundId) || state.data.backgrounds[0]; }
function spentPoints() { return Object.values(state.character.abilities).reduce((s, v) => s + COST_BY_SCORE[v], 0); }

function downloadJson() { downloadBlob(JSON.parse(els.characterSheet.textContent), `${(state.character.name || "character").replace(/\s+/g, "-").toLowerCase()}.json`); }
function downloadBlob(data, filename) { const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url); }
function byId(id) { return document.getElementById(id); }
function toArray(v) { if (Array.isArray(v)) return v; if (typeof v === "string" && v.trim()) return [v.trim()]; return []; }
function csv(v) { return String(v || "").split(",").map((x) => x.trim()).filter(Boolean); }
function formatAbilityBonuses(b) { const pairs = Object.entries(b || {}); return pairs.length ? pairs.map(([a, v]) => `${a} ${v >= 0 ? "+" : ""}${v}`).join(", ") : "None"; }
function slugify(v) { return String(v || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""); }
function labelForType(type) { return ({ races: "Race", classes: "Class", spells: "Spell", backgrounds: "Background", feats: "Feat", languages: "Language" })[type] || type; }
function capitalize(v) { return `${v[0].toUpperCase()}${v.slice(1)}`; }
function clamp(v, min, max) { return Math.min(Math.max(v, min), max); }
function escapeHtml(text) { return String(text).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"); }
function fail(msg) { els.customStatus.textContent = msg; return null; }
