// ============================================================
// Anime Archive — front-end logic
// Talks only to /api/anime (the backend). No video URLs live here.
// ============================================================

const grid = document.getElementById("grid");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");

const overlay = document.getElementById("overlay");
const drawer = document.getElementById("drawer");
const closeDrawer = document.getElementById("closeDrawer");
const playerMount = document.getElementById("playerMount");
const drawerTitle = document.getElementById("drawerTitle");
const drawerSynopsis = document.getElementById("drawerSynopsis");
const drawerTags = document.getElementById("drawerTags");
const episodeList = document.getElementById("episodeList");

let debounceTimer = null;

// Tracks the anime + episode currently loaded in the drawer,
// so we know what "next episode" means when one finishes.
let currentAnime = null;
let currentEpisodeIndex = -1;

// Tracks when the current iframe episode's timer should fire (wall-clock
// timestamp in ms), so we can recover correctly even if the browser
// throttles setTimeout while the tab is backgrounded/minimized — which
// is the most common reason a long single setTimeout silently "misses."
let autoAdvanceDeadline = null;

// ---------- helpers ----------
function escapeHtml(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function pad(n) {
  return String(n).padStart(2, "0");
}

// ---------- fetch + render catalog ----------
async function loadCatalog(query = "") {
  const url = query
    ? `/api/anime?search=${encodeURIComponent(query)}`
    : "/api/anime";

  try {
    const res = await fetch(url);
    const data = await res.json();
    renderGrid(data);
  } catch (err) {
    grid.innerHTML = "";
    resultCount.textContent = "ERROR";
    emptyState.textContent = "Could not reach the backend. Is /api/anime deployed?";
    emptyState.classList.remove("hidden");
    console.error(err);
  }
}

function renderGrid(list) {
  grid.innerHTML = "";
  resultCount.textContent = `${pad(list.length)} TITLE${list.length === 1 ? "" : "S"}`;

  if (list.length === 0) {
    emptyState.classList.remove("hidden");
    return;
  }
  emptyState.classList.add("hidden");

  list.forEach((anime, i) => {
    const card = document.createElement("button");
    card.className = "card";
    card.style.animationDelay = `${Math.min(i * 0.04, 0.4)}s`;
    card.innerHTML = `
      <img class="card-cover" src="${escapeHtml(anime.cover)}" alt="${escapeHtml(anime.title)} cover art" loading="lazy" />
      <span class="card-stamp">EP ${pad(anime.episodeCount)}</span>
      <div class="card-body">
        <div class="card-title">${escapeHtml(anime.title)}</div>
        <div class="card-tags">${(anime.tags || []).map(t => `<span>${escapeHtml(t)}</span>`).join("")}</div>
      </div>
    `;
    card.addEventListener("click", () => openAnime(anime.id));
    grid.appendChild(card);
  });
}

// ---------- drawer: episode list + player ----------
async function openAnime(id) {
  try {
    const res = await fetch(`/api/anime?id=${id}`);
    if (!res.ok) throw new Error("Anime not found");
    const anime = await res.json();
    renderDrawer(anime);
    showDrawer();
  } catch (err) {
    console.error(err);
  }
}

function renderDrawer(anime) {
  clearAutoAdvanceTimer();
  currentAnime = anime;
  currentEpisodeIndex = -1;

  drawerTitle.textContent = anime.title;
  drawerSynopsis.textContent = anime.synopsis;
  drawerTags.innerHTML = (anime.tags || []).map(t => `<span>${escapeHtml(t)}</span>`).join("");

  playerMount.innerHTML = `<p class="player-placeholder mono">SELECT AN EPISODE →</p>`;

  episodeList.innerHTML = "";
  anime.episodes.forEach((ep, index) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.className = "episode-item";
    btn.innerHTML = `
      <span class="episode-number mono">${pad(ep.number)}</span>
      <span class="episode-title">${escapeHtml(ep.title)}</span>
    `;
    btn.addEventListener("click", () => selectEpisode(index));
    li.appendChild(btn);
    episodeList.appendChild(li);
  });

  // auto-load first episode
  if (anime.episodes.length) {
    selectEpisode(0);
  }
}

// Activates the episode at `index`, updates the highlighted list item,
// scrolls it into view, and loads it into the player.
function selectEpisode(index) {
  if (!currentAnime || !currentAnime.episodes[index]) return;

  currentEpisodeIndex = index;

  const items = episodeList.querySelectorAll(".episode-item");
  items.forEach(el => el.classList.remove("active"));
  const activeBtn = items[index];
  if (activeBtn) {
    activeBtn.classList.add("active");
    activeBtn.scrollIntoView({ block: "nearest" });
  }

  loadPlayer(currentAnime.episodes[index]);
}

// Advances to the next episode, if one exists.
function playNextEpisode() {
  if (!currentAnime) return;
  const nextIndex = currentEpisodeIndex + 1;
  if (nextIndex < currentAnime.episodes.length) {
    selectEpisode(nextIndex);
  }
}

