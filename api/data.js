// ============================================================
// ANIME DATA STORE
// ------------------------------------------------------------
// This is the "database" for the simple backend. Edit this file
// to add your real anime + episodes. No build step needed —
// just commit and push, Vercel redeploys automatically.
//
// ------------------ ANIME ENTRY METADATA --------------------
// banner            -> OPTIONAL. A direct high-resolution link to a 16:9
//                      widescreen image (.jpg, .png, .webp). This is used
//                      specifically for the homepage sliding spotlight banner.
//                      **Note:** The banner automatically spotlights only the 
//                      LATEST 5 uploaded anime items (based on their position 
//                      at the very end of this array). If you omit the `banner` 
//                      property, the system will fall back to using your `cover` art.
// cover             -> REQUIRED. A direct link to vertical poster art (approx 5:7 
//                      aspect ratio) used for the search lists and catalog grids.
//
// -------------------- EPISODE MANAGEMENT --------------------
// Each episode needs a `type` + `src`, and SHOULD have `duration`:
//   type: "iframe"  -> src is an embeddable player URL
//                      e.g. a Rumble embed: https://rumble.com/embed/XXXXXXX/
//   type: "mp4"     -> src is a direct link to a raw video file host
//                      e.g. https://yoursite.com/video.mp4 / .m3u8 streams
//
// ---------------------- SEASONS (optional) -------------------
// Add a `season` number to an episode to group it under that season.
// Episodes with no `season` field default to Season 1, so every
// existing single-season entry below keeps working with zero changes.
//
// The moment a title has 2+ distinct season numbers among its episodes,
// the site automatically shows "SEASON 1 / SEASON 2 / …" tabs in the
// episode rail, filters the list down to whichever season is selected,
// and auto-plays that season's first episode the moment you switch tabs.
//
// Example — a two-season show:
//   episodes: [
//     { number: 1, season: 1, title: "S1 Episode 1", type: "iframe", src: "..." },
//     { number: 2, season: 1, title: "S1 Episode 2", type: "iframe", src: "..." },
//     { number: 1, season: 2, title: "S2 Episode 1", type: "iframe", src: "..." },
//     { number: 2, season: 2, title: "S2 Episode 2", type: "iframe", src: "..." }
//   ]
// ============================================================

