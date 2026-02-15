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
};

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
  ],
  classes: [
    buildClass("barbarian", "Barbarian", "d12", "STR 13", ["Light/medium armor", "Shields", "Simple/martial weapons"], ["Berserker", "Totem Warrior"], {
      1: [["Rage", "Enter a rage for bonus melee damage, damage resistance, and advantage on Strength checks/saves."], ["Unarmored Defense", "AC = 10 + DEX mod + CON mod while unarmored."]],
      2: [["Reckless Attack", "Gain advantage on melee STR attacks, but attacks against you have advantage until your next turn."], ["Danger Sense", "Advantage on DEX saves against effects you can see."]],
      3: [["Primal Path", "Choose a barbarian subclass to define your rage style."]],
      4: [["Ability Score Improvement", "Increase ability scores or take a feat if feats are allowed."]],
      5: [["Extra Attack", "Attack twice with the Attack action."], ["Fast Movement", "+10 ft speed while not in heavy armor."]],
    }),
    buildClass("bard", "Bard", "d8", "CHA 13", ["Light armor", "Simple weapons", "Hand crossbows, longswords, rapiers, shortswords"], ["Lore", "Valor"], {
      1: [["Spellcasting", "Cast bard spells using Charisma and spell slots."], ["Bardic Inspiration", "Give allies a die they can add to checks, attacks, or saves."]],
      2: [["Jack of All Trades", "Add half proficiency bonus to checks you are not proficient in."], ["Song of Rest", "Extra healing during short rests."]],
      3: [["Bard College", "Choose a bard subclass."]],
      4: [["Ability Score Improvement", "Increase ability scores or take a feat."]],
      5: [["Font of Inspiration", "Bardic Inspiration refreshes on short rest."], ["Bardic Inspiration d8", "Your inspiration die increases."]],
    }),
    buildClass("cleric", "Cleric", "d8", "WIS 13", ["Light/medium armor", "Shields", "Simple weapons"], ["Knowledge", "Life", "Light", "Nature", "Tempest", "Trickery", "War"], {
      1: [["Spellcasting", "Prepare and cast cleric spells using Wisdom."], ["Divine Domain", "Choose a divine domain subclass."]],
      2: [["Channel Divinity", "Use divine power for Turn Undead and domain effects."],
      ],
      3: [["2nd-level Spells", "Access to 2nd-level cleric spell slots and spells."]],
      4: [["Ability Score Improvement", "Increase ability scores or take a feat."]],
      5: [["Destroy Undead (CR 1/2)", "Turn Undead can instantly destroy weak undead."], ["3rd-level Spells", "Access to 3rd-level cleric spells."]],
    }),
    buildClass("druid", "Druid", "d8", "WIS 13", ["Light/medium armor (non-metal)", "Shields (non-metal)", "Clubs, daggers, darts, javelins, maces, quarterstaffs, scimitars, sickles, slings, spears"], ["Land", "Moon"], {
      1: [["Druidic", "Learn the secret language of druids."], ["Spellcasting", "Prepare and cast druid spells using Wisdom."]],
      2: [["Wild Shape", "Transform into beasts based on level limitations."], ["Druid Circle", "Choose a druid subclass."]],
      3: [["2nd-level Spells", "Access to 2nd-level druid spells."]],
      4: [["Ability Score Improvement", "Increase ability scores or take a feat."], ["Wild Shape Improvement", "More movement types/forms become available."]],
      5: [["3rd-level Spells", "Access to 3rd-level druid spells."]],
    }),
    buildClass("fighter", "Fighter", "d10", "STR 13 or DEX 13", ["All armor", "Shields", "Simple/martial weapons"], ["Champion", "Battle Master", "Eldritch Knight"], {
      1: [["Fighting Style", "Choose a combat style that grants a permanent bonus."], ["Second Wind", "Bonus action self-heal once per short rest."]],
      2: [["Action Surge", "Take one additional action on your turn once per short rest."]],
      3: [["Martial Archetype", "Choose a fighter subclass."]],
      4: [["Ability Score Improvement", "Increase ability scores or take a feat."]],
      5: [["Extra Attack", "Attack twice with the Attack action."]],
    }),
    buildClass("monk", "Monk", "d8", "DEX 13 and WIS 13", ["Shortswords", "Simple weapons"], ["Open Hand", "Shadow", "Four Elements"], {
      1: [["Unarmored Defense", "AC = 10 + DEX mod + WIS mod while unarmored."], ["Martial Arts", "Use monk weapons/unarmed strikes effectively and bonus strike."]],
      2: [["Ki", "Use ki points for Flurry, Patient Defense, and Step of the Wind."], ["Unarmored Movement", "Gain extra movement speed."]],
      3: [["Monastic Tradition", "Choose a monk subclass."], ["Deflect Missiles", "Reduce ranged weapon damage with reaction."]],
      4: [["Ability Score Improvement", "Increase ability scores or take a feat."], ["Slow Fall", "Use reaction to reduce falling damage."]],
      5: [["Extra Attack", "Attack twice with the Attack action."], ["Stunning Strike", "Spend ki to force CON save and stun target."], ["Martial Arts Die d6", "Your martial arts damage die increases."]],
    }),
    buildClass("paladin", "Paladin", "d10", "STR 13 and CHA 13", ["All armor", "Shields", "Simple/martial weapons"], ["Devotion", "Ancients", "Vengeance"], {
      1: [["Divine Sense", "Detect celestials, fiends, and undead nearby."], ["Lay on Hands", "Healing pool equal to 5 × paladin level."]],
      2: [["Fighting Style", "Choose a combat style bonus."], ["Spellcasting", "Cast paladin spells using Charisma."], ["Divine Smite", "Spend spell slots to add radiant damage on weapon hits."]],
      3: [["Sacred Oath", "Choose your paladin subclass."], ["Divine Health", "Immune to disease."]],
      4: [["Ability Score Improvement", "Increase ability scores or take a feat."]],
      5: [["Extra Attack", "Attack twice with the Attack action."]],
    }),
    buildClass("ranger", "Ranger", "d10", "DEX 13 and WIS 13", ["Light/medium armor", "Shields", "Simple/martial weapons"], ["Hunter", "Beast Master"], {
      1: [["Favored Enemy", "Gain tracking and lore benefits against chosen enemy types."], ["Natural Explorer", "Gain exploration bonuses in favored terrain."]],
      2: [["Fighting Style", "Choose a combat style bonus."], ["Spellcasting", "Cast ranger spells using Wisdom."]],
      3: [["Ranger Archetype", "Choose a ranger subclass."], ["Primeval Awareness", "Sense certain creature types using spell slots."]],
      4: [["Ability Score Improvement", "Increase ability scores or take a feat."]],
      5: [["Extra Attack", "Attack twice with the Attack action."]],
    }),
    buildClass("rogue", "Rogue", "d8", "DEX 13", ["Light armor", "Simple weapons", "Hand crossbows, longswords, rapiers, shortswords"], ["Thief", "Assassin", "Arcane Trickster"], {
      1: [["Expertise", "Double proficiency bonus in selected proficient skills/tools."], ["Sneak Attack", "Deal bonus damage once per turn when conditions are met."], ["Thieves' Cant", "Learn rogue coded language."]],
      2: [["Cunning Action", "Dash, Disengage, or Hide as a bonus action."]],
      3: [["Roguish Archetype", "Choose a rogue subclass."]],
      4: [["Ability Score Improvement", "Increase ability scores or take a feat."]],
      5: [["Uncanny Dodge", "Use reaction to halve damage from one attacker you can see."]],
    }),
    buildClass("sorcerer", "Sorcerer", "d6", "CHA 13", ["Daggers, darts, slings, quarterstaffs, light crossbows"], ["Draconic Bloodline", "Wild Magic"], {
      1: [["Spellcasting", "Cast sorcerer spells using Charisma."], ["Sorcerous Origin", "Choose a sorcerer subclass."]],
      2: [["Font of Magic", "Gain sorcery points to fuel class features and convert slots/points."],
      ],
      3: [["Metamagic", "Modify spell behavior with sorcery points."], ["2nd-level Spells", "Access to 2nd-level sorcerer spells."]],
      4: [["Ability Score Improvement", "Increase ability scores or take a feat."]],
      5: [["3rd-level Spells", "Access to 3rd-level sorcerer spells."]],
    }),
    buildClass("warlock", "Warlock", "d8", "CHA 13", ["Light armor", "Simple weapons"], ["Archfey", "Fiend", "Great Old One"], {
      1: [["Otherworldly Patron", "Choose your warlock subclass patron."], ["Pact Magic", "Cast spells using pact slots that refresh on short rest."]],
      2: [["Eldritch Invocations", "Choose magical augmentations with persistent effects."],
      ],
      3: [["Pact Boon", "Choose Pact of the Chain, Blade, or Tome."], ["2nd-level Pact Slots", "Stronger pact spellcasting."]],
      4: [["Ability Score Improvement", "Increase ability scores or take a feat."]],
      5: [["3rd-level Pact Slots", "Pact slots scale to 3rd level."], ["Additional Invocation", "Gain another eldritch invocation known."]],
    }),
    buildClass("wizard", "Wizard", "d6", "INT 13", ["Daggers, darts, slings, quarterstaffs, light crossbows"], ["Abjuration", "Conjuration", "Divination", "Enchantment", "Evocation", "Illusion", "Necromancy", "Transmutation"], {
      1: [["Spellcasting", "Prepare and cast wizard spells from your spellbook using Intelligence."], ["Arcane Recovery", "Recover spent spell slots during a short rest once per day."]],
      2: [["Arcane Tradition", "Choose your wizard subclass school."],
      ],
      3: [["2nd-level Spells", "Access to 2nd-level wizard spells."]],
      4: [["Ability Score Improvement", "Increase ability scores or take a feat."]],
      5: [["3rd-level Spells", "Access to 3rd-level wizard spells."]],
    }),
  ],
  backgrounds: [
    { id: "acolyte", name: "Acolyte", skills: ["Insight", "Religion"], feature: "Shelter of the Faithful", equipment: ["Holy symbol", "Prayer book", "5 sticks of incense", "Vestments", "15 gp"], bonuses: "No direct ability bonus in core 5e" },
    { id: "soldier", name: "Soldier", skills: ["Athletics", "Intimidation"], feature: "Military Rank", equipment: ["Insignia", "Trophy", "Gaming set", "10 gp"], bonuses: "No direct ability bonus in core 5e" },
    { id: "criminal", name: "Criminal", skills: ["Deception", "Stealth"], feature: "Criminal Contact", equipment: ["Crowbar", "Dark clothes", "15 gp"], bonuses: "No direct ability bonus in core 5e" },
    { id: "sage", name: "Sage", skills: ["Arcana", "History"], feature: "Researcher", equipment: ["Ink", "Quill", "Knife", "Letter", "10 gp"], bonuses: "No direct ability bonus in core 5e" },
  ],
  spells: [], feats: [], languages: Object.entries(LANGUAGE_DESCRIPTIONS).map(([name, description]) => ({ name, description })),
};

