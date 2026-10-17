"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cyberpunk boot-sequence loader. Streams system-check lines into a
 * terminal, fills a progress bar, then reveals the site with a glitch wipe.
 * Shows on every load (so it's always experienced). Skippable once the
 * boot has run briefly. Reduced-motion -> instant, no boot screen.
 */
const BOOT_LINES = [
  "> initializing archive core ....... OK",
  "> mounting /games/roblox .......... OK",
  "> mounting /games/unity ........... OK",
  "> loading gameplay feeds .......... OK",
  "> calibrating neon shaders ........ OK",
  "> establishing uplink ............. OK",
];

export default function Loader() {
  const [show, setShow] = useState(true);
  const [pct, setPct] = useState(0);
  const [lines, setLines] = useState<number>(0);
  const [exiting, setExiting] = useState(false);
  const canSkip = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShow(false);
      return;
    }
    document.documentElement.classList.add("lenis-stopped");

    // stream boot lines
    let li = 0;
    const lineId = window.setInterval(() => {
      li += 1;
      setLines(li);
      if (li >= BOOT_LINES.length) window.clearInterval(lineId);
    }, 340);

    // fill progress bar (reaches 100 at ~2.4s)
    let p = 0;
    const barId = window.setInterval(() => {
      p += Math.max(1.5, (100 - p) * 0.06) + Math.random() * 2.5;
      if (p >= 100) {
        p = 100;
        window.clearInterval(barId);
        setTimeout(finish, 480);
      }
      setPct(Math.floor(p));
    }, 80);

    // allow skipping only after it's had a moment on screen
    const skipTimer = window.setTimeout(() => { canSkip.current = true; }, 900);

    const finish = () => {
      setExiting(true);
      setTimeout(() => {
        setShow(false);
        document.documentElement.classList.remove("lenis-stopped");
      }, 700);
    };

    const skip = () => {
      if (!canSkip.current) return;
      window.clearInterval(barId);
      window.clearInterval(lineId);
      setPct(100);
      setLines(BOOT_LINES.length);
      finish();
    };
    window.addEventListener("keydown", skip);
    window.addEventListener("click", skip);

    return () => {
      window.clearInterval(barId);
      window.clearInterval(lineId);
      window.clearTimeout(skipTimer);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("click", skip);
      document.documentElement.classList.remove("lenis-stopped");
    };
  }, []);

  if (!show) return null;

  return (
    <div className={`loader${exiting ? " is-exit" : ""}`} role="status" aria-label="Loading">
      <div className="loader-grid" aria-hidden />
      <div className="loader-inner">
        <div className="loader-logo hud-frame">
          <span className="loader-mark glitch" data-text="HS">HS</span>
        </div>
        <p className="hud-label loader-tag">Hussnain Sajjad · Game Developer Archive</p>

        {/* terminal boot log */}
        <div className="loader-term" aria-hidden>
          {BOOT_LINES.slice(0, lines).map((l) => (
            <div className="loader-term-line" key={l}>{l}</div>
          ))}
          {lines < BOOT_LINES.length && <span className="loader-caret" />}
        </div>

        <div className="loader-bar" aria-hidden>
          <div className="loader-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="loader-meta">
          <span className="hud-label">Booting systems</span>
          <span className="loader-pct">{pct}%</span>
        </div>

        <p className={`loader-start${pct >= 100 ? " is-ready" : ""}`}>
          {pct >= 100 ? "PRESS START" : " "}
        </p>
      </div>
    </div>
  );
}
