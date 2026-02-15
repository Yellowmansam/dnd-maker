const STORAGE_KEY = "dnd-builder-state-v1";

const defaultData = {
  catalog: {
    classes: ["Fighter", "Wizard", "Rogue", "Cleric"],
    races: ["Human", "Elf", "Dwarf", "Halfling"],
    spells: ["Magic Missile", "Cure Wounds", "Shield", "Bless"],
    subclasses: [
      { name: "Champion", parent: "Fighter" },
      { name: "Evocation", parent: "Wizard" },
      { name: "Thief", parent: "Rogue" },
      { name: "Life Domain", parent: "Cleric" },
    ],
  },
  character: {
    name: "",
    level: 1,
    class: "Fighter",
    subclass: "Champion",
    race: "Human",
    background: "",
    abilities: {
      STR: 10,
      DEX: 10,
      CON: 10,
      INT: 10,
      WIS: 10,
      CHA: 10,
    },
    spells: [],
  },
};

const state = loadState();

const els = {
  form: document.getElementById("character-form"),
  classSelect: document.getElementById("class"),
  subclassSelect: document.getElementById("subclass"),
  raceSelect: document.getElementById("race"),
  spellPicker: document.getElementById("spell-picker"),
  spellList: document.getElementById("spell-list"),
  abilities: document.getElementById("abilities"),
  status: document.getElementById("status"),
  subclassParent: document.getElementById("subclass-parent"),
};

init();

function init() {
  bindCharacterFields();
  bindCatalogForms();
  bindActionButtons();
  render();
}

function bindCharacterFields() {
  ["name", "level", "background"].forEach((field) => {
    document.getElementById(field).addEventListener("input", (event) => {
      state.character[field] = field === "level" ? Number(event.target.value) : event.target.value;
    });
  });

  els.classSelect.addEventListener("change", (event) => {
    state.character.class = event.target.value;
    const firstSubclass = filteredSubclasses()[0]?.name || "";
    state.character.subclass = firstSubclass;
    render();
  });

  els.subclassSelect.addEventListener("change", (event) => {
    state.character.subclass = event.target.value;
  });

  els.raceSelect.addEventListener("change", (event) => {
    state.character.race = event.target.value;
  });

  document.getElementById("add-spell").addEventListener("click", () => {
    const value = els.spellPicker.value;
    if (!value || state.character.spells.includes(value)) return;
    state.character.spells.push(value);
    renderSpells();
  });
}

function bindCatalogForms() {
  document.querySelectorAll(".mini-form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const type = form.dataset.type;
      const formData = new FormData(form);
      const name = String(formData.get("name") || "").trim();
      if (!name) return;

      if (type === "subclasses") {
        const parent = String(formData.get("parent") || "");
        if (!parent) return;
        state.catalog.subclasses.push({ name, parent });
      } else {
        state.catalog[type].push(name);
      }

      form.reset();
      render();
      setStatus(`Added ${name} to ${type}.`);
    });
  });
}

function bindActionButtons() {
  document.getElementById("save").addEventListener("click", () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    setStatus("Character saved locally.");
  });

  document.getElementById("download").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${state.character.name || "character"}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    setStatus("Downloaded JSON export.");
  });

  document.getElementById("reset").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    Object.assign(state, structuredClone(defaultData));
    render();
    setStatus("Builder reset to defaults.");
  });
}

function render() {
  syncInputs();
  renderOptions();
  renderAbilities();
  renderSpells();
}

function syncInputs() {
  document.getElementById("name").value = state.character.name;
  document.getElementById("level").value = state.character.level;
  document.getElementById("background").value = state.character.background;
}

function renderOptions() {
  fillSelect(els.classSelect, state.catalog.classes, state.character.class);
  fillSelect(els.raceSelect, state.catalog.races, state.character.race);

  const subclasses = filteredSubclasses();
  fillSelect(els.subclassSelect, subclasses.map((s) => s.name), state.character.subclass);
  if (!subclasses.some((s) => s.name === state.character.subclass)) {
    state.character.subclass = subclasses[0]?.name || "";
    els.subclassSelect.value = state.character.subclass;
  }

  fillSelect(els.spellPicker, state.catalog.spells, "");
  fillSelect(els.subclassParent, state.catalog.classes, "");
}

function renderAbilities() {
  els.abilities.innerHTML = "";
  Object.entries(state.character.abilities).forEach(([ability, score]) => {
    const modifier = Math.floor((Number(score) - 10) / 2);
    const wrapper = document.createElement("div");
    wrapper.className = "ability";
    wrapper.innerHTML = `
      <strong>${ability}</strong>
      <label>
        Score
        <input type="number" min="1" max="30" value="${score}" />
      </label>
      <small>Modifier: ${modifier >= 0 ? "+" : ""}${modifier}</small>
    `;
    wrapper.querySelector("input").addEventListener("input", (event) => {
      state.character.abilities[ability] = Number(event.target.value);
      renderAbilities();
    });
    els.abilities.appendChild(wrapper);
  });
}

function renderSpells() {
  els.spellList.innerHTML = "";
  state.character.spells.forEach((spell, index) => {
    const li = document.createElement("li");
    const remove = document.createElement("button");
    remove.textContent = "Remove";
    remove.type = "button";
    remove.addEventListener("click", () => {
      state.character.spells.splice(index, 1);
      renderSpells();
    });
    li.textContent = `${spell} `;
    li.appendChild(remove);
    els.spellList.appendChild(li);
  });
}

function filteredSubclasses() {
  return state.catalog.subclasses.filter((subclass) => subclass.parent === state.character.class);
}

function fillSelect(select, values, selectedValue) {
  select.innerHTML = "";
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    if (value === selectedValue) option.selected = true;
    select.appendChild(option);
  });
}

function setStatus(message) {
  els.status.textContent = `${message}\n\nCurrent character:\n${JSON.stringify(state.character, null, 2)}`;
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return structuredClone(defaultData);

  try {
    return { ...structuredClone(defaultData), ...JSON.parse(raw) };
  } catch {
    return structuredClone(defaultData);
  }
}
