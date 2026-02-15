const POINT_BUY_BUDGET = 27;
const STEP_ORDER = ["race", "class", "abilities", "background", "summary"];
const COST_BY_SCORE = { 8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9 };

const CLASS_FEATURE_DESCRIPTIONS = {
  "Fighting Style": "Adopt a fighting style specialty that grants a combat benefit.",
  "Second Wind": "Regain hit points as a bonus action once per short rest.",
  "Action Surge": "Take one additional action on your turn once per short rest.",
  "Martial Archetype": "Choose a fighter subclass that defines your combat path.",
  "Ability Score Improvement": "Increase ability scores or take a feat if your table allows.",
  "Extra Attack": "Attack twice when you take the Attack action.",
  Spellcasting: "You can cast spells from your class spell list.",
  "Arcane Recovery": "Recover some spent spell slots on a short rest.",
  "Arcane Tradition": "Choose a wizard school specialization.",
  Expertise: "Double your proficiency bonus for selected skills/tools.",
  "Sneak Attack": "Deal bonus damage once per turn when conditions are met.",
  "Thieves' Cant": "Learn a coded language used by rogues.",
  "Cunning Action": "Use Dash, Disengage, or Hide as a bonus action.",
  "Roguish Archetype": "Choose a rogue subclass.",
  "Uncanny Dodge": "Use your reaction to halve damage from an attacker you can see.",
  "Divine Domain": "Choose a cleric domain tied to your deity.",
  "Channel Divinity": "Channel divine energy for domain-specific effects.",
  "Destroy Undead (CR 1/2)": "Turn Undead can instantly destroy weak undead.",
};

const FEATURE_DESCRIPTIONS = {
  "Draconic Ancestry": "Defines your dragon type and linked breath/resistance damage.",
  "Breath Weapon": "Exhale destructive energy in an area based on your draconic ancestry.",
  "Damage Resistance": "Gain resistance to the damage type of your draconic ancestry.",
  Darkvision: "You can see in darkness within a limited range as if it were dim light.",
  "Dwarven Resilience": "Advantage on poison saves and resistance to poison damage.",
  "Dwarven Combat Training": "Proficiency with specific dwarven weapons.",
  Stonecunning: "Double proficiency bonus for History checks about stonework.",
  "Keen Senses": "Gain proficiency in the Perception skill.",
  "Fey Ancestry": "Advantage against being charmed and immunity to magical sleep.",
  Trance: "Meditative rest instead of sleeping normally.",
  "Gnome Cunning": "Advantage on mental saving throws against magic.",
  "Skill Versatility": "Gain extra skill proficiencies.",
  "Relentless Endurance": "Drop to 1 HP instead of 0 once per long rest.",
  "Savage Attacks": "Extra weapon die on critical hits.",
  Lucky: "Reroll a 1 on attack roll, ability check, or saving throw.",
  Brave: "Advantage on saves against being frightened.",
  "Halfling Nimbleness": "Move through spaces occupied by larger creatures.",
  Versatile: "Humans have broad adaptability represented by spread bonuses.",
  "Hellish Resistance": "Resistance to fire damage.",
  "Infernal Legacy": "Gain tiefling-themed innate spells as you level.",
  "Shelter of the Faithful": "Can receive aid from your religious community.",
  "Military Rank": "Recognition and authority from military service.",
  "Criminal Contact": "Maintain a reliable underworld contact.",
  Researcher: "Often know where and from whom to obtain lore.",
};

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
  spells: [], feats: [],
};

