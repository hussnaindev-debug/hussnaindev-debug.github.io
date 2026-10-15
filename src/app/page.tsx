import { projects } from "@/data/projects";

export default function Home() {
  return (
    <main style={{ padding: "4rem 2rem", fontFamily: "var(--font-display)" }}>
      <p className="hud-label">Phase 1 scaffold</p>
      <h1 style={{ fontSize: "2.5rem", fontWeight: 700, marginTop: "0.5rem" }}>
        Hussnain Sajjad — rebuild in progress
      </h1>
      <p style={{ color: "var(--text-2)", marginTop: "1rem" }}>
        {projects.length} projects loaded from the data file.
      </p>
    </main>
  );
}
