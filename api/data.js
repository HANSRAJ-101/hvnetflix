// ============================================================
// ANIME DATA STORE
// ------------------------------------------------------------
// This is the "database" for the simple backend. Edit this file
// to add your real anime + episodes. No build step needed —
// just commit and push, Vercel redeploys automatically.
//
// Each episode needs a `type` + `src`, and SHOULD have `duration`:
//   type: "iframe"  -> src is an embeddable player URL
//                       e.g. a Rumble embed: https://rumble.com/embed/XXXXXXX/
//   type: "mp4"     -> src is a direct link to a .mp4 / .m3u8 file
//   duration         -> episode length IN SECONDS (e.g. 24 min = 1440).
//                        Only used for "iframe" episodes — it powers
//                        auto-advance to the next episode, since the
//                        front end can't detect when a cross-origin
//                        iframe (Rumble, etc.) actually finishes playing.
//                        "mp4" episodes auto-advance natively and don't
//                        need this. If you skip `duration` on an iframe
//                        episode, auto-advance is simply skipped for it —
//                        the viewer still gets a manual "Next" button.
//   loadBufferSeconds -> OPTIONAL. Extra seconds added on top of
//                        `duration` before auto-advancing, to account for
//                        the embedded player's own loading/buffering time
//                        (the timer starts the instant the iframe is
//                        inserted, slightly before playback visually
//                        begins). Defaults to 4 seconds if omitted —
//                        increase it for a source that consistently loads
//                        slower than that.
// ============================================================

module.exports = [
   {
    id: 1,
    title: "David",
    cover: "https://image.tmdb.org/t/p/original/bESlrLOrsQ9gKzaGQGHXKOyIUtX.jpg",
    synopsis: " From the songs of his mother’s heart to the whispers of a faithful God, David’s story begins in quiet devotion. When the giant Goliath rises to terrorize a nation, a young shepherd armed with only a sling, a few stones, and unshakable faith steps forward. Pursued by power and driven by purpose, his journey tests the limits of loyalty, love, and courage—culminating in a battle not just for a crown, but for the soul of a kingdom.  ",
    tags: ["Anime Movie", "Animation","Drama", "Family", "History",],
    episodes: [
      {
        number: 1,
        title: " Movie",
        type: "iframe",
        src: "https://gdmirrorbot.nl/embed/hhz2udb"
      }
    ]
  },
  {
    id: 2,
    title: "India’s Got Latent (Season 2) ",
    cover: "https://image.tmdb.org/t/p/w500/eml0QA3zUMizBvrlfQKhWI0swVh.jpg",
    synopsis: "Comedy  Reality. Replace with your own series description.",
    tags: [" 4K | 1080p | 720p | 480p  ", "Hindi"],
    episodes: [
      {
        number: 1,
        title: "Episode 1",
        type: "iframe",
        src: "https://rumble.com/embed/v79ewfy/?pub=4pw4c8"
      }
    ]
  },
  {
    id: 3,
    title: "Farming Life in Another World",
    cover: "https://cdn.myanimelist.net/images/anime/1983/132329l.jpg",
    synopsis: " During the final years of his life, Hiraku Machio remained confined to a hospital bed with a terminal illness until he finally passed away.Taking pity on the unfair life he lived, a god decides to reincarnate Hiraku in another world where he can live as he pleases. Wanting to try farming in this new life, he is bestowed with an all-in-one “Almighty Farming Tool” that can transform into any useful implement he wishes.Hiraku is then transported to a forest seemingly far from civilization. Here, he plans to build and farm everything from scratch—gradually developing the lifeless area into a thriving new society. .",
    tags: ["Fantasy", "Slice of Life", "Isekai"],
    episodes: [
      {
        number: 1,
        title: "Episode 1",
        type: "iframe",
        src: "https://gdmirrorbot.nl/embed/en2l9r6"
      },
      {
        number: 2,
        title: "Episode 2",
        type: "iframe",
        src: "https://gdmirrorbot.nl/embed/taup63d"
      },
      {
        number: 3,
        title: "Episode 3",
        type: "iframe",
        src: "https://gdmirrorbot.nl/embed/jonuq1e"
      },
      {
        number: 4,
        title: "Episode 4",
        type: "iframe",
        src: "https://gdmirrorbot.nl/embed/vru4xh8"
      },
      {
        number: 5,
        title: "Episode 5",
        type: "iframe",
        src: "https://gdmirrorbot.nl/embed/vi3jlvm"
      },
      {
        number: 6,
        title: "Episode 6",
        type: "iframe",
        src: "https://gdmirrorbot.nl/embed/zag1uao"
      }
    ]
  },
  {
    id: 4,
    title: "Dr. STONE",
    cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF-K4_0tIgDWOWLHxekBuVIFNK0iCDV8HgLraqe7huHA&s",
    synopsis: "Add your own synopsis here.",
    tags: ["Season 1"],
    episodes: [
      {
        number: 1,
        title: "Episode 1",
        type: "iframe",
        // Derived from the watch-page slug https://rumble.com/v7bzixm-...html
        // If this doesn't play, go to the video on rumble.com -> Share -> Embed
        // and paste the exact URL from that embed code here instead.
        src: "https://rumble.com/embed/v79suxe/?pub=4pw4c8"
      },
      {
        number: 2,
        title: "Episode 2",
        type: "iframe",
        src: "https://desidubanime.p2pplay.pro/#kl5eju"
      }
    ]
  },
  {
    id: 5,
    title: "Chainsaw Man – The Movie: Reze Arc",
    cover: "https://image.tmdb.org/t/p/w500/pHyxb2RV5wLlboAwm9ZJ9qTVEDw.jpg",
    synopsis: "In a brutal war between devils, hunters, and secret enemies, a mysterious girl named Reze has stepped into Denji’s world, and he faces his deadliest battle yet, fueled by love in a world where survival knows no rules..",
    tags: ["Animation","Action","Romance ","Fantasy","Anime Movie"],
    episodes: [
      {
        number: 1,
        title: "Movie",
        type: "iframe",
        // Derived from the watch-page slug https://rumble.com/v7bzixm-...html
        // If this doesn't play, go to the video on rumble.com -> Share -> Embed
        // and paste the exact URL from that embed code here instead.
        src: "https://rumble.com/embed/v7a58uo/?pub=4pw4c8"
      }
    ]
  }
];