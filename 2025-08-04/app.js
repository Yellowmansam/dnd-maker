const POINT_BUY_BUDGET = 27;
const STEP_ORDER = ["race", "class", "abilities", "background", "summary"];
const COST_BY_SCORE = { 8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9 };

const LANGUAGE_DESCRIPTIONS = {
  Common: "The trade tongue used across most of Faerûn and many civilized lands. Nearly every settlement has speakers.",
  Dwarvish: "A hard consonant language of dwarven clans. Useful in dwarven strongholds and for reading dwarven inscriptions.",
  Elvish: "A fluid, ancient language spoken by elves and in old elven records.",
  Draconic: "A precise arcane language tied to dragons and many magical traditions.",
  Gnomish: "A fast, technical language common among gnome communities and tinker guilds.",
  Orc: "A blunt language of many orc and half-orc tribes.",
  Halfling: "A practical and friendly language used by halfling communities.",
  Infernal: "The legalistic language of devils and infernal contracts.",
};

const DRAGONBORN_ANCESTRY = {
  Black: {
    breath: "5-by-30 ft. line of acid (DEX save). Targets take 2d6 acid damage on a failed save, half on success. Damage scales at higher levels.",
    resistance: "You have resistance to acid damage at all times.",
  },
  Blue: {
    breath: "5-by-30 ft. line of lightning (DEX save). Targets take 2d6 lightning damage on a failed save, half on success. Damage scales at higher levels.",
    resistance: "You have resistance to lightning damage at all times.",
  },
  Brass: {
    breath: "5-by-30 ft. line of fire (DEX save). Targets take 2d6 fire damage on a failed save, half on success. Damage scales at higher levels.",
    resistance: "You have resistance to fire damage at all times.",
  },
  Bronze: {
    breath: "5-by-30 ft. line of lightning (DEX save). Targets take 2d6 lightning damage on a failed save, half on success. Damage scales at higher levels.",
    resistance: "You have resistance to lightning damage at all times.",
  },
  Copper: {
    breath: "5-by-30 ft. line of acid (DEX save). Targets take 2d6 acid damage on a failed save, half on success. Damage scales at higher levels.",
    resistance: "You have resistance to acid damage at all times.",
  },
  Gold: {
    breath: "15 ft. cone of fire (DEX save). Targets take 2d6 fire damage on a failed save, half on success. Damage scales at higher levels.",
    resistance: "You have resistance to fire damage at all times.",
  },
  Green: {
    breath: "15 ft. cone of poison (CON save). Targets take 2d6 poison damage on a failed save, half on success. Damage scales at higher levels.",
    resistance: "You have resistance to poison damage at all times.",
  },
  Red: {
    breath: "15 ft. cone of fire (DEX save). Targets take 2d6 fire damage on a failed save, half on success. Damage scales at higher levels.",
    resistance: "You have resistance to fire damage at all times.",
  },
  Silver: {
    breath: "15 ft. cone of cold (CON save). Targets take 2d6 cold damage on a failed save, half on success. Damage scales at higher levels.",
    resistance: "You have resistance to cold damage at all times.",
  },
  White: {
    breath: "15 ft. cone of cold (CON save). Targets take 2d6 cold damage on a failed save, half on success. Damage scales at higher levels.",
    resistance: "You have resistance to cold damage at all times.",
  },
};

const CLASS_FEATURE_DESCRIPTIONS = {
  "Fighting Style": "At 1st level, you specialize in one combat approach (for example Defense or Archery), granting a persistent combat bonus that shapes how your fighter performs every round.",
  "Second Wind": "You can use a bonus action to recover hit points equal to 1d10 + fighter level. This is a personal emergency heal that refreshes on a short or long rest.",
  "Action Surge": "You push beyond normal limits and take one additional action on your turn. This is one of the fighter's strongest burst tools and refreshes on a short or long rest.",
  "Martial Archetype": "You pick your fighter subclass, which defines your signature combat identity and unlocks subclass features over time.",
  "Ability Score Improvement": "Increase one ability score by 2, two ability scores by 1, or optionally take a feat if the table uses feats.",
  "Extra Attack": "When you take the Attack action on your turn, you can attack twice instead of once.",
  Spellcasting: "You prepare and cast spells from your class spell list, using spell slots and your class's spellcasting ability.",
  "Arcane Recovery": "Once per day after a short rest, recover expended spell slots with a combined level up to half your wizard level (rounded up).",
  "Arcane Tradition": "Choose your wizard school/subclass; this grants new features and strongly defines your playstyle.",
  Expertise: "Choose proficient skills/tools and double your proficiency bonus for those checks, making you exceptionally reliable in that niche.",
  "Sneak Attack": "Once per turn, deal extra damage when you have advantage or an ally is threatening the target and you use a finesse/ranged weapon.",
  "Thieves' Cant": "A coded language of signs and phrases used by rogues to pass hidden meaning in ordinary conversation.",
  "Cunning Action": "Use Dash, Disengage, or Hide as a bonus action each turn, greatly improving rogue mobility and stealth tempo.",
  "Roguish Archetype": "Choose your rogue subclass, which grants your core specialization.",
  "Uncanny Dodge": "Use your reaction to halve the damage from one attacker you can see.",
  "Divine Domain": "Select your cleric domain, which grants domain spells and themed divine features.",
  "Channel Divinity": "Channel divine power for domain-specific effects and core cleric options.",
  "Destroy Undead (CR 1/2)": "When undead fail your Turn Undead, weak undead are destroyed outright instead of fleeing.",
};

