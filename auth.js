// ============================================================
// AA (Anime Archive) — client-side auth, playlist, and watch
// progress engine. Everything persists to localStorage.
//
// This is a static front end with no real server-side database,
// so accounts here live only in the browser that created them.
// Passwords are lightly hashed for obscurity, not real security —
// don't reuse a sensitive password on this site.
// ============================================================

(function (global) {
  const USERS_KEY = "aa_users";
  const SESSION_KEY = "aa_session";

  function hashPass(str) {
    // djb2 — fast and deterministic, NOT cryptographically secure.
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 33) ^ str.charCodeAt(i);
    }
    return (hash >>> 0).toString(16);
  }

  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function registerUser(username, password) {
    username = (username || "").trim();
    if (!username || !password) {
      return { ok: false, error: "Username and password are required." };
    }
    if (username.length < 3) {
      return { ok: false, error: "Username must be at least 3 characters." };
    }
    if (password.length < 4) {
      return { ok: false, error: "Password must be at least 4 characters." };
    }

    const users = getUsers();
    if (users.some((u) => u.username.toLowerCase() === username.toLowerCase())) {
      return { ok: false, error: "That username is already taken." };
    }

    users.push({
      username,
      passHash: hashPass(password),
      createdAt: Date.now(),
      displayName: username,
      email: "",
      avatar: ""
    });
    saveUsers(users);
    setSession(username);
    return { ok: true };
  }

  function loginUser(username, password) {
    username = (username || "").trim();
    const users = getUsers();
    const user = users.find((u) => u.username.toLowerCase() === username.toLowerCase());
    if (!user || user.passHash !== hashPass(password)) {
      return { ok: false, error: "Invalid username or password." };
    }
    setSession(user.username);
    return { ok: true };
  }

  function setSession(username) {
    localStorage.setItem(SESSION_KEY, username);
  }

  function logoutUser() {
    localStorage.removeItem(SESSION_KEY);
  }

  function getCurrentUser() {
    return localStorage.getItem(SESSION_KEY);
  }

  // Redirects to the login page if nobody is signed in.
  // Returns true/false so callers can bail out early.
  function requireAuth(redirectTo = "login.html") {
    if (!getCurrentUser()) {
      window.location.href = redirectTo;
      return false;
    }
    return true;
  }

  // ---------------- playlist ----------------
  function playlistKey(username) {
    return `aa_playlist_${username}`;
  }

  function getPlaylist(username) {
    if (!username) return [];
    try {
      return JSON.parse(localStorage.getItem(playlistKey(username))) || [];
    } catch {
      return [];
    }
  }

  function isInPlaylist(username, animeId) {
    return getPlaylist(username).includes(Number(animeId));
  }

  // Adds/removes and returns the new "is in playlist" state.
  function togglePlaylist(username, animeId) {
    if (!username) return false;
    animeId = Number(animeId);
    let list = getPlaylist(username);
    const wasIn = list.includes(animeId);
    list = wasIn ? list.filter((id) => id !== animeId) : [...list, animeId];
    localStorage.setItem(playlistKey(username), JSON.stringify(list));
    return !wasIn;
  }

  // ---------------- profile ----------------
  function getProfile(username) {
    const user = getUsers().find((u) => u.username === username);
    if (!user) return null;
    return {
      username: user.username,
      displayName: user.displayName || user.username,
      email: user.email || "",
      avatar: user.avatar || "",
      createdAt: user.createdAt
    };
  }

  function updateProfile(username, fields) {
    const users = getUsers();
    const idx = users.findIndex((u) => u.username === username);
    if (idx === -1) return { ok: false, error: "User not found." };
    users[idx] = { ...users[idx], ...fields };
    saveUsers(users);
    return { ok: true };
  }

  function changePassword(username, oldPassword, newPassword) {
    const users = getUsers();
    const idx = users.findIndex((u) => u.username === username);
    if (idx === -1) return { ok: false, error: "User not found." };
    if (users[idx].passHash !== hashPass(oldPassword)) {
      return { ok: false, error: "Current password is incorrect." };
    }
    if (!newPassword || newPassword.length < 4) {
      return { ok: false, error: "New password must be at least 4 characters." };
    }
    users[idx].passHash = hashPass(newPassword);
    saveUsers(users);
    return { ok: true };
  }

  // ---------------- watch history ----------------
  // One entry per unique episode ever watched, keyed by "animeId_episodeIndex"
  // so re-watching an episode updates it in place instead of duplicating.
  function historyKey(username) {
    return `aa_history_${username}`;
  }

  function getHistoryMap(username) {
    if (!username) return {};
    try {
      return JSON.parse(localStorage.getItem(historyKey(username))) || {};
    } catch {
      return {};
    }
  }

  function recordHistory(username, entry) {
    if (!username) return;
    const map = getHistoryMap(username);
    const key = `${entry.animeId}_${entry.episodeIndex}`;
    map[key] = { ...map[key], ...entry, watchedAt: Date.now() };
    localStorage.setItem(historyKey(username), JSON.stringify(map));
  }

  function getHistoryList(username) {
    const map = getHistoryMap(username);
    return Object.values(map).sort((a, b) => b.watchedAt - a.watchedAt);
  }

  function clearHistory(username) {
    if (!username) return;
    localStorage.removeItem(historyKey(username));
  }

  // ---------------- stats (for the profile header) ----------------
  function getStats(username) {
    const list = getHistoryList(username);
    const minutes = list.reduce((sum, e) => sum + (e.time || 0), 0) / 60;
    const animeIds = new Set(list.map((e) => e.animeId));
    return {
      episodes: list.length,
      minutes: Math.round(minutes),
      animes: animeIds.size
    };
  }

  // ---------------- watch progress ----------------
  // Shape: { [animeId]: { episodeIndex, episodeNumber, time, duration, updatedAt } }
  function progressKey(username) {
    return `aa_progress_${username}`;
  }

  function getAllProgress(username) {
    if (!username) return {};
    try {
      return JSON.parse(localStorage.getItem(progressKey(username))) || {};
    } catch {
      return {};
    }
  }

  function getProgress(username, animeId) {
    const all = getAllProgress(username);
    return all[String(animeId)] || null;
  }

  function saveProgress(username, animeId, data) {
    if (!username) return;
    const all = getAllProgress(username);
    all[String(animeId)] = { ...data, updatedAt: Date.now() };
    localStorage.setItem(progressKey(username), JSON.stringify(all));
  }

  function removeProgress(username, animeId) {
    if (!username) return;
    const all = getAllProgress(username);
    delete all[String(animeId)];
    localStorage.setItem(progressKey(username), JSON.stringify(all));
  }

  global.AA = {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    requireAuth,
    getProfile,
    updateProfile,
    changePassword,
    recordHistory,
    getHistoryList,
    clearHistory,
    getStats,
    getPlaylist,
    isInPlaylist,
    togglePlaylist,
    getAllProgress,
    getProgress,
    saveProgress,
    removeProgress
  };
})(window);
