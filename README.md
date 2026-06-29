# Anime Archive

A small anime catalog site:

- **Front end** — plain HTML/CSS/JS (`index.html`, `style.css`, `script.js`)
- **Back end** — a Vercel serverless function (`api/anime.js`) that serves the catalog as JSON
- **Video player** — works with either an **iframe embed** (e.g. a Rumble embed link) or a **direct video file** (`.mp4`)

No build step, no framework, no database. Just files + a tiny API.

## Project structure

```
anime-site/
├── index.html        # the page
├── style.css          # styling
├── script.js          # fetches the API, renders cards + the episode/player drawer
├── api/
│   ├── anime.js       # GET /api/anime  ·  ?id=  ·  ?search=
│   └── data.js        # the actual anime + episode data ("database")
├── package.json
└── vercel.json
```

## 1. Add your real content

Open `api/data.js`. Each anime looks like this:

```js
{
  id: 1,
  title: "Your Series Name",
  cover: "https://link-to-a-poster-image.jpg",
  synopsis: "One or two sentences about the show.",
  tags: ["Action", "Fantasy"],
  episodes: [
    {
      number: 1,
      title: "Episode 1",
      type: "iframe",                                 // or "mp4"
      src: "https://rumble.com/embed/VIDEO_ID/"        // the embed/video URL
    }
  ]
}
```

**Two ways to point at a video, depending on your source:**

| `type`    | `src` should be...                                   | When to use it |
|-----------|--------------------------------------------------------|----------------|
| `"iframe"` | An **embed URL**, e.g. `https://rumble.com/embed/XXXXXXX/` | The video lives on a platform that gives you an embed link (Rumble, YouTube, Vimeo, etc.) |
| `"mp4"`    | A **direct link** to a video file, e.g. `https://yoursite.com/video.mp4` | You're hosting the raw video file yourself (own server, S3, Cloudflare R2, etc.) |

For Rumble specifically: open the video on rumble.com → click **Share → Embed** → copy the URL inside the `src="..."` of the embed code they give you (it looks like `https://rumble.com/embed/v2abcde/`). Paste that as the episode's `src` with `type: "iframe"`.

The front end doesn't care where the video physically lives — it just reads `type` and `src` from the API and either drops in an `<iframe>` or a native `<video>` tag.

## 2. Test locally (optional)

You need the [Vercel CLI](https://vercel.com/docs/cli):

```bash
npm install -g vercel
cd anime-site
vercel dev
```

This runs both the static front end and the `/api/anime` function locally, usually at `http://localhost:3000`.

## 3. Push to GitHub

```bash
cd anime-site
git init
git add .
git commit -m "Initial anime archive site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## 4. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. **Add New → Project**, then select your repo.
3. Framework preset: leave as **Other** (no build command, no output directory needed — Vercel auto-detects the static files + the `api/` folder).
4. Click **Deploy**.

That's it — you'll get a live URL like `https://your-project.vercel.app`. Every push to `main` redeploys automatically.

## How the pieces talk to each other

```
Browser
  │  fetch('/api/anime')             → list of anime (cards)
  │  fetch('/api/anime?id=2')        → one anime + its episodes
  │  fetch('/api/anime?search=foo')  → filtered list
  ▼
api/anime.js  (serverless function)
  ▼
api/data.js   (the data)
```

The video itself is **never proxied through your backend** — the browser loads it directly from wherever you point `src` (Rumble's embed, your own file host, etc.), exactly like embedding a YouTube video.

## Customizing

- **Site name / colors** — edit the CSS variables at the top of `style.css` (`:root { ... }`).
- **Add more anime** — copy/paste another object into the array in `api/data.js`.
- **Cover images** — any direct image URL works (`.jpg`, `.png`, `.webp`).