function loadPlayer(episode) {
  // Always clear any timer from the previous episode first, so switching
  // episodes manually never leaves a stale auto-advance pending.
  clearAutoAdvanceTimer();
  playerMount.innerHTML = "";

  if (episode.type === "iframe") {
    const iframe = document.createElement("iframe");
    iframe.src = episode.src;
    iframe.allow = "autoplay; fullscreen; encrypted-media; picture-in-picture";
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    playerMount.appendChild(iframe);

    // We can't see inside a cross-origin iframe to know when it ends,
    // but if this episode has a known runtime we can fake it with a timer.
    // A single long setTimeout can get throttled/dropped while the tab is
    // backgrounded, so instead we record a wall-clock deadline and check
    // it on a short interval (and again the instant the tab regains
    // focus) — that way a backgrounded tab still catches up correctly.
    if (episode.duration && episode.duration > 0) {
      startAutoAdvanceTimer(episode.duration);
    }
  } else {
    const video = document.createElement("video");
    video.src = episode.src;
    video.controls = true;
    video.playsInline = true;
    video.autoplay = true;
    // Native videos tell us exactly when they finish, so we can
    // genuinely auto-advance here.
    video.addEventListener("ended", playNextEpisode);
    playerMount.appendChild(video);
  }

  renderNextEpisodeControl(episode);
}

function startAutoAdvanceTimer(durationSeconds) {
  autoAdvanceDeadline = Date.now() + durationSeconds * 1000;
  updateAutoAdvanceHint();
  // Check every second. Cheap, and immune to a single dropped timeout.
  autoAdvanceTimer = setInterval(() => {
    checkAutoAdvanceDeadline();
    updateAutoAdvanceHint();
  }, 1000);
}

function checkAutoAdvanceDeadline() {
  if (autoAdvanceDeadline && Date.now() >= autoAdvanceDeadline) {
    clearAutoAdvanceTimer();
    playNextEpisode();
  }
}

function clearAutoAdvanceTimer() {
  if (autoAdvanceTimer) {
    clearInterval(autoAdvanceTimer);
    autoAdvanceTimer = null;
  }
  autoAdvanceDeadline = null;
}

// Updates the "AUTO-ADVANCING… 12:34" hint text in place, so the timer's
// progress is visibly confirmed rather than a fire-and-forget guess.
function updateAutoAdvanceHint() {
  const hint = document.getElementById("nextEpisodeHint");
  if (!hint || !autoAdvanceDeadline) return;
  const remainingMs = autoAdvanceDeadline - Date.now();
  const remainingSec = Math.max(0, Math.ceil(remainingMs / 1000));
  const mins = Math.floor(remainingSec / 60);
  const secs = remainingSec % 60;
  hint.textContent = `AUTO-ADVANCING IN ${mins}:${String(secs).padStart(2, "0")}`;
}

// Background tabs can pause setInterval too, but browsers reliably fire
// visibilitychange the moment a tab becomes visible again — so re-check
// the deadline right then to catch up instantly instead of waiting for
// the next (possibly delayed) interval tick.
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    checkAutoAdvanceDeadline();
  }
});

// Embedded (iframe) players live on another domain, so the page has no
// way to detect when they actually finish playing. If the episode has a
// known `duration`, loadPlayer() already started a timer to auto-advance.
// Either way, we surface a one-click Next button so moving on is always
// effortless — and label it to reflect whether auto-advance is active.
function renderNextEpisodeControl(currentEpisode) {
  const existing = document.getElementById("nextEpisodeControl");
  if (existing) existing.remove();

  if (!currentAnime) return;
  const hasNext = currentEpisodeIndex + 1 < currentAnime.episodes.length;
  if (!hasNext) return;

  const nextEp = currentAnime.episodes[currentEpisodeIndex + 1];
  const isAutoTimed = currentEpisode.type === "iframe" && currentEpisode.duration > 0;
  const isNativeAuto = currentEpisode.type !== "iframe";

  const wrap = document.createElement("div");
  wrap.id = "nextEpisodeControl";
  wrap.className = "next-episode-control";
  wrap.innerHTML = `
    ${isAutoTimed ? `<span id="nextEpisodeHint" class="next-episode-hint mono">AUTO-ADVANCING…</span>` : ""}
    ${!isAutoTimed && !isNativeAuto ? `<span class="next-episode-hint mono">NO TIMER SET</span>` : ""}
    <button id="nextEpisodeBtn" class="next-episode-btn mono">
      NEXT: ${escapeHtml(nextEp.title)} →
    </button>
  `;
  wrap.querySelector("#nextEpisodeBtn").addEventListener("click", playNextEpisode);
  playerMount.insertAdjacentElement("afterend", wrap);

  // Render the timer state immediately so the countdown doesn't wait a
  // full second to show its first value.
  if (isAutoTimed) updateAutoAdvanceHint();
}

function showDrawer() {
  overlay.classList.remove("hidden");
  drawer.classList.remove("hidden");
  requestAnimationFrame(() => {
    overlay.classList.add("visible");
    drawer.classList.add("visible");
  });
  drawer.setAttribute("aria-hidden", "false");
}

function hideDrawer() {
  overlay.classList.remove("visible");
  drawer.classList.remove("visible");
  drawer.setAttribute("aria-hidden", "true");
  clearAutoAdvanceTimer();
  setTimeout(() => {
    overlay.classList.add("hidden");
    drawer.classList.add("hidden");
    playerMount.innerHTML = `<p class="player-placeholder mono">SELECT AN EPISODE →</p>`;
    const existing = document.getElementById("nextEpisodeControl");
    if (existing) existing.remove();
    currentAnime = null;
    currentEpisodeIndex = -1;
  }, 250);
}

closeDrawer.addEventListener("click", hideDrawer);
overlay.addEventListener("click", hideDrawer);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") hideDrawer();
});

// ---------- search ----------
searchInput.addEventListener("input", (e) => {
  clearTimeout(debounceTimer);
  const value = e.target.value.trim();
  debounceTimer = setTimeout(() => loadCatalog(value), 250);
});

// ---------- init ----------
loadCatalog();
