const POINT_BUY_BUDGET = 27;
const STEP_ORDER = ["custom", "race", "class", "abilities", "background", "summary"];

const COST_BY_SCORE = { 8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9 };

const BASE_DATA = {
  races: [
    { id: "dragonborn", name: "Dragonborn", languages: ["Common", "Draconic"], skills: ["No automatic skill proficiency from race"], features: ["Draconic Ancestry", "Breath Weapon", "Damage Resistance"], racialAbilities: { STR: 2, CHA: 1 } },
    { id: "dwarf", name: "Dwarf", languages: ["Common", "Dwarvish"], skills: ["Battleaxe, handaxe, light hammer, warhammer proficiency", "Tool proficiency"], features: ["Darkvision", "Dwarven Resilience", "Dwarven Combat Training", "Stonecunning"], racialAbilities: { CON: 2 } },
    { id: "elf", name: "Elf", languages: ["Common", "Elvish"], skills: ["Perception proficiency"], features: ["Darkvision", "Keen Senses", "Fey Ancestry", "Trance"], racialAbilities: { DEX: 2 } },
    { id: "gnome", name: "Gnome", languages: ["Common", "Gnomish"], skills: ["No automatic skill proficiency from race"], features: ["Darkvision", "Gnome Cunning"], racialAbilities: { INT: 2 } },
    { id: "half-elf", name: "Half-Elf", languages: ["Common", "Elvish", "One extra language"], skills: ["Two skill proficiencies of your choice"], features: ["Darkvision", "Fey Ancestry", "Skill Versatility"], racialAbilities: { CHA: 2 } },
    { id: "half-orc", name: "Half-Orc", languages: ["Common", "Orc"], skills: ["Intimidation proficiency"], features: ["Darkvision", "Relentless Endurance", "Savage Attacks"], racialAbilities: { STR: 2, CON: 1 } },
    { id: "halfling", name: "Halfling", languages: ["Common", "Halfling"], skills: ["No automatic skill proficiency from race"], features: ["Lucky", "Brave", "Halfling Nimbleness"], racialAbilities: { DEX: 2 } },
    { id: "human", name: "Human", languages: ["Common", "One extra language"], skills: ["No automatic skill proficiency from race"], features: ["Versatile"], racialAbilities: { STR: 1, DEX: 1, CON: 1, INT: 1, WIS: 1, CHA: 1 } },
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
};

const state = {
  step: "custom",
  data: structuredClone(BASE_DATA),
  character: {
    name: "",
    raceId: "dragonborn",
    classId: "fighter",
    primaryLevel: 1,
    multiclassEnabled: false,
    multiclassId: "wizard",
    multiclassLevel: 1,
    abilities: { STR: 8, DEX: 8, CON: 8, INT: 8, WIS: 8, CHA: 8 },
    backgroundId: "acolyte",
  },
  custom: {
    submitted: [],
    editingId: null,
    dirty: false,
  },
};

const els = {
  stepper: document.getElementById("stepper"),
  panels: {
    custom: document.getElementById("step-custom"),
    race: document.getElementById("step-race"),
    class: document.getElementById("step-class"),
    abilities: document.getElementById("step-abilities"),
    background: document.getElementById("step-background"),
    summary: document.getElementById("step-summary"),
  },
  importCustom: document.getElementById("import-custom"),
  exportCustom: document.getElementById("export-custom"),
  importCustomFile: document.getElementById("import-custom-file"),
  customType: document.getElementById("custom-type"),
  customName: document.getElementById("custom-name"),
  customDetails: document.getElementById("custom-details"),
  customStatus: document.getElementById("custom-status"),
  submittedItems: document.getElementById("submitted-items"),
  clearCustom: document.getElementById("clear-custom"),
  submitCustom: document.getElementById("submit-custom"),
  applyCustom: document.getElementById("apply-custom"),
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
  els.importCustom.addEventListener("click", () => els.importCustomFile.click());
  els.importCustomFile.addEventListener("change", importCustomData);
  els.exportCustom.addEventListener("click", exportCustomData);
  els.clearCustom.addEventListener("click", clearCustomEditor);
  els.submitCustom.addEventListener("click", submitCustomItem);
  els.applyCustom.addEventListener("click", () => {
    applyCustomDataToBuilder();
    goStep("race");
  });

  [els.customType, els.customName, els.customDetails].forEach((input) => {
    input.addEventListener("input", markCustomDraftDirty);
  });

  document.getElementById("back-to-custom").addEventListener("click", () => goStep("custom"));
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
  renderCustomStep();
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

function renderCustomStep() {
  els.submittedItems.innerHTML = "";
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

  if (!state.custom.submitted.length) {
    els.submittedItems.innerHTML = "<li>No submitted items yet.</li>";
  }
}

function markCustomDraftDirty() {
  if (!state.custom.editingId) return;
  const item = state.custom.submitted.find((entry) => entry.id === state.custom.editingId);
  if (!item) return;
  item.dirty = true;
  state.custom.dirty = true;
  els.customStatus.textContent = "Item changed. Click Submit Item to resubmit edits.";
  renderCustomStep();
}

function loadCustomItem(itemId) {
  const item = state.custom.submitted.find((entry) => entry.id === itemId);
  if (!item) return;
  state.custom.editingId = item.id;
  state.custom.dirty = false;
  els.customType.value = item.type;
  els.customName.value = item.name;
  els.customDetails.value = JSON.stringify(item.data, null, 2);
  els.customStatus.textContent = item.dirty
    ? "This item has unsaved edits. Resubmit to apply changes."
    : "Viewing submitted item. No resubmission needed unless you edit.";
}

function clearCustomEditor() {
  state.custom.editingId = null;
  state.custom.dirty = false;
  els.customType.value = "races";
  els.customName.value = "";
  els.customDetails.value = "{}";
  els.customStatus.textContent = "Creating a new custom item.";
}

function submitCustomItem() {
  const type = els.customType.value;
  const name = els.customName.value.trim();
  if (!name) {
    els.customStatus.textContent = "Name is required.";
    return;
  }

  let data;
  try {
    data = JSON.parse(els.customDetails.value || "{}");
  } catch {
    els.customStatus.textContent = "Details must be valid JSON.";
    return;
  }

  if (state.custom.editingId) {
    const existing = state.custom.submitted.find((entry) => entry.id === state.custom.editingId);
    if (existing) {
      existing.type = type;
      existing.name = name;
      existing.data = data;
      existing.dirty = false;
    }
    els.customStatus.textContent = "Custom item updated and submitted.";
  } else {
    state.custom.submitted.push({ id: crypto.randomUUID(), type, name, data, dirty: false });
    els.customStatus.textContent = "Custom item submitted.";
  }

  state.custom.dirty = false;
  renderCustomStep();
}

function importCustomData(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result || "{}"));
      const items = Array.isArray(parsed.items)
        ? parsed.items
        : normalizeLegacyImport(parsed);

      state.custom.submitted = items.map((item) => ({
        id: crypto.randomUUID(),
        type: item.type,
        name: item.name,
        data: item.data || {},
        dirty: false,
      }));

      els.customStatus.textContent = "Imported custom content. Imported items are already submitted.";
      clearCustomEditor();
      renderCustomStep();
    } catch {
      els.customStatus.textContent = "Import failed: invalid JSON file.";
    }
  };
  reader.readAsText(file);
  event.target.value = "";
}

