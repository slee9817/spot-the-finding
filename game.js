// =====================================================================
// Spot the Finding
// Stage 3: three areas to audit and an area-select screen.
// =====================================================================

// ---------------------------------------------------------------------
// Settings
// ---------------------------------------------------------------------
const POINTS_FINDING = 100;    // a real finding
const PENALTY_DECOY = 50;      // writing up something that's compliant
const PENALTY_MISS = 10;       // clicking empty space
const BONUS_PER_SECOND = 5;    // time left, only if every finding was found
const ZOOM = 2.5;              // how much the magnifier enlarges
const LOUPE_SIZE = 180;        // magnifier diameter in pixels

// ---------------------------------------------------------------------
// Game state
// ---------------------------------------------------------------------
let scene = SCENES[0];      // the area being audited
let found = [];             // ids of findings written up
let falseFindings = [];     // ids of compliant things written up by mistake
let misses = 0;             // clicks on empty space
let score = 0;
let secondsLeft = 0;
let timer = null;           // the countdown interval
let running = false;        // true while the audit is in progress
let loupeOn = false;

const $ = (id) => document.getElementById(id);
const SVG_NS = "http://www.w3.org/2000/svg";

// ---------------------------------------------------------------------
// Area select
// ---------------------------------------------------------------------
function showAreas() {
  stopTimer();
  $("auditScreen").classList.add("hidden");
  $("report").classList.add("hidden");
  $("selectScreen").classList.remove("hidden");

  const list = $("areaList");
  list.innerHTML = "";
  for (const s of SCENES) {
    const best = loadBest(s.id);
    const card = document.createElement("button");
    card.className = "area-card";
    card.innerHTML = `
      <span class="area-best">${best === null ? "NOT AUDITED" : "BEST: " + best}</span>
      <b>${s.title}</b>
      <span class="area-meta">${s.findings.length} findings · ${s.seconds} seconds</span>`;
    card.addEventListener("click", () => {
      scene = s;
      $("selectScreen").classList.add("hidden");
      $("auditScreen").classList.remove("hidden");
      loadScene();
    });
    list.appendChild(card);
  }
}

function stopTimer() {
  clearInterval(timer);
  running = false;
}

// ---------------------------------------------------------------------
// Set up the scene
// ---------------------------------------------------------------------
function loadScene() {
  stopTimer();
  found = [];
  falseFindings = [];
  misses = 0;
  score = 0;
  secondsLeft = scene.seconds;

  $("sceneTitle").textContent = scene.title;
  $("scene").innerHTML = scene.svg;
  $("totalCount").textContent = scene.findings.length;
  $("startSeconds").textContent = scene.seconds;
  $("auditMeta").textContent = `${scene.title} · ${scene.auditDate}`;
  $("scene").querySelector("svg").addEventListener("click", onSceneClick);
  $("startCover").classList.remove("hidden");
  $("report").classList.add("hidden");
  setMessage("Look closely. Some things that look wrong are actually fine.");
  renderClipboard();
  renderStats();
  copyToLoupe();
}

function startAudit() {
  $("startCover").classList.add("hidden");
  running = true;
  timer = setInterval(() => {
    secondsLeft--;
    renderStats();
    if (secondsLeft <= 0) endAudit("⏰ Time's up!");
  }, 1000);
}

