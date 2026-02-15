const POINT_BUY_BUDGET = 27;
const STEP_ORDER = ["race", "class", "abilities", "background", "summary"];

const COST_BY_SCORE = {
  8: 0,
  9: 1,
  10: 2,
  11: 3,
  12: 4,
  13: 5,
  14: 7,
  15: 9,
};

const DATA = {
  races: [
    {
      id: "dragonborn",
      name: "Dragonborn",
      languages: ["Common", "Draconic"],
      skills: ["No automatic skill proficiency from race"],
      features: ["Draconic Ancestry", "Breath Weapon", "Damage Resistance"],
      racialAbilities: { STR: 2, CHA: 1 },
    },
    {
      id: "dwarf",
      name: "Dwarf",
      languages: ["Common", "Dwarvish"],
      skills: ["Battleaxe, handaxe, light hammer, warhammer proficiency", "Tool proficiency"],
      features: ["Darkvision", "Dwarven Resilience", "Dwarven Combat Training", "Stonecunning"],
      racialAbilities: { CON: 2 },
    },
    {
      id: "elf",
      name: "Elf",
      languages: ["Common", "Elvish"],
      skills: ["Perception proficiency"],
      features: ["Darkvision", "Keen Senses", "Fey Ancestry", "Trance"],
      racialAbilities: { DEX: 2 },
    },
    {
      id: "gnome",
      name: "Gnome",
      languages: ["Common", "Gnomish"],
      skills: ["No automatic skill proficiency from race"],
      features: ["Darkvision", "Gnome Cunning"],
      racialAbilities: { INT: 2 },
    },
    {
      id: "half-elf",
      name: "Half-Elf",
      languages: ["Common", "Elvish", "One extra language"],
      skills: ["Two skill proficiencies of your choice"],
      features: ["Darkvision", "Fey Ancestry", "Skill Versatility"],
      racialAbilities: { CHA: 2 },
    },
    {
      id: "half-orc",
      name: "Half-Orc",
      languages: ["Common", "Orc"],
      skills: ["Intimidation proficiency"],
      features: ["Darkvision", "Relentless Endurance", "Savage Attacks"],
      racialAbilities: { STR: 2, CON: 1 },
    },
    {
      id: "halfling",
      name: "Halfling",
      languages: ["Common", "Halfling"],
      skills: ["No automatic skill proficiency from race"],
      features: ["Lucky", "Brave", "Halfling Nimbleness"],
      racialAbilities: { DEX: 2 },
    },
    {
      id: "human",
      name: "Human",
      languages: ["Common", "One extra language"],
      skills: ["No automatic skill proficiency from race"],
      features: ["Versatile"],
      racialAbilities: { STR: 1, DEX: 1, CON: 1, INT: 1, WIS: 1, CHA: 1 },
    },
    {
      id: "tiefling",
      name: "Tiefling",
      languages: ["Common", "Infernal"],
      skills: ["No automatic skill proficiency from race"],
      features: ["Darkvision", "Hellish Resistance", "Infernal Legacy"],
      racialAbilities: { INT: 1, CHA: 2 },
    },
  ],
  classes: [
    {
      id: "fighter",
      name: "Fighter",
      hitDie: "d10",
      proficiencies: ["All armor", "Shields", "Simple and martial weapons"],
      multiclassReq: "STR 13 or DEX 13",
      levelFeatures: {
        1: ["Fighting Style", "Second Wind"],
        2: ["Action Surge"],
        3: ["Martial Archetype"],
        4: ["Ability Score Improvement"],
        5: ["Extra Attack"],
      },
    },
    {
      id: "wizard",
      name: "Wizard",
      hitDie: "d6",
      proficiencies: ["Daggers, darts, slings, quarterstaffs, light crossbows"],
      multiclassReq: "INT 13",
      levelFeatures: {
        1: ["Spellcasting", "Arcane Recovery"],
        2: ["Arcane Tradition"],
        3: ["2nd-level spells"],
        4: ["Ability Score Improvement"],
        5: ["3rd-level spells"],
      },
    },
    {
      id: "rogue",
      name: "Rogue",
      hitDie: "d8",
      proficiencies: ["Light armor", "Simple weapons", "Hand crossbows, longswords, rapiers, shortswords"],
      multiclassReq: "DEX 13",
      levelFeatures: {
        1: ["Expertise", "Sneak Attack", "Thieves' Cant"],
        2: ["Cunning Action"],
        3: ["Roguish Archetype"],
        4: ["Ability Score Improvement"],
        5: ["Uncanny Dodge"],
      },
    },
    {
      id: "cleric",
      name: "Cleric",
      hitDie: "d8",
      proficiencies: ["Light and medium armor", "Shields", "Simple weapons"],
      multiclassReq: "WIS 13",
      levelFeatures: {
        1: ["Spellcasting", "Divine Domain"],
        2: ["Channel Divinity"],
        3: ["2nd-level spells"],
        4: ["Ability Score Improvement"],
        5: ["Destroy Undead (CR 1/2)", "3rd-level spells"],
      },
    },
  ],
  backgrounds: [
    {
      id: "acolyte",
      name: "Acolyte",
      skills: ["Insight", "Religion"],
      feature: "Shelter of the Faithful",
      equipment: ["Holy symbol", "Prayer book", "5 sticks of incense", "Vestments", "15 gp"],
      bonuses: "No direct ability bonus in core 5e",
    },
    {
      id: "soldier",
      name: "Soldier",
      skills: ["Athletics", "Intimidation"],
      feature: "Military Rank",
      equipment: ["Insignia", "Trophy from enemy", "Dice or cards", "10 gp"],
      bonuses: "No direct ability bonus in core 5e",
    },
    {
      id: "criminal",
      name: "Criminal",
      skills: ["Deception", "Stealth"],
      feature: "Criminal Contact",
      equipment: ["Crowbar", "Dark common clothes", "15 gp"],
      bonuses: "No direct ability bonus in core 5e",
    },
    {
      id: "sage",
      name: "Sage",
      skills: ["Arcana", "History"],
      feature: "Researcher",
      equipment: ["Bottle of ink", "Quill", "Small knife", "Letter", "10 gp"],
      bonuses: "No direct ability bonus in core 5e",
    },
  ],
};