module.exports = [
  {
    id: 1,
    title: "David",
    cover: "https://image.tmdb.org/t/p/original/bESlrLOrsQ9gKzaGQGHXKOyIUtX.jpg",
    banner: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT9voxPeFire-ZL891AvdaQsr6Mp6Oq3gB97zPxdzq3Nr9tE_Yu",
    synopsis: "From the songs of his mother’s heart to the whispers of a faithful God, David’s story begins in quiet devotion. When the giant Goliath rises to terrorize a nation, a young shepherd armed with only a sling, a few stones, and unshakable faith steps forward. Pursued by power and driven by purpose, his journey tests the limits of loyalty, love, and courage—culminating in a battle not just for a crown, but for the soul of a kingdom.",
    tags: ["Anime Movie", "Animation", "Drama", "Family", "History"],
    episodes: [
      {
        number: 1,
        title: "Movie",
        type: "iframe",
        src: "https://gdmirrorbot.nl/embed/hhz2udb"
      }
    ]
  },
  {
    id: 2,
    title: "Indias Got Latent Season 2",
    cover: "https://image.tmdb.org/t/p/w500/eml0QA3zUMizBvrlfQKhWI0swVh.jpg",
    banner: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2ph3mdIF2vDiuTw_u60mzyEiS9yHHk5putAZ2-7E_AQ&s=10",
    synopsis: "Comedy Reality. Replace with your own series description.",
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
    title: "Farming Life in Another World X",
    cover: "https://cdn.myanimelist.net/images/anime/1983/132329l.jpg",
    banner: "https://i.pinimg.com/1200x/55/2c/77/552c7795a79cb12d7d9f5876ac0e3884.jpg",
    synopsis: "During the final years of his life, Hiraku Machio remained confined to a hospital bed with a terminal illness until he finally passed away. Taking pity on the unfair life he lived, a god decides to reincarnate Hiraku in another world where he can live as he pleases. Wanting to try farming in this new life, he is bestowed with an all-in-one “Almighty Farming Tool” that can transform into any useful implement he wishes. Hiraku is then transported to a forest seemingly far from civilization. Here, he plans to build and farm everything from scratch—gradually developing the lifeless area into a thriving new society.",
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
    synopsis: "In a brutal war between devils, hunters, and secret enemies, a mysterious girl named Reze has stepped into Denji’s world, and he faces his deadliest battle yet, fueled by love in a world where survival knows no rules.",
    tags: ["Animation", "Action", "Romance", "Fantasy", "Anime Movie"],
    episodes: [
      {
        number: 1,
        title: "Movie",
        type: "iframe",
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
    tags: ["Animation", "Romance", "Fantasy", "Anime Movie", "Drama"],
    episodes: [
      {
        number: 1,
        title: "Movie",
        type: "iframe",
        src: "https://rumble.com/embed/v7a5feq/?pub=4pw4c8"
      }
    ]
  },
  {
    id: 7,
    title: "Weathering with You",
    cover: "https://i.postimg.cc/kXppfS5s/qgrk7r1f-V4Ijuoei-GS5HOh-XNd-LJ.webp",
    banner: "https://i.postimg.cc/vmdXNtwh/ad7897ecffd637efb49a4472d8f33a9cc108bafb5f0ad89178d0b3a39d6e41c7-SX1080-FMjpg.jpg",
    synopsis: "The summer of his high school freshman year, Hodaka runs away from his remote island home to Tokyo, and quickly finds himself pushed to his financial and personal limits. The weather is unusually gloomy and rainy every day, as if taking its cue from his life. After many days of solitude, he finally finds work as a freelance writer for a mysterious occult magazine. Then, one day, Hodaka meets Hina on a busy street corner. This bright and strong-willed girl possesses a strange and wonderful ability: the power to stop the rain and clear the sky.",
    tags: ["Animation", "Romance", "Fantasy", "Anime Movie", "Drama"],
    episodes: [
      {
        number: 1,
        title: "Movie",
        type: "iframe",
        src: "https://rumble.com/embed/v7a7bfm/?pub=4pw4c8"
      }
    ]
  },
  {
    id: 8,
    title: "Black Clover: Sword of the Wizard King",
    cover: "https://image.tmdb.org/t/p/w500/9YEGawvjaRgnyW6QVcUhFJPFDco.jpg",
    banner: "https://sm.ign.com/t/ign_in/screenshot/default/enus-blackclover-main-vertical-rgb-pre_rtsf.1280.jpg",
    synopsis: "As a lionhearted boy who can’t wield magic strives for the title of Wizard King, four banished Wizard Kings of yore return to crush the Clover Kingdom.",
    tags: ["Animation", "Action", "Fantasy", "Anime Movie", "Adventure"],
    episodes: [
      {
        number: 1,
        title: "Movie",
        type: "iframe",
        src: "https://rumble.com/embed/v7a7no8/?pub=4pw4c8"
      }
    ]
  },  
  {
    id: 9,
    title: "Haikyu!! The Dumpster Battle (2024) 1080p HD [HIN-ENG-JAP]",
    cover: "https://image.tmdb.org/t/p/w500/ntRU0OA4etGGiMMmH1Yw0bnaMdW.jpg",
    banner: "https://sm.ign.com/t/ign_in/news/c/crunchyrol/crunchyroll-acquires-haikyu-blue-lock-and-overlord-films-rev_e5m8.1280.jpg",
    synopsis: "Shoyo Hinata joins Karasuno High’s volleyball club to be like his idol, a former Karasuno player known as the ‘Little Giant’. But Hinata soon learns that he must team up with his middle school nemesis, Tobio Kageyama. Their clashing styles form a surprising weapon, but can their newfound teamwork defeat their rival Nekoma High in the highly anticipated ‘Dumpster Battle’, the long awaited ultimate showdown between two opposing underdog teams?",
    tags: ["Animation", "Comedy", "Anime Movie"],
    episodes: [
      {
        number: 1,
        title: "Movie",
        type: "iframe",
        src: "https://rumble.com/embed/v7a7myg/?pub=4pw4c8"
      }
    ]
  }, 
  {
    id: 10,
    title: "Demon Slayer Kimetsu no Yaiba Infinity Castle",
    cover: "https://image.tmdb.org/t/p/w500/fWVSwgjpT2D78VUh6X8UBd2rorW.jpg",
    banner: "https://movieswetextedabout.com/wp-content/uploads/2025/09/Demon-Slayer-Infinity-Castle-Banner.jpg",
    synopsis: "The Demon Slayer Corps are drawn into the Infinity Castle, where Tanjiro, Nezuko, and the Hashira face terrifying Upper Rank demons in a desperate fight as the final battle against Muzan Kibutsuji begins.",
    tags: ["Animation", "Action", "Fantasy", "Anime Movie"],
    episodes: [
      {
        number: 1,
        title: "Movie",
        type: "iframe",
        src: "https://rumble.com/embed/v7a7myu/?pub=4pw4c8"
      }
    ]
  },    
  {
    id: 12,
    title: "Jujutsu Kaisen",
    cover: "https://image.tmdb.org/t/p/original/yzkgx79vj1KsZBzxFBIsQBwBkPE.jpg",
    banner: "https://cdn.nerdist.com/wp-content/uploads/2022/03/12181901/JJK_Movie_16x9_Twitter-Post-V2.jpg",
    synopsis: "Yuta Okkotsu is a nervous high school student who is suffering from a serious problem—his childhood friend Rika has turned into a curse and won’t leave him alone. Since Rika is no ordinary curse, his plight is noticed by Satoru Gojo, a teacher at Jujutsu High, a school where fledgling exorcists learn how to combat curses. Gojo convinces Yuta to enroll, but can he learn enough in time to confront the curse that haunts him?",
    tags: ["Animation", "Action", "Fantasy", "Anime Movie"],
    episodes: [
      {
        number: 1,
        title: "Movie",
        type: "iframe",
        src: "https://rumble.com/embed/v7a7mz6/?pub=4pw4c8"
      }
    ]
  },  
  {
    id: 13,
    title: "Lost in Starlight",
    cover: "https://image.tmdb.org/t/p/w500/dXlUIfwejWa9YvugU9V773dUASY.jpg",
    banner: "https://www.acmodasi.in/amdb/images/movie/m/y/lost-in-starlight-2025-IPKIdM.jpg",
    synopsis: "When an astronaut leaves Earth for Mars, the vast infinite space divides star-crossed lovers in this animated romance that crosses the cosmos.",
    tags: ["Animation", "Romance", "Science Fiction", "Anime Movie", "Drama"],
    episodes: [
      {
        number: 1,
        title: "Movie",
        type: "iframe",
        src: "https://rumble.com/embed/v7a7mzg/?pub=4pw4c8"
      }
    ]
  },  
  {
    id: 14,
    title: "My Hero Academia You're Next",
    cover: "https://image.tmdb.org/t/p/w500/tTrI6PwqzxkgO3dvQ7BEKXM7SYR.jpg",
    banner: "https://dx35vtwkllhj9.cloudfront.net/toho-international/my-hero-academia-youre-next/images/regions/us/share.png",
    synopsis: "In a society devastated by the effects of an all-out war between heroes and villains, a mysterious giant fortress suddenly appears, engulfing towns and people one after another. Then, a man reminiscent of All Might, the ‘symbol of peace’, stands in front of Izuku and his friends…",
    tags: ["Animation", "Action", "Adventure", "Anime Movie", "Science Fiction"],
    episodes: [
      {
        number: 1,
        title: "Movie",
        type: "iframe",
        src: "https://rumble.com/embed/v7a7nok/?pub=4pw4c8"
      }
    ]
  },  
  {
    id: 15,
    title: "My.Hero.Academia.Two.Heroes",
    cover: "https://image.tmdb.org/t/p/w500/hC4nTxdhXqFWzgqynGvvXVMiMNp.jpg",
    banner: "https://i.ytimg.com/vi/bF6r_JPYUkA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBU3YqhIRcc4MeWwKnRXEGc1Jffgg",
    synopsis: "High schoolers Mitsuha and Taki are complete strangers living separate lives. But one night, they suddenly switch places. Mitsuha wakes up in Taki’s body, and he in hers. This bizarre occurrence continues to happen randomly, and the two must adjust their lives around each other.",
    tags: ["Animation", "Action", "Adventure", "Anime Movie", "Fantasy"],
    episodes: [
      {
        number: 1,
        title: "Movie",
        type: "iframe",
        src: "https://rumble.com/embed/v7a7noi/?pub=4pw4c8"
      }
    ]
  },  
  {
    id: 16,
    title: "My Hero Academia: World Heroes Mission",
    cover: "https://image.tmdb.org/t/p/w500/AsTlA7dj2ySGY1pzGSD0MoHFhEF.jpg",
    banner: "https://images7.alphacoders.com/120/thumb-1920-1209322.png",
    synopsis: "A mysterious group called Humarize strongly believes in the Quirk Singularity Doomsday theory which states that when quirks get mixed further in with future generations, that power will bring forth the end of humanity. In order to save everyone, the Pro-Heroes around the world ask UA Academy heroes-in-training to assist them and form a world-class selected hero team. It’s up to the heroes to save the world and the future of heroes in what is the most dangerous crisis to take place yet in My Hero Academia.",
    tags: ["Animation", "Science Fiction", "Adventure", "Anime Movie", "Action"],
    episodes: [
      {
        number: 1,
        title: "Movie",
        type: "iframe",
        src: "https://rumble.com/embed/v7a7np0/?pub=4pw4c8"
      }
    ]
  },  
  {
    id: 17,
    title: "My Hero Academia: Heroes Rising",
    cover: "https://image.tmdb.org/t/p/w500/kpWsIkfXrnQ1pmR79qAHHq7DPxc.jpg",
    banner: "https://thebannercsi.com/wp-content/uploads/2020/03/mha_hero.jpg",
    synopsis: "A mysterious group called Humarize strongly believes in the Quirk Singularity Doomsday theory which states that when quirks get mixed further in with future generations, that power will bring forth the end of humanity. In order to save everyone, the Pro-Heroes around the world ask UA Academy heroes-in-training to assist them and form a world-class selected hero team. It’s up to the heroes to save the world and the future of heroes in what is the most dangerous crisis to take place yet in My Hero Academia.",
    tags: ["Animation", "Action", "Adventure", "Anime Movie", "Fantasy"],
    episodes: [
      {
        number: 1,
        title: "Movie",
        type: "iframe",
        src: "https://rumble.com/embed/v7a7mzw/?pub=4pw4c8"
      }
    ]
  },  
  {
    id: 18,
    title: "One Piece: The Movie",
    cover: "https://image.tmdb.org/t/p/w500/aRqQNSuXpcE3dkJC43aEg9f2HXd.jpg",
    banner: "https://image.tmdb.org/t/p/w500/aRqQNSuXpcE3dkJC43aEg9f2HXd.jpg",
    synopsis: "There once was a pirate known as the Great Gold Pirate Woonan, who obtained almost one-third of the world’s gold. Over the course of a few years, the pirate’s existence faded, and a legend grew that he disappeared with his gold to a remote island, an island pirates continue to search for. Aboard the Going Merry, Luffy and his crew, starved and reckless, are robbed of their treasure. In an attempt to get it back, they wreck the getaway ship, guided by a young boy named Tobio, who’s a captured part of El Drago’s pirate crew. El Drago’s love for gold has driven him to look for Woonan’s island, and thanks to Woonan’s treasure map, he finds it. During this time, Luffy’s crew have been split up, and despite their own circumstances, they must find a way to stop El Drago from obtaining Woonan’s gold.",
    tags: ["Animation", "Fantasy", "Comedy", "Anime Movie", "Adventure", "Action"],
    episodes: [
      {
        number: 1,
        title: "Movie",
        type: "iframe",
        src: "https://rumble.com/embed/v7a7n0e/?pub=4pw4c8"
      }
    ]
  },  
  {
    id: 19,
    title: "One Piece Clockwork Island Adventure",
    cover: "https://image.tmdb.org/t/p/w500/phrVSY5cpUkybc0gU41crWi2XIP.jpg",
    banner: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0pnP75ug8lHxZoFMNXHwGQ4x2HLYf66qcGdRW6QRHGg&s=10",
    synopsis: "Relaxing on a cozy beach, the Straw Hat Pirates are taking a rest from their quest. Right until Luffy noticed the Going Merry has been hijacked and sailed off from the beach. This leads them to search the ship and find the thief who took it from them. They ran into a duo named the Thief Brothers, who informed them that their ship was stolen by a group of pirates called the Trump Kyoudai. When they encountered the Trump Pirates, Nami ended up getting kidnapped as well as Luffy’s hat. They tracked down the pirates to their base on Clockwork Island. Now Luffy, Zoro, Sanji, Usopp, and the Thief Brothers must reclaim the Going Merry, save Nami, and get back Shank’s straw hat.",
    tags: ["Animation", "Adventure", "Action", "Anime Movie"],
    episodes: [
      {
        number: 1,
        title: "Movie",
        type: "iframe",
        src: "https://rumble.com/embed/v7a7mzy/?pub=4pw4c8"
      }
    ]
  },  
  {
    id: 20,
    title: "Re ZERO Starting Life in Another World Memory Snow",
    cover: "https://image.tmdb.org/t/p/w500/y7XwmyE5ue9hjk65fEWpO2hGU2B.jpg",
    banner: "https://m.media-amazon.com/images/M/MV5BYzQ1YjVlMDgtYmQ4Mi00ZWM3LTgxYTItN2VkZjhmNjkyZTZkXkEyXkFqcGc@._V1_.jpg",
    synopsis: "Subaru finally gets to take a breather, but he does not waste any time as he prepares for a date with his beloved Emilia. He scouts the nearby village for the right dating spot, and with the help of the village children, he finds a wonderful location. With that, he is well prepared for his date! Unfortunately for Subaru, cold weather suddenly sweeps across Roswaal’s mansion on his important day, leaving him with no choice but to postpone the date. Overnight, it becomes even colder and unbearable. Subaru must get to the bottom of this because, at this rate, his date will be the least of his worries.",
    tags: ["Animation", "Adventure", "Fantasy", "Anime Movie"],
    episodes: [
      {
        number: 1,
        title: "Movie",
        type: "iframe",
        src: "https://rumble.com/embed/v7a7n0s/?pub=4pw4c8"
      }
    ]
  },  
  {
    id: 21,
    title: "Re ZERO Starting Life in Another World The Frozen Bond",
    cover: "https://image.tmdb.org/t/p/w500/ca2ZsUa4Qeik2IwlXFzV51hdxh0.jpg",
    banner: "https://i.ytimg.com/vi/nUVSklUurTI/maxresdefault.jpg",
    synopsis: "A prequel story set seven years before the beginning of the Re:ZERO series. Emilia lives in a secluded forest covered in snow with the spirit Puck. The forest holds a secret: the elves who once lived there have been frozen into ice. Emilia is feared by the people living on the outskirts of the forest, but makes a humble living selling magic stones and warding off Magic Beasts. One day, however, her peaceful life is disrupted when the Great Spirit of Fire Melakuera decides to lay his judgment upon her.",
    tags: ["Animation", "Fantasy", "Anime Movie", "Drama"],
    episodes: [
      {
        number: 1,
        title: "Movie",
        type: "iframe",
        src: "https://rumble.com/embed/v7a7n1e/?pub=4pw4c8"
      }
    ]
  },  
  {
    id: 22,
    title: "Scarlet",
    cover: "https://image.tmdb.org/t/p/original/6YWZ8HwZLhLb3D1qmtfBab2a2Bw.jpg",
    banner: "https://occ-0-8407-448.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABfygoBMGV9QtpFOEXIy7-G-q5UBX_aHdoh9yOe9pOlgSBP_wVli_kNErxmwfhiKpQs4UOITcpj7cu8_4rb153veYVeASZba82KN7.jpg?r=01d",
    synopsis: "After failing to avenge her father’s murder, Princess Scarlet wakes up in the “Land of the Dead.” In this world filled with madness, if she does not achieve her revenge against her nemesis and reach the “No End Place,” she will become “Void” and cease to exist. Can Scarlet find a way to live at the end of her endless journey?",
    tags: ["Animation", "Action", "Science Fiction", "Anime Movie", "Drama"],
    episodes: [
      {
        number: 1,
        title: "Movie",
        type: "iframe",
        src: "https://rumble.com/embed/v7a7n1i/?pub=4pw4c8"
      }
    ]
  },  
  {
    id: 23,
    title: "Spy x Family Code White",
    cover: "https://image.tmdb.org/t/p/w500/xlIQf4y9eB14iYzNN142tROIWON.jpg",
    banner: "https://www.impericon.com/cdn/shop/articles/Spy_family_Code_White_1200x1200_crop_center.webp?v=1718270858",
    synopsis: "While under the guise of taking his family on a weekend winter getaway, Loid’s attempt to make progress on his current mission Operation Strix proves difficult when Anya mistakenly gets involved and triggers events that threaten world peace.",
    tags: ["Animation", "Action", "Adventure", "Anime Movie", "Comedy"],
    episodes: [
      {
        number: 1,
        title: "Movie",
        type: "iframe",
        src: "https://rumble.com/embed/v7a7npa/?pub=4pw4c8"
      }
    ]
  },
  {
    id: 24,
    title: "Suzume",
    cover: "https://image.tmdb.org/t/p/w500/yStW1TXF5s7Tbtu9KjIZEaWl6HL.jpg",
    banner: "https://sm.ign.com/t/ign_in/photo/default/suzume-blogroll-1680555973534_yf74.1280.jpg",
    synopsis: "Suzume, 17, lost her mother as a little girl. On her way to school, she meets a mysterious young man. But her curiosity unleashes a calamity that endangers the entire population of Japan, and so Suzume embarks on a journey to set things right.",
    tags: ["Animation", "Adventure", "Fantasy", "Anime Movie", "Drama"],
    episodes: [
      {
        number: 1,
        title: "Movie",
        type: "iframe",
        src: "https://rumble.com/embed/v7a7n1u/?pub=4pw4c8"
      }
    ]
  },
  {
    id: 25,
    title: "A Condition Called Love",
    cover: "https://image.tmdb.org/t/p/w500/aaYPPivWuebwIKQvFYuWkp9m0q5.jpg",
    banner: "https://butwhytho.net/wp-content/uploads/2024/06/A-Condition-Called-Love-Season-1-But-Why-Tho-4.jpg",
    synopsis: "High school freshman Hotaru Hinase has a vibrant life full of family and friendship, but not much luck in romance. That all changes when she makes a warm gesture to her handsome and heartbroken classmate, Hananoi, leading to him asking her out and her becoming flustered. Witness a girl who grapples with the enigma of love and a boy who is heavy handed with it.",
    tags: ["Animation", "Comedy", "Season 1", "Drama"],
    episodes: [
      {
        number: 1,
        title: "Episode 1",
        type: "iframe",
        src: "https://rumble.com/embed/v7a7a8u/?pub=4pw4c8"
      },
      {
        number: 2,
        title: "Episode 2",
        type: "iframe",
        src: "https://rumble.com/embed/v7a7a92/?pub=4pw4c8"
      },
      {
        number: 3,
        title: "Episode 3",
        type: "iframe",
        src: "https://rumble.com/embed/v7a7a9i/?pub=4pw4c8"
      },
      {
        number: 4,
        title: "Episode 4",
        type: "iframe",
        src: "https://rumble.com/embed/v7a7a9m/?pub=4pw4c8"
      },
      {
        number: 5,
        title: "Episode 5",
        type: "iframe",
        src: "https://rumble.com/embed/v7a7a9w/?pub=4pw4c8"
      },
      {
        number: 6,
        title: "Episode 6",
        type: "iframe",
        src: "https://rumble.com/embed/v7a7aa0/?pub=4pw4c8"
      },
      {
        number: 7,
        title: "Episode 7",
        type: "iframe",
        src: "https://rumble.com/embed/v7a7aam/?pub=4pw4c8"
      },
      {
        number: 8,
        title: "Episode 8",
        type: "iframe",
        src: "https://rumble.com/embed/v7a7aau/?pub=4pw4c8"
      },
      {
        number: 9,
        title: "Episode 9",
        type: "iframe",
        src: "https://rumble.com/embed/v7a7ab4/?pub=4pw4c8"
      },
      {
        number: 10,
        title: "Episode 10",
        type: "iframe",
        src: "https://rumble.com/embed/v7a7aba/?pub=4pw4c8"
      },
      {
        number: 11,
        title: "Episode 11",
        type: "iframe",
        src: "https://rumble.com/embed/v7a7abg/?pub=4pw4c8"
      },
      {
        number: 12,
        title: "Episode 12",
        type: "iframe",
        src: "https://rumble.com/embed/v7a7abm/?pub=4pw4c8"
      }
    ]
  },
  {
    id: 26,
    title: "MF Ghost",
    cover: "https://i.postimg.cc/FK5KMRkT/pinterest-pin-1783786079299.jpg",
    banner: "https://i.postimg.cc/q7317mR6/pinterest-pin-1783786961779.jpg",
    synopsis: "Japan adopts self-driving electric automobiles and renders most gas engines obsolete by 202X. The fastest cars find new life in the MFG, a racing circuit held on Japanese motorways. Drivers from around the world race for a shot at the title. Kanata Rivington returns from Britain to Japan for the MFG—and to find his father. Can he win the title and find answers? Buckle up and push it to the limit!",
    tags: ["Animation", "Action", "Racing", "Adventure", "Season 1"],
    episodes: [
      {
        number: 1,
        title: "Episode 1 (1080p)",
        type: "iframe",
        src: "https://bysedikamoum.com/e/ognkzpn5dyt8"
      },
      {
        number: 2,
        title: "Episode 2 (1080p)",
        type: "iframe",
        src: "https://bysedikamoum.com/e/ema30vorhehz"
      },
      {
        number: 3,
        title: "Episode 3 (1080p)",
        type: "iframe",
        src: "https://bysedikamoum.com/e/we8fb60802g2"
      },
      {
        number: 4,
        title: "Episode 4 (1080p)",
        type: "iframe",
        src: "https://bysedikamoum.com/e/8v433bmzopxz"
      },
      {
        number: 5,
        title: "Episode 5 (1080p)",
        type: "iframe",
        src: "https://bysedikamoum.com/e/74xsjbznxb1v"
      },
      {
        number: 6,
        title: "Episode 6 (1080p)",
        type: "iframe",
        src: "https://bysedikamoum.com/e/2ylgi82s6pa0"
      },
      {
        number: 7,
        title: "Episode 7 (1080p)",
        type: "iframe",
        src: "https://bysedikamoum.com/e/40av4r58mobr"
      },
      {
        number: 8,
        title: "Episode 8 (1080p)",
        type: "iframe",
        src: "https://bysedikamoum.com/e/43vqxgmhyznv"
      },
      {
        number: 9,
        title: "Episode 9 (1080p)",
        type: "iframe",
        src: "https://bysedikamoum.com/e/7lrijyh1rnjv"
      },
      {
        number: 10,
        title: "Episode 10 (1080p)",
        type: "iframe",
        src: "https://bysedikamoum.com/e/y09hscov1cmd"
      },
      {
        number: 11,
        title: "Episode 11 (1080p)",
        type: "iframe",
        src: "https://bysedikamoum.com/e/8kgn4x3hkrll"
      },
      {
        number: 12,
        title: "Episode 12 (1080p)",
        type: "iframe",
        src: "https://bysedikamoum.com/e/qppr5vptvmet"
      }
    ]
  },
  {
    id: 27,
    title: "Horimiya",
    cover: "https://image.tmdb.org/t/p/w500/iSOKGl5KIeOCAtigUDCfFZe2cOi.jpg",
    banner: "https://i.postimg.cc/V66qxrSz/download.jpg",
    synopsis: "A secret life is the one thing they have in common. At school, Hori is a prim and perfect social butterfly, but the truth is she’s a brash homebody. Meanwhile, under a gloomy facade, Miyamura hides a gentle heart, along with piercings and tattoos. In a chance meeting, they both reveal a side they’ve never shown. Could this blossom into something new?",
    tags: ["Animation", "Comedy", "Drama", "Season 1"],
    episodes: [
      {
        number: 1,
        title: "Episode 1 (1080p)",
        type: "iframe",
        src: "https://rumble.com/embed/v7a72to/?pub=4pw4c8"
      },
      {
        number: 2,
        title: "Episode 2 (1080p)",
        type: "iframe",
        src: "https://rumble.com/embed/v7a7336/?pub=4pw4c8"
      },
      {
        number: 3,
        title: "Episode 3 (1080p)",
        type: "iframe",
        src: "https://rumble.com/embed/v7a7318/?pub=4pw4c8"
      },
      {
        number: 4,
        title: "Episode 4 (1080p)",
        type: "iframe",
        src: "https://rumble.com/embed/v7a72zk/?pub=4pw4c8"
      },
      {
        number: 5,
        title: "Episode 5 (1080p)",
        type: "iframe",
        src: "https://rumble.com/embed/v7a7396/?pub=4pw4c8"
      },
      {
        number: 6,
        title: "Episode 6 (1080p)",
        type: "iframe",
        src: "https://rumble.com/embed/v7a732u/?pub=4pw4c8"
      },
      {
        number: 7,
        title: "Episode 7 (1080p)",
        type: "iframe",
        src: "https://rumble.com/embed/v7a739i/?pub=4pw4c8"
      },
      {
        number: 8,
        title: "Episode 8 (1080p)",
        type: "iframe",
        src: "https://rumble.com/embed/v7a730u/?pub=4pw4c8"
      },
      {
        number: 9,
        title: "Episode 9 (1080p)",
        type: "iframe",
        src: "https://rumble.com/embed/v7a7386/?pub=4pw4c8"
      },
      {
        number: 10,
        title: "Episode 10 (1080p)",
        type: "iframe",
        src: "https://rumble.com/embed/v7a738o/?pub=4pw4c8"
      },
      {
        number: 11,
        title: "Episode 11 (1080p)",
        type: "iframe",
        src: "https://rumble.com/embed/v7a73am/?pub=4pw4c8"
      },
      {
        number: 12,
        title: "Episode 12 (1080p)",
        type: "iframe",
        src: "https://rumble.com/embed/v7a73by/?pub=4pw4c8"
      },
      {
        number: 13,
        title: "Episode 13 (1080p)",
        type: "iframe",
        src: "https://rumble.com/embed/v7a73ce/?pub=4pw4c8"
      }
    ]
  },
  {
    id: 28,
    title: "Jack of All Trades Party of None",
    cover: "https://image.tmdb.org/t/p/w500/qRvICaz6LJXz96DaYcpTjQf6QN8.jpg",
    banner: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8al2XZ6xu1hfZfY_-45cDkd0M_tPvImLMC1sX9UnV1g&s",
    synopsis: "Betrayed by his childhood friend and cast out of the Hero Party, Orhun Dura—once their loyal Enchanter—is branded by his former comrades as “a jack-of-all-trades but a master of none.” Alone, he sets out to forge a new path as a solo adventurer. His journey sparks explosive battles, deadly rivals, and unexpected allies—and he’ll rise to shatter every expectation. The ultimate solo comeback begins!",
    tags: ["Animation", "Action & Adventure", "Sci-Fi & Fantasy", "Season 1"],
    episodes: [
      {
        number: 1,
        title: "Episode 1 (1080p)",
        type: "iframe",
        src: "https://bysedikamoum.com/e/8f04g3o6qx6u"
      },
      {
        number: 2,
        title: "Episode 2 (1080p)",
        type: "iframe",
        src: "https://bysedikamoum.com/e/ivxry5iv89ne"
      },
      {
        number: 3,
        title: "Episode 3 (1080p)",
        type: "iframe",
        src: "https://bysedikamoum.com/e/tbupu0p51dk2"
      },
      {
        number: 4,
        title: "Episode 4 (1080p)",
        type: "iframe",
        src: "https://bysedikamoum.com/e/9b33l280ptl0"
      },
      {
        number: 5,
        title: "Episode 5 (1080p)",
        type: "iframe",
        src: "https://bysedikamoum.com/e/kb0gdzpswtx8"
      },
      {
        number: 6,
        title: "Episode 6 (1080p)",
        type: "iframe",
        src: "https://bysedikamoum.com/e/uyrpjfuks3pc"
      },
      {
        number: 7,
        title: "Episode 7 (1080p)",
        type: "iframe",
        src: "https://bysedikamoum.com/e/r7p7h8bgdw3q"
      },
      {
        number: 8,
        title: "Episode 8 (1080p)",
        type: "iframe",
        src: "https://bysedikamoum.com/e/0z37mydrk8ts"
      },
      {
        number: 9,
        title: "Episode 9 (1080p)",
        type: "iframe",
        src: "https://bysedikamoum.com/e/cxfenlnw2l36"
      },
      {
        number: 10,
        title: "Episode 10 (1080p)",
        type: "iframe",
        src: "https://bysedikamoum.com/e/o0d99354d04a"
      },
      {
        number: 11,
        title: "Episode 11 (1080p)",
        type: "iframe",
        src: "https://bysedikamoum.com/e/6lc9dtjdyjh3"
      },
      {
        number: 12,
        title: "Episode 12 (1080p)",
        type: "iframe",
        src: "https://bysedikamoum.com/e/i08nxpowsn00"
      }
    ]
  },
  {
    id: 29,
    title: "365 Days to the Wedding",
    cover: "https://image.tmdb.org/t/p/w500/lMVkOrMaWEkHZLdPksKGcdi6hJg.jpg",
    banner: "https://i.ytimg.com/vi/LzNpU_ckjTs/maxresdefault.jpg",
    synopsis: "Takuya and Rika work at the same travel agency in  Tokyo and are both happily introverted and single. But their company is opening a new branch in Alaska next year, and employees without a spouse will be recruited to work there. Desperate to avoid the move, and though they’ve hardly spoken before, they decide to fake an engagement. Can these quiet coworkers become a convincing couple?",
    tags: ["Animation", "Comedy", "Season 1"],
    episodes: [
      {
        number: 1,
        title: "Episode 1 (1080p)",
        type: "iframe",
        src: "https://bysedikamoum.com/e/tn8vgw3204qi"
      },
      {
        number: 2,
        title: "Episode 2 (1080p)",
        type: "iframe",
        src: "https://bysedikamoum.com/e/vvhd16i6nxrq"
      },
      {
        number: 3,
        title: "Episode 3 (1080p)",
        type: "iframe",
        src: "https://bysedikamoum.com/e/1ih7s285jngv"
      },
      {
        number: 4,
        title: "Episode 4 (1080p)",
        type: "iframe",
        src: "https://bysedikamoum.com/e/3vp79rjjy9kc"
      },
      {
        number: 5,
        title: "Episode 5 (1080p)",
        type: "iframe",
        src: "https://bysedikamoum.com/e/1793ujdovbf7"
      },
      {
        number: 6,
        title: "Episode 6 (1080p)",
        type: "iframe",
        src: "https://bysedikamoum.com/e/kl2kswih25is"
      },
      {
        number: 7,
        title: "Episode 7 (1080p)",
        type: "iframe",
        src: "https://bysedikamoum.com/e/bpdf2cfhmydq"
      },
      {
        number: 8,
        title: "Episode 8 (1080p)",
        type: "iframe",
        src: "https://bysedikamoum.com/e/rg4tzcak9bry"
      },
      {
        number: 9,
        title: "Episode 9 (1080p)",
        type: "iframe",
        src: "https://bysedikamoum.com/e/kffc5bbu6stv"
      },
      {
        number: 10,
        title: "Episode 10 (1080p)",
        type: "iframe",
        src: "https://bysedikamoum.com/e/0ra5m43sz4ok"
      },
      {
        number: 11,
        title: "Episode 11 (1080p)",
        type: "iframe",
        src: "https://bysedikamoum.com/e/iclkp740adbt"
      },
      {
        number: 12,
        title: "Episode 12 (1080p)",
        type: "iframe",
        src: "https://bysedikamoum.com/e/hubqhlgw0ft7"
      }
    ]
  }
  ,
  {
    id: 30,
    title: "The Angel Next Door Spoils Me Rotten",
    cover: "https://image.tmdb.org/t/p/original/pjNFTabj2mXUGquE8Oj3buPeKvQ.jpg",
    banner: "https://image.tmdb.org/t/p/original/pjNFTabj2mXUGquE8Oj3buPeKvQ.jpg",
    synopsis: "Amane lives alone in an apartment, and the most beautiful girl in school, Mahiru, lives just next door. They’ve almost never spoken—until the day he sees her in distress on a rainy day and lends her his umbrella. To return the favour, she offers him help around the house, and a relationship slowly begins to blossom as the distance between them closes…",
    tags: ["Animation", "Comedy", "Season 2", "Season 1"],
    episodes: [
      {
        number: 1,
        season: 1,
        title: "Episode 01",
        type: "iframe",
        src: "https://bysedikamoum.com/e/dpx7guw6ijd2/the-angel-next-door-spoils-me-rotten-s01e01-hindi"
      },
      {
        number: 2,
        season: 1,
        title: "Episode 02",
        type: "iframe",
        src: "https://bysedikamoum.com/e/c0hf3qwn5l42/the-angel-next-door-spoils-me-rotten-s01e02-hindi"
      },
      {
        number: 3,
        season: 1,
        title: "Episode 03",
        type: "iframe",
        src: "https://bysedikamoum.com/e/3d02eu2fvak2/the-angel-next-door-spoils-me-rotten-s01e03-hindi"
      },
      {
        number: 4,
        season: 1,
        title: "Episode 04",
        type: "iframe",
        src: "https://bysedikamoum.com/e/30ibw9s3vn0a/the-angel-next-door-spoils-me-rotten-s01e04-hindi"
      },
      {
        number: 5,
        season: 1,
        title: "Episode 05",
        type: "iframe",
        src: "https://bysedikamoum.com/e/t3gs2odbm4cq/the-angel-next-door-spoils-me-rotten-s01e05-hindi"
      },
      {
        number: 6,
        season: 1,
        title: "Episode 06",
        type: "iframe",
        src: "https://bysedikamoum.com/e/z12ircpz5ntm/the-angel-next-door-spoils-me-rotten-s01e06-hindi"
      },
      {
        number: 7,
        season: 1,
        title: "Episode 07",
        type: "iframe",
        src: "https://bysedikamoum.com/e/iecggnp4rw5x/the-angel-next-door-spoils-me-rotten-s01e07-hindi"
      },
      {
        number: 8,
        season: 1,
        title: "Episode 08",
        type: "iframe",
        src: "https://bysedikamoum.com/e/5b3jbgxvw9ee/the-angel-next-door-spoils-me-rotten-s01e08-hindi"
      },
      {
        number: 9,
        season: 1,
        title: "Episode 09",
        type: "iframe",
        src: "https://bysedikamoum.com/e/rp7bzfa986g5/the-angel-next-door-spoils-me-rotten-s01e09-hindi"
      },
      {
        number: 10,
        season: 1,
        title: "Episode 10",
        type: "iframe",
        src: "https://bysedikamoum.com/e/qmwk9re0x2rr/the-angel-next-door-spoils-me-rotten-s01e10-hindi"
      },
      {
        number: 11,
        season: 1,
        title: "Episode 11",
        type: "iframe",
        src: "https://bysedikamoum.com/e/9zufdzmltoko/the-angel-next-door-spoils-me-rotten-s01e11-hindi"
      },
      {
        number: 12,
        season: 1,
        title: "Episode 12",
        type: "iframe",
        src: "https://bysedikamoum.com/e/ylre9g296nqf/the-angel-next-door-spoils-me-rotten-s01e12-hindi"
      },
      {
        number: 1,
        season: 2,
        title: "Episode 01",
        type: "iframe",
        src: "https://bysedikamoum.com/e/jz9dtmewvgpf/the-angel-next-door-spoils-me-rotten-s02e01-hindi"
      },
      {
        number: 2,
        season: 2,
        title: "Episode 02",
        type: "iframe",
        src: "https://bysedikamoum.com/e/uoc2dbchbgeq/the-angel-next-door-spoils-me-rotten-s02e02-hindi"
      },
      {
        number: 3,
        season: 2,
        title: "Episode 03",
        type: "iframe",
        src: "https://bysedikamoum.com/e/mu511m6kv42g/the-angel-next-door-spoils-me-rotten-s02e03-hindi"
      },
      {
        number: 4,
        season: 2,
        title: "Episode 04",
        type: "iframe",
        src: "https://bysedikamoum.com/e/1riiddo0gqby/the-angel-next-door-spoils-me-rotten-s02e04-hindi"
      },
      {
        number: 5,
        season: 2,
        title: "Episode 05",
        type: "iframe",
        src: "https://bysedikamoum.com/e/imetc3dtszbk/the-angel-next-door-spoils-me-rotten-s02e05-hindi"
      },
      {
        number: 6,
        season: 2,
        title: "Episode 06",
        type: "iframe",
        src: "https://bysedikamoum.com/e/im7aquj3i7p5/the-angel-next-door-spoils-me-rotten-s02e06-hindi"
      },
      {
        number: 7,
        season: 2,
        title: "Episode 07",
        type: "iframe",
        src: "https://bysedikamoum.com/e/jkanu8yx4qr5/the-angel-next-door-spoils-me-rotten-s02e07-hindi"
      },
      {
        number: 8,
        season: 2,
        title: "Episode 08",
        type: "iframe",
        src: "https://bysedikamoum.com/e/59p2rm9u46dg/the-angel-next-door-spoils-me-rotten-s02e08-hindi"
      },
      {
        number: 9,
        season: 2,
        title: "Episode 09",
        type: "iframe",
        src: "https://bysedikamoum.com/e/0e4wywuhet74/the-angel-next-door-spoils-me-rotten-s02e09-hindi"
      },
      {
        number: 10,
        season: 2,
        title: "Episode 10",
        type: "iframe",
        src: "https://bysedikamoum.com/e/b2k8qk081qfv/the-angel-next-door-spoils-me-rotten-s02e10-hindi"
      },
      {
        number: 11,
        season: 2,
        title: "Episode 11",
        type: "iframe",
        src: "https://bysedikamoum.com/e/p976fd7h2wtc/the-angel-next-door-spoils-me-rotten-s02e11-hindi"
      },
      {
        number: 12,
        season: 2,
        title: "Episode 12",
        type: "iframe",
        src: "https://bysedikamoum.com/e/9po8w4s68xyl/the-angel-next-door-spoils-me-rotten-s02e12-hindi"
      }
    ]
  }
];