function normalizeLegacyImport(parsed) {
  const types = ["races", "classes", "spells", "backgrounds", "feats"];
  const items = [];
  types.forEach((type) => {
    const group = parsed?.[type];
    if (!Array.isArray(group)) return;
    group.forEach((entry) => {
      items.push({
        type,
        name: entry.name || `Imported ${labelForType(type)}`,
        data: entry,
      });
    });
  });
  return items;
}

function exportCustomData() {
  const payload = {
    items: state.custom.submitted.map(({ type, name, data }) => ({ type, name, data })),
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "dnd-custom-content.json";
  anchor.click();
  URL.revokeObjectURL(url);
}

function applyCustomDataToBuilder() {
  state.data = structuredClone(BASE_DATA);

  state.custom.submitted.forEach((item) => {
    const normalized = normalizeCustomRecord(item.type, item.name, item.data);
    if (!normalized) return;
    state.data[item.type].push(normalized);
  });

  ensureValidSelections();
}

function normalizeCustomRecord(type, name, data) {
  const id = `custom-${slugify(name) || crypto.randomUUID().slice(0, 8)}`;

  if (type === "races") {
    return {
      id,
      name,
      languages: toArray(data.languages),
      skills: toArray(data.skills),
      features: toArray(data.features),
      racialAbilities: isObject(data.racialAbilities) ? data.racialAbilities : {},
    };
  }

  if (type === "classes") {
    return {
      id,
      name,
      hitDie: data.hitDie || "d8",
      proficiencies: toArray(data.proficiencies),
      multiclassReq: data.multiclassReq || "None",
      levelFeatures: isObject(data.levelFeatures) ? data.levelFeatures : {},
    };
  }

  if (type === "backgrounds") {
    return {
      id,
      name,
      skills: toArray(data.skills),
      feature: data.feature || "Custom Feature",
      equipment: toArray(data.equipment),
      bonuses: data.bonuses || "Custom bonuses",
    };
  }

  if (type === "spells" || type === "feats") {
    return {
      id,
      name,
      description: data.description || "",
      ...data,
    };
  }

  return null;
}

function ensureValidSelections() {
  if (!state.data.races.some((race) => race.id === state.character.raceId)) {
    state.character.raceId = state.data.races[0]?.id || "";
  }
  if (!state.data.classes.some((cls) => cls.id === state.character.classId)) {
    state.character.classId = state.data.classes[0]?.id || "";
  }
  if (!state.data.backgrounds.some((bg) => bg.id === state.character.backgroundId)) {
    state.character.backgroundId = state.data.backgrounds[0]?.id || "";
  }
  if (!state.data.classes.some((cls) => cls.id === state.character.multiclassId && cls.id !== state.character.classId)) {
    state.character.multiclassId = state.data.classes.find((cls) => cls.id !== state.character.classId)?.id || state.character.classId;
  }
}

function renderRaceStep() {
  renderOptionCards(els.raceOptions, state.data.races, state.character.raceId, (id) => {
    state.character.raceId = id;
    renderRaceStep();
  });

  const race = selectedRace();
  els.raceDetails.innerHTML = `
    <h3>${race.name}</h3>
    <p><strong>Languages:</strong> ${toArray(race.languages).join(", ") || "None"}</p>
    <p><strong>Skills/Proficiencies:</strong> ${toArray(race.skills).join(", ") || "None"}</p>
    <p><strong>Features:</strong> ${toArray(race.features).join(", ") || "None"}</p>
    <p><strong>Racial Ability Bonuses:</strong> ${formatAbilityBonuses(race.racialAbilities || {})}</p>
  `;
}

function renderClassStep() {
  els.characterName.value = state.character.name;
  renderOptionCards(els.classOptions, state.data.classes, state.character.classId, (id) => {
    state.character.classId = id;
    if (state.character.multiclassId === id) {
      state.character.multiclassId = state.data.classes.find((entry) => entry.id !== id)?.id || id;
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
    const features = mainClass.levelFeatures?.[level] || ["No feature listed in current data"];
    levelItems.push(`<li><strong>Level ${level}:</strong> ${toArray(features).join(", ")}</li>`);
  }

  let multiclassHtml = "<p><strong>Multiclass:</strong> Disabled</p>";
  if (state.character.multiclassEnabled) {
    const secondary = classById(state.character.multiclassId);
    multiclassHtml = `<p><strong>Multiclass:</strong> ${secondary.name} ${state.character.multiclassLevel} (Requirement: ${secondary.multiclassReq})</p>`;
  }

  els.classDetails.innerHTML = `
    <h3>${mainClass.name}</h3>
    <p><strong>Hit Die:</strong> ${mainClass.hitDie || "d8"}</p>
    <p><strong>Starting Proficiencies:</strong> ${toArray(mainClass.proficiencies).join(", ") || "None"}</p>
    <p><strong>Multiclass Requirement:</strong> ${mainClass.multiclassReq || "None"}</p>
    ${multiclassHtml}
    <h4>Features up to selected level</h4>
    <ul>${levelItems.join("")}</ul>
  `;

  els.classValidation.textContent = totalCharacterLevel() > 20 ? "Total levels cannot exceed 20." : "";
}

function fillMulticlassSelect() {
  const primaryId = state.character.classId;
  const options = state.data.classes.filter((entry) => entry.id !== primaryId);
  els.multiclassClass.innerHTML = "";

  options.forEach((entry) => {
    const option = document.createElement("option");
    option.value = entry.id;
    option.textContent = entry.name;
    option.selected = entry.id === state.character.multiclassId;
    els.multiclassClass.appendChild(option);
  });

  if (!options.some((entry) => entry.id === state.character.multiclassId)) {
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
    const racialBonus = selectedRace().racialAbilities?.[ability] || 0;
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

    card.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const next = btn.dataset.dir === "up" ? score + 1 : score - 1;
        updateAbilityScore(ability, next);
      });
    });

    els.abilitiesGrid.appendChild(card);
  });

  const spent = spentPoints();
  els.pointBuyStatus.textContent = `Points spent: ${spent} / ${POINT_BUY_BUDGET}. Remaining: ${POINT_BUY_BUDGET - spent}.`;
}