const state = {
  step: "race",
  character: {
    name: "",
    raceId: DATA.races[0].id,
    classId: DATA.classes[0].id,
    primaryLevel: 1,
    multiclassEnabled: false,
    multiclassId: DATA.classes[1].id,
    multiclassLevel: 1,
    abilities: { STR: 8, DEX: 8, CON: 8, INT: 8, WIS: 8, CHA: 8 },
    backgroundId: DATA.backgrounds[0].id,
  },
};

const els = {
  stepper: document.getElementById("stepper"),
  panels: {
    race: document.getElementById("step-race"),
    class: document.getElementById("step-class"),
    abilities: document.getElementById("step-abilities"),
    background: document.getElementById("step-background"),
    summary: document.getElementById("step-summary"),
  },
  raceOptions: document.getElementById("race-options"),
  raceDetails: document.getElementById("race-details"),
  classOptions: document.getElementById("class-options"),
  classDetails: document.getElementById("class-details"),
  classValidation: document.getElementById("class-validation"),
  primaryLevel: document.getElementById("primary-level"),
  multiclassEnabled: document.getElementById("multiclass-enabled"),
  multiclassClass: document.getElementById("multiclass-class"),
  multiclassLevel: document.getElementById("multiclass-level"),
  multiclassClassWrap: document.getElementById("multiclass-class-wrap"),
  multiclassLevelWrap: document.getElementById("multiclass-level-wrap"),
  characterName: document.getElementById("character-name"),
  abilitiesGrid: document.getElementById("abilities-grid"),
  pointBuyStatus: document.getElementById("point-buy-status"),
  backgroundOptions: document.getElementById("background-options"),
  backgroundDetails: document.getElementById("background-details"),
  characterSheet: document.getElementById("character-sheet"),
};

bindEvents();
renderAll();

function bindEvents() {
  document.getElementById("confirm-race").addEventListener("click", () => goStep("class"));
  document.getElementById("back-to-race").addEventListener("click", () => goStep("race"));
  document.getElementById("confirm-class").addEventListener("click", confirmClassStep);
  document.getElementById("back-to-class").addEventListener("click", () => goStep("class"));
  document.getElementById("confirm-abilities").addEventListener("click", confirmAbilitiesStep);
  document.getElementById("back-to-abilities").addEventListener("click", () => goStep("abilities"));
  document.getElementById("confirm-background").addEventListener("click", () => goStep("summary"));
  document.getElementById("back-to-background").addEventListener("click", () => goStep("background"));
  document.getElementById("download-json").addEventListener("click", downloadJson);

  els.primaryLevel.addEventListener("input", (event) => {
    state.character.primaryLevel = clamp(Number(event.target.value), 1, 20);
    renderClassDetails();
  });

  els.multiclassEnabled.addEventListener("change", (event) => {
    state.character.multiclassEnabled = event.target.checked;
    renderClassStep();
  });

  els.multiclassClass.addEventListener("change", (event) => {
    state.character.multiclassId = event.target.value;
    renderClassDetails();
  });

  els.multiclassLevel.addEventListener("input", (event) => {
    state.character.multiclassLevel = clamp(Number(event.target.value), 1, 19);
    renderClassDetails();
  });

  els.characterName.addEventListener("input", (event) => {
    state.character.name = event.target.value;
  });
}

