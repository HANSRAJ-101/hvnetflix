// ============================================================
// resume-watching.js
// ------------------------------------------------------------
// Generic "Continue Watching" / resume feature for ANY <video>
// element on your site. Uses the native HTML5 Video API events
// (loadedmetadata, timeupdate, ended) + localStorage.
//
// Usage:
//   <video id="myVideo" src="movie.mp4" controls></video>
//   <script src="resume-watching.js"></script>
//   <script>
//     ResumeWatching.attach(document.getElementById("myVideo"), {
//       id: "movie-123"   // unique key for THIS video/episode
//     });
//   </script>
//
// Works for any number of videos on the page/site — just give
// each one a unique `id`.
// ============================================================

(function (global) {
  const STORAGE_PREFIX = "rw_progress_";

  // Don't bother resuming if less than this many seconds were watched,
  // or if the viewer is already within this many seconds of the end
  // (avoids "resuming" a video that basically already finished).
  const MIN_RESUME_SECONDS = 5;
  const END_THRESHOLD_SECONDS = 5;

  // How often (ms) to persist progress to localStorage while playing.
  // Doing this on every single timeupdate tick (every ~250ms) would
  // hammer localStorage for no benefit, so we throttle it.
  const SAVE_INTERVAL_MS = 4000;

  function storageKey(id) {
    return `${STORAGE_PREFIX}${id}`;
  }

  function readProgress(id) {
    try {
      const raw = localStorage.getItem(storageKey(id));
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  function writeProgress(id, time, duration) {
    try {
      localStorage.setItem(
        storageKey(id),
        JSON.stringify({ time, duration, updatedAt: Date.now() })
      );
    } catch {
      // localStorage full/blocked — fail silently, resume just won't work
    }
  }

  function clearProgress(id) {
    try {
      localStorage.removeItem(storageKey(id));
    } catch {}
  }

  /**
   * Attaches resume-watching behavior to a <video> element.
   *
   * @param {HTMLVideoElement} video
   * @param {Object} options
   * @param {string} options.id - unique key identifying this video (required)
   * @param {Function} [options.onResumePrompt] - called with (savedTime, formattedTime)
   *        BEFORE seeking, if you want to show a "Resume from 12:34?" UI instead
   *        of auto-resuming. If provided, ResumeWatching will NOT seek automatically —
   *        call the returned `.resume()` or `.discard()` from your prompt's buttons.
   * @param {Function} [options.onSaved] - called with (time, duration) every time
   *        progress is persisted, handy for updating a "Continue Watching" row live.
   */
  function attach(video, options) {
    if (!video || !(video instanceof HTMLVideoElement)) {
      throw new Error("ResumeWatching.attach: a <video> element is required.");
    }
    const id = options && options.id;
    if (!id) {
      throw new Error("ResumeWatching.attach: options.id is required (unique per video).");
    }

    let lastSaveAt = 0;
    let pendingResume = null; // saved progress object, if we haven't applied it yet

    function persist() {
      const time = video.currentTime || 0;
      const duration = video.duration || 0;
      writeProgress(id, time, duration);
      if (options.onSaved) options.onSaved(time, duration);
    }

    function throttledPersist() {
      const now = Date.now();
      if (now - lastSaveAt < SAVE_INTERVAL_MS) return;
      lastSaveAt = now;
      persist();
    }

    function applyResume(saved) {
      if (!saved || !saved.time || saved.time < MIN_RESUME_SECONDS) return;
      // Wait for duration to be known so we can sanity-check against it.
      const duration = video.duration || saved.duration || 0;
      if (duration && saved.time > duration - END_THRESHOLD_SECONDS) return;
      video.currentTime = saved.time;
    }

    video.addEventListener("loadedmetadata", () => {
      const saved = readProgress(id);
      if (!saved) return;

      if (typeof options.onResumePrompt === "function") {
        // Let the caller decide whether to resume (e.g. show a modal).
        pendingResume = saved;
        options.onResumePrompt(saved.time, formatClock(saved.time));
      } else {
        applyResume(saved);
      }
    });

    video.addEventListener("timeupdate", throttledPersist);
    video.addEventListener("pause", persist);

    video.addEventListener("ended", () => {
      // Fully watched — clear so it doesn't show up as "in progress" forever.
      clearProgress(id);
      if (options.onSaved) options.onSaved(0, video.duration || 0);
    });

    // Also save right before the tab/page closes, in case the last
    // timeupdate tick was throttled away.
    window.addEventListener("beforeunload", persist);

    return {
      // For use with onResumePrompt: call to actually seek to the saved time.
      resume() {
        if (pendingResume) applyResume(pendingResume);
        pendingResume = null;
      },
      // For use with onResumePrompt: call to ignore the saved time and start over.
      discard() {
        pendingResume = null;
        clearProgress(id);
      },
      getProgress: () => readProgress(id),
      clear: () => clearProgress(id)
    };
  }

  /**
   * Returns every video with saved progress, sorted most-recent first.
   * Handy for rendering a "Continue Watching" row across your whole site.
   */
  function getAllProgress() {
    const results = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || !key.startsWith(STORAGE_PREFIX)) continue;
      try {
        const data = JSON.parse(localStorage.getItem(key));
        results.push({ id: key.slice(STORAGE_PREFIX.length), ...data });
      } catch {}
    }
    return results.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
  }

  function formatClock(seconds) {
    if (!isFinite(seconds) || seconds < 0) seconds = 0;
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }

  global.ResumeWatching = {
    attach,
    getAllProgress,
    clearProgress,
    formatClock
  };
})(window);