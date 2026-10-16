import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // CSS/Tailwind handled via PostCSS (postcss.config.mjs). The old Turbopack
  // *.css rule was removed: on Vercel's build image it collided with the
  // next/font/google loader (`@vercel/turbopack-next/internal/font/google/font`
  // not found). PostCSS works under both dev-Turbopack and the Vercel build.
};

export default nextConfig;
