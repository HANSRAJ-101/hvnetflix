// ============================================================
// Anime Archive — front-end logic
// Talks only to /api/anime (the backend). No video URLs live here.
// Auth, playlists, and watch-progress are handled by auth.js (AA),
// all persisted to localStorage.
// ============================================================

const grid = document.getElementById("grid");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const searchDropdown = document.getElementById("searchDropdown");
const authArea = document.getElementById("authArea");
const mylistToggle = document.getElementById("mylistToggle");
const categoryRow = document.getElementById("categoryRow");
const bannerEl = document.getElementById("banner");
const continueRow = document.getElementById("continueRow");
const continueList = document.getElementById("continueList");
const topList = document.getElementById("topList");

const overlay = document.getElementById("overlay");
const drawer = document.getElementById("drawer");
const closeDrawer = document.getElementById("closeDrawer");
const playerMount = document.getElementById("playerMount");
const drawerTitle = document.getElementById("drawerTitle");
const drawerSynopsis = document.getElementById("drawerSynopsis");
const drawerTags = document.getElementById("drawerTags");
const episodeList = document.getElementById("episodeList");
const playlistBtn = document.getElementById("playlistBtn");
const watchInfoCover = document.getElementById("watchInfoCover");
const episodeFilter = document.getElementById("episodeFilter");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const shareBtn = document.getElementById("shareBtn");

let debounceTimer = null;
let mylistActive = false;
let activeCategory = null; // null = "ALL"
let lastCatalog = []; // cache of the full (unfiltered-by-search) summary list

// Tracks the anime + episode currently loaded in the drawer,
// so we know what "next episode" means when one finishes.
let currentAnime = null;
let currentEpisodeIndex = -1;

// Tracks when the current iframe episode's timer should fire (wall-clock
// timestamp in ms), so we can recover correctly even if the browser
// throttles setTimeout while the tab is backgrounded/minimized — which
// is the most common reason a long single setTimeout silently "misses."
let autoAdvanceDeadline = null;
// The setInterval ID used to poll autoAdvanceDeadline every second.
let autoAdvanceTimer = null;

// Throttle marker for saving mp4 progress so we don't hammer
// localStorage on every single timeupdate tick.
let lastProgressSaveAt = 0;

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

