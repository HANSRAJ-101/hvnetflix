// ============================================================
// /api/anime  — the "backend"
// ------------------------------------------------------------
// GET /api/anime              -> all anime (cards list)
// GET /api/anime?id=2         -> one anime with full episode list
// GET /api/anime?search=word  -> anime whose title matches "word"
//
// Runs as a Vercel Serverless Function (Node.js). No dependencies.
// ============================================================

const animeList = require("./data");

module.exports = (req, res) => {
  const { id, search } = req.query;

  // CORS-safe even if you later split front/back across domains
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (id) {
    const anime = animeList.find((a) => a.id === Number(id));
    if (!anime) {
      res.status(404).json({ error: "Anime not found" });
      return;
    }
    res.status(200).json(anime);
    return;
  }

  if (search) {
    const q = String(search).toLowerCase();
    const filtered = animeList.filter((a) =>
      a.title.toLowerCase().includes(q)
    );
    res.status(200).json(filtered);
    return;
  }

  // Default: return the list without the heavy episode payload
  const summary = animeList.map(({ id, title, cover, synopsis, tags, episodes }) => ({
    id,
    title,
    cover,
    synopsis,
    tags,
    episodeCount: episodes.length
  }));

  res.status(200).json(summary);
};
