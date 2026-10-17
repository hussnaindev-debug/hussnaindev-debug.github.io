/**
 * Single source of truth for every project / case study.
 * The case-study template (app/projects/[slug]/page.tsx) renders from this.
 * Facts here are migrated 1:1 from the existing site + the real design docs
 * and progress logs. Nothing invented.
 */

export type Platform = "unity" | "roblox";
export type Status = "live" | "in-development";

export interface MediaLink {
  label: string;
  href: string;
  external?: boolean;
  kind?: "store" | "play" | "itch";
}

export interface BuildCard {
  title: string;
  body: string;
  icon: string; // lucide icon name
}

export interface DeepDive {
  heading: string;
  paras: string[];
}

export interface GalleryShot {
  src: string;
  caption: string;
}

export interface Project {
  slug: string;
  name: string;
  platform: Platform;
  status: Status;
  /** short label shown on cards/kicker, e.g. "Roguelike Action-Adventure" */
  kind: string;
  /** one-line card/hero tagline */
  tagline: string;
  /** collection-card description */
  cardDesc: string;
  role: string;
  roleBody: string;
  accent: string; // hex, per-project accent
  /** card thumbnail: preview video loop (if any) + static poster/cover fallback */
  previewVideo?: string; // short loop, generated in Phase 7 (…/preview.mp4)
  poster: string; // static image used as card/hero fallback + video poster
  cover?: string; // key-art cover (hero) if different from poster
  heroVideo?: string; // full gameplay video for the case-study Gameplay section
  /** quick chips on the card */
  tags: string[];
  /** 4 HUD metrics for the case-study hero */
  metrics: { num: string; label: string }[];
  /** info panel rows */
  info: { k: string; v: string }[];
  /** overview paragraphs */
  overview: string[];
  /** "what I built" cards */
  build: BuildCard[];
  /** optional system deep-dive sections */
  deepDives: DeepDive[];
  /** optional real screenshots */
  gallery: GalleryShot[];
  /** built-with chips */
  tech: string[];
  /** external links (play on roblox / google play / itch) */
  links: MediaLink[];
  /** show on homepage "selected work"? */
  featured?: boolean;
}

const M = (slug: string) => `/media/${slug}`;