const state = {
  step: "race",
  customOpen: false,
  data: structuredClone(BASE_DATA),
  character: { name: "", raceId: "dragonborn", classId: "fighter", primaryLevel: 1, multiclassEnabled: false, multiclassId: "wizard", multiclassLevel: 1, abilities: { STR: 8, DEX: 8, CON: 8, INT: 8, WIS: 8, CHA: 8 }, backgroundId: "acolyte" },
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
  raceOptions: document.getElementById("race-options"), raceDetails: document.getElementById("race-details"),
  classOptions: document.getElementById("class-options"), classDetails: document.getElementById("class-details"), classValidation: document.getElementById("class-validation"),
  characterName: document.getElementById("character-name"), primaryLevel: document.getElementById("primary-level"),
  multiclassEnabled: document.getElementById("multiclass-enabled"), multiclassClass: document.getElementById("multiclass-class"), multiclassLevel: document.getElementById("multiclass-level"),
  multiclassClassWrap: document.getElementById("multiclass-class-wrap"), multiclassLevelWrap: document.getElementById("multiclass-level-wrap"),
  abilitiesGrid: document.getElementById("abilities-grid"), pointBuyStatus: document.getElementById("point-buy-status"),
  backgroundOptions: document.getElementById("background-options"), backgroundDetails: document.getElementById("background-details"),
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
    input.addEventListener("blur", () => setTimeout(() => els.quickfillBox.classList.add("hidden"), 120));
  });

  document.addEventListener("mouseover", handleDescriptionHover);
  document.addEventListener("mouseout", hideTooltip);

  document.getElementById("confirm-race").addEventListener("click", () => goStep("class"));
  document.getElementById("back-to-race").addEventListener("click", () => goStep("race"));
  document.getElementById("confirm-class").addEventListener("click", confirmClassStep);
  document.getElementById("back-to-class").addEventListener("click", () => goStep("class"));
  document.getElementById("confirm-abilities").addEventListener("click", confirmAbilitiesStep);
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
  renderPanels();
  els.customPage.classList.toggle("hidden", !state.customOpen);
  if (state.customOpen) renderCustomPage();
  renderRaceStep(); renderClassStep(); renderAbilityStep(); renderBackgroundStep(); renderSummary();
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

function renderPanels() {
  Object.entries(els.panels).forEach(([name, panel]) => panel.classList.toggle("hidden", name !== state.step));
}

function goStep(step) { state.step = step; renderAll(); }

function renderCustomPage() {
  renderCustomFieldsByType();
  renderSubmittedList();
}

function renderCustomFieldsByType() {
  const type = els.customType.value;
  document.querySelectorAll(".type-fields").forEach((node) => node.classList.add("hidden"));
  document.getElementById(`type-${type}`).classList.remove("hidden");
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

function loadCustomItem(id) {
  const item = state.custom.submitted.find((x) => x.id === id);
  if (!item) return;
  state.custom.editingId = id;
  els.customType.value = item.type;
  renderCustomFieldsByType();
  fillTypeFields(item.type, item.name, item.data);
  els.customStatus.textContent = item.dirty ? "Edited item needs resubmit." : "Viewing submitted item; edit to require resubmission.";
}

function clearCustomEditor() {
  state.custom.editingId = null;
  document.querySelectorAll("#custom-page input, #custom-page textarea").forEach((el) => {
    if (el.id === "spell-level") el.value = "0";
    else if (el.id.includes("abilities")) el.value = '{"STR":1}';
    else if (el.type !== "file") el.value = "";
  });
  els.customType.value = "races";
  renderCustomFieldsByType();
  els.customStatus.textContent = "Creating a new custom item.";
}

function submitCustomItem() {
  const record = collectTypeFields(els.customType.value);
  if (!record) return;

  if (state.custom.editingId) {
    const existing = state.custom.submitted.find((x) => x.id === state.custom.editingId);
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
      const name = byId("race-name").value.trim(); if (!name) return fail("Race name is required.");
      return { type, name, data: { languages: csv(byId("race-languages").value), skills: csv(byId("race-skills").value), features: csv(byId("race-features").value), racialAbilities: JSON.parse(byId("race-abilities").value || "{}") } };
    }
    if (type === "classes") {
      const name = byId("class-name").value.trim(); if (!name) return fail("Class name is required.");
      return { type, name, data: { hitDie: byId("class-hitdie").value || "d8", proficiencies: csv(byId("class-proficiencies").value), multiclassReq: byId("class-multi-req").value || "None", featureRows: byId("class-features").value } };
    }
    if (type === "backgrounds") {
      const name = byId("background-name").value.trim(); if (!name) return fail("Background name is required.");
      return { type, name, data: { skills: csv(byId("background-skills").value), feature: byId("background-feature-name").value || "Custom Feature", featureDescription: byId("background-feature-desc").value, equipment: csv(byId("background-equipment").value), bonuses: byId("background-bonuses").value || "Custom bonuses" } };
    }
    if (type === "spells") {
      const name = byId("spell-name").value.trim(); if (!name) return fail("Spell name is required.");
      return { type, name, data: { level: Number(byId("spell-level").value || 0), school: byId("spell-school").value, description: byId("spell-description").value } };
    }
    if (type === "feats") {
      const name = byId("feat-name").value.trim(); if (!name) return fail("Feat name is required.");
      return { type, name, data: { prerequisite: byId("feat-prereq").value, description: byId("feat-description").value } };
    }
  } catch {
    return fail("One or more fields have invalid JSON/content.");
  }
  return fail("Unsupported type.");
}