function renderAll() {
  renderStepper();
  renderPanels();
  renderRaceStep();
  renderClassStep();
  renderAbilityStep();
  renderBackgroundStep();
  renderSummary();
}

function goStep(step) {
  state.step = step;
  renderAll();
}

function renderStepper() {
  els.stepper.innerHTML = "";
  STEP_ORDER.forEach((stepName, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${capitalize(stepName)}`;
    if (state.step === stepName) li.classList.add("active");
    els.stepper.appendChild(li);
  });
}

function renderPanels() {
  Object.entries(els.panels).forEach(([name, panel]) => {
    panel.classList.toggle("hidden", name !== state.step);
  });
}

function renderRaceStep() {
  renderOptionCards(els.raceOptions, DATA.races, state.character.raceId, (id) => {
    state.character.raceId = id;
    renderRaceStep();
  });

  const race = selectedRace();
  els.raceDetails.innerHTML = `
    <h3>${race.name}</h3>
    <p><strong>Languages:</strong> ${race.languages.join(", ")}</p>
    <p><strong>Skills/Proficiencies:</strong> ${race.skills.join(", ")}</p>
    <p><strong>Features:</strong> ${race.features.join(", ")}</p>
    <p><strong>Racial Ability Bonuses:</strong> ${formatAbilityBonuses(race.racialAbilities)}</p>
  `;
}

function renderClassStep() {
  els.characterName.value = state.character.name;
  renderOptionCards(els.classOptions, DATA.classes, state.character.classId, (id) => {
    state.character.classId = id;
    if (state.character.multiclassId === id) {
      state.character.multiclassId = DATA.classes.find((c) => c.id !== id)?.id || id;
    }
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
  const mainClass = selectedClass();
  const maxLevel = state.character.multiclassEnabled ? 19 : 20;
  state.character.primaryLevel = clamp(state.character.primaryLevel, 1, maxLevel);
  els.primaryLevel.max = String(maxLevel);

  const levelItems = [];
  for (let level = 1; level <= state.character.primaryLevel; level += 1) {
    const features = mainClass.levelFeatures[level] || ["No new core feature listed in this starter data"];
    levelItems.push(`<li><strong>Level ${level}:</strong> ${features.join(", ")}</li>`);
  }

  let multiclassHtml = "<p><strong>Multiclass:</strong> Disabled</p>";
  if (state.character.multiclassEnabled) {
    const secondary = DATA.classes.find((cls) => cls.id === state.character.multiclassId);
    multiclassHtml = `<p><strong>Multiclass:</strong> ${secondary.name} ${state.character.multiclassLevel} (Requirement: ${secondary.multiclassReq})</p>`;
  }

  els.classDetails.innerHTML = `
    <h3>${mainClass.name}</h3>
    <p><strong>Hit Die:</strong> ${mainClass.hitDie}</p>
    <p><strong>Starting Proficiencies:</strong> ${mainClass.proficiencies.join(", ")}</p>
    <p><strong>Multiclass Requirement:</strong> ${mainClass.multiclassReq}</p>
    ${multiclassHtml}
    <h4>Features up to selected level</h4>
    <ul>${levelItems.join("")}</ul>
  `;

  const totalLevel = totalCharacterLevel();
  els.classValidation.textContent = totalLevel > 20 ? "Total levels cannot exceed 20." : "";
}

function fillMulticlassSelect() {
  const primaryId = state.character.classId;
  const options = DATA.classes.filter((cls) => cls.id !== primaryId);
  els.multiclassClass.innerHTML = "";
  options.forEach((cls) => {
    const option = document.createElement("option");
    option.value = cls.id;
    option.textContent = cls.name;
    option.selected = cls.id === state.character.multiclassId;
    els.multiclassClass.appendChild(option);
  });
  if (!options.some((item) => item.id === state.character.multiclassId)) {
    state.character.multiclassId = options[0]?.id || primaryId;
  }
}

function confirmClassStep() {
  if (totalCharacterLevel() > 20) {
    els.classValidation.textContent = "Total levels cannot exceed 20.";
    return;
  }
  goStep("abilities");
}

function renderAbilityStep() {
  els.abilitiesGrid.innerHTML = "";
  Object.entries(state.character.abilities).forEach(([ability, score]) => {
    const card = document.createElement("div");
    card.className = "ability-card";

    const racialBonus = selectedRace().racialAbilities[ability] || 0;
    const finalScore = score + racialBonus;

    card.innerHTML = `
      <h3>${ability}</h3>
      <div class="ability-controls">
        <button type="button" data-dir="down">-</button>
        <strong>${score}</strong>
        <button type="button" data-dir="up">+</button>
      </div>
      <p>Point Cost: ${COST_BY_SCORE[score]}</p>
      <p>Racial Bonus: ${racialBonus >= 0 ? "+" : ""}${racialBonus}</p>
      <p><strong>Final: ${finalScore}</strong></p>
    `;

    card.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        const direction = button.dataset.dir;
        const next = direction === "up" ? score + 1 : score - 1;
        updateAbilityScore(ability, next);
      });
    });

    els.abilitiesGrid.appendChild(card);
  });

  const spent = spentPoints();
  const remaining = POINT_BUY_BUDGET - spent;
  els.pointBuyStatus.textContent = `Points spent: ${spent} / ${POINT_BUY_BUDGET}. Remaining: ${remaining}.`;
}

function updateAbilityScore(ability, nextScore) {
  if (nextScore < 8 || nextScore > 15) return;
  const previous = state.character.abilities[ability];
  state.character.abilities[ability] = nextScore;
  if (spentPoints() > POINT_BUY_BUDGET) {
    state.character.abilities[ability] = previous;
  }
  renderAbilityStep();
}

function confirmAbilitiesStep() {
  if (spentPoints() > POINT_BUY_BUDGET) return;
  goStep("background");
}

function renderBackgroundStep() {
  renderOptionCards(els.backgroundOptions, DATA.backgrounds, state.character.backgroundId, (id) => {
    state.character.backgroundId = id;
    renderBackgroundStep();
  });

  const background = selectedBackground();
  els.backgroundDetails.innerHTML = `
    <h3>${background.name}</h3>
    <p><strong>Skills:</strong> ${background.skills.join(", ")}</p>
    <p><strong>Feature:</strong> ${background.feature}</p>
    <p><strong>Equipment:</strong> ${background.equipment.join(", ")}</p>
    <p><strong>Background Stats/Bonuses:</strong> ${background.bonuses}</p>
  `;
}

function renderSummary() {
  const race = selectedRace();
  const cls = selectedClass();
  const background = selectedBackground();

  const finalAbilities = Object.fromEntries(
    Object.entries(state.character.abilities).map(([ability, value]) => [ability, value + (race.racialAbilities[ability] || 0)]),
  );

  const summary = {
    name: state.character.name || "Unnamed Adventurer",
    race: race.name,
    raceFeatures: race.features,
    raceLanguages: race.languages,
    classPlan: {
      primaryClass: cls.name,
      primaryLevel: state.character.primaryLevel,
      multiclassEnabled: state.character.multiclassEnabled,
      secondaryClass: state.character.multiclassEnabled ? classById(state.character.multiclassId)?.name : null,
      secondaryLevel: state.character.multiclassEnabled ? state.character.multiclassLevel : null,
      totalLevel: totalCharacterLevel(),
    },
    abilities: {
      base: state.character.abilities,
      final: finalAbilities,
      pointBuySpent: spentPoints(),
      pointBuyBudget: POINT_BUY_BUDGET,
    },
    background: {
      name: background.name,
      skills: background.skills,
      feature: background.feature,
      equipment: background.equipment,
      bonuses: background.bonuses,
    },
  };

  els.characterSheet.textContent = JSON.stringify(summary, null, 2);
}

function renderOptionCards(container, items, selectedId, onSelect) {
  container.innerHTML = "";
  items.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `option-card ${item.id === selectedId ? "selected" : ""}`;
    button.innerHTML = `<strong>${item.name}</strong>`;
    button.addEventListener("click", () => onSelect(item.id));
    container.appendChild(button);
  });
}

function downloadJson() {
  const blob = new Blob([els.characterSheet.textContent], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${(state.character.name || "character").replace(/\s+/g, "-").toLowerCase()}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

function selectedRace() {
  return DATA.races.find((race) => race.id === state.character.raceId) || DATA.races[0];
}

function selectedClass() {
  return classById(state.character.classId) || DATA.classes[0];
}

function classById(id) {
  return DATA.classes.find((cls) => cls.id === id);
}

function selectedBackground() {
  return DATA.backgrounds.find((bg) => bg.id === state.character.backgroundId) || DATA.backgrounds[0];
}

function spentPoints() {
  return Object.values(state.character.abilities).reduce((sum, score) => sum + COST_BY_SCORE[score], 0);
}

function totalCharacterLevel() {
  return state.character.primaryLevel + (state.character.multiclassEnabled ? state.character.multiclassLevel : 0);
}

function formatAbilityBonuses(bonuses) {
  return Object.entries(bonuses)
    .map(([ability, value]) => `${ability} ${value >= 0 ? "+" : ""}${value}`)
    .join(", ");
}

function capitalize(value) {
  return `${value[0].toUpperCase()}${value.slice(1)}`;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