function updateAbilityScore(ability, nextScore) {
  if (nextScore < 8 || nextScore > 15) return;
  const prev = state.character.abilities[ability];
  state.character.abilities[ability] = nextScore;
  if (spentPoints() > POINT_BUY_BUDGET) state.character.abilities[ability] = prev;
  renderAbilityStep();
}

function confirmAbilitiesStep() {
  if (spentPoints() > POINT_BUY_BUDGET) return;
  goStep("background");
}

function renderBackgroundStep() {
  renderOptionCards(els.backgroundOptions, state.data.backgrounds, state.character.backgroundId, (id) => {
    state.character.backgroundId = id;
    renderBackgroundStep();
  });

  const background = selectedBackground();
  els.backgroundDetails.innerHTML = `
    <h3>${background.name}</h3>
    <p><strong>Skills:</strong> ${toArray(background.skills).join(", ") || "None"}</p>
    <p><strong>Feature:</strong> ${background.feature || "None"}</p>
    <p><strong>Equipment:</strong> ${toArray(background.equipment).join(", ") || "None"}</p>
    <p><strong>Background Stats/Bonuses:</strong> ${background.bonuses || "None"}</p>
  `;
}

function renderSummary() {
  const race = selectedRace();
  const cls = selectedClass();
  const background = selectedBackground();

  const finalAbilities = Object.fromEntries(
    Object.entries(state.character.abilities).map(([ability, value]) => [ability, value + (race.racialAbilities?.[ability] || 0)]),
  );

  const summary = {
    name: state.character.name || "Unnamed Adventurer",
    race: race.name,
    raceFeatures: toArray(race.features),
    raceLanguages: toArray(race.languages),
    classPlan: {
      primaryClass: cls.name,
      primaryLevel: state.character.primaryLevel,
      multiclassEnabled: state.character.multiclassEnabled,
      secondaryClass: state.character.multiclassEnabled ? classById(state.character.multiclassId)?.name : null,
      secondaryLevel: state.character.multiclassEnabled ? state.character.multiclassLevel : null,
      totalLevel: totalCharacterLevel(),
    },
    abilities: { base: state.character.abilities, final: finalAbilities, pointBuySpent: spentPoints(), pointBuyBudget: POINT_BUY_BUDGET },
    background: {
      name: background.name,
      skills: toArray(background.skills),
      feature: background.feature,
      equipment: toArray(background.equipment),
      bonuses: background.bonuses,
    },
    customContentApplied: {
      races: state.data.races.length - BASE_DATA.races.length,
      classes: state.data.classes.length - BASE_DATA.classes.length,
      backgrounds: state.data.backgrounds.length - BASE_DATA.backgrounds.length,
      spells: state.data.spells.length,
      feats: state.data.feats.length,
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
  return state.data.races.find((entry) => entry.id === state.character.raceId) || state.data.races[0];
}

function selectedClass() {
  return classById(state.character.classId) || state.data.classes[0];
}

function classById(id) {
  return state.data.classes.find((entry) => entry.id === id) || state.data.classes[0];
}

function selectedBackground() {
  return state.data.backgrounds.find((entry) => entry.id === state.character.backgroundId) || state.data.backgrounds[0];
}

function spentPoints() {
  return Object.values(state.character.abilities).reduce((sum, score) => sum + COST_BY_SCORE[score], 0);
}

function totalCharacterLevel() {
  return state.character.primaryLevel + (state.character.multiclassEnabled ? state.character.multiclassLevel : 0);
}

function formatAbilityBonuses(bonuses) {
  const pairs = Object.entries(bonuses || {});
  if (!pairs.length) return "None";
  return pairs.map(([ability, value]) => `${ability} ${value >= 0 ? "+" : ""}${value}`).join(", ");
}

function toArray(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === "string" && value.trim()) return [value.trim()];
  return [];
}

function isObject(value) {
  return value && typeof value === "object" && !Array.isArray(value);
}

function labelForType(type) {
  const map = { races: "Race", classes: "Class", spells: "Spell", backgrounds: "Background", feats: "Feat" };
  return map[type] || type;
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function capitalize(value) {
  return `${value[0].toUpperCase()}${value.slice(1)}`;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