function formatClock(seconds) {
  if (!isFinite(seconds) || seconds < 0) seconds = 0;
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${pad(m)}:${pad(s)}`;
}

function currentUser() {
  return AA.getCurrentUser();
}

// ---------- auth header ----------
function renderAuthArea() {
  const user = currentUser();
  if (user) {
    authArea.innerHTML = `
      <a href="profile.html" class="auth-user-link">${escapeHtml(user)}</a>
      <button id="logoutBtn" class="auth-btn">LOG OUT</button>
    `;
    document.getElementById("logoutBtn").addEventListener("click", () => {
      AA.logoutUser();
      window.location.reload();
    });
  } else {
    authArea.innerHTML = `<a href="login.html" class="auth-btn">LOG IN / REGISTER</a>`;
  }
}

// ---------- fetch + render catalog ----------
async function loadCatalog(query = "") {
  const url = query
    ? `/api/anime?search=${encodeURIComponent(query)}`
    : "/api/anime";

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!query) {
      lastCatalog = data;
      initBanner(data);
      renderContinueWatching(data);
      renderCategories(data);
      renderTopList(data);
    }

    renderGrid(applyFilters(data));
  } catch (err) {
    grid.innerHTML = "";
    resultCount.textContent = "ERROR";
    emptyState.textContent = "Could not reach the backend. Is /api/anime deployed?";
    emptyState.classList.remove("hidden");
    console.error(err);
  }
}

function applyFilters(list) {
  let result = list;
  if (mylistActive) {
    const playlist = AA.getPlaylist(currentUser());
    result = result.filter((a) => playlist.includes(a.id));
  }
  if (activeCategory) {
    result = result.filter((a) => (a.tags || []).includes(activeCategory));
  }
  return result;
}

// ---------- categories ----------
function renderCategories(list) {
  const tagSet = new Set();
  list.forEach((a) => (a.tags || []).forEach((t) => tagSet.add(t)));
  const tags = [...tagSet].sort((a, b) => a.localeCompare(b));

  categoryRow.innerHTML =
    `<button class="category-chip${activeCategory === null ? " active" : ""}" data-tag="">ALL</button>` +
    tags
      .map(
        (t) =>
          `<button class="category-chip${activeCategory === t ? " active" : ""}" data-tag="${escapeHtml(t)}">${escapeHtml(t)}</button>`
      )
      .join("");

  categoryRow.querySelectorAll(".category-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      activeCategory = chip.dataset.tag || null;
      categoryRow.querySelectorAll(".category-chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      renderGrid(applyFilters(lastCatalog));
    });
  });
}

// ---------- sidebar: top titles by episode count ----------
function renderTopList(list) {
  if (!topList) return;
  const top = [...list].sort((a, b) => b.episodeCount - a.episodeCount).slice(0, 5);

  topList.innerHTML = top
    .map(
      (a, i) => `
      <li>
        <button class="top-item" data-id="${a.id}">
          <span class="top-rank mono">${pad(i + 1)}</span>
          <img class="top-thumb" src="${escapeHtml(a.cover)}" alt="" loading="lazy" />
          <div class="top-info">
            <div class="top-info-title">${escapeHtml(a.title)}</div>
            <div class="top-info-sub">EP ${pad(a.episodeCount)}</div>
          </div>
        </button>
      </li>
    `
    )
    .join("");

  topList.querySelectorAll(".top-item").forEach((el) => {
    el.addEventListener("click", () => openAnime(Number(el.dataset.id)));
  });
}

function renderGrid(list) {
  grid.innerHTML = "";
  resultCount.textContent = `${pad(list.length)} TITLE${list.length === 1 ? "" : "S"}`;

  if (list.length === 0) {
    emptyState.classList.remove("hidden");
    emptyState.textContent = mylistActive
      ? "Your list is empty. Add titles from their episode page."
      : "No titles match that search. Try another keyword.";
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

mylistToggle.addEventListener("click", () => {
  if (!currentUser()) {
    window.location.href = "login.html";
    return;
  }
  mylistActive = !mylistActive;
  mylistToggle.classList.toggle("active", mylistActive);
  renderGrid(applyFilters(lastCatalog));
});

// ---------- top sliding banner ----------
let bannerSlides = [];
let bannerIndex = 0;
let bannerTimer = null;
const BANNER_INTERVAL_MS = 2000;

function initBanner(list) {
  // Feature up to 5 titles — furthest along in the catalog order counts
  // as "latest," most episodes counts as "popular."
  const byLatest = [...list].slice(-5).reverse();
  const byPopular = [...list].sort((a, b) => b.episodeCount - a.episodeCount);
  const merged = [];
  const seen = new Set();
  [...byLatest, ...byPopular].forEach((a) => {
    if (!seen.has(a.id) && merged.length < 5) {
      seen.add(a.id);
      merged.push(a);
    }
  });

  bannerSlides = merged;
  bannerIndex = 0;
  renderBanner();
  startBannerAutoplay();
}

function renderBanner() {
  if (!bannerSlides.length) {
    bannerEl.classList.add("hidden");
    return;
  }
  bannerEl.classList.remove("hidden");

  bannerEl.innerHTML =
    bannerSlides
      .map(
        (a, i) => `
      <div class="banner-slide${i === bannerIndex ? " active" : ""}" style="background-image:url('${escapeHtml(a.cover)}')">
        <div class="banner-copy">
          <span class="banner-eyebrow mono">#${i + 1} SPOTLIGHT</span>
          <h2 class="banner-title">${escapeHtml(a.title)}</h2>
          <div class="banner-meta mono">
            <span class="banner-meta-item">📺 SERIES</span>
            <span class="banner-meta-item">🕐 ${pad(a.episodeCount)} EP</span>
            ${a.tags && a.tags[0] ? `<span class="banner-badge">${escapeHtml(a.tags[0])}</span>` : ""}
          </div>
          <p class="banner-synopsis">${escapeHtml(a.synopsis || "")}</p>
          <div class="banner-actions">
            <button class="banner-watch-btn" data-id="${a.id}">▶ Watch Now</button>
            <button class="banner-detail-btn" data-id="${a.id}">Detail ›</button>
          </div>
        </div>
      </div>`
      )
      .join("") +
    `<button class="banner-nav banner-nav-next" aria-label="Next">›</button>
     <button class="banner-nav banner-nav-prev" aria-label="Previous">‹</button>`;

  bannerEl.querySelectorAll(".banner-watch-btn, .banner-detail-btn").forEach((el) => {
    el.addEventListener("click", () => openAnime(Number(el.dataset.id)));
  });
  bannerEl.querySelector(".banner-nav-next").addEventListener("click", () => {
    goToBannerSlide(bannerIndex + 1);
    startBannerAutoplay();
  });
  bannerEl.querySelector(".banner-nav-prev").addEventListener("click", () => {
    goToBannerSlide(bannerIndex - 1);
    startBannerAutoplay();
  });
}

function goToBannerSlide(index) {
  bannerIndex = (index + bannerSlides.length) % bannerSlides.length;
  renderBanner();
}

function startBannerAutoplay() {
  clearInterval(bannerTimer);
  if (bannerSlides.length <= 1) return;
  bannerTimer = setInterval(() => {
    goToBannerSlide(bannerIndex + 1);
  }, BANNER_INTERVAL_MS);
}

// ---------- continue watching ----------
function renderContinueWatching(list) {
  const user = currentUser();
  if (!user) {
    continueRow.classList.add("hidden");
    return;
  }

  const allProgress = AA.getAllProgress(user);
  const entries = Object.entries(allProgress)
    .map(([animeId, p]) => ({ animeId: Number(animeId), ...p }))
    .filter((p) => list.some((a) => a.id === p.animeId))
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .slice(0, 10);

  if (!entries.length) {
    continueRow.classList.add("hidden");
    return;
  }

  continueRow.classList.remove("hidden");
  continueList.innerHTML = entries
    .map((p) => {
      const anime = list.find((a) => a.id === p.animeId);
      const pct = p.duration ? Math.min(100, (p.time / p.duration) * 100) : 0;
      return `
        <button class="continue-card" data-id="${anime.id}">
          <img class="continue-cover" src="${escapeHtml(anime.cover)}" alt="${escapeHtml(anime.title)}" loading="lazy" />
          <div class="continue-progress-track"><div class="continue-progress-fill" style="width:${pct}%"></div></div>
          <div class="continue-body">
            <div class="continue-title">${escapeHtml(anime.title)}</div>
            <div class="continue-sub mono">EP ${pad((p.episodeNumber ?? p.episodeIndex + 1) || 1)} · ${formatClock(p.time || 0)}</div>
          </div>
        </button>
      `;
    })
    .join("");

  continueList.querySelectorAll(".continue-card").forEach((el) => {
    el.addEventListener("click", () => openAnime(Number(el.dataset.id)));
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
  watchInfoCover.src = anime.cover;
  watchInfoCover.alt = `${anime.title} cover art`;
  if (episodeFilter) episodeFilter.value = "";

  playerMount.innerHTML = `<p class="player-placeholder mono">SELECT AN EPISODE →</p>`;
  removeDynamicPlayerControls();
  renderPlaylistButton(anime.id);

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

  // Resume where the user left off, if we have a saved position for
  // this anime; otherwise start from episode 1.
  if (anime.episodes.length) {
    const user = currentUser();
    const saved = user ? AA.getProgress(user, anime.id) : null;
    const startIndex =
      saved && saved.episodeIndex != null && anime.episodes[saved.episodeIndex]
        ? saved.episodeIndex
        : 0;
    selectEpisode(startIndex);
  }
}

// ---------- playlist button ----------
function renderPlaylistButton(animeId) {
  const user = currentUser();
  const inList = user ? AA.isInPlaylist(user, animeId) : false;
  playlistBtn.textContent = inList ? "✓ IN MY LIST" : "+ MY LIST";
  playlistBtn.classList.toggle("active", inList);

  playlistBtn.onclick = () => {
    const u = currentUser();
    if (!u) {
      window.location.href = "login.html";
      return;
    }
    const nowIn = AA.togglePlaylist(u, animeId);
    playlistBtn.textContent = nowIn ? "✓ IN MY LIST" : "+ MY LIST";
    playlistBtn.classList.toggle("active", nowIn);
    if (mylistActive || activeCategory) renderGrid(applyFilters(lastCatalog));
  };
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
  persistEpisodeStart(currentAnime.episodes[index]);
}

// Records that this episode is now "the one being watched" the instant
// it's selected, even before any time has accumulated — so Continue
// Watching and resume-on-reopen work even if the user closes right away.
function persistEpisodeStart(episode) {
  const user = currentUser();
  if (!user || !currentAnime) return;
  const existing = AA.getProgress(user, currentAnime.id);
  const sameEpisode = existing && existing.episodeIndex === currentEpisodeIndex;
  const time = sameEpisode ? existing.time : 0;
  const duration = episode.duration || (sameEpisode ? existing.duration : 0);
  AA.saveProgress(user, currentAnime.id, {
    episodeIndex: currentEpisodeIndex,
    episodeNumber: episode.number,
    time,
    duration
  });
  AA.recordHistory(user, {
    animeId: currentAnime.id,
    animeTitle: currentAnime.title,
    animeCover: currentAnime.cover,
    episodeIndex: currentEpisodeIndex,
    episodeNumber: episode.number,
    time,
    duration
  });
}

function saveWatchProgress(time, duration) {
  const user = currentUser();
  if (!user || !currentAnime || currentEpisodeIndex < 0) return;
  const episode = currentAnime.episodes[currentEpisodeIndex];
  AA.saveProgress(user, currentAnime.id, {
    episodeIndex: currentEpisodeIndex,
    episodeNumber: episode.number,
    time,
    duration
  });
  AA.recordHistory(user, {
    animeId: currentAnime.id,
    animeTitle: currentAnime.title,
    animeCover: currentAnime.cover,
    episodeIndex: currentEpisodeIndex,
    episodeNumber: episode.number,
    time,
    duration
  });
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
    iframe.src = withPlayerEmbedParams(episode.src);
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
      startAutoAdvanceTimer(episode.duration, episode.loadBufferSeconds);
    }
  } else {
    const video = document.createElement("video");
    video.src = episode.src;
    video.controls = true;
    video.playsInline = true;
    video.autoplay = true;
    // Native <video> gives full, accurate access to playback state —
    // unlike iframes, there's no cross-origin barrier here. We use that
    // for a real live-synced progress readout, exact auto-advance on
    // "ended," and precise resume-from-last-position.
    video.addEventListener("ended", () => {
      saveWatchProgress(0, video.duration || 0);
      playNextEpisode();
    });

    // Resume from a saved position, if we have one for this exact episode.
    const user = currentUser();
    const saved = user ? AA.getProgress(user, currentAnime.id) : null;
    if (saved && saved.episodeIndex === currentEpisodeIndex && saved.time > 5) {
      video.addEventListener(
        "loadedmetadata",
        () => {
          if (saved.time < video.duration - 5) {
            video.currentTime = saved.time;
          }
        },
        { once: true }
      );
    }

    video.addEventListener("timeupdate", () => {
      const now = Date.now();
      if (now - lastProgressSaveAt > 5000) {
        lastProgressSaveAt = now;
        saveWatchProgress(video.currentTime, video.duration || 0);
      }
    });

    playerMount.appendChild(video);
    renderLiveProgressBar(video);
  }

  renderNextEpisodeControl(episode);
}

// A real progress readout for mp4 episodes, synced directly to the
// video element's own playback clock — accurate to the second, because
// native <video> exposes its true current time and duration (no cross-
// origin restriction the way an iframe has).
function renderLiveProgressBar(video) {
  const existing = document.getElementById("liveProgressBar");
  if (existing) existing.remove();

  const wrap = document.createElement("div");
  wrap.id = "liveProgressBar";
  wrap.className = "live-progress";
  wrap.innerHTML = `
    <div class="live-progress-track">
      <div class="live-progress-fill"></div>
    </div>
    <div class="live-progress-time mono">00:00 / 00:00</div>
  `;
  playerMount.insertAdjacentElement("afterend", wrap);

  const fill = wrap.querySelector(".live-progress-fill");
  const timeLabel = wrap.querySelector(".live-progress-time");
  const track = wrap.querySelector(".live-progress-track");

  function update() {
    const duration = video.duration || 0;
    const current = video.currentTime || 0;
    const pct = duration > 0 ? (current / duration) * 100 : 0;
    fill.style.width = `${pct}%`;
    timeLabel.textContent = `${formatClock(current)} / ${formatClock(duration)}`;
  }

  video.addEventListener("loadedmetadata", update);
  video.addEventListener("timeupdate", update);

  // Let viewers click/drag the bar to scrub, same as a real player.
  function seekFromEvent(e) {
    const rect = track.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    if (video.duration) video.currentTime = ratio * video.duration;
  }
  track.addEventListener("click", seekFromEvent);

  update();
}

// Rumble's own player shows an "Up Next" overlay and can autoplay an
// unrelated suggested video right when an episode ends — that's Rumble's
// behavior inside the iframe, not ours, and it would fight with our own
// auto-advance timer. Rumble's docs support disabling this via URL params:
// rel=0 turns off related-video suggestions, autoplay=0 keeps it from
// starting another video on its own. We only touch rumble.com URLs and
// only add params that aren't already present, so manual overrides in
// data.js (if any) are respected.
function withPlayerEmbedParams(src) {
  try {
    const url = new URL(src);
    if (!url.hostname.includes("rumble.com")) return src;
    if (!url.searchParams.has("rel")) url.searchParams.set("rel", "0");
    if (!url.searchParams.has("autoplay")) url.searchParams.set("autoplay", "0");
    return url.toString();
  } catch {
    // Malformed/relative URL — fall back to using it as-is.
    return src;
  }
}

// Small buffer (in seconds) added on top of an episode's duration before
// auto-advancing. The deadline starts the instant the iframe is inserted,
// but the embedded player needs a moment to load/buffer before playback
// visually begins — without this buffer, a precise duration can cause the
// timer to fire a few seconds before the video has actually reached its
// true end. Adjust per-episode via `loadBufferSeconds` in data.js if a
// particular source loads unusually slowly.
const DEFAULT_LOAD_BUFFER_SECONDS = 4;

function startAutoAdvanceTimer(durationSeconds, loadBufferSeconds) {
  const buffer = typeof loadBufferSeconds === "number" ? loadBufferSeconds : DEFAULT_LOAD_BUFFER_SECONDS;
  autoAdvanceDeadline = Date.now() + (durationSeconds + buffer) * 1000;
  updateAutoAdvanceHint();
  // Check every second. Cheap, and immune to a single dropped timeout.
  // We also piggyback iframe watch-progress tracking on this same tick,
  // since cross-origin iframes give us no native timeupdate event.
  autoAdvanceTimer = setInterval(() => {
    checkAutoAdvanceDeadline();
    updateAutoAdvanceHint();
    saveIframeProgressTick(durationSeconds);
  }, 1000);
}

// Approximates elapsed playback time for an iframe episode from the
// auto-advance countdown, and periodically persists it so "continue
// watching" has something reasonable to show even for embedded sources.
function saveIframeProgressTick(durationSeconds) {
  if (!autoAdvanceDeadline) return;
  const now = Date.now();
  if (now - lastProgressSaveAt < 5000) return;
  lastProgressSaveAt = now;
  const remainingMs = Math.max(0, autoAdvanceDeadline - now);
  const elapsed = Math.max(0, durationSeconds - remainingMs / 1000);
  saveWatchProgress(elapsed, durationSeconds);
}

function checkAutoAdvanceDeadline() {
  if (autoAdvanceDeadline && Date.now() >= autoAdvanceDeadline) {
    clearAutoAdvanceTimer();
    saveWatchProgress(0, 0);
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
    removeDynamicPlayerControls();
    currentAnime = null;
    currentEpisodeIndex = -1;
    renderContinueWatching(lastCatalog); // reflect whatever was just watched
  }, 250);
}

// Removes the "Next Episode" button and the live mp4 progress bar —
// both are injected as siblings right after playerMount, and both get
// rebuilt fresh by loadPlayer() on the next episode. Called whenever the
// player area is reset to its placeholder state.
function removeDynamicPlayerControls() {
  const nextControl = document.getElementById("nextEpisodeControl");
  if (nextControl) nextControl.remove();
  const progressBar = document.getElementById("liveProgressBar");
  if (progressBar) progressBar.remove();
}

closeDrawer.addEventListener("click", hideDrawer);
overlay.addEventListener("click", hideDrawer);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") hideDrawer();
});

// ---------- episode filter (by number or title text) ----------
if (episodeFilter) {
  episodeFilter.addEventListener("input", () => {
    const q = episodeFilter.value.trim().toLowerCase();
    episodeList.querySelectorAll(".episode-item").forEach((btn) => {
      const li = btn.closest("li");
      const text = btn.textContent.toLowerCase();
      li.style.display = !q || text.includes(q) ? "" : "none";
    });
  });
}

// ---------- fullscreen ----------
if (fullscreenBtn) {
  fullscreenBtn.addEventListener("click", () => {
    const shell = document.querySelector(".player-shell");
    if (!shell) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      shell.requestFullscreen?.();
    }
  });
}

// ---------- share ----------
if (shareBtn) {
  shareBtn.addEventListener("click", async () => {
    if (!currentAnime) return;
    const url = `${window.location.origin}${window.location.pathname}?open=${currentAnime.id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: currentAnime.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        shareBtn.textContent = "✓ Copied";
        setTimeout(() => (shareBtn.textContent = "🔗 Share"), 1500);
      }
    } catch {
      // user cancelled the native share sheet — nothing to do
    }
  });
}

