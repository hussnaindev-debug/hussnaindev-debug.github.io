"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import { pageview } from "@vercel/analytics";

/**
 * Vercel Web Analytics, tuned for this site.
 *
 * The project is on the Hobby plan, where custom events (track()) are not
 * recorded, only page views. So everything worth measuring is reported as a
 * page view with its own path, and shows up under Pages in the dashboard:
 *   /game/<slug>              a case-study popup was opened (?game=<slug>)
 *   /clip/<id>                a clip was opened in the viewer (?clip=<id>)
 *   /out/<target>[/<game>]    an outbound click: roblox, google-play, itch,
 *                             email, linkedin, paper (game = which case study)
 * Without this, popups and clips would all count as one view of "/".
 */
const OUTBOUND: [RegExp, string][] = [
  [/roblox\.com/, "roblox"],
  [/play\.google\.com/, "google-play"],
  [/itch\.io/, "itch"],
  [/linkedin\.com/, "linkedin"],
  [/^mailto:|mail\.google\.com/, "email"],
  [/journal\.50sea\.com/, "paper"],
];

export default function SiteAnalytics() {
  const pathname = usePathname();
  const params = useSearchParams();
  const game = pathname === "/" ? params.get("game") : null;
  const clip = pathname === "/" ? params.get("clip") : null;

  // Opening a popup or clip counts as its own view. Closing one does not
  // re-count the homepage: the page itself is tracked once, by pathname.
  useEffect(() => {
    if (game) pageview({ route: "/game/[slug]", path: `/game/${game}` });
    else if (clip) pageview({ route: "/clip/[id]", path: `/clip/${clip}` });
  }, [game, clip]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (!/^(https?:|mailto:)/.test(href) || href.startsWith(window.location.origin)) return;
      const hit = OUTBOUND.find(([re]) => re.test(href));
      const target = a.dataset.analytics || (hit ? hit[1] : "external");
      const inGame = a.closest("[data-game]")?.getAttribute("data-game");
      pageview(
        inGame
          ? { route: "/out/[target]/[game]", path: `/out/${target}/${inGame}` }
          : { route: "/out/[target]", path: `/out/${target}` }
      );
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return <Analytics framework="next" route={pathname} path={pathname} />;
}