const FEATURE_DESCRIPTIONS = {
  "Draconic Ancestry": "Choose your dragon ancestry. It determines your breath weapon shape/damage type and your permanent elemental resistance.",
  "Breath Weapon": "You exhale destructive elemental energy tied to your ancestry. Shape and damage type vary by dragon ancestry.",
  "Damage Resistance": "You permanently take half damage from the elemental type linked to your draconic ancestry.",
  Darkvision: "You can see in darkness up to a set range as dim light, and in dim light as bright light.",
  "Dwarven Resilience": "You have advantage on saving throws against poison and resistance to poison damage.",
  "Dwarven Combat Training": "You gain proficiency with traditional dwarven martial weapons.",
  Stonecunning: "You have exceptional geological intuition and gain expertise-like bonus on stonework-related History checks.",
  "Keen Senses": "You gain proficiency in Perception, improving passive and active noticing.",
  "Fey Ancestry": "You have advantage on saves against charm and cannot be magically put to sleep.",
  Trance: "Instead of sleeping, you meditate deeply for 4 hours and gain the rest benefits others get from 8 hours.",
  "Gnome Cunning": "You have advantage on all INT/WIS/CHA saving throws against magic.",
  "Skill Versatility": "You gain flexible extra skill proficiencies to fill gaps in your party role.",
  "Relentless Endurance": "Once per long rest, when reduced to 0 HP but not killed outright, drop to 1 HP instead.",
  "Savage Attacks": "On a critical hit with a melee weapon attack, roll one additional weapon die for bonus damage.",
  Lucky: "When you roll a 1 on attack rolls, ability checks, or saves, reroll and use the new result.",
  Brave: "You have advantage on saving throws against the frightened condition.",
  "Halfling Nimbleness": "You can move through spaces occupied by creatures larger than you.",
  Versatile: "Humans adapt quickly to many roles and receive broad, general-purpose benefits.",
  "Hellish Resistance": "You take half damage from fire, a very common damage type in 5e.",
  "Infernal Legacy": "You learn themed innate spells as you level, reflecting infernal bloodline magic.",
  "Shelter of the Faithful": "You can request aid and simple lodging from temples aligned with your faith.",
  "Military Rank": "Other soldiers often recognize your authority and provide basic cooperation.",
  "Criminal Contact": "You maintain a reliable underworld contact for messages, goods, and information.",
  Researcher: "If you don't know a piece of lore, you usually know where and from whom to obtain it.",
};