function fillTypeFields(type, name, data) {
  if (type === "races") {
    byId("race-name").value = name; byId("race-languages").value = (data.languages || []).join(", "); byId("race-skills").value = (data.skills || []).join(", "); byId("race-features").value = (data.features || []).join(", "); byId("race-abilities").value = JSON.stringify(data.racialAbilities || {}, null, 2);
  } else if (type === "classes") {
    byId("class-name").value = name; byId("class-hitdie").value = data.hitDie || "d8"; byId("class-proficiencies").value = (data.proficiencies || []).join(", "); byId("class-multi-req").value = data.multiclassReq || "None"; byId("class-features").value = data.featureRows || "";
  } else if (type === "backgrounds") {
    byId("background-name").value = name; byId("background-skills").value = (data.skills || []).join(", "); byId("background-feature-name").value = data.feature || ""; byId("background-feature-desc").value = data.featureDescription || ""; byId("background-equipment").value = (data.equipment || []).join(", "); byId("background-bonuses").value = data.bonuses || "";
  } else if (type === "spells") {
    byId("spell-name").value = name; byId("spell-level").value = String(data.level ?? 0); byId("spell-school").value = data.school || ""; byId("spell-description").value = data.description || "";
  } else if (type === "feats") {
    byId("feat-name").value = name; byId("feat-prereq").value = data.prerequisite || ""; byId("feat-description").value = data.description || "";
  }
}

function importCustomData(e) {
  const file = e.target.files?.[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result || "{}"));
      const items = Array.isArray(parsed.items) ? parsed.items : [];
      state.custom.submitted = items.map((it) => ({ id: crypto.randomUUID(), type: it.type, name: it.name, data: it.data || {}, dirty: false }));
      els.customStatus.textContent = "Imported items are already submitted.";
      renderSubmittedList();
    } catch { els.customStatus.textContent = "Import failed: invalid JSON."; }
  };
  reader.readAsText(file);
  e.target.value = "";
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
  if (type === "spells" || type === "feats") return { id, name, ...data };
  return null;
}

function ensureValidSelections() {
  if (!state.data.races.some((x) => x.id === state.character.raceId)) state.character.raceId = state.data.races[0]?.id || "";
  if (!state.data.classes.some((x) => x.id === state.character.classId)) state.character.classId = state.data.classes[0]?.id || "";
  if (!state.data.backgrounds.some((x) => x.id === state.character.backgroundId)) state.character.backgroundId = state.data.backgrounds[0]?.id || "";
  if (!state.data.classes.some((x) => x.id === state.character.multiclassId && x.id !== state.character.classId)) {
    state.character.multiclassId = state.data.classes.find((x) => x.id !== state.character.classId)?.id || state.character.classId;
  }
}

function renderRaceStep() {
  renderOptionCards(els.raceOptions, state.data.races, state.character.raceId, (id) => { state.character.raceId = id; renderRaceStep(); });
  const race = selectedRace();
  els.raceDetails.innerHTML = `
    <h3>${race.name}</h3>
    <p><strong>Languages:</strong> ${toArray(race.languages).join(", ") || "None"}</p>
    <p><strong>Skills/Proficiencies:</strong> ${toArray(race.skills).join(", ") || "None"}</p>
    <p><strong>Features:</strong> ${toArray(race.features).map((f) => describeTermHtml(f, FEATURE_DESCRIPTIONS[f])).join(", ") || "None"}</p>
    <p><strong>Racial Ability Bonuses:</strong> ${formatAbilityBonuses(race.racialAbilities || {})}</p>
  `;
}