function buildClass(id, name, hitDie, multiclassReq, proficiencies, subclassNames, levels) {
  return { id, name, hitDie, multiclassReq, proficiencies, subclasses: subclassNames.map((sub) => ({ name: sub, description: `${sub} is a core ${name} subclass option.` })), levels };
}

const state = {
  step: "race",
  customOpen: false,
  data: structuredClone(BASE_DATA),
  character: {
    name: "",
    raceId: BASE_DATA.races[0].id,
    raceChoices: {},
    classPlan: { primaryClassId: BASE_DATA.classes[0].id, subclassByClass: {}, levelsByClass: {} },
    abilities: { STR: 8, DEX: 8, CON: 8, INT: 8, WIS: 8, CHA: 8 },
    backgroundId: BASE_DATA.backgrounds[0].id,
  },
  custom: { submitted: [], editingId: null },
  multiclassOpen: false,
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
    classOptions: byId("class-options"), subclassPickerWrap: byId("subclass-picker-wrap"), subclassPicker: byId("subclass-picker"), classValidation: byId("class-validation"),
    addLevel: byId("add-level"), removeLevel: byId("remove-level"), totalLevel: byId("total-level"), classFeatureTimeline: byId("class-feature-timeline"),
    toggleMulticlass: byId("toggle-multiclass"), multiclassList: byId("multiclass-list"),
    characterName: byId("character-name"), abilitiesGrid: byId("abilities-grid"), pointBuyStatus: byId("point-buy-status"),
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
  byId("back-to-abilities").addEventListener("click", () => goStep("abilities"));
  byId("confirm-background").addEventListener("click", () => goStep("summary"));
  byId("back-to-background").addEventListener("click", () => goStep("background"));
  byId("download-json").addEventListener("click", downloadJson);

  els.characterName.addEventListener("input", (e) => { state.character.name = e.target.value; });
  els.addLevel.addEventListener("click", () => addLevelToClass(state.character.classPlan.primaryClassId));
  els.removeLevel.addEventListener("click", () => removeLevelFromPrimary());
  els.toggleMulticlass.addEventListener("click", () => { state.multiclassOpen = !state.multiclassOpen; renderClassProgress(); });
  els.subclassPicker.addEventListener("change", (e) => {
    state.character.classPlan.subclassByClass[state.character.classPlan.primaryClassId] = e.target.value;
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
    els.stepper.appendChild(li);
  });
}

