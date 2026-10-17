"use client";

import { useEffect, useState } from "react";

// Renders the current year, updated on the client so it stays dynamic
// without tripping PPR's "unstable new Date()" prerender guard.
// SSR falls back to a sensible constant that the client corrects on mount.
const FALLBACK = 2026;

export default function Year() {
  const [year, setYear] = useState(FALLBACK);
  useEffect(() => {
    // Intentional: read the real current year on the client after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setYear(new Date().getFullYear());
  }, []);
  return <>{year}</>;
}