// ---------- search: recent-searches + recommended + live suggestions ----------
// No backend involved — this all runs off the catalog we already fetched
// (lastCatalog) plus a small localStorage list of past search terms.
const RECENT_SEARCHES_KEY = "aa_recent_searches";
const MAX_RECENT_SEARCHES = 8;
const MAX_SUGGESTIONS = 6;
let activeDropdownIndex = -1;

function getRecentSearches() {
  try {
    return JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY)) || [];
  } catch {
    return [];
  }
}

function saveRecentSearch(term) {
  term = (term || "").trim();
  if (!term) return;
  let list = getRecentSearches().filter((t) => t.toLowerCase() !== term.toLowerCase());
  list.unshift(term);
  localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(list.slice(0, MAX_RECENT_SEARCHES)));
}

function removeRecentSearch(term) {
  const list = getRecentSearches().filter((t) => t !== term);
  localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(list));
}

function getTrending(limit = MAX_SUGGESTIONS) {
  return [...lastCatalog].sort((a, b) => b.episodeCount - a.episodeCount).slice(0, limit);
}

function getMatches(query, limit = MAX_SUGGESTIONS) {
  const q = query.toLowerCase();
  return lastCatalog.filter((a) => a.title.toLowerCase().includes(q)).slice(0, limit);
}

