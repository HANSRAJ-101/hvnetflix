// ============================================================
// ANIME DATA STORE
// ------------------------------------------------------------
// This is the "database" for the simple backend. Edit this file
// to add your real anime + episodes. No build step needed —
// just commit and push, Vercel redeploys automatically.
//
// ------------------ ANIME ENTRY METADATA --------------------
// banner            -> OPTIONAL. A direct high-resolution link to a 16:9
//                       widescreen image (.jpg, .png, .webp). This is used
//                       specifically for the homepage sliding spotlight banner.
//                       **Note:** The banner automatically spotlights only the 
//                       LATEST 5 uploaded anime items (based on their position 
//                       at the very end of this array). If you omit the `banner` 
//                       property, the system will fall back to using your `cover` art.
// cover             -> REQUIRED. A direct link to vertical poster art (approx 5:7 
//                       aspect ratio) used for the search lists and catalog grids.
//
// -------------------- EPISODE MANAGEMENT --------------------
// Each episode needs a `type` + `src`, and SHOULD have `duration`:
//   type: "iframe"  -> src is an embeddable player URL
//                       e.g. a Rumble embed: https://rumble.com/embed/XXXXXXX/
//   type: "mp4"     -> src is a direct link to a raw video file host
//                       e.g. https://yoursite.com/video.mp4 / .m3u8 streams
// ============================================================

module.exports = [
   {
    id: 1,
    title: "David",
    cover: "https://image.tmdb.org/t/p/original/bESlrLOrsQ9gKzaGQGHXKOyIUtX.jpg",
    banner: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT9voxPeFire-ZL891AvdaQsr6Mp6Oq3gB97zPxdzq3Nr9tE_Yu",
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
    title: "Indias Got Latent Season 2  ",
    cover: "https://image.tmdb.org/t/p/w500/eml0QA3zUMizBvrlfQKhWI0swVh.jpg",
    banner: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2ph3mdIF2vDiuTw_u60mzyEiS9yHHk5putAZ2-7E_AQ&s=10",
    synopsis: "Comedy  Reality. Replace with your own series description.",
    tags: ["Hindi"],
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
    banner: "https://i.pinimg.com/1200x/55/2c/77/552c7795a79cb12d7d9f5876ac0e3884.jpg",
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
    title: "Dr STONE",
    cover: "https://i.postimg.cc/T10gjyVx/upscalemedia-transformed-(10).png",
    banner: "https://i.pinimg.com/736x/ad/b6/fb/adb6fb0027aa429bff47cbca65265baa.jpg",
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
    banner: "https://i.pinimg.com/736x/fc/30/0c/fc300c9d8978039c7208b3de2d39beaf.jpg",
    synopsis: "In a brutal war between devils, hunters, and secret enemies, a mysterious girl named Reze has stepped into Denji’s world, and he faces his deadliest battle yet, fueled by love in a world where survival knows no rules..",
    tags: ["Animation","Action","Romance ","Fantasy ","Anime Movie"],
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
  },
    {
    id: 6,
    title: "Your Name",
    cover: "https://image.tmdb.org/t/p/w500/q719jXXEzOoYaps6babgKnONONX.jpg",
    banner: "https://i.pinimg.com/1200x/9f/a5/74/9fa574f9013017a4568880cfa0106fa6.jpg",
    synopsis: "High schoolers Mitsuha and Taki are complete strangers living separate lives. But one night, they suddenly switch places. Mitsuha wakes up in Taki’s body, and he in hers. This bizarre occurrence continues to happen randomly, and the two must adjust their lives around each other.",
    tags: ["Animation","Romance ","Fantasy","Anime Movie","Drama"],
    episodes: [
      {
        number: 1,
        title: "Movie",
        type: "iframe",
        src: "https://rumble.com/embed/v7a5feq/?pub=4pw4c8"
      }
    ]
  },
];