function renderClassStep() {
  els.characterName.value = state.character.name;
  renderOptionCards(els.classOptions, state.data.classes, state.character.classId, (id) => { state.character.classId = id; if (state.character.multiclassId === id) state.character.multiclassId = state.data.classes.find((c) => c.id !== id)?.id || id; renderClassStep(); });
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
  const max = state.character.multiclassEnabled ? 19 : 20;
  state.character.primaryLevel = clamp(state.character.primaryLevel, 1, max);
  els.primaryLevel.max = String(max);

  const items = [];
  for (let level = 1; level <= state.character.primaryLevel; level += 1) {
    const feats = mainClass.levelFeatures?.[level] || ["No feature listed in current data"];
    const rendered = toArray(feats).map((f) => describeTermHtml(f, CLASS_FEATURE_DESCRIPTIONS[f] || FEATURE_DESCRIPTIONS[f])).join(", ");
    items.push(`<li><strong>Level ${level}:</strong> ${rendered}</li>`);
  }

  const mc = state.character.multiclassEnabled ? `<p><strong>Multiclass:</strong> ${classById(state.character.multiclassId).name} ${state.character.multiclassLevel} (Requirement: ${classById(state.character.multiclassId).multiclassReq})</p>` : "<p><strong>Multiclass:</strong> Disabled</p>";
  els.classDetails.innerHTML = `<h3>${mainClass.name}</h3><p><strong>Hit Die:</strong> ${mainClass.hitDie}</p><p><strong>Starting Proficiencies:</strong> ${toArray(mainClass.proficiencies).join(", ")}</p><p><strong>Multiclass Requirement:</strong> ${mainClass.multiclassReq}</p>${mc}<h4>Features up to selected level</h4><ul>${items.join("")}</ul>`;
  els.classValidation.textContent = totalCharacterLevel() > 20 ? "Total levels cannot exceed 20." : "";
}

function fillMulticlassSelect() {
  const options = state.data.classes.filter((x) => x.id !== state.character.classId);
  els.multiclassClass.innerHTML = "";
  options.forEach((x) => {
    const option = document.createElement("option"); option.value = x.id; option.textContent = x.name; option.selected = x.id === state.character.multiclassId; els.multiclassClass.appendChild(option);
  });
}

function confirmClassStep() { if (totalCharacterLevel() > 20) return; goStep("abilities"); }

function renderAbilityStep() {
  els.abilitiesGrid.innerHTML = "";
  Object.entries(state.character.abilities).forEach(([ab, score]) => {
    const bonus = selectedRace().racialAbilities?.[ab] || 0;
    const card = document.createElement("div"); card.className = "ability-card";
    card.innerHTML = `<h3>${ab}</h3><div class="ability-controls"><button type="button" data-dir="down">-</button><strong>${score}</strong><button type="button" data-dir="up">+</button></div><p>Point Cost: ${COST_BY_SCORE[score]}</p><p>Racial Bonus: ${bonus >= 0 ? "+" : ""}${bonus}</p><p><strong>Final: ${score + bonus}</strong></p>`;
    card.querySelectorAll("button").forEach((btn) => btn.addEventListener("click", () => updateAbilityScore(ab, btn.dataset.dir === "up" ? score + 1 : score - 1)));
    els.abilitiesGrid.appendChild(card);
  });
  const spent = spentPoints();
  els.pointBuyStatus.textContent = `Points spent: ${spent} / ${POINT_BUY_BUDGET}. Remaining: ${POINT_BUY_BUDGET - spent}.`;
}

function updateAbilityScore(ab, next) { if (next < 8 || next > 15) return; const prev = state.character.abilities[ab]; state.character.abilities[ab] = next; if (spentPoints() > POINT_BUY_BUDGET) state.character.abilities[ab] = prev; renderAbilityStep(); }
function confirmAbilitiesStep() { goStep("background"); }

function renderBackgroundStep() {
  renderOptionCards(els.backgroundOptions, state.data.backgrounds, state.character.backgroundId, (id) => { state.character.backgroundId = id; renderBackgroundStep(); });
  const bg = selectedBackground();
  els.backgroundDetails.innerHTML = `<h3>${bg.name}</h3><p><strong>Skills:</strong> ${toArray(bg.skills).join(", ")}</p><p><strong>Feature:</strong> ${describeTermHtml(bg.feature, FEATURE_DESCRIPTIONS[bg.feature])}</p><p><strong>Equipment:</strong> ${toArray(bg.equipment).join(", ")}</p><p><strong>Background Stats/Bonuses:</strong> ${bg.bonuses || "None"}</p>`;
}

function renderSummary() {
  const race = selectedRace();
  const finalAbilities = Object.fromEntries(Object.entries(state.character.abilities).map(([a, v]) => [a, v + (race.racialAbilities?.[a] || 0)]));
  const summary = { name: state.character.name || "Unnamed Adventurer", race: race.name, classPlan: { primaryClass: selectedClass().name, primaryLevel: state.character.primaryLevel, multiclassEnabled: state.character.multiclassEnabled, secondaryClass: state.character.multiclassEnabled ? classById(state.character.multiclassId).name : null, secondaryLevel: state.character.multiclassEnabled ? state.character.multiclassLevel : null, totalLevel: totalCharacterLevel() }, abilities: { base: state.character.abilities, final: finalAbilities, pointBuySpent: spentPoints(), pointBuyBudget: POINT_BUY_BUDGET }, background: selectedBackground().name };
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
  if (event?.target?.closest?.(".desc-term")) {
    clearTimeout(state.hoverTimer);
    els.tooltip.classList.remove("show");
    els.tooltip.classList.add("hidden");
  }
}

