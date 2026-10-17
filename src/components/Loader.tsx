"use client";

import { useEffect, useRef, useState } from "react";

/**
 * "PRESS START" boot loader. Fills a progress bar, then reveals the site.
 * Shows once per browser session (sessionStorage). Skippable by click/key.
 * Reduced-motion or already-seen -> instant, no boot screen.
 */
export default function Loader() {
  const [show, setShow] = useState(false);
  const [pct, setPct] = useState(0);
  const [exiting, setExiting] = useState(false);
  const ready = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("booted") === "1";
    if (reduce || seen) return;

    // one-shot: boot screen shows only after reading sessionStorage + reduced-motion (client-only)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShow(true);
    document.documentElement.classList.add("lenis-stopped"); // lock scroll during boot
    ready.current = true;

    let p = 0;
    const id = window.setInterval(() => {
      // ease toward 100 with a little randomness, like a loading bar
      p += Math.max(1, (100 - p) * 0.08) + Math.random() * 3;
      if (p >= 100) {
        p = 100;
        window.clearInterval(id);
        setTimeout(finish, 350);
      }
      setPct(Math.floor(p));
    }, 90);

    const finish = () => {
      setExiting(true);
      setTimeout(() => {
        setShow(false);
        document.documentElement.classList.remove("lenis-stopped");
        sessionStorage.setItem("booted", "1");
      }, 650);
    };

    const skip = () => {
      if (!ready.current) return;
      window.clearInterval(id);
      setPct(100);
      finish();
    };
    window.addEventListener("keydown", skip);
    window.addEventListener("click", skip);

    return () => {
      window.clearInterval(id);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("click", skip);
      document.documentElement.classList.remove("lenis-stopped");
    };
  }, []);

  if (!show) return null;

  return (
    <div className={`loader${exiting ? " is-exit" : ""}`} role="status" aria-label="Loading">
      <div className="loader-inner">
        <div className="loader-logo hud-frame">
          <span className="loader-mark">HS</span>
        </div>
        <p className="hud-label loader-tag">Hussnain Sajjad · Game Developer Archive</p>

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