function highlightMatch(text, query) {
  if (!query) return escapeHtml(text);
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return escapeHtml(text);
  return (
    escapeHtml(text.slice(0, idx)) +
    "<mark>" + escapeHtml(text.slice(idx, idx + query.length)) + "</mark>" +
    escapeHtml(text.slice(idx + query.length))
  );
}

function renderSuggestionRow(anime, query) {
  return `
    <button class="search-suggestion-item" data-id="${anime.id}">
      <img class="search-suggestion-thumb" src="${escapeHtml(anime.cover)}" alt="" loading="lazy" />
      <div class="search-suggestion-info">
        <div class="search-suggestion-title">${highlightMatch(anime.title, query)}</div>
        <div class="search-suggestion-sub mono">EP ${pad(anime.episodeCount)}${anime.tags && anime.tags[0] ? " · " + escapeHtml(anime.tags[0]) : ""}</div>
      </div>
    </button>
  `;
}

function renderSearchDropdown() {
  const query = searchInput.value.trim();
  activeDropdownIndex = -1;
  let html = "";

  if (!query) {
    const recents = getRecentSearches();
    if (recents.length) {
      html += `<div class="search-section-label mono">RECENT SEARCHES</div>`;
      html += `<div class="search-recent-row">` +
        recents
          .map(
            (term) => `
              <span class="search-recent-chip" data-term="${escapeHtml(term)}">
                <span class="search-recent-text">${escapeHtml(term)}</span>
                <button class="search-recent-remove" data-term="${escapeHtml(term)}" aria-label="Remove">×</button>
              </span>
            `
          )
          .join("") +
        `</div>`;
    }

    const trending = getTrending();
    if (trending.length) {
      html += `<div class="search-section-label mono">${recents.length ? "RECOMMENDED FOR YOU" : "POPULAR RIGHT NOW"}</div>`;
      html += trending.map((a) => renderSuggestionRow(a, "")).join("");
    }

    if (!recents.length && !trending.length) {
      html = `<div class="search-empty-hint mono">Start typing to search the catalog…</div>`;
    }
  } else {
    const matches = getMatches(query);
    if (matches.length) {
      html += `<div class="search-section-label mono">MATCHES</div>`;
      html += matches.map((a) => renderSuggestionRow(a, query)).join("");
    } else {
      html += `<div class="search-empty-hint mono">No quick matches — try “See all results” below.</div>`;
    }
    html += `<button class="search-see-all mono" data-action="search-all">⌕ See all results for “${escapeHtml(query)}”</button>`;
  }

  searchDropdown.innerHTML = html;
  attachDropdownHandlers();
}

