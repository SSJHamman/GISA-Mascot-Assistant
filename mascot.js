// ---- Tool data ----
const TOOLS = [
  {id:"calc", name:"Calculator", desc:"Fast, reliable arithmetic and scientific modes.", tags:["math","study"]},
  {id:"unit", name:"Unit Converter", desc:"Lengths, mass, temperature, data, and more.", tags:["math","study"]},
  {id:"gpa", name:"GPA Planner", desc:"Project grades and target outcomes.", tags:["planning","study"]},
  {id:"essay", name:"Essay Planner", desc:"Outline, thesis, and structure assistant.", tags:["writing","study"]},
  {id:"cite", name:"Citation Builder", desc:"APA/MLA/Chicago reference formatting.", tags:["writing"]},
  {id:"draft", name:"Draft Checker", desc:"Clarity, tone, and structure suggestions.", tags:["writing"]},
  {id:"flash", name:"Flashcard Maker", desc:"Create decks, spaced repetition ready.", tags:["study"]},
  {id:"quiz", name:"Quiz Builder", desc:"Turn notes into quick self-tests.", tags:["study"]},
  {id:"timer", name:"Timer & Stopwatch", desc:"Simple, key-bound timers.", tags:["planning","study"]},
  {id:"pomo", name:"Pomodoro Focus", desc:"Deep-work cycles with short breaks.", tags:["planning"]},
  {id:"todo", name:"To-Do & Tasks", desc:"Quick capture with priorities.", tags:["planning"]},
  {id:"habit", name:"Habit Tracker", desc:"Lightweight rhythm building.", tags:["planning"]},
  {id:"read", name:"Reading List", desc:"Queue articles and chapters.", tags:["study"]},
  {id:"dict", name:"Dictionary", desc:"Definitions, usage, and examples.", tags:["writing","study"]},
  {id:"thes", name:"Thesaurus", desc:"Find precise synonyms/antonyms.", tags:["writing"]},
  {id:"translate", name:"Language Translator", desc:"Quick bilingual lookup.", tags:["study"]},
  {id:"ptable", name:"Periodic Table", desc:"Properties, trends, and search.", tags:["study"]},
  {id:"graph", name:"Graph Plotter", desc:"Plot y=f(x) and parametrics.", tags:["math","study"]},
  {id:"matrix", name:"Matrix Solver", desc:"Determinant, inverse, systems.", tags:["math"]},
  {id:"geometry", name:"Geometry Helper", desc:"Areas, volumes, and formulas.", tags:["math","study"]},
  {id:"markdown", name:"Markdown Editor", desc:"Clean notes with export.", tags:["dev","writing"]},
  {id:"code", name:"Code Runner (sandboxed)", desc:"Tiny snippets for class demos.", tags:["dev"]},
  {id:"files", name:"File Combiner", desc:"Merge PDFs/images to single PDF.", tags:["study","planning"]},
  {id:"schedule", name:"Schedule Builder", desc:"Block classes and study time.", tags:["planning","study"]},
];

// ---- State ----
const state = {
  query: "",
  tags: new Set(),
  pinned: new Set(JSON.parse(localStorage.getItem("pinnedTools")||"[]")),
};

// ---- Elements ----
const grid = document.getElementById("grid");
const pinnedRow = document.getElementById("pinnedRow");
const pinCount = document.getElementById("pinCount");
const toolCount = document.getElementById("toolCount");
const q = document.getElementById("q");
const chips = Array.from(document.querySelectorAll(".chip"));
const drawer = document.getElementById("drawer");
const drawerTitle = document.getElementById("drawerTitle");
const drawerBody = document.getElementById("drawerBody");
const drawerMeta = document.getElementById("drawerMeta");
const closeDrawer = document.getElementById("closeDrawer");
const pinToggle = document.getElementById("pinToggle");
const launch = document.getElementById("launch");

// ---- Utilities ----
const byId = id => TOOLS.find(t=>t.id===id);
const matches = (t) => {
  const qok = !state.query || (t.name + " " + t.desc + " " + t.tags.join(" ")).toLowerCase().includes(state.query);
  const tok = state.tags.size===0 || t.tags.some(tag=>state.tags.has(tag));
  return qok && tok;
};

// ---- Render ----
function render(){
  const items = TOOLS.filter(matches);
  grid.innerHTML = items.map(t=>cardHTML(t)).join("");
  toolCount.textContent = `${items.length} tool${items.length===1?"":"s"}`;

  const pinnedTools = [...state.pinned].map(byId).filter(Boolean);
  pinnedRow.innerHTML = pinnedTools.map(t => pinnedCardHTML(t)).join("");
  pinCount.textContent = `${pinnedTools.length} pinned`;
  localStorage.setItem("pinnedTools", JSON.stringify([...state.pinned]));

  grid.querySelectorAll(".card [data-action]").forEach(btn => btn.addEventListener("click", onAction));
  grid.querySelectorAll(".card").forEach(c => c.addEventListener("keydown", cardKeys));
  pinnedRow.querySelectorAll(".card [data-action]").forEach(btn => btn.addEventListener("click", onAction));
}

function cardHTML(t){
  const pinned = state.pinned.has(t.id);
  return `
    <article class="card" tabindex="0" aria-labelledby="t-${t.id}">
      <span class="badge" title="${t.tags.join(', ')}">${t.tags[0]}</span>
      <div class="title" id="t-${t.id}">${t.name}</div>
      <div class="desc">${t.desc}</div>
      <div class="meta">
        <div>${pinned ? "Pinned" : "&nbsp;"}</div>
        <div class="actions">
          <button class="btn ghost" data-action="details" data-id="${t.id}