function describeTermHtml(name, description) {
  if (!description) return escapeHtml(name);
  return `<span class="desc-term" data-desc="${escapeHtml(description)}">${escapeHtml(name)}</span>`;
}

function showQuickFill(input) {
  const domain = input.dataset.domain;
  const all = quickFillOptions(domain);
  const parts = input.value.split(",");
  const current = parts[parts.length - 1].trim().toLowerCase();
  if (!current) return hideQuickFill();
  const matches = all.filter((x) => x.toLowerCase().includes(current)).slice(0, 8);
  if (!matches.length) return hideQuickFill();

  const rect = input.getBoundingClientRect();
  els.quickfillBox.innerHTML = "";
  matches.forEach((match) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = match;
    btn.addEventListener("click", () => {
      parts[parts.length - 1] = ` ${match}`;
      input.value = parts.map((x) => x.trim()).filter(Boolean).join(", ");
      hideQuickFill();
      input.focus();
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
    if (item.type === "races") source.races.push({ name: item.name, ...item.data });
    if (item.type === "classes") source.classes.push({ name: item.name, ...item.data });
    if (item.type === "backgrounds") source.backgrounds.push({ name: item.name, ...item.data });
  });
  const map = {
    languages: [...new Set(source.races.flatMap((r) => toArray(r.languages)))],
    skills: [...new Set([...source.races.flatMap((r) => toArray(r.skills)), ...source.backgrounds.flatMap((b) => toArray(b.skills))])],
    "race-features": [...new Set(source.races.flatMap((r) => toArray(r.features)))],
    proficiencies: [...new Set(source.classes.flatMap((c) => toArray(c.proficiencies)))],
    equipment: [...new Set(source.backgrounds.flatMap((b) => toArray(b.equipment)))],
    "background-features": [...new Set(source.backgrounds.map((b) => b.feature).filter(Boolean))],
  };
  return map[domain] || [];
}

function renderOptionCards(container, items, selected, onSelect) {
  container.innerHTML = "";
  items.forEach((item) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `option-card ${item.id === selected ? "selected" : ""}`;
    btn.innerHTML = `<strong>${escapeHtml(item.name)}</strong>`;
    btn.addEventListener("click", () => onSelect(item.id));
    container.appendChild(btn);
  });
}

function selectedRace() { return state.data.races.find((x) => x.id === state.character.raceId) || state.data.races[0]; }
function selectedClass() { return classById(state.character.classId); }
function classById(id) { return state.data.classes.find((x) => x.id === id) || state.data.classes[0]; }
function selectedBackground() { return state.data.backgrounds.find((x) => x.id === state.character.backgroundId) || state.data.backgrounds[0]; }
function spentPoints() { return Object.values(state.character.abilities).reduce((s, v) => s + COST_BY_SCORE[v], 0); }
function totalCharacterLevel() { return state.character.primaryLevel + (state.character.multiclassEnabled ? state.character.multiclassLevel : 0); }
function formatAbilityBonuses(b) { const p = Object.entries(b || {}); return p.length ? p.map(([a, v]) => `${a} ${v >= 0 ? "+" : ""}${v}`).join(", ") : "None"; }
function downloadJson() { downloadBlob(JSON.parse(els.characterSheet.textContent), `${(state.character.name || "character").replace(/\s+/g, "-").toLowerCase()}.json`); }
function downloadBlob(data, file) { const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = file; a.click(); URL.revokeObjectURL(url); }
function toArray(v) { if (Array.isArray(v)) return v; if (typeof v === "string" && v.trim()) return [v.trim()]; return []; }
function csv(v) { return String(v || "").split(",").map((x) => x.trim()).filter(Boolean); }
function fail(msg) { els.customStatus.textContent = msg; return null; }
function slugify(v) { return String(v || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""); }
function labelForType(type) { return { races: "Race", classes: "Class", spells: "Spell", backgrounds: "Background", feats: "Feat" }[type] || type; }
function capitalize(v) { return `${v[0].toUpperCase()}${v.slice(1)}`; }
function clamp(v, min, max) { return Math.min(Math.max(v, min), max); }
function byId(id) { return document.getElementById(id); }
function escapeHtml(text) { return String(text).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"); }