function attachDropdownHandlers() {
  searchDropdown.querySelectorAll(".search-suggestion-item").forEach((el) => {
    el.addEventListener("click", () => {
      const id = Number(el.dataset.id);
      const anime = lastCatalog.find((a) => a.id === id);
      if (anime) saveRecentSearch(anime.title);
      searchInput.value = "";
      closeSearchDropdown();
      loadCatalog("");
      openAnime(id);
    });
  });

  searchDropdown.querySelectorAll(".search-recent-text").forEach((el) => {
    el.addEventListener("click", () => {
      const term = el.parentElement.dataset.term;
      searchInput.value = term;
      loadCatalog(term);
      renderSearchDropdown();
      searchInput.focus();
    });
  });

  searchDropdown.querySelectorAll(".search-recent-remove").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      removeRecentSearch(el.dataset.term);
      renderSearchDropdown();
    });
  });

  const seeAll = searchDropdown.querySelector('[data-action="search-all"]');
  if (seeAll) {
    seeAll.addEventListener("click", () => {
      const term = searchInput.value.trim();
      saveRecentSearch(term);
      loadCatalog(term);
      closeSearchDropdown();
    });
  }
}

function openSearchDropdown() {
  renderSearchDropdown();
  searchDropdown.classList.remove("hidden");
}