// ---------------------------------------------------------------------
// Clicking the scene
// ---------------------------------------------------------------------
function onSceneClick(event) {
  if (!running) return;

  // Walk up from whatever was clicked to the nearest group with a data-id
  const target = event.target.closest("[data-id]");
  if (!target) {
    misses++;
    score -= PENALTY_MISS;
    setMessage(`Nothing there. (−${PENALTY_MISS}) Auditors don't guess.`, "decoy-bad");
    renderStats();
    return;
  }

  const id = target.dataset.id;
  const finding = scene.findings.find(f => f.id === id);
  const decoy = scene.decoys.find(d => d.id === id);

  if (finding) {
    if (found.includes(id)) {
      setMessage(`Already written up: ${finding.title}.`);
      return;
    }
    found.push(id);
    score += POINTS_FINDING;
    ring(target, "mark-found");
    setMessage(`✍️ Finding: ${finding.title} (+${POINTS_FINDING}). ${finding.why}`, "found");
    renderClipboard();
    if (found.length === scene.findings.length) endAudit("🎯 You found every finding!");
  } else if (decoy) {
    if (falseFindings.includes(id)) {
      setMessage(`✅ ${decoy.message}`, "decoy");
      return;
    }
    falseFindings.push(id);
    score -= PENALTY_DECOY;
    ring(target, "mark-decoy");
    setMessage(`❌ False finding (−${PENALTY_DECOY}). ${decoy.message}`, "decoy-bad");
  }
  renderStats();
}

// Draw a ring around an item, sized to fit it
function ring(group, cssClass) {
  const box = group.getBBox();               // the item's position and size in SVG units
  const el = document.createElementNS(SVG_NS, "ellipse");
  el.setAttribute("cx", box.x + box.width / 2);
  el.setAttribute("cy", box.y + box.height / 2);
  el.setAttribute("rx", box.width / 2 + 10);
  el.setAttribute("ry", box.height / 2 + 10);
  el.setAttribute("class", cssClass);
  el.style.pointerEvents = "none";           // don't let the ring block later clicks
  group.ownerSVGElement.appendChild(el);
  copyToLoupe();                             // keep the magnifier showing the rings too
}

// ---------------------------------------------------------------------
// The magnifying glass
// ---------------------------------------------------------------------
// The loupe holds a second copy of the scene, drawn ZOOM times bigger.
// As the mouse moves, we slide that big copy so the spot under the mouse
// sits in the middle of the circle.

function copyToLoupe() {
  $("loupeInner").innerHTML = $("scene").innerHTML;
}

function toggleLoupe() {
  loupeOn = !loupeOn;
  $("loupeState").textContent = loupeOn ? "on" : "off";
  $("loupeBtn").classList.toggle("active", loupeOn);
  if (!loupeOn) $("loupe").classList.add("hidden");
}

function moveLoupe(event) {
  if (!loupeOn) return;
  const rect = $("scene").getBoundingClientRect();
  const x = event.clientX - rect.left;      // mouse position inside the scene, in pixels
  const y = event.clientY - rect.top;

  // Hide the loupe when the mouse leaves the scene
  if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
    $("loupe").classList.add("hidden");
    return;
  }
  $("loupe").classList.remove("hidden");

  // Center the circle on the mouse
  $("loupe").style.left = `${x - LOUPE_SIZE / 2}px`;
  $("loupe").style.top = `${y - LOUPE_SIZE / 2}px`;

  // Make the copy ZOOM times the scene's size, and shift it so the point
  // under the mouse lands in the center of the circle
  const inner = $("loupeInner");
  inner.style.width = `${rect.width * ZOOM}px`;
  inner.style.left = `${LOUPE_SIZE / 2 - x * ZOOM}px`;
  inner.style.top = `${LOUPE_SIZE / 2 - y * ZOOM}px`;
}