export const projects: Project[] = [
  /* ============================ ROBLOX ============================ */
  {
    slug: "bloom-prison",
    name: "Bloom Prison",
    platform: "roblox",
    status: "in-development",
    kind: "Roguelike Action-Adventure",
    tagline:
      "My flagship: a roguelike action-adventure for Roblox, designed and built solo.",
    cardDesc:
      "My flagship roguelike action-adventure, built solo: free-flow combat, enemy AI, abilities and VFX.",
    role: "Sole Developer",
    roleBody:
      "I design and script every system myself in Roblox Studio with Luau: the free-flow combat, the enemy AI, the ability and VFX systems, the randomized points of interest, the cutscenes, and the full inventory system. Bloom Prison is a solo project at my company.",
    accent: "#34D399",
    poster: `${M("bloom-prison")}/cover.jpg`,
    cover: `${M("bloom-prison")}/cover.jpg`,
    previewVideo: `${M("bloom-prison")}/preview.mp4`,
    heroVideo: `${M("bloom-prison")}/gameplay.mp4`,
    tags: ["Roblox Studio", "Luau", "Free-Flow Combat", "Enemy AI", "Abilities & VFX"],
    metrics: [
      { num: "Flagship", label: "Personal project" },
      { num: "Solo", label: "Sole developer" },
      { num: "Roguelike", label: "Run-based" },
      { num: "Luau", label: "Roblox Studio" },
    ],
    info: [
      { k: "Role", v: "Sole Developer" },
      { k: "Platform", v: "Roblox" },
      { k: "Engine", v: "Roblox Studio (Luau)" },
      { k: "Genre", v: "Roguelike Action-Adventure" },
      { k: "Status", v: "In early development" },
    ],
    overview: [
      "Bloom Prison is a roguelike action-adventure experience for Roblox, and it's the project I'm proudest of. I'm the sole developer on it at my company, and it's currently in early development. Every system, from combat and enemy AI to points of interest, cutscenes, abilities, VFX, and inventory, is designed and scripted by me in Roblox Studio with Luau.",
      "Each run drops the player into a world of readable, reactive encounters and randomized points of interest, built around combat that stays fluid from one attack to the next.",
    ],
    build: [
      { title: "Free-flow combat", body: "Input-buffered melee with auto-targeting so mobile players never fight the controls.", icon: "Sword" },
      { title: "Weapons & abilities", body: "Each weapon has its own abilities, VFX, and clear strengths and weaknesses.", icon: "Swords" },
      { title: "Distinct enemy AI", body: "Swarms, poisonous types, and ranged attackers each behave differently.", icon: "Bot" },
      { title: "Abilities & VFX", body: "An ability system paired with a hand-built VFX layer for impactful powers.", icon: "Zap" },
      { title: "Randomized POIs", body: "Points of interest spawn randomly each run, granting armor, weapons, or heals.", icon: "Map" },
      { title: "Cutscenes", body: "Story cutscenes in Moon Animator, played for every player when triggered.", icon: "Film" },
      { title: "Inventory system & UI", body: "A full inventory system and UI for managing weapons, items, and gear.", icon: "Backpack" },
      { title: "Roguelike runs", body: "Randomized layouts and rewards give each run a repeatable, fresh structure.", icon: "Dices" },
    ],
    deepDives: [
      {
        heading: "Combat system",
        paras: [
          "Combat is built around flow. The goal is to make chaining from one attack into the next feel effortless, so encounters read as continuous sequences rather than isolated swings. Input buffering is central: the player can queue their next input mid-attack and it lands as soon as the current move allows.",
          "To keep things approachable, especially on mobile, the player automatically targets the nearest enemy without holding directional input, an approach inspired by the free-flow combat of the Batman: Arkham games.",
          "Each weapon carries its own identity through a unique set of abilities and VFX, along with clear strengths and weaknesses. Some abilities are pure offense, others grant temporary buffs.",
        ],
      },
      {
        heading: "Enemy AI",
        paras: [
          "Every enemy is designed to be a distinct threat rather than a reskin: swarming enemies that overwhelm through numbers, poisonous enemies that punish careless positioning, and ranged attackers that force the player to close distance or take cover.",
          "Encounters become a matter of reading the field and adapting. Enemies detect the player, close in, and commit to attacks with their own timing and spacing, so fights stay reactive instead of predictable.",
        ],
      },
    ],
    gallery: [],
    tech: ["Roblox Studio", "Luau", "Roguelike", "Free-Flow Combat", "Enemy AI", "Abilities & VFX", "Moon Animator", "Cutscenes", "Inventory System"],
    links: [
      { label: "Play on Roblox", href: "https://www.roblox.com/share?code=2559c1f826afa642be130feaf8e437e6&type=ExperienceDetails&stamp=1789672246663", external: true, kind: "play" },
    ],
    featured: true,
  },
  {
    slug: "steal-a-viral-squishy",
    name: "Steal a Viral Squishy",
    platform: "roblox",
    status: "live",
    kind: "Multiplayer Collection",
    tagline:
      "A multiplayer squishy-collecting game: buy off a conveyor, earn passive income, and steal from other bases. Built solo.",
    cardDesc:
      "A multiplayer squishy-collecting game with server-authoritative stealing, gacha, rebirth, monetization, and analytics. Built solo.",
    role: "Solo Developer · All Systems",
    roleBody:
      "I built the game on my own, from the ground up: the multiplayer base and conveyor system, passive income, the server-authoritative stealing and base-locking, defensive tools, rarities, rebirth, mystery-box gacha, the full monetization framework, the first-time tutorial and beginner quests, the cross-platform UI, and the analytics funnel, with DataStore saving and exploit/dupe protection throughout.",
    accent: "#EC4899",
    poster: `${M("steal-a-viral-squishy")}/cover.jpg`,
    cover: `${M("steal-a-viral-squishy")}/cover.jpg`,
    previewVideo: `${M("steal-a-viral-squishy")}/preview.mp4`,
    heroVideo: `${M("steal-a-viral-squishy")}/gameplay.mp4`,
    tags: ["Roblox Studio", "Luau", "Multiplayer", "Stealing", "Server-Authoritative"],
    metrics: [
      { num: "Live", label: "On Roblox" },
      { num: "All", label: "Systems by me" },
      { num: "Multiplayer", label: "Bases · Stealing" },
      { num: "6", label: "Rarity tiers" },
    ],
    info: [
      { k: "Role", v: "Solo Developer" },
      { k: "Platform", v: "Roblox (all devices)" },
      { k: "Engine", v: "Roblox Studio (Luau)" },
      { k: "Genre", v: "Multiplayer Collection" },
      { k: "Status", v: "Live on Roblox" },
    ],
    overview: [
      "Steal a Viral Squishy is a multiplayer squishy-collecting game for Roblox. Each server gives every player a base around a central conveyor. Squishies travel along the conveyor; players buy them, send them to a slot in their base, and those squishies generate passive income over time. I designed and built every system in the experience.",
      "The twist is the stealing: players can enter another player's unlocked base, carry a squishy back to their own, and defend against thieves doing the same. On top of that sit rarities, a rebirth system, mystery boxes, a full monetization framework, a first-time tutorial, and analytics, all on a server-authoritative setup so the economy and theft can't be exploited from the client.",
    ],
    build: [
      { title: "Bases & conveyor", body: "Per-player bases around a central conveyor. Buy squishies as they travel past and route them to a free slot.", icon: "Users" },
      { title: "Passive income", body: "Every squishy in a base generates cash per second, accumulating at a collection point for the owner to claim.", icon: "Coins" },
      { title: "Stealing system", body: "Carry a squishy from another base back to your own. Carrying slows you, the owner is warned, and the theft only lands at home.", icon: "Grab" },
      { title: "Base locking & defense", body: "A lock button that drops barriers with a countdown and cooldown, plus a knockback hand, speed item, and bear trap.", icon: "Shield" },
      { title: "Rarities & config", body: "Common to Squishy Royalty, with mutations and spawn chances, on a config system so new squishies drop in without rewrites.", icon: "Sparkles" },
      { title: "Mystery boxes & rebirth", body: "Dumpling-box gacha with weighted odds, and a rebirth loop granting income multipliers, more slots, and longer locks.", icon: "Package" },
      { title: "Monetization framework", body: "Game passes, developer products, boosts, cosmetics, bundles, and gear, with clear purchase confirmations.", icon: "ShoppingBag" },
      { title: "Onboarding & analytics", body: "An interactive first-time tutorial and beginner quests, wired into a Roblox AnalyticsService onboarding funnel.", icon: "Gauge" },
    ],
    deepDives: [
      {
        heading: "Server-authoritative stealing in multiplayer",
        paras: [
          "The hardest and most interesting system is the stealing mechanic, because it has to be fair and exploit-proof in a live multiplayer server. A thief enters another player's unlocked base, picks up a squishy, and has to carry it all the way home. While carrying, their movement is slowed, the squishy shows on them, and the owner gets a warning; other players can hit or stop them, and if the thief is knocked out, leaves, or resets, the squishy returns safely.",
          "None of that is trusted to the client. Purchases, income, and every step of a theft are validated on the server, with explicit duplication prevention so a squishy can never exist in two bases at once, slot checks before a theft can complete, and DataStore saving for money, squishies, upgrades, and rebirths.",
          "Around that core, I built the systems that turn the loop into a game you keep coming back to: a config-driven rarity system from Common to Squishy Royalty, mystery-box gacha with weighted odds, a rebirth progression, a full monetization framework, an events and admin layer gated to authorized user IDs, and a first-time tutorial wired into an AnalyticsService onboarding funnel.",
        ],
      },
    ],
    gallery: [],
    tech: ["Roblox Studio", "Luau", "Multiplayer", "Server-Authoritative", "DataStore", "Anti-Exploit", "Dupe Prevention", "Gacha", "Rebirth", "Monetization", "AnalyticsService", "Cross-Platform"],
    links: [
      { label: "Play on Roblox", href: "https://www.roblox.com/share?code=704791eb7911a7449df4853e92b1a03a&type=ExperienceDetails&stamp=1791560656714", external: true, kind: "play" },
    ],
    featured: true,
  },
  {
    slug: "fall-for-brainrot",
    name: "Fall for Brainrot",
    platform: "roblox",
    status: "in-development",
    kind: "Downhill Runner + Collector",
    tagline:
      "A downhill rolling-bubble game: launch in a glass ball, roll the hill dodging obstacles, and collect Brainrots. Built solo.",
    cardDesc:
      "A downhill rolling-bubble game with a Brainrot collector economy: custom physics, 100 Brainrots, leaderboards, and anti-cheat. Built solo.",
    role: "Solo Developer · All Systems",
    roleBody:
      "I'm building Fall for Brainrot on my own: the custom dual-body ball physics and controls, the launch and run loop, bubble durability and glass-shatter, coin/gem pickups and distance-gated rewards, the 100-Brainrot collection with bases and passive income, upgrades, rebirth, quests, global leaderboards, a full pet-sim UI, server-side anti-cheat, and the DataStore saving that holds it all together.",
    accent: "#F59E0B",
    poster: `${M("fall-for-brainrot")}/cover.jpg`,
    cover: `${M("fall-for-brainrot")}/cover.jpg`,
    previewVideo: `${M("fall-for-brainrot")}/preview.mp4`,
    heroVideo: `${M("fall-for-brainrot")}/gameplay.mp4`,
    tags: ["Roblox Studio", "Luau", "Custom Physics", "100 Brainrots", "Anti-Cheat"],
    metrics: [
      { num: "In Dev", label: "Roblox" },
      { num: "Custom", label: "Physics ball" },
      { num: "100", label: "Brainrots" },
      { num: "Solo", label: "All systems" },
    ],
    info: [
      { k: "Role", v: "Solo Developer" },
      { k: "Platform", v: "Roblox (all devices)" },
      { k: "Engine", v: "Roblox Studio (Luau)" },
      { k: "Genre", v: "Downhill Runner · Collector" },
      { k: "Status", v: "In development" },
    ],
    overview: [
      "Fall for Brainrot is a Roblox game in development that mixes a downhill runner with a collector economy. Players climb into a glass bubble, launch off a pad at the top of the hill, and roll down a long slope, building momentum, dodging obstacles, and collecting coins and gems. How far you get determines the Brainrot you earn.",
      "Back at your base, the Brainrots you've collected go on display and generate passive income, which you reinvest into upgrades and rebirths. I'm designing and building every system myself, from the custom ball physics to the economy, the 100-character collection, leaderboards, and anti-cheat.",
    ],
    build: [
      { title: "Custom ball physics", body: "A two-body glass bubble (rolling shell + upright interior seat) driven by angular velocity, so momentum and slopes feel right for free.", icon: "Orbit" },
      { title: "Launch & run loop", body: "Auto-seat on the pad, arc-launch off the top, then roll the slope with hybrid controls and a speed-reactive follow camera.", icon: "Mountain" },
      { title: "Durability & pickups", body: "Bubble HP with staged cracks and a physics glass-shatter, plus coin/gem pickups and server-tracked distance that gates the reward.", icon: "Gem" },
      { title: "100 Brainrots", body: "A config-driven collection of 100 animated characters across five rarities, with an index, Tool inventory, and base placement.", icon: "Package" },
      { title: "Bases & passive income", body: "Personal bases with display stands; the Brainrots you equip generate income per second that you walk over to collect.", icon: "Users" },
      { title: "Upgrades, rebirth & quests", body: "Glass-strength, coin-multiplier, and gem-luck upgrades, a rebirth loop, and daily quests, all saved with DataStore session locking.", icon: "Sparkles" },
      { title: "Global leaderboards", body: "Ordered-data-store leaderboards for best distance, total coins earned, and rebirths, shown on in-world boards.", icon: "Trophy" },
      { title: "Anti-cheat & admin", body: "Server-side distance validation that voids teleport exploits, plus an allowlisted admin dev panel.", icon: "Shield" },
    ],
    deepDives: [
      {
        heading: "Custom physics, and keeping it honest",
        paras: [
          "The heart of the game is the ball itself. It's built as two linked physics bodies: a collision shell that rolls and collides with the world, and an interior that holds the player's seat and is kept upright by an orientation constraint so the rider never tumbles while the shell spins. Movement isn't done by shoving forces around; the client sets a target angular velocity each frame and lets real physics, gravity, and the slope do the rest.",
          "Because how far you roll decides your reward and leaderboard rank, distance has to be trustworthy. The ball is network-owned by the player during a run for smooth control, so I validate distance on the server: a per-frame speed clamp absorbs one-off lag spikes but a run that keeps reporting impossible speed is voided with no reward, which shut down teleport and fling exploits in testing.",
          "Around the run is a full collector economy: 100 config-driven Brainrots across five rarities with real animated models, a Tool-based inventory and base display, passive income, glass-strength / coin-multiplier / gem-luck upgrades, rebirth, daily quests, and global leaderboards, all saved per player with DataStore session locking and anti-dupe.",
        ],
      },
    ],
    gallery: [],
    tech: ["Roblox Studio", "Luau", "Custom Physics", "Constraints", "DataStore", "OrderedDataStore", "Anti-Cheat", "Leaderboards", "Upgrades", "Rebirth", "Quests", "Cross-Platform"],
    links: [],
    featured: true,
  },
  {
    slug: "99-days-zombie-survival",
    name: "99 Days Zombie Survival",
    platform: "roblox",
    status: "live",
    kind: "Narrative Survival",
    tagline:
      "A story-driven Roblox survival experience where players endure 99 days against the undead.",
    cardDesc:
      "A narrative survival experience with cinematic cutscenes, a modular weapons system, and a gacha loop. Reached 155,800+ visits.",
    role: "Roblox Game Developer",
    roleBody:
      "As a core developer on the project, I contributed across gameplay systems, UI, and performance, taking the experience from an early build to a live game. My work included the cutscene system, a modular weapons framework, a gacha system, the backpack inventory UI, and the optimization that keeps it running on low-end devices.",
    accent: "#F56565",
    poster: `${M("99-days-zombie-survival")}/poster-fallback`, // no media -> handled as devbuild
    tags: ["Roblox Studio", "Luau", "Moon Animator", "Gacha", "155K+ Visits"],
    metrics: [
      { num: "155,800+", label: "Visits" },
      { num: "1,200+", label: "Favorites" },
      { num: "4 mo", label: "Since launch" },
      { num: "Core", label: "Developer" },
    ],
    info: [
      { k: "Role", v: "Roblox Game Developer" },
      { k: "Studio", v: "ZhenStudio 26" },
      { k: "Platform", v: "Roblox" },
      { k: "Engine", v: "Roblox Studio (Luau)" },
      { k: "Status", v: "Live · Jan 2026 to Present" },
    ],
    overview: [
      "99 Days Zombie Survival is a story-driven Roblox title built in Roblox Studio with Luau. As a core developer, I contributed across gameplay systems, UI, and performance, taking the experience from early build to a live game that reached 155,800+ visits and 1,200+ favorites within its first four months.",
      "The game blends narrative delivery with action survival: scripted cutscenes drive the story between waves, while a modular weapons system and gacha rolls give players long-term progression goals. A heavy focus on optimization keeps it smooth on mobile and low-end Roblox clients.",
    ],
    build: [
      { title: "Cinematic cutscenes", body: "Scripted in-game cutscenes built with Moon Animator, woven into the gameplay flow to deliver the story.", icon: "Film" },
      { title: "Modular weapons system", body: "A scalable weapons framework handling combat logic, animations, and player interaction across many weapon types.", icon: "Crosshair" },
      { title: "Gacha system", body: "Randomized reward rolls with rarity tiers, driving collection and re-engagement.", icon: "Dices" },
      { title: "Backpack & UI", body: "Inventory UI, tutorial onboarding flows, and dynamic toast messaging for clean player feedback.", icon: "Backpack" },
      { title: "Mobile optimization", body: "Performance tuning to keep gameplay smooth on low-end and mobile-supported Roblox devices.", icon: "Gauge" },
    ],
    deepDives: [
      {
        heading: "Narrative meets survival",
        paras: [
          "The design challenge was blending a story-driven experience with action survival on Roblox. Scripted cutscenes built in Moon Animator drive the narrative between waves, and integrating them cleanly into the gameplay flow was a core part of my work.",
          "On the progression side, a modular weapons system handles combat logic and animations across many weapon types, while a gacha system with rarity tiers gives players long-term collection goals. A heavy optimization pass keeps it smooth on mobile and low-end clients, which helped the game reach 155,800+ visits and 1,200+ favorites in its first four months.",
        ],
      },
    ],
    gallery: [],
    tech: ["Roblox Studio", "Luau", "Moon Animator", "Gacha System", "Weapons System", "Inventory UI", "Mobile Optimization"],
    links: [
      { label: "Play on Roblox", href: "https://www.roblox.com/games/77487145790598/99-Days-Zombie-Survivsal", external: true, kind: "play" },
    ],
  },
  {
    slug: "octopus-energy",
    name: "Octopus Energy",
    platform: "roblox",
    status: "live",
    kind: "Tycoon",
    tagline:
      "A Roblox tycoon game where players collect tycoons and build a base, and I built every system.",
    cardDesc:
      "A tycoon game where players collect tycoons and build a base, with obbys, pets, daily rewards, a shop, and a leaderboard. I built every system.",
    role: "Game Developer · All Systems",
    roleBody:
      "I designed and built every system in the experience, from the tycoon economy to the meta features. That covers the core earning-and-reinvesting loop, obbys, collectables, a pet system, daily rewards, the shop, and the leaderboard, all on a server-authoritative setup.",
    accent: "#3B9EFF",
    poster: `${M("octopus-energy")}/poster-fallback`,
    tags: ["Roblox Studio", "Luau", "Tycoon", "Pets", "Shop System"],
    metrics: [
      { num: "Live", label: "On Roblox" },
      { num: "All", label: "Systems by me" },
      { num: "Tycoon", label: "+ Pets · Shop" },
      { num: "Luau", label: "Server-authoritative" },
    ],
    info: [
      { k: "Role", v: "Game Developer" },
      { k: "Platform", v: "Roblox" },
      { k: "Engine", v: "Roblox Studio (Luau)" },
      { k: "Genre", v: "Tycoon" },
      { k: "Status", v: "Live on Roblox" },
    ],
    overview: [
      "Octopus Energy is a Roblox tycoon game. Players collect a variety of tycoons and build their base up around them, with a core loop that rewards expanding, earning, and reinvesting. I designed and built all of the systems in the experience.",
      "Around that core loop is a full stack of progression and reward systems: obbys to complete, collectables to track down, a pet system, daily rewards, a shop, and a leaderboard. Everything runs on a server-authoritative Roblox setup so player progress and economy stay secure and persistent.",
    ],
    build: [
      { title: "Tycoon collection", body: "Collect a range of different tycoons and build your base up around them.", icon: "Factory" },
      { title: "Obbys", body: "Obstacle courses for players to complete for rewards and variety.", icon: "Mountain" },
      { title: "Collectables & pets", body: "Hidden collectables to hunt down, plus a pet system that follows and supports the player.", icon: "PawPrint" },
      { title: "Daily rewards & shop", body: "A daily reward loop and a shop where players spend earnings on upgrades and items.", icon: "Gift" },
      { title: "Leaderboard", body: "A competitive leaderboard to rank players against each other.", icon: "Trophy" },
    ],
    deepDives: [
      {
        heading: "A full tycoon loop, server-authoritative",
        paras: [
          "The heart of Octopus Energy is a tycoon economy: collect tycoons, earn from them, and reinvest to expand. I designed and built that core loop and then layered a full stack of progression and reward systems on top, obbys, collectables, a pet system, daily rewards, a shop, and a leaderboard.",
          "All of it runs on a server-authoritative Roblox setup, which keeps player progress and the in-game economy secure and persistent rather than trusting the client.",
        ],
      },
    ],
    gallery: [],
    tech: ["Roblox Studio", "Luau", "Tycoon", "Pet System", "Shop System", "Daily Rewards", "Obby", "Leaderboard"],
    links: [
      { label: "Play on Roblox", href: "https://www.roblox.com/share?code=c5ea151f2a6b5f4daba1182f934d62bc&type=ExperienceDetails&stamp=1783770704028", external: true, kind: "play" },
    ],
  },
  /* ============================ UNITY ============================ */
  {
    slug: "four-reaction",
    name: "4 Reaction",
    platform: "unity",
    status: "live",
    kind: "Local Multiplayer",
    tagline: "A fast local multiplayer party game built around 30 unique minigames.",
    cardDesc:
      "A local multiplayer party game with 30 minigames, a reactive personality, an AI opponent, and an XP unlock system. 5,000+ installs.",
    role: "Lead Developer",
    roleBody:
      "I built the game from scratch with no kit or template, and owned the core gameplay framework, the modular architecture behind all 30 minigames, the AI opponent, the XP and unlock progression, and the full production stack of IAP, AppsFlyer analytics, and iOS ATT compliance.",
    accent: "#6366F1",
    poster: `${M("four-reaction")}/poster.png`,
    previewVideo: `${M("four-reaction")}/preview.mp4`,
    heroVideo: `${M("four-reaction")}/gameplay.mp4`,
    tags: ["Unity 2D", "Lead Dev", "30 Minigames", "AI Opponent", "IAP"],
    metrics: [
      { num: "5,000+", label: "Installs" },
      { num: "30", label: "Minigames" },
      { num: "1-4", label: "Players" },
      { num: "Lead", label: "Developer" },
    ],
    info: [
      { k: "Role", v: "Lead Developer" },
      { k: "Studio", v: "UFD Studios" },
      { k: "Platform", v: "Android" },
      { k: "Engine", v: "Unity (C#)" },
      { k: "Released", v: "March 2025" },
    ],
    overview: [
      "4 Reaction is a 2D local multiplayer party game made to be played with friends on a single device. As lead developer, I built it from scratch with no template or starter kit, owning the core systems and all 30 minigames.",
      "The heart of the game is those 30 minigames, each a fast test of quick thinking and reaction. It has real personality too: answer correctly and it applauds you, slip up and it playfully taunts you.",
      "Matches scale from one-on-one up to a four-player free-for-all, and a solo AI mode with adjustable difficulty means there's always someone to play against. An XP system rewards every match and unlocks new minigames over time.",
    ],
    build: [
      { title: "Lead developer, from scratch", body: "Led development and built the game with no kit or template, owning the core systems.", icon: "Gamepad2" },
      { title: "30 unique minigames", body: "Thirty distinct challenges, each with its own rules, win conditions, and input style.", icon: "LayoutGrid" },
      { title: "Modular architecture", body: "Each minigame is self-contained: its own prefab, a ScriptableObject for settings, and its own script.", icon: "Layers" },
      { title: "Reactive personality", body: "The game applauds correct answers and playfully taunts mistakes, giving every round character.", icon: "Smile" },
      { title: "AI opponent", body: "A solo mode against an AI with adjustable difficulty for when no friends are around.", icon: "Cpu" },
      { title: "XP and unlocks", body: "Earn XP from matches and spend it to unlock more minigames over time.", icon: "Star" },
    ],
    deepDives: [
      {
        heading: "Modular minigame architecture",
        paras: [
          "With 30 distinct minigames to build and tune, the architecture had to keep each one independent. Every minigame is fully self-contained: it has its own prefab, a ScriptableObject that drives its settings, and its own dedicated script.",
          "That separation meant each minigame could be built, balanced, and expanded on its own without touching the others, which is what made shipping 30 of them practical. On the production side, I integrated in-app purchases, AppsFlyer for analytics, and full iOS ATT compliance. The game reached 5,000+ installs on Google Play.",
        ],
      },
    ],
    gallery: [
      { src: `${M("four-reaction")}/shot-3.jpg`, caption: "Four-player minigame round" },
      { src: `${M("four-reaction")}/shot-1.jpg`, caption: "Main menu & setup" },
      { src: `${M("four-reaction")}/shot-2.jpg`, caption: "Minigame selection grid" },
      { src: `${M("four-reaction")}/shot-4.jpg`, caption: "Results & XP progression" },
    ],
    tech: ["Unity 2D", "C#", "ScriptableObjects", "Prefab Architecture", "Local Multiplayer", "AI Opponent", "XP System", "DOTween", "IAP", "AppsFlyer", "iOS ATT"],
    links: [
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.junostudio.fourreaction", external: true, kind: "store" },
    ],
    featured: true,
  },
  {
    slug: "circular-pong",
    name: "Circular Pong",
    platform: "unity",
    status: "live",
    kind: "Arcade",
    tagline: "An arcade reflex game built around a single ring, wrapped in a full live-ops meta layer.",
    cardDesc:
      "An arcade ring-based reflex game with a skins store, spin wheel, daily rewards, missions, a leaderboard, Google Ads, and IAP.",
    role: "Lead Developer",
    roleBody:
      "I led development end to end, building the core arcade loop and the full meta layer around it: a skins store, spin wheel, daily rewards, weekly missions, a Google Play leaderboard, and the Google Ads and IAP monetization.",
    accent: "#22B8CF",
    poster: `${M("circular-pong")}/poster.png`,
    previewVideo: `${M("circular-pong")}/preview.mp4`,
    heroVideo: `${M("circular-pong")}/gameplay.mp4`,
    tags: ["Unity 2D", "Lead Dev", "Leaderboard", "Skins Store", "IAP"],
    metrics: [
      { num: "Live", label: "On Google Play" },
      { num: "1-ring", label: "Arcade loop" },
      { num: "Meta", label: "Store · Missions" },
      { num: "Lead", label: "Developer" },
    ],
    info: [
      { k: "Role", v: "Lead Developer" },
      { k: "Studio", v: "UFD Studios" },
      { k: "Platform", v: "Android" },
      { k: "Engine", v: "Unity (C#)" },
      { k: "Status", v: "Live on Google Play" },
    ],
    overview: [
      "Circular Pong is an arcade reflex game built around a single ring. You control a paddle that moves around the circle, keeping a colorful ball bouncing inside it. I led development end to end, building its core systems and gameplay.",
      "Every paddle hit scores a point, so survival and scoring are one and the same. The longer you last, the trickier it gets: obstacles appear inside the ring, and coins are scattered around to collect.",
      "Coins feed a full progression loop: a store for ball, paddle, and ring skins, a spin wheel for rewards, plus daily rewards, a daily ad bonus, and weekly missions.",
    ],
    build: [
      { title: "Lead developer", body: "Led development end to end, building the core systems and gameplay.", icon: "Gamepad2" },
      { title: "One-ring gameplay", body: "Move a paddle around a circle to keep the ball bouncing inside; each hit scores.", icon: "Target" },
      { title: "Obstacles & coins", body: "Steer the ball clear of obstacles inside the ring while collecting coins.", icon: "Shield" },
      { title: "Skins store", body: "Spend coins on skins for the ball, the paddle, and the rings.", icon: "ShoppingBag" },
      { title: "Spin wheel & daily rewards", body: "A reward wheel, daily rewards, a daily ad bonus, and weekly missions.", icon: "Gift" },
      { title: "Leaderboard, Ads & IAP", body: "A Google Play leaderboard for global scores, with Google Ads and IAP monetization.", icon: "Trophy" },
    ],
    deepDives: [
      {
        heading: "The live-ops meta layer",
        paras: [
          "The arcade loop is only half of Circular Pong. The other half is the economy and retention layer built on top of it. Coins earned in play feed a store where players buy and equip skins for the ball, the paddle, and the rings.",
          "On top of that sit the re-engagement systems: a spin wheel, daily rewards, a daily ad bonus, and weekly missions. A Google Play leaderboard turns every run into a competition, and DOTween drives the menus and transitions. Google Ads and IAP monetize the game without breaking the flow of play.",
        ],
      },
    ],
    gallery: [
      { src: `${M("circular-pong")}/shot-4.jpg`, caption: "Active gameplay: obstacle & coin" },
      { src: `${M("circular-pong")}/shot-2.jpg`, caption: "Ready screen" },
      { src: `${M("circular-pong")}/shot-3.jpg`, caption: "Skins store" },
      { src: `${M("circular-pong")}/shot-1.jpg`, caption: "Loading screen" },
    ],
    tech: ["Unity 2D", "C#", "DOTween", "Google Play Leaderboard", "Skins Store", "Spin Wheel", "Daily Rewards", "Google Ads", "IAP", "Android"],
    links: [
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.ufdstudios.circularpong", external: true, kind: "store" },
    ],
    featured: true,
  },
  {
    slug: "mouse-maze",
    name: "Mouse Maze",
    platform: "unity",
    status: "live",
    kind: "Browser Game",
    tagline: "A browser maze game that plays naturally on both desktop and mobile from a single build.",
    cardDesc:
      "A browser maze game with adaptive controls: keyboard on PC, on-screen joystick on mobile, from one WebGL build.",
    role: "Lead Developer",
    roleBody:
      "I built the game end to end, from the maze gameplay and UI to the adaptive control system that detects the player's device and switches between keyboard input on PC and an on-screen joystick on mobile, plus the DOTween-animated menus and panels.",
    accent: "#F6AD55",
    poster: `${M("mouse-maze")}/poster.png`,
    previewVideo: `${M("mouse-maze")}/preview.mp4`,
    heroVideo: `${M("mouse-maze")}/gameplay.mp4`,
    tags: ["Unity", "WebGL", "Adaptive Controls", "DOTween"],
    metrics: [
      { num: "2-in-1", label: "PC + Mobile" },
      { num: "WebGL", label: "Browser build" },
      { num: "No DL", label: "Plays in browser" },
      { num: "Lead", label: "Developer" },
    ],
    info: [
      { k: "Role", v: "Lead Developer" },
      { k: "Studio", v: "UFD Studios" },
      { k: "Platform", v: "WebGL (Browser)" },
      { k: "Engine", v: "Unity (C#)" },
      { k: "Status", v: "Playable on itch.io" },
    ],
    overview: [
      "Mouse Maze is a WebGL game built in Unity and published on itch.io, so it runs right in the browser with no download. You play as a mouse navigating a maze, working through the corridors to find the cheese at the end.",
      "The part I'm most proud of is the control system. The game detects the player's device and enables the right scheme automatically: keyboard controls on desktop, and a responsive on-screen joystick on touch devices.",
      "The interface is built to feel alive, with menus, buttons, and panels animated in DOTween.",
    ],
    build: [
      { title: "Built end to end", body: "From gameplay to UI and the adaptive control system.", icon: "Gamepad2" },
      { title: "Maze navigation", body: "Guide a mouse through a maze of corridors to reach the cheese.", icon: "Route" },
      { title: "Adaptive controls", body: "Detects the player's device and enables the right control scheme automatically.", icon: "MonitorSmartphone" },
      { title: "On-screen joystick", body: "A responsive touch joystick for mobile, plus keyboard controls on desktop.", icon: "Joystick" },
      { title: "DOTween UI", body: "Interactive menus with animated buttons and panel transitions for a polished feel.", icon: "Sparkles" },
      { title: "WebGL, no download", body: "Runs directly in the browser on itch.io, on desktop and mobile.", icon: "Globe" },
    ],
    deepDives: [
      {
        heading: "One build, every device",
        paras: [
          "Shipping a single WebGL build that plays well on both a laptop and a phone is the core engineering story of Mouse Maze. Rather than ask the player to pick a mode, the game detects the device at runtime and enables the right control scheme automatically.",
          "On desktop that means keyboard controls; on touch devices it's a responsive on-screen joystick. The result is that the same build feels native in either context with zero setup. Layered on top, DOTween drives the menus and transitions.",
        ],
      },
    ],
    gallery: [
      { src: `${M("mouse-maze")}/shot-3.jpg`, caption: "Navigating the maze" },
      { src: `${M("mouse-maze")}/shot-1.jpg`, caption: "Main menu" },
      { src: `${M("mouse-maze")}/shot-2.jpg`, caption: "Level select" },
      { src: `${M("mouse-maze")}/shot-4.jpg`, caption: "Victory screen" },
    ],
    tech: ["Unity", "C#", "WebGL", "DOTween", "Device Detection", "On-Screen Joystick", "Keyboard Controls"],
    links: [
      { label: "Play on itch.io", href: "https://daredevil101.itch.io/mouse-maze", external: true, kind: "itch" },
    ],
    featured: true,
  },
  {
    slug: "rise-and-roll",
    name: "Rise & Roll",
    platform: "unity",
    status: "live",
    kind: "Physics Arcade",
    tagline: "A physics-based ball-rolling game where momentum and timing carry you through the course.",
    cardDesc:
      "A physics-based ball-rolling game: swipe to roll through obstacle-filled levels, unlock skins, and climb a leaderboard.",
    role: "Lead Developer",
    roleBody:
      "I built the game end to end, from the swipe-driven physics movement and the obstacle-filled levels to the ball-skins shop and the integrated itch.io leaderboard for the WebGL release.",
    accent: "#38C172",
    poster: `${M("rise-and-roll")}/poster.png`,
    previewVideo: `${M("rise-and-roll")}/preview.mp4`,
    heroVideo: `${M("rise-and-roll")}/gameplay.mp4`,
    tags: ["Unity", "WebGL", "Physics", "Shop System", "Leaderboard"],
    metrics: [
      { num: "Physics", label: "Swipe control" },
      { num: "Levels", label: "Obstacle courses" },
      { num: "Shop", label: "+ Leaderboard" },
      { num: "Lead", label: "Developer" },
    ],
    info: [
      { k: "Role", v: "Lead Developer" },
      { k: "Studio", v: "UFD Studios" },
      { k: "Platform", v: "WebGL (Browser)" },
      { k: "Engine", v: "Unity (C#)" },
      { k: "Status", v: "Playable on itch.io" },
    ],
    overview: [
      "Rise & Roll is a WebGL ball-rolling game built in Unity and published on itch.io, playable straight from the browser. You control a ball and swipe to set it rolling, working through levels packed with obstacles that test your timing and control.",
      "The feel comes from its physics. The ball responds to your swipes with real momentum, so rolling, building speed, and threading past hazards all come down to reading the physics rather than memorizing inputs.",
      "Around the core loop is a shop for unlocking ball skins, and an itch.io leaderboard. This is one of my earlier games, so depending on itch.io's current rules the leaderboard service may no longer be live, but the system was fully built and integrated.",
    ],
    build: [
      { title: "Built end to end", body: "From physics to the shop and leaderboard.", icon: "Gamepad2" },
      { title: "Physics-based rolling", body: "Swipe to roll the ball with real momentum and weight driving every movement.", icon: "Orbit" },
      { title: "Levels & obstacles", body: "A series of levels, each introducing new obstacles to test timing and control.", icon: "Layers" },
      { title: "Ball skins shop", body: "A shop system to unlock and equip different ball skins.", icon: "ShoppingBag" },
      { title: "itch.io leaderboard", body: "Score competition through an integrated itch.io leaderboard.", icon: "Trophy" },
      { title: "WebGL, no download", body: "Runs directly in the browser on itch.io.", icon: "Globe" },
    ],
    deepDives: [
      {
        heading: "Momentum-driven movement",
        paras: [
          "What gives Rise & Roll its feel is that the ball is genuinely physics-driven. A swipe doesn't snap it to a position; it applies real momentum and weight, so the ball builds speed, carries it, and reacts to slopes and hazards the way a rolling object should.",
          "That means clearing a level is about reading the physics and timing your input, not memorizing a fixed path. Each new level layers in obstacles that push on that skill. Around the core loop, a shop lets players unlock ball skins, and an itch.io leaderboard turned each attempt into a race for the best score.",
        ],
      },
    ],
    gallery: [
      { src: `${M("rise-and-roll")}/shot-2.jpg`, caption: "Rolling down the track" },
      { src: `${M("rise-and-roll")}/shot-1.jpg`, caption: "Title screen" },
      { src: `${M("rise-and-roll")}/shot-3.jpg`, caption: "Ball skins shop" },
      { src: `${M("rise-and-roll")}/shot-4.jpg`, caption: "Level complete" },
    ],
    tech: ["Unity", "C#", "WebGL", "Physics", "Swipe Controls", "Shop System", "itch.io Leaderboard"],
    links: [
      { label: "Play on itch.io", href: "https://daredevil101.itch.io/rolling-ball-test", external: true, kind: "itch" },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const unityProjects = projects.filter((p) => p.platform === "unity");
export const robloxProjects = projects.filter((p) => p.platform === "roblox");
export const featuredProjects = projects.filter((p) => p.featured);