function closeSearchDropdown() {
  searchDropdown.classList.add("hidden");
}

function getDropdownFocusableItems() {
  return [...searchDropdown.querySelectorAll(".search-suggestion-item, .search-see-all")];
}

function updateActiveHighlight(items) {
  items.forEach((el, i) => el.classList.toggle("active", i === activeDropdownIndex));
  items[activeDropdownIndex]?.scrollIntoView({ block: "nearest" });
}

searchInput.addEventListener("focus", openSearchDropdown);

searchInput.addEventListener("input", (e) => {
  clearTimeout(debounceTimer);
  const value = e.target.value.trim();
  debounceTimer = setTimeout(() => loadCatalog(value), 250);
  renderSearchDropdown();
  searchDropdown.classList.remove("hidden");
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeSearchDropdown();
    searchInput.blur();
    return;
  }

  const items = getDropdownFocusableItems();
  if (!items.length) return;

  if (e.key === "ArrowDown") {
    e.preventDefault();
    activeDropdownIndex = Math.min(activeDropdownIndex + 1, items.length - 1);
    updateActiveHighlight(items);
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    activeDropdownIndex = Math.max(activeDropdownIndex - 1, 0);
    updateActiveHighlight(items);
  } else if (e.key === "Enter") {
    if (activeDropdownIndex >= 0 && items[activeDropdownIndex]) {
      e.preventDefault();
      items[activeDropdownIndex].click();
    } else {
      const term = searchInput.value.trim();
      clearTimeout(debounceTimer);
      if (term) {
        saveRecentSearch(term);
        loadCatalog(term);
      }
      closeSearchDropdown();
    }
  }
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".search-wrap")) closeSearchDropdown();
});

// ---------- init ----------
renderAuthArea();
loadCatalog();

// Coming from profile.html's History/Watch List tabs — jump straight
// into that title's drawer once the catalog has loaded.
const deepLinkId = new URLSearchParams(window.location.search).get("open");
if (deepLinkId) {
  openAnime(Number(deepLinkId));
  history.replaceState(null, "", window.location.pathname);
}
