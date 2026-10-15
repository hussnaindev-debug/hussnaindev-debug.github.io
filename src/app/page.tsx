import Link from "next/link";
import {
  ArrowRight, Smartphone, Gamepad2, Gauge, Settings2, Sparkles,
  MapPin, Check, FileText, Mail,
} from "lucide-react";
import ParticleField from "@/components/ParticleField";
import VideoThumb from "@/components/VideoThumb";
import Reveal from "@/components/Reveal";
import { getProject } from "@/data/projects";
import { LinkedinIcon } from "@/components/BrandIcons";

const MAIL =
  "https://mail.google.com/mail/?view=cm&fs=1&to=hussnain.devcodes@gmail.com&su=Let%27s%20work%20together";
const LINKEDIN = "https://www.linkedin.com/in/hussnain-sajjad-4129302b7";

const unityFeatured = getProject("four-reaction")!;
const robloxFeatured = getProject("bloom-prison")!;

export default function Home() {
  return (
    <main id="main">
      {/* ============ HERO ============ */}
      <section className="hero" id="home">
        <ParticleField />
        <div className="hero-glow" aria-hidden />
        <div className="container hero-inner">
          <Reveal>
            <span className="hud-label hero-eyebrow">// Game Developer</span>
            <h1 className="hero-title">
              Game developer building <span className="grad">gameplay that ships</span>.
            </h1>
            <p className="hero-lead">
              I build gameplay systems, games, and interactive experiences across Unity and Roblox.
            </p>
            <div className="hero-cta">
              <Link className="btn btn-primary" href="#work" data-cursor="VIEW">
                Explore my work <ArrowRight size={18} />
              </Link>
              <a className="btn btn-ghost" href={MAIL} target="_blank" rel="noopener" data-cursor="EMAIL">
                Let&apos;s Talk
              </a>
            </div>
            <div className="hero-stack">
              <span>Unity / C#</span><i>·</i><span>Roblox / Luau</span>
            </div>
          </Reveal>
        </div>
        <div className="hero-scroll hud-label" aria-hidden>Scroll ↓</div>
      </section>

      {/* ============ EXPLORE / TWO DOORS ============ */}
      <section className="section" id="work">
        <div className="container">
          <Reveal className="section-head">
            <span className="section-index">01 // Explore my work</span>
            <h2 className="section-title">Two platforms. One focus: building games people play.</h2>
          </Reveal>

          <div className="platforms">
            <Reveal>
              <Link className="platform-card" href="/unity" data-analytics="platform_unity_click" data-cursor="OPEN" style={{ ["--pc" as string]: unityFeatured.accent }}>
                <div className="platform-media hud-frame">
                  <span className="platform-badge"><Smartphone size={14} /> Unity / C#</span>
                  <VideoThumb src={unityFeatured.previewVideo} poster={unityFeatured.poster} alt="Unity work preview" />
                  <span className="platform-scrim" aria-hidden />
                </div>
                <div className="platform-body">
                  <span className="hud-label">Unity / C#</span>
                  <h3 className="platform-name">Unity</h3>
                  <p className="platform-sub">Mobile · WebGL · Gameplay Systems</p>
                  <span className="platform-link">Explore Unity work <ArrowRight size={18} /></span>
                </div>
              </Link>
            </Reveal>

            <Reveal delay={80}>
              <Link className="platform-card" href="/roblox" data-analytics="platform_roblox_click" data-cursor="OPEN" style={{ ["--pc" as string]: robloxFeatured.accent }}>
                <div className="platform-media hud-frame">
                  <span className="platform-badge"><Gamepad2 size={14} /> Roblox / Luau</span>
                  <VideoThumb src={robloxFeatured.previewVideo} poster={robloxFeatured.poster} alt="Roblox work preview" />
                  <span className="platform-scrim" aria-hidden />
                </div>
                <div className="platform-body">
                  <span className="hud-label">Roblox / Luau</span>
                  <h3 className="platform-name">Roblox</h3>
                  <p className="platform-sub">Live Experiences · Combat · Game Systems</p>
                  <span className="platform-link">Explore Roblox work <ArrowRight size={18} /></span>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ CURRENTLY BUILDING ============ */}
      <section className="section" id="building">
        <div className="container">
          <Reveal>
            <Link className="building-strip" href="/projects/bloom-prison" data-analytics="bloom_prison_click" data-cursor="VIEW">
              <div className="bs-label"><Sparkles size={14} /> Currently building</div>
              <div className="bs-main">
                <div className="bs-name">Bloom Prison <span className="bs-meta">Roblox · Early Development</span></div>
                <p className="bs-desc">Building free-flow combat, enemy AI, weapon abilities, and randomized points of interest.</p>
              </div>
              <span className="bs-cta">View project <ArrowRight size={16} /></span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============ WHAT I BUILD ============ */}
      <section className="section hud-grid" id="build">
        <div className="container">
          <Reveal className="section-head">
            <span className="section-index">02 // What I build</span>
            <h2 className="section-title">I build the systems behind the game.</h2>
          </Reveal>
          <div className="build-cols">
            {[
              { icon: <Gamepad2 size={18} />, title: "Gameplay", items: ["Controls", "Combat", "Physics", "AI", "Game loops"] },
              { icon: <Settings2 size={18} />, title: "Systems", items: ["Progression", "Inventory", "Shops", "Unlocks", "Leaderboards"] },
              { icon: <Gauge size={18} />, title: "Shipping", items: ["IAP", "Ads", "Analytics", "Optimization", "Platform integration"] },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 70}>
                <div className="build-col hud-frame">
                  <div className="build-col-head"><span className="bc-ico">{c.icon}</span><h3>{c.title}</h3></div>
                  <ul>{c.items.map((it) => <li key={it}>{it}</li>)}</ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROOF ============ */}
      <section className="section" id="proof">
        <div className="container">
          <Reveal className="section-head"><h2 className="section-title">Built for real players.</h2></Reveal>
          <Reveal className="proof-grid">
            {[
              { num: "6+", label: "Shipped games" },
              { num: "155K+", label: "Roblox visits" },
              { num: "3", label: "Studios" },
              { num: "5K+", label: "4 Reaction installs" },
            ].map((s) => (
              <div className="proof-cell" key={s.label}>
                <div className="p-num">{s.num}</div>
                <div className="p-label">{s.label}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ============ EXPERIENCE ============ */}
      <section className="section" id="experience">
        <div className="container">
          <Reveal className="section-head">
            <span className="section-index">03 // Experience</span>
            <h2 className="section-title">Where I&apos;ve shipped games.</h2>
          </Reveal>
          <div className="exp-list">
            {[
              { date: "2026 — Present", current: true, co: "ZhenStudio", role: "Roblox Game Developer", tags: "Gameplay · UI · Weapons · Cutscenes · Performance", metric: "155K+ visits" },
              { date: "2024 — 2025", co: "UFD Studios", role: "Junior Unity Game Developer", tags: "Mobile · WebGL · IAP · Ads · Analytics", metric: "55K+ installs" },
              { date: "2024", co: "AIRIDev", role: "Unity 3D Developer Intern", tags: "Gameplay · Physics · Optimization", metric: "Internship" },
            ].map((e, i) => (
              <Reveal key={e.co} delay={i * 60}>
                <div className="exp-row">
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

      {/* ============ HOW I WORK ============ */}
      <section className="section" id="how">
        <div className="container">
          <Reveal className="section-head">
            <span className="section-index">04 // How I work</span>
            <h2 className="section-title">From prototype to production.</h2>
          </Reveal>
          <Reveal>
            <div className="flow">
              {["Prototype", "Build", "Test", "Polish", "Ship"].map((step, i) => (
                <span className="flow-step" key={step}>
                  <span className="step-n">{String(i + 1).padStart(2, "0")}</span> {step}
                  {i < 4 && <ArrowRight className="flow-arrow" size={16} />}
                </span>
              ))}
            </div>
            <p className="how-text">
              I like getting a playable version working early, then iterating on the systems, feel,
              performance, and polish that turn a prototype into a shippable game.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section className="section" id="about">
        <div className="container">
          <Reveal className="section-head">
            <span className="section-index">05 // About</span>
            <h2 className="section-title">A bit about me.</h2>
          </Reveal>
          <Reveal className="about-lite">
            <p>
              I&apos;m a game developer working across Unity/C# and Roblox/Luau. I enjoy building the
              systems behind a game, from player controls and combat to progression, monetization,
              and platform integration.
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
            <span className="section-index">06 // Beyond game development</span>
            <h2 className="section-title">Research.</h2>
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
              <a className="link-btn" href="https://journal.50sea.com/index.php/IJIST/article/view/768" target="_blank" rel="noopener" data-cursor="OPEN">
                <FileText size={16} /> Read the paper <ArrowRight size={15} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section className="section" id="contact">
        <div className="container">
          <Reveal className="contact-wrap hud-frame">
            <span className="hud-label">07 // Contact</span>
            <h2>Have a game in mind?</h2>
            <p>I&apos;m open to game development roles, freelance projects, and interesting collaborations.</p>
            <div className="contact-actions">
              <a className="btn btn-primary" href={MAIL} target="_blank" rel="noopener" data-analytics="contact_click" data-cursor="EMAIL">
                <Mail size={18} /> Email me
              </a>
              <a className="btn btn-ghost" href={LINKEDIN} target="_blank" rel="noopener" data-analytics="contact_click" data-cursor="OPEN">
                <LinkedinIcon size={18} /> LinkedIn
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