const BASE_DATA = {
  races: [
    {
      id: "dragonborn",
      name: "Dragonborn",
      languages: ["Common", "Draconic"],
      skills: ["No automatic skill proficiency from race"],
      features: ["Draconic Ancestry", "Breath Weapon", "Damage Resistance"],
      racialAbilities: { STR: 2, CHA: 1 },
      options: [{ key: "draconicAncestry", label: "Draconic Ancestry", help: "Choose your dragon lineage. This changes both your breath weapon and your damage resistance.", choices: Object.keys(DRAGONBORN_ANCESTRY), descriptions: Object.fromEntries(Object.entries(DRAGONBORN_ANCESTRY).map(([k, v]) => [k, `Breath: ${v.breath} Resistance: ${v.resistance}`])) }],
    },
    { id: "dwarf", name: "Dwarf", languages: ["Common", "Dwarvish"], skills: ["Battleaxe, handaxe, light hammer, warhammer proficiency", "Tool proficiency"], features: ["Darkvision", "Dwarven Resilience", "Dwarven Combat Training", "Stonecunning"], racialAbilities: { CON: 2 } },
    { id: "elf", name: "Elf", languages: ["Common", "Elvish"], skills: ["Perception proficiency"], features: ["Darkvision", "Keen Senses", "Fey Ancestry", "Trance"], racialAbilities: { DEX: 2 } },
    { id: "gnome", name: "Gnome", languages: ["Common", "Gnomish"], skills: ["No automatic skill proficiency from race"], features: ["Darkvision", "Gnome Cunning"], racialAbilities: { INT: 2 } },
    { id: "half-elf", name: "Half-Elf", languages: ["Common", "Elvish"], skills: ["Two skill proficiencies of your choice"], features: ["Darkvision", "Fey Ancestry", "Skill Versatility"], racialAbilities: { CHA: 2 }, options: [{ key: "bonusLanguage", label: "Bonus Language", help: "Half-Elves learn one additional language of their choice.", choices: Object.keys(LANGUAGE_DESCRIPTIONS), descriptions: LANGUAGE_DESCRIPTIONS }] },
    { id: "half-orc", name: "Half-Orc", languages: ["Common", "Orc"], skills: ["Intimidation proficiency"], features: ["Darkvision", "Relentless Endurance", "Savage Attacks"], racialAbilities: { STR: 2, CON: 1 } },
    { id: "halfling", name: "Halfling", languages: ["Common", "Halfling"], skills: ["No automatic skill proficiency from race"], features: ["Lucky", "Brave", "Halfling Nimbleness"], racialAbilities: { DEX: 2 } },
    { id: "human", name: "Human", languages: ["Common"], skills: ["No automatic skill proficiency from race"], features: ["Versatile"], racialAbilities: { STR: 1, DEX: 1, CON: 1, INT: 1, WIS: 1, CHA: 1 }, options: [{ key: "bonusLanguage", label: "Bonus Language", help: "Humans learn one additional language reflecting their broad cultural adaptability.", choices: Object.keys(LANGUAGE_DESCRIPTIONS), descriptions: LANGUAGE_DESCRIPTIONS }] },
    { id: "tiefling", name: "Tiefling", languages: ["Common", "Infernal"], skills: ["No automatic skill proficiency from race"], features: ["Darkvision", "Hellish Resistance", "Infernal Legacy"], racialAbilities: { INT: 1, CHA: 2 } },
  ],
  classes: [
    { id: "fighter", name: "Fighter", hitDie: "d10", proficiencies: ["All armor", "Shields", "Simple and martial weapons"], multiclassReq: "STR 13 or DEX 13", levelFeatures: { 1: ["Fighting Style", "Second Wind"], 2: ["Action Surge"], 3: ["Martial Archetype"], 4: ["Ability Score Improvement"], 5: ["Extra Attack"] } },
    { id: "wizard", name: "Wizard", hitDie: "d6", proficiencies: ["Daggers, darts, slings, quarterstaffs, light crossbows"], multiclassReq: "INT 13", levelFeatures: { 1: ["Spellcasting", "Arcane Recovery"], 2: ["Arcane Tradition"], 3: ["2nd-level spells"], 4: ["Ability Score Improvement"], 5: ["3rd-level spells"] } },
    { id: "rogue", name: "Rogue", hitDie: "d8", proficiencies: ["Light armor", "Simple weapons", "Hand crossbows, longswords, rapiers, shortswords"], multiclassReq: "DEX 13", levelFeatures: { 1: ["Expertise", "Sneak Attack", "Thieves' Cant"], 2: ["Cunning Action"], 3: ["Roguish Archetype"], 4: ["Ability Score Improvement"], 5: ["Uncanny Dodge"] } },
    { id: "cleric", name: "Cleric", hitDie: "d8", proficiencies: ["Light and medium armor", "Shields", "Simple weapons"], multiclassReq: "WIS 13", levelFeatures: { 1: ["Spellcasting", "Divine Domain"], 2: ["Channel Divinity"], 3: ["2nd-level spells"], 4: ["Ability Score Improvement"], 5: ["Destroy Undead (CR 1/2)", "3rd-level spells"] } },
  ],
  backgrounds: [
    { id: "acolyte", name: "Acolyte", skills: ["Insight", "Religion"], feature: "Shelter of the Faithful", equipment: ["Holy symbol", "Prayer book", "5 sticks of incense", "Vestments", "15 gp"], bonuses: "No direct ability bonus in core 5e" },
    { id: "soldier", name: "Soldier", skills: ["Athletics", "Intimidation"], feature: "Military Rank", equipment: ["Insignia", "Trophy from enemy", "Dice or cards", "10 gp"], bonuses: "No direct ability bonus in core 5e" },
    { id: "criminal", name: "Criminal", skills: ["Deception", "Stealth"], feature: "Criminal Contact", equipment: ["Crowbar", "Dark common clothes", "15 gp"], bonuses: "No direct ability bonus in core 5e" },
    { id: "sage", name: "Sage", skills: ["Arcana", "History"], feature: "Researcher", equipment: ["Bottle of ink", "Quill", "Small knife", "Letter", "10 gp"], bonuses: "No direct ability bonus in core 5e" },
  ],
  spells: [],
  feats: [],
  languages: Object.entries(LANGUAGE_DESCRIPTIONS).map(([name, description]) => ({ name, description })),
};

