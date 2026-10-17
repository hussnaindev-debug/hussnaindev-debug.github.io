import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, Sparkles, MapPin, Check, FileText, Mail, Terminal,
  Swords, Bot, Boxes, Gauge, Coins, Cpu,
} from "lucide-react";
import ParticleField from "@/components/ParticleField";
import VideoThumb from "@/components/VideoThumb";
import GameCard from "@/components/GameCard";
import Reveal from "@/components/Reveal";
import { getProject, robloxProjects, unityProjects } from "@/data/projects";
import { LinkedinIcon } from "@/components/BrandIcons";

const MAIL =
  "https://mail.google.com/mail/?view=cm&fs=1&to=hussnain.devcodes@gmail.com&su=Let%27s%20work%20together";
const LINKEDIN = "https://www.linkedin.com/in/hussnain-sajjad-4129302b7";

const heroGame = getProject("bloom-prison")!;
// Roblox flagship leads its grid; the rest follow.
const robloxFlagship = getProject("bloom-prison")!;
const robloxRest = robloxProjects.filter((p) => p.slug !== robloxFlagship.slug);

export default function Home() {
  return (
    <main id="main">
      {/* ============ HERO ============ */}
      <section className="hero" id="home">
        <ParticleField />
        <div className="hero-glow" aria-hidden />
        <div className="container hero-inner">
          <Reveal className="hero-copy">
            <span className="hud-label hero-eyebrow">{"// Independent Game Developer · Gameplay Programmer"}</span>
            <h1 className="hero-title">
              I build <span className="neon glitch" data-text="worlds">worlds</span>.<br />
              I engineer the <span className="neon-mag">gameplay</span>.
            </h1>
            <p className="hero-lead">
              Hussnain Sajjad — I build gameplay systems, games, and interactive experiences
              across Unity/C# and Roblox/Luau, from prototype to production.
            </p>
            <div className="hero-cta">
              <Link className="btn btn-primary" href="#roblox" data-cursor="VIEW">
                Explore all games <ArrowRight size={18} />
              </Link>
              <a className="btn btn-ghost" href={MAIL} target="_blank" rel="noopener" data-cursor="EMAIL">
                <Terminal size={16} /> Contact / Transmission
              </a>
            </div>
            <div className="hero-stack">
              <span>Unity / C#</span><i>/</i><span>Roblox / Luau</span><i>/</i><span>Gameplay Systems</span>
            </div>
          </Reveal>

          <Reveal delay={120} className="hero-media">
            <div className="holo hud-frame">
              <div className="holo-bar">
                <span className="holo-dot" /><span className="holo-dot" /><span className="holo-dot" />
                <span className="holo-file">{heroGame.name.toUpperCase()}.FEED</span>
                <span className="holo-live"><span className="stat-dot" /> LIVE</span>
              </div>
              <div className="holo-screen">
                <VideoThumb src={heroGame.previewVideo} poster={heroGame.cover || heroGame.poster} alt={`${heroGame.name} gameplay`} />
                <span className="holo-scan" aria-hidden />
              </div>
              <div className="holo-meta">
                <span>{"// ENGINE: Roblox Studio"}</span>
                <span>{"// LANG: Luau"}</span>
                <span>{"// STATUS: In Development"}</span>
              </div>
            </div>
          </Reveal>
        </div>
        <div className="hero-scroll hud-label" aria-hidden>Scroll ↓</div>
      </section>

      {/* ============ ROBLOX ARCHIVE ============ */}
      <section className="section archive" id="roblox">
        <div className="container">
          <Reveal className="section-head">
            <span className="section-index">{"// THE GAME ARCHIVE · 01"}</span>
            <h2 className="section-title neon">Roblox <span className="st-sub">{"// Live Experiences"}</span></h2>
            <div className="arch-tags">
              <span className="hud-label">Platform: Roblox Studio</span>
              <span className="hud-label">Language: Luau</span>
              <span className="hud-label">{robloxProjects.length} Projects</span>
            </div>
          </Reveal>

          {/* flagship */}
          <Reveal>
            <article className="flagship hud-frame" style={{ ["--pc" as string]: robloxFlagship.accent }}>
              <div className="flagship-media">
                <VideoThumb src={robloxFlagship.previewVideo} poster={robloxFlagship.cover || robloxFlagship.poster} alt={`${robloxFlagship.name} gameplay`} />
                <span className="flagship-scrim" aria-hidden />
                <span className="flagship-tag"><Sparkles size={13} /> Flagship · In Development</span>
              </div>
              <div className="flagship-body">
                <span className="hud-label">Roblox · Luau · Roguelike Action</span>
                <h3 className="flagship-name">{robloxFlagship.name}</h3>
                <p className="flagship-desc">{robloxFlagship.cardDesc}</p>
                <div className="g-tags">
                  {robloxFlagship.tags.slice(0, 5).map((t) => <span className="chip" key={t}>{t}</span>)}
                </div>
                <div className="g-links">
                  <Link className="link-btn primary" href={`/projects/${robloxFlagship.slug}`} data-cursor="VIEW">
                    View project <ArrowUpRight size={15} />
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>

          {/* rest of roblox */}
          <div className="game-grid">
            {robloxRest.map((p, i) => (
              <Reveal key={p.slug} delay={i * 60}><GameCard project={p} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ UNITY ARCHIVE ============ */}
      <section className="section archive alt" id="unity">
        <div className="container">
          <Reveal className="section-head">
            <span className="section-index">{"// THE GAME ARCHIVE · 02"}</span>
            <h2 className="section-title neon-mag">Unity <span className="st-sub">{"// Built in C#"}</span></h2>
            <div className="arch-tags">
              <span className="hud-label">Platform: Unity Engine</span>
              <span className="hud-label">Language: C#</span>
              <span className="hud-label">{unityProjects.length} Projects</span>
            </div>
          </Reveal>
          <div className="game-grid">
            {unityProjects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 60}><GameCard project={p} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SKILLS MATRIX ============ */}
      <section className="section hud-grid" id="systems">
        <div className="container">
          <Reveal className="section-head">
            <span className="section-index">{"// TECHNICAL CAPABILITIES"}</span>
            <h2 className="section-title">Systems I engineer.</h2>
          </Reveal>
          <div className="matrix">
            {[
              { icon: <Swords size={18} />, title: "Combat & Gameplay", items: ["Free-flow combat", "Weapon abilities", "Hit detection", "Game loops"], proj: "Bloom Prison" },
              { icon: <Bot size={18} />, title: "AI & Game Logic", items: ["Enemy AI", "Boss behaviours", "Spawning", "State machines"], proj: "Bloom Prison" },
              { icon: <Boxes size={18} />, title: "Progression & Inventory", items: ["XP & unlocks", "Inventory", "Shops", "Save data"], proj: "Steal a Viral Squishy" },
              { icon: <Coins size={18} />, title: "Economy & Monetization", items: ["IAP", "Ads", "In-game economy", "Rebirth loops"], proj: "Fall for Brainrot" },
              { icon: <Gauge size={18} />, title: "Performance & Optimization", items: ["Profiling", "Draw-call budgets", "Streaming", "Mobile perf"], proj: "Roll Down" },
              { icon: <Cpu size={18} />, title: "Gameplay Programming", items: ["Unity / C#", "Roblox / Luau", "Physics", "Platform integration"], proj: "4 Reaction" },
            ].map((m, i) => (
              <Reveal key={m.title} delay={i * 50}>
                <div className="matrix-card hud-frame">
                  <div className="matrix-head"><span className="mx-ico">{m.icon}</span><h3>{m.title}</h3></div>
                  <ul>{m.items.map((it) => <li key={it}>{it}</li>)}</ul>
                  <div className="matrix-proj"><span className="hud-label">Proven in</span> {m.proj}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ EXPERIENCE ============ */}
      <section className="section" id="experience">
        <div className="container">
          <Reveal className="section-head">
            <span className="section-index">{"// PROFESSIONAL HISTORY"}</span>
            <h2 className="section-title">Where I&apos;ve shipped games.</h2>
          </Reveal>
          <div className="exp-list">
            {[
              { date: "2026 — Present", current: true, co: "ZhenStudio", role: "Roblox Game Developer", tags: "Gameplay · UI · Weapons · Cutscenes · Performance", metric: "155K+ visits" },
              { date: "2024 — 2025", co: "UFD Studios", role: "Junior Unity Game Developer", tags: "Mobile · WebGL · IAP · Ads · Analytics", metric: "55K+ installs" },
              { date: "2024", co: "AIRIDev", role: "Unity 3D Developer Intern", tags: "Gameplay · Physics · Optimization", metric: "Internship" },
            ].map((e, i) => (
              <Reveal key={e.co} delay={i * 60}>
                <div className="exp-row hud-frame">
                  <div className={`er-date${e.current ? " er-current" : ""}`}>{e.date}</div>
                  <div>
                    <div className="er-co">{e.co}</div>
                    <div className="er-role">{e.role}</div>
                    <div className="er-tags">{e.tags}</div>
                  </div>
                  <span className="er-metric">{e.metric}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section className="section" id="about">
        <div className="container">
          <Reveal className="section-head">
            <span className="section-index">{"// OPERATOR PROFILE"}</span>
            <h2 className="section-title">About.</h2>
          </Reveal>
          <Reveal className="about-lite">
            <p>
              I&apos;m a game developer working across Unity/C# and Roblox/Luau. I enjoy building the
              systems behind a game, from player controls and combat to progression, monetization,
              and platform integration, then optimizing and polishing until it ships.
            </p>
            <div className="about-facts">
              <span className="about-fact"><MapPin size={16} /> Based in Pakistan</span>
              <span className="about-fact"><Check size={16} /> Available for remote work</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ RESEARCH ============ */}
      <section className="section" id="research">
        <div className="container">
          <Reveal className="section-head">
            <span className="section-index">{"// RESEARCH / EXPERIMENTAL WORK"}</span>
            <h2 className="section-title">Beyond games.</h2>
          </Reveal>
          <Reveal className="pub hud-frame">
            <div className="pub-icon"><FileText size={22} /></div>
            <div>
              <h3>Meta-Space: Pioneering Education in the Metaverse</h3>
              <div className="pub-venue">Unreal Engine 4 · MetaHuman · Agora · IJIST, UET Peshawar</div>
              <p>
                My final-year research project: an immersive virtual classroom built in Unreal Engine 4,
                with MetaHuman avatars for presence and Agora SDK for real-time voice and file sharing.
              </p>
              <a className="link-btn primary" href="https://journal.50sea.com/index.php/IJIST/article/view/768" target="_blank" rel="noopener" data-cursor="OPEN">
                <FileText size={16} /> Read the paper <ArrowRight size={15} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ CONTACT / TRANSMISSION ============ */}
      <section className="section" id="contact">
        <div className="container">
          <Reveal className="contact-term hud-frame">
            <div className="term-bar">
              <span className="holo-dot" /><span className="holo-dot" /><span className="holo-dot" />
              <span className="term-title">transmission@hussnain:~</span>
            </div>
            <div className="term-body">
              <p className="term-line"><span className="term-prompt">$</span> open_connection --to &quot;hussnain-sajjad&quot;</p>
              <h2 className="term-head">Ready to build something?</h2>
              <p className="term-sub">
                Open to game development roles, freelance projects, and interesting collaborations.
              </p>
              <div className="contact-actions">
                <a className="btn btn-primary" href={MAIL} target="_blank" rel="noopener" data-analytics="contact_click" data-cursor="EMAIL">
                  <Mail size={18} /> Email me
                </a>
                <a className="btn btn-ghost" href={LINKEDIN} target="_blank" rel="noopener" data-analytics="contact_click" data-cursor="OPEN">
                  <LinkedinIcon size={18} /> LinkedIn
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