function goStep(step) { state.step = step; renderAll(); }

function renderRaceStep() {
  renderOptionCards(els.raceOptions, state.data.races, state.character.raceId, (id) => {
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

function featureDescriptionForRace(race, feature) {
  if (race.id === "dragonborn") {
    const ancestry = state.character.raceChoices["dragonborn:draconicAncestry"];
    if (ancestry && DRAGONBORN_ANCESTRY[ancestry]) {
      if (feature === "Breath Weapon") return `(${ancestry}) ${DRAGONBORN_ANCESTRY[ancestry].breath}`;
      if (feature === "Damage Resistance") return `(${ancestry}) ${DRAGONBORN_ANCESTRY[ancestry].resistance}`;
    }
  }
  return FEATURE_DESCRIPTIONS[feature] || "Feature description pending.";
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

  renderOptionCards(els.classOptions, state.data.classes, primaryId, (id) => {
    state.character.classPlan.primaryClassId = id;
    renderClassStep();
  });

  renderSubclassPicker();
  renderClassProgress();
}

function renderSubclassPicker() {
  const cls = selectedPrimaryClass();
  const subclasses = cls.subclasses || [];
  const level = classLevel(cls.id);
  els.subclassPicker.innerHTML = "";
  subclasses.forEach((sub) => {
    const option = document.createElement("option");
    option.value = sub.name;
    option.textContent = `${sub.name} — ${sub.description}`;
    option.selected = state.character.classPlan.subclassByClass[cls.id] === sub.name;
    els.subclassPicker.appendChild(option);
  });
  const showSubclass = subclasses.length > 0 && level >= 3;
  els.subclassPickerWrap.classList.toggle("hidden", !showSubclass);
  if (showSubclass && !state.character.classPlan.subclassByClass[cls.id]) {
    state.character.classPlan.subclassByClass[cls.id] = subclasses[0].name;
  }
}

function confirmStartingClass() {
  const id = state.character.classPlan.primaryClassId;
  state.character.classPlan.levelsByClass = { [id]: 1 };
  state.character.classPlan.subclassByClass[id] = state.character.classPlan.subclassByClass[id] || "";
  state.classValidation = "";
  renderClassStep();
}

function renderClassProgress() {
  const total = totalClassLevel();
  els.totalLevel.textContent = `Total Level: ${total}`;

  const timeline = classTimelineEntries();
  els.classFeatureTimeline.innerHTML = timeline.map((row) => `<li><strong>${escapeHtml(row.label)}</strong>: ${row.features.map((f) => describeTermHtml(f.name, f.description)).join(", ")}</li>`).join("");

  const primary = state.character.classPlan.primaryClassId;
  const canLevelPrimary = primary && total < 20;
  els.addLevel.disabled = !canLevelPrimary;
  els.removeLevel.disabled = classLevel(primary) <= 1;

  els.multiclassList.classList.toggle("hidden", !state.multiclassOpen);
  if (state.multiclassOpen) renderMulticlassList();
  els.classValidation.textContent = total > 20 ? "Total class levels cannot exceed 20." : "";
}

function classTimelineEntries() {
  const entries = [];
  Object.entries(state.character.classPlan.levelsByClass).forEach(([classId, level]) => {
    const cls = classById(classId);
    for (let lv = 1; lv <= level; lv += 1) {
      const features = toFeatureObjects(cls.levels?.[lv] || [["No feature listed", "No details available for this level yet."]]);
      entries.push({ label: `${cls.name} Level ${lv}`, features });
      if (lv === 3 && state.character.classPlan.subclassByClass[classId]) {
        entries.push({ label: `${cls.name} Subclass`, features: [{ name: state.character.classPlan.subclassByClass[classId], description: subclassDescription(cls.id, state.character.classPlan.subclassByClass[classId]) }] });
      }
    }
  });
  return entries;
}

function renderMulticlassList() {
  const primary = state.character.classPlan.primaryClassId;
  const total = totalClassLevel();
  els.multiclassList.innerHTML = "";
  state.data.classes.filter((c) => c.id !== primary).forEach((cls) => {
    const meets = meetsMulticlassRequirement(cls.multiclassReq);
    const canAdd = meets && total < 20;
    const card = document.createElement("div");
    card.className = `option-card ${canAdd ? "" : "disabled"}`;
    card.innerHTML = `<strong>${cls.name}</strong><p>Requirement: ${cls.multiclassReq}</p><p>${meets ? "Requirement met" : "Requirement not met with current ability scores"}</p>`;
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
  state.character.classPlan.levelsByClass[classId] = (state.character.classPlan.levelsByClass[classId] || 0) + 1;
  renderClassStep();
}

function removeLevelFromPrimary() {
  const id = state.character.classPlan.primaryClassId;
  const current = classLevel(id);
  if (current <= 1) return;
  state.character.classPlan.levelsByClass[id] = current - 1;
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
  return Object.fromEntries(Object.entries(state.character.abilities).map(([a, v]) => [a, v + (race.racialAbilities?.[a] || 0)]));
}

function toFeatureObjects(raw) {
  return raw.map((entry) => Array.isArray(entry) ? { name: entry[0], description: entry[1] } : { name: String(entry), description: "No description provided." });
}

function subclassDescription(classId, subName) {
  const cls = classById(classId);
  return cls.subclasses?.find((s) => s.name === subName)?.description || "Subclass specialization.";
}

function renderAbilityStep() {
  els.abilitiesGrid.innerHTML = "";
  Object.entries(state.character.abilities).forEach(([ability, score]) => {
    const bonus = selectedRace().racialAbilities?.[ability] || 0;
    const card = document.createElement("div");
    card.className = "ability-card";
    card.innerHTML = `<h3>${ability}</h3><div class="ability-controls"><button type="button" data-dir="down">-</button><strong>${score}</strong><button type="button" data-dir="up">+</button></div><p>Point Cost: ${COST_BY_SCORE[score]}</p><p>Racial Bonus: ${bonus >= 0 ? "+" : ""}${bonus}</p><p><strong>Final: ${score + bonus}</strong></p>`;
    card.querySelectorAll("button").forEach((btn) => btn.addEventListener("click", () => updateAbility(ability, btn.dataset.dir === "up" ? score + 1 : score - 1)));
    els.abilitiesGrid.appendChild(card);
  });
  const spent = spentPoints();
  els.pointBuyStatus.textContent = `Points spent: ${spent} / ${POINT_BUY_BUDGET}. Remaining: ${POINT_BUY_BUDGET - spent}.`;
}

function updateAbility(ability, next) {
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
  const summary = {
    name: state.character.name || "Unnamed Adventurer",
    race: race.name,
    raceSelections: Object.fromEntries(Object.entries(state.character.raceChoices).filter(([key]) => key.startsWith(`${race.id}:`)).map(([key, val]) => [key.split(":")[1], val])),
    classes: state.character.classPlan,
    abilities: { base: state.character.abilities, final: finalAbilityScores(), pointBuySpent: spentPoints(), pointBuyBudget: POINT_BUY_BUDGET },
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