const state = {
  step: "race",
  customOpen: false,
  data: structuredClone(BASE_DATA),
  character: { name: "", raceId: "dragonborn", raceChoices: {}, classId: "fighter", primaryLevel: 1, multiclassEnabled: false, multiclassId: "wizard", multiclassLevel: 1, abilities: { STR: 8, DEX: 8, CON: 8, INT: 8, WIS: 8, CHA: 8 }, backgroundId: "acolyte" },
  custom: { submitted: [], editingId: null },
  hoverTimer: null,
};

const els = {
  stepper: document.getElementById("stepper"),
  customPage: document.getElementById("custom-page"),
  openCustom: document.getElementById("open-custom"),
  closeCustom: document.getElementById("close-custom"),
  importCustom: document.getElementById("import-custom"),
  exportCustom: document.getElementById("export-custom"),
  importCustomFile: document.getElementById("import-custom-file"),
  submittedItems: document.getElementById("submitted-items"),
  customType: document.getElementById("custom-type"),
  customStatus: document.getElementById("custom-status"),
  clearCustom: document.getElementById("clear-custom"),
  submitCustom: document.getElementById("submit-custom"),
  applyCustom: document.getElementById("apply-custom"),
  quickfillBox: document.getElementById("quickfill-box"),
  tooltip: document.getElementById("hover-tooltip"),
  panels: { race: document.getElementById("step-race"), class: document.getElementById("step-class"), abilities: document.getElementById("step-abilities"), background: document.getElementById("step-background"), summary: document.getElementById("step-summary") },
  raceOptions: document.getElementById("race-options"),
  raceDetails: document.getElementById("race-details"),
  raceOptionConfig: document.getElementById("race-option-config"),
  classOptions: document.getElementById("class-options"),
  classDetails: document.getElementById("class-details"),
  classValidation: document.getElementById("class-validation"),
  characterName: document.getElementById("character-name"),
  primaryLevel: document.getElementById("primary-level"),
  multiclassEnabled: document.getElementById("multiclass-enabled"),
  multiclassClass: document.getElementById("multiclass-class"),
  multiclassLevel: document.getElementById("multiclass-level"),
  multiclassClassWrap: document.getElementById("multiclass-class-wrap"),
  multiclassLevelWrap: document.getElementById("multiclass-level-wrap"),
  abilitiesGrid: document.getElementById("abilities-grid"),
  pointBuyStatus: document.getElementById("point-buy-status"),
  backgroundOptions: document.getElementById("background-options"),
  backgroundDetails: document.getElementById("background-details"),
  characterSheet: document.getElementById("character-sheet"),
};