// ---------------------------------------------------------------------
// Ending the audit and the report
// ---------------------------------------------------------------------
function endAudit(headline) {
  if (!running) return;
  running = false;
  clearInterval(timer);

  // Time bonus only for finding everything
  const bonus = found.length === scene.findings.length ? secondsLeft * BONUS_PER_SECOND : 0;
  score += bonus;
  renderStats();

  // Show the player where the missed findings were
  for (const f of scene.findings) {
    if (!found.includes(f.id)) ring($("scene").querySelector(`[data-id="${f.id}"]`), "mark-missed");
  }

  const max = scene.findings.length * POINTS_FINDING;
  const percent = Math.max(0, Math.round(Math.min(score, max) / max * 100));
  const grade = percent >= 95 ? "A" : percent >= 85 ? "B" : percent >= 70 ? "C" : percent >= 50 ? "D" : "F";

  const best = loadBest(scene.id);
  const newBest = best === null || score > best;
  if (newBest) saveBest(scene.id, score);

  const missed = scene.findings.filter(f => !found.includes(f.id));
  const missedHtml = missed.length
    ? missed.map(f => `<li><b>${f.title}</b><br><span class="why">${f.why}</span><br><span class="clause">${f.clause}</span></li>`).join("")
    : `<li>None. Every finding written up.</li>`;
  const falseHtml = falseFindings.length
    ? falseFindings.map(id => `<li>${scene.decoys.find(d => d.id === id).message}</li>`).join("")
    : `<li>None. Every finding you wrote was real.</li>`;

  $("grade").textContent = grade;
  $("grade").className = "grade grade-" + grade;
  $("reportScore").innerHTML = `${headline}<br><b>${score} points</b>`;
  $("reportBody").innerHTML = `
    <div class="report-stats">
      <div><span>${found.length}/${scene.findings.length}</span>findings</div>
      <div><span>${falseFindings.length}</span>false findings</div>
      <div><span>${misses}</span>empty clicks</div>
      <div><span>${bonus ? "+" + bonus : "—"}</span>time bonus</div>
    </div>
    <h3>Missed findings</h3><ul class="report-list">${missedHtml}</ul>
    <h3>False findings</h3><ul class="report-list">${falseHtml}</ul>
    <p class="best">${newBest ? "🏆 New high score!" : `High score: ${best}`}</p>`;
  $("report").classList.remove("hidden");
}

// High score is saved in this browser. Storage can be blocked, so wrap it in try/catch.
function loadBest(sceneId) {
  try { const v = localStorage.getItem("stf-best-" + sceneId); return v === null ? null : Number(v); } catch { return null; }
}
function saveBest(sceneId, value) {
  try { localStorage.setItem("stf-best-" + sceneId, String(value)); } catch { /* ignore */ }
}

// ---------------------------------------------------------------------
// Screen updates
// ---------------------------------------------------------------------
function renderStats() {
  const m = Math.floor(Math.max(secondsLeft, 0) / 60);
  const s = String(Math.max(secondsLeft, 0) % 60).padStart(2, "0");
  $("timer").textContent = `${m}:${s}`;
  $("timer").classList.toggle("low", secondsLeft <= 15);
  $("foundCount").textContent = found.length;
  $("score").textContent = score;
}

function setMessage(text, kind) {
  $("message").textContent = text;
  $("message").className = "message " + (kind || "");
}

// The clipboard: findings written up so far, newest first
function renderClipboard() {
  const list = $("findingList");
  list.innerHTML = "";
  [...found].reverse().forEach((id, i) => {
    const f = scene.findings.find(x => x.id === id);
    const li = document.createElement("li");
    li.innerHTML = `<b>${f.title}</b><span class="why">${f.why}</span><br><span class="clause">${f.clause}</span>`;
    if (i === 0) li.classList.add("fresh");
    list.appendChild(li);
  });
  $("emptyList").classList.toggle("hidden", found.length > 0);
}

// ---------------------------------------------------------------------
// Buttons and keys
// ---------------------------------------------------------------------
$("startBtn").addEventListener("click", startAudit);
$("finishBtn").addEventListener("click", () => endAudit("Audit finished."));
$("againBtn").addEventListener("click", loadScene);
$("reviewBtn").addEventListener("click", () => $("report").classList.add("hidden"));
$("loupeBtn").addEventListener("click", toggleLoupe);
$("areasBtn").addEventListener("click", showAreas);
$("otherAreaBtn").addEventListener("click", showAreas);
document.addEventListener("keydown", (e) => { if (e.key === "z" || e.key === "Z") toggleLoupe(); });
document.addEventListener("mousemove", moveLoupe);

showAreas();