bindEvents();
renderAll();

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

  document.getElementById("confirm-race").addEventListener("click", () => goStep("class"));
  document.getElementById("back-to-race").addEventListener("click", () => goStep("race"));
  document.getElementById("confirm-class").addEventListener("click", confirmClassStep);
  document.getElementById("back-to-class").addEventListener("click", () => goStep("class"));
  document.getElementById("confirm-abilities").addEventListener("click", () => goStep("background"));
  document.getElementById("back-to-abilities").addEventListener("click", () => goStep("abilities"));
  document.getElementById("confirm-background").addEventListener("click", () => goStep("summary"));
  document.getElementById("back-to-background").addEventListener("click", () => goStep("background"));
  document.getElementById("download-json").addEventListener("click", downloadJson);

  els.primaryLevel.addEventListener("input", (e) => { state.character.primaryLevel = clamp(Number(e.target.value), 1, 20); renderClassDetails(); });
  els.multiclassEnabled.addEventListener("change", (e) => { state.character.multiclassEnabled = e.target.checked; renderClassStep(); });
  els.multiclassClass.addEventListener("change", (e) => { state.character.multiclassId = e.target.value; renderClassDetails(); });
  els.multiclassLevel.addEventListener("input", (e) => { state.character.multiclassLevel = clamp(Number(e.target.value), 1, 19); renderClassDetails(); });
  els.characterName.addEventListener("input", (e) => { state.character.name = e.target.value; });
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
  STEP_ORDER.forEach((stepName) => {
    const li = document.createElement("li");
    li.textContent = capitalize(stepName);
    if (state.step === stepName) li.classList.add("active");
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
    <p><strong>Languages:</strong> ${selectedLanguages.join(", ") || "None"}</p>
    <p><strong>Skills/Proficiencies:</strong> ${toArray(race.skills).join(", ") || "None"}</p>
    <p><strong>Features:</strong> ${toArray(race.features).map((feature) => describeTermHtml(feature, featureDescriptionForRace(race, feature))).join(", ") || "None"}</p>
    <p><strong>Racial Ability Bonuses:</strong> ${formatAbilityBonuses(race.racialAbilities || {})}</p>
  `;

  renderRaceOptionSelectors(race);
}

function featureDescriptionForRace(race, feature) {
  if (race.id === "dragonborn") {
    const ancestry = state.character.raceChoices["dragonborn:draconicAncestry"];
    if (ancestry && DRAGONBORN_ANCESTRY[ancestry]) {
      if (feature === "Breath Weapon") return `(${ancestry} ancestry) ${DRAGONBORN_ANCESTRY[ancestry].breath}`;
      if (feature === "Damage Resistance") return `(${ancestry} ancestry) ${DRAGONBORN_ANCESTRY[ancestry].resistance}`;
    }
  }
  return FEATURE_DESCRIPTIONS[feature];
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
    const choiceDescription = option.descriptions?.[current] || "";
    return `
      <label>
        ${option.label}
        <select data-race-option="${key}">
          <option value="">Choose an option</option>
          ${option.choices.map((choice) => `<option value="${escapeHtml(choice)}" ${choice === current ? "selected" : ""}>${escapeHtml(choice)}</option>`).join("")}
        </select>
      </label>
      <p><em>${escapeHtml(option.help || "")}</em></p>
      <p class="option-description">${choiceDescription ? `<strong>${escapeHtml(current)}:</strong> ${escapeHtml(choiceDescription)}` : "Select an option to view its full description."}</p>
    `;
  }).join("<hr />")}`;

  els.raceOptionConfig.querySelectorAll("select[data-race-option]").forEach((select) => {
    select.addEventListener("change", (event) => {
      state.character.raceChoices[event.target.dataset.raceOption] = event.target.value;
      renderRaceStep();
    });
  });
}

function renderClassStep() {
  els.characterName.value = state.character.name;
  renderOptionCards(els.classOptions, state.data.classes, state.character.classId, (id) => {
    state.character.classId = id;
    if (state.character.multiclassId === id) state.character.multiclassId = state.data.classes.find((c) => c.id !== id)?.id || id;
    renderClassStep();
  });

  fillMulticlassSelect();
  els.primaryLevel.value = state.character.primaryLevel;
  els.multiclassEnabled.checked = state.character.multiclassEnabled;
  els.multiclassClassWrap.classList.toggle("hidden", !state.character.multiclassEnabled);
  els.multiclassLevelWrap.classList.toggle("hidden", !state.character.multiclassEnabled);
  els.multiclassLevel.value = state.character.multiclassLevel;

  renderClassDetails();
}

function renderClassDetails() {
  const cls = selectedClass();
  const max = state.character.multiclassEnabled ? 19 : 20;
  state.character.primaryLevel = clamp(state.character.primaryLevel, 1, max);
  els.primaryLevel.max = String(max);

  const rows = [];
  for (let level = 1; level <= state.character.primaryLevel; level += 1) {
    const features = toArray(cls.levelFeatures?.[level] || ["No feature listed in current data"]);
    rows.push(`<li><strong>Level ${level}:</strong> ${features.map((f) => describeTermHtml(f, CLASS_FEATURE_DESCRIPTIONS[f] || FEATURE_DESCRIPTIONS[f])).join(", ")}</li>`);
  }

  const multi = state.character.multiclassEnabled
    ? `<p><strong>Multiclass:</strong> ${classById(state.character.multiclassId).name} ${state.character.multiclassLevel} (Requirement: ${classById(state.character.multiclassId).multiclassReq})</p>`
    : "<p><strong>Multiclass:</strong> Disabled</p>";

  els.classDetails.innerHTML = `<h3>${cls.name}</h3><p><strong>Hit Die:</strong> ${cls.hitDie}</p><p><strong>Starting Proficiencies:</strong> ${toArray(cls.proficiencies).join(", ")}</p><p><strong>Multiclass Requirement:</strong> ${cls.multiclassReq}</p>${multi}<h4>Features up to selected level</h4><ul>${rows.join("")}</ul>`;
  els.classValidation.textContent = totalCharacterLevel() > 20 ? "Total levels cannot exceed 20." : "";
}

function fillMulticlassSelect() {
  const options = state.data.classes.filter((c) => c.id !== state.character.classId);
  els.multiclassClass.innerHTML = "";
  options.forEach((c) => {
    const option = document.createElement("option");
    option.value = c.id;
    option.textContent = c.name;
    option.selected = c.id === state.character.multiclassId;
    els.multiclassClass.appendChild(option);
  });
}

function confirmClassStep() {
  if (totalCharacterLevel() > 20) return;
  goStep("abilities");
}

function renderAbilityStep() {
  els.abilitiesGrid.innerHTML = "";
  Object.entries(state.character.abilities).forEach(([ability, score]) => {
    const bonus = selectedRace().racialAbilities?.[ability] || 0;
    const card = document.createElement("div");
    card.className = "ability-card";
    card.innerHTML = `<h3>${ability}</h3><div class="ability-controls"><button type="button" data-dir="down">-</button><strong>${score}</strong><button type="button" data-dir="up">+</button></div><p>Point Cost: ${COST_BY_SCORE[score]}</p><p>Racial Bonus: ${bonus >= 0 ? "+" : ""}${bonus}</p><p><strong>Final: ${score + bonus}</strong></p>`;
    card.querySelectorAll("button").forEach((btn) => btn.addEventListener("click", () => updateAbilityScore(ability, btn.dataset.dir === "up" ? score + 1 : score - 1)));
    els.abilitiesGrid.appendChild(card);
  });
  const spent = spentPoints();
  els.pointBuyStatus.textContent = `Points spent: ${spent} / ${POINT_BUY_BUDGET}. Remaining: ${POINT_BUY_BUDGET - spent}.`;
}

function updateAbilityScore(ability, next) {
  if (next < 8 || next > 15) return;
  const prev = state.character.abilities[ability];
  state.character.abilities[ability] = next;
  if (spentPoints() > POINT_BUY_BUDGET) state.character.abilities[ability] = prev;
  renderAbilityStep();
}

function renderBackgroundStep() {
  renderOptionCards(els.backgroundOptions, state.data.backgrounds, state.character.backgroundId, (id) => {
    state.character.backgroundId = id;
    renderBackgroundStep();
  });
  const bg = selectedBackground();
  els.backgroundDetails.innerHTML = `<h3>${bg.name}</h3><p><strong>Skills:</strong> ${toArray(bg.skills).join(", ")}</p><p><strong>Feature:</strong> ${describeTermHtml(bg.feature, FEATURE_DESCRIPTIONS[bg.feature])}</p><p><strong>Equipment:</strong> ${toArray(bg.equipment).join(", ")}</p><p><strong>Background Stats/Bonuses:</strong> ${bg.bonuses || "None"}</p>`;
}

function renderSummary() {
  const race = selectedRace();
  const finalAbilities = Object.fromEntries(Object.entries(state.character.abilities).map(([a, v]) => [a, v + (race.racialAbilities?.[a] || 0)]));
  const raceSelections = Object.fromEntries(Object.entries(state.character.raceChoices).filter(([key]) => key.startsWith(`${race.id}:`)).map(([key, value]) => [key.split(":")[1], value]));
  const summary = {
    name: state.character.name || "Unnamed Adventurer",
    race: race.name,
    raceSelections,
    classPlan: {
      primaryClass: selectedClass().name,
      primaryLevel: state.character.primaryLevel,
      multiclassEnabled: state.character.multiclassEnabled,
      secondaryClass: state.character.multiclassEnabled ? classById(state.character.multiclassId).name : null,
      secondaryLevel: state.character.multiclassEnabled ? state.character.multiclassLevel : null,
      totalLevel: totalCharacterLevel(),
    },
    abilities: { base: state.character.abilities, final: finalAbilities, pointBuySpent: spentPoints(), pointBuyBudget: POINT_BUY_BUDGET },
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
    const rect = target.getBoundingClientRect();
    els.tooltip.style.left = `${rect.left + window.scrollX}px`;
    els.tooltip.style.top = `${rect.bottom + window.scrollY + 8}px`;
    els.tooltip.classList.remove("hidden");
    els.tooltip.classList.add("show");
  }, 500);
}

function hideTooltip(event) {
  if (!event.target.closest(".desc-term")) return;
  clearTimeout(state.hoverTimer);
  els.tooltip.classList.remove("show");
  els.tooltip.classList.add("hidden");
}

function describeTermHtml(name, description) {
  if (!description) return escapeHtml(name);
  return `<span class="desc-term" data-desc="${escapeHtml(description)}">${escapeHtml(name)}</span>`;
}

function showQuickFill(input) {
  const pool = quickFillOptions(input.dataset.domain);
  const parts = input.value.split(",");
  const current = parts[parts.length - 1].trim().toLowerCase();
  if (!current) return hideQuickFill();
  const matches = pool.filter((item) => item.toLowerCase().includes(current)).slice(0, 8);
  if (!matches.length) return hideQuickFill();

  els.quickfillBox.innerHTML = "";
  const rect = input.getBoundingClientRect();
  matches.forEach((match) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = match;
    btn.addEventListener("click", () => {
      parts[parts.length - 1] = ` ${match}`;
      input.value = parts.map((entry) => entry.trim()).filter(Boolean).join(", ");
      hideQuickFill();
    });
    els.quickfillBox.appendChild(btn);
  });
  els.quickfillBox.style.left = `${rect.left + window.scrollX}px`;
  els.quickfillBox.style.top = `${rect.bottom + window.scrollY + 4}px`;
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
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `option-card ${item.id === selectedId ? "selected" : ""}`;
    btn.innerHTML = `<strong>${escapeHtml(item.name)}</strong>`;
    btn.addEventListener("click", () => onSelect(item.id));
    container.appendChild(btn);
  });
}

function renderCustomFieldsByType() {
  const type = els.customType.value;
  document.querySelectorAll(".type-fields").forEach((node) => node.classList.add("hidden"));
  document.getElementById(`type-${type}`)?.classList.remove("hidden");
}

function renderSubmittedList() {
  els.submittedItems.innerHTML = "";
  if (!state.custom.submitted.length) { els.submittedItems.innerHTML = "<li>No submitted items yet.</li>"; return; }
  state.custom.submitted.forEach((item) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = item.dirty ? "dirty" : "";
    btn.textContent = `${labelForType(item.type)}: ${item.name}${item.dirty ? " (needs resubmit)" : ""}`;
    btn.addEventListener("click", () => loadCustomItem(item.id));
    li.appendChild(btn);
    els.submittedItems.appendChild(li);
  });
}

function loadCustomItem(itemId) {
  const item = state.custom.submitted.find((entry) => entry.id === itemId);
  if (!item) return;
  state.custom.editingId = item.id;
  els.customType.value = item.type;
  renderCustomFieldsByType();
  fillTypeFields(item.type, item.name, item.data);
  els.customStatus.textContent = item.dirty ? "Edited item needs resubmit." : "Viewing submitted item; edit to require resubmission.";
}

function clearCustomEditor() {
  state.custom.editingId = null;
  document.querySelectorAll("#custom-page input, #custom-page textarea").forEach((element) => {
    if (element.id === "spell-level") element.value = "0";
    else if (element.id === "race-abilities") element.value = '{"STR":1}';
    else if (element.type !== "file") element.value = "";
  });
  els.customType.value = "races";
  renderCustomFieldsByType();
  els.customStatus.textContent = "Creating a new custom item.";
}

function submitCustomItem() {
  const record = collectTypeFields(els.customType.value);
  if (!record) return;
  if (state.custom.editingId) {
    const existing = state.custom.submitted.find((entry) => entry.id === state.custom.editingId);
    if (existing) Object.assign(existing, record, { dirty: false });
    els.customStatus.textContent = "Custom item updated and submitted.";
  } else {
    state.custom.submitted.push({ ...record, id: crypto.randomUUID(), dirty: false });
    els.customStatus.textContent = "Custom item submitted.";
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
      return { type, name, data: { description: byId("language-description").value.trim() || "Custom language description." } };
    }
  } catch {
    return fail("One or more fields are invalid.");
  }
  return fail("Unsupported type.");
}

function fillTypeFields(type, name, data) {
  if (type === "races") {
    byId("race-name").value = name; byId("race-languages").value = toArray(data.languages).join(", "); byId("race-skills").value = toArray(data.skills).join(", "); byId("race-features").value = toArray(data.features).join(", "); byId("race-abilities").value = JSON.stringify(data.racialAbilities || {}, null, 2); return;
  }
  if (type === "classes") {
    byId("class-name").value = name; byId("class-hitdie").value = data.hitDie || "d8"; byId("class-proficiencies").value = toArray(data.proficiencies).join(", "); byId("class-multi-req").value = data.multiclassReq || "None"; byId("class-features").value = data.featureRows || ""; return;
  }
  if (type === "backgrounds") {
    byId("background-name").value = name; byId("background-skills").value = toArray(data.skills).join(", "); byId("background-feature-name").value = data.feature || ""; byId("background-feature-desc").value = data.featureDescription || ""; byId("background-equipment").value = toArray(data.equipment).join(", "); byId("background-bonuses").value = data.bonuses || ""; return;
  }
  if (type === "spells") {
    byId("spell-name").value = name; byId("spell-level").value = String(data.level ?? 0); byId("spell-school").value = data.school || ""; byId("spell-description").value = data.description || ""; return;
  }
  if (type === "feats") {
    byId("feat-name").value = name; byId("feat-prereq").value = data.prerequisite || ""; byId("feat-description").value = data.description || ""; return;
  }
  if (type === "languages") {
    byId("language-name").value = name; byId("language-description").value = data.description || "";
  }
}

function importCustomData(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result || "{}"));
      const items = Array.isArray(parsed.items) ? parsed.items : [];
      state.custom.submitted = items.map((item) => ({ id: crypto.randomUUID(), type: item.type, name: item.name, data: item.data || {}, dirty: false }));
      els.customStatus.textContent = "Imported items are already submitted.";
      renderSubmittedList();
    } catch {
      els.customStatus.textContent = "Import failed: invalid JSON.";
    }
  };
  reader.readAsText(file);
  event.target.value = "";
}

function exportCustomData() {
  const payload = { items: state.custom.submitted.map(({ type, name, data }) => ({ type, name, data })) };
  downloadBlob(payload, "dnd-custom-content.json");
}

function applyCustomDataToBuilder() {
  state.data = structuredClone(BASE_DATA);
  state.custom.submitted.forEach((item) => {
    const normalized = normalizeCustomRecord(item);
    if (normalized) state.data[item.type].push(normalized);
  });

  state.data.languages.forEach((language) => {
    if (language?.name) LANGUAGE_DESCRIPTIONS[language.name] = language.description || "Custom language.";
  });

  ensureValidSelections();
}

function normalizeCustomRecord(item) {
  const id = `custom-${slugify(item.name) || crypto.randomUUID().slice(0, 8)}`;
  const { type, name, data } = item;
  if (type === "races") return { id, name, languages: data.languages || [], skills: data.skills || [], features: data.features || [], racialAbilities: data.racialAbilities || {} };
  if (type === "classes") {
    const levelFeatures = {};
    String(data.featureRows || "").split("\n").map((x) => x.trim()).filter(Boolean).forEach((row) => {
      const [lvl, feat, desc] = row.split("|").map((x) => x?.trim());
      const level = Number(lvl);
      if (!Number.isFinite(level) || !feat) return;
      if (!levelFeatures[level]) levelFeatures[level] = [];
      levelFeatures[level].push(feat);
      if (desc) CLASS_FEATURE_DESCRIPTIONS[feat] = desc;
    });
    return { id, name, hitDie: data.hitDie || "d8", proficiencies: data.proficiencies || [], multiclassReq: data.multiclassReq || "None", levelFeatures };
  }
  if (type === "backgrounds") {
    if (data.feature && data.featureDescription) FEATURE_DESCRIPTIONS[data.feature] = data.featureDescription;
    return { id, name, skills: data.skills || [], feature: data.feature || "Custom Feature", equipment: data.equipment || [], bonuses: data.bonuses || "Custom bonuses" };
  }
  if (type === "languages") return { id, name, description: data.description || "Custom language." };
  if (type === "spells" || type === "feats") return { id, name, ...data };
  return null;
}

function ensureValidSelections() {
  if (!state.data.races.some((x) => x.id === state.character.raceId)) state.character.raceId = state.data.races[0]?.id || "";
  if (!state.data.classes.some((x) => x.id === state.character.classId)) state.character.classId = state.data.classes[0]?.id || "";
  if (!state.data.backgrounds.some((x) => x.id === state.character.backgroundId)) state.character.backgroundId = state.data.backgrounds[0]?.id || "";
  if (!state.data.classes.some((x) => x.id === state.character.multiclassId && x.id !== state.character.classId)) state.character.multiclassId = state.data.classes.find((x) => x.id !== state.character.classId)?.id || state.character.classId;
}

function selectedRace() { return state.data.races.find((x) => x.id === state.character.raceId) || state.data.races[0]; }
function selectedClass() { return classById(state.character.classId); }
function classById(id) { return state.data.classes.find((x) => x.id === id) || state.data.classes[0]; }
function selectedBackground() { return state.data.backgrounds.find((x) => x.id === state.character.backgroundId) || state.data.backgrounds[0]; }
function spentPoints() { return Object.values(state.character.abilities).reduce((sum, score) => sum + COST_BY_SCORE[score], 0); }
function totalCharacterLevel() { return state.character.primaryLevel + (state.character.multiclassEnabled ? state.character.multiclassLevel : 0); }
function formatAbilityBonuses(bonuses) { const pairs = Object.entries(bonuses || {}); return pairs.length ? pairs.map(([a, v]) => `${a} ${v >= 0 ? "+" : ""}${v}`).join(", ") : "None"; }
function downloadJson() { downloadBlob(JSON.parse(els.characterSheet.textContent), `${(state.character.name || "character").replace(/\s+/g, "-").toLowerCase()}.json`); }
function downloadBlob(data, filename) { const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url); }
function toArray(value) { if (Array.isArray(value)) return value; if (typeof value === "string" && value.trim()) return [value.trim()]; return []; }
function csv(value) { return String(value || "").split(",").map((entry) => entry.trim()).filter(Boolean); }
function fail(message) { els.customStatus.textContent = message; return null; }
function slugify(value) { return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""); }
function labelForType(type) { return { races: "Race", classes: "Class", spells: "Spell", backgrounds: "Background", feats: "Feat", languages: "Language" }[type] || type; }
function capitalize(value) { return `${value[0].toUpperCase()}${value.slice(1)}`; }
function clamp(value, min, max) { return Math.min(Math.max(value, min), max); }
function byId(id) { return document.getElementById(id); }
function escapeHtml(text) { return String(text).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"); }
