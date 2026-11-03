/**
 * VFX + animation clips. Single source of truth for the homepage slideshow,
 * the clip library and the clip viewer.
 *
 * To add a clip: put its files in /public/media/clips/<id>/
 *   clip.mp4   full clip, muted, faststart (viewer + slideshow)
 *   thumb.mp4  ~640px wide loop for the library tile; cut it to the part
 *              where the effect plays so the tile is never a plain idle pose
 *   poster.jpg frame where the effect is at its peak
 * then add an entry below. `ratio` drives the tile shape (16/9, 9/16, 1/1, 4/5).
 */

export type ClipKind = "vfx" | "animation";

export interface Clip {
  id: string;
  title: string;
  set: string; // the kit or project this clip belongs to
  desc: string;
  kinds: ClipKind[]; // a clip can count as both
  ratio: "16/9" | "9/16" | "1/1" | "4/5";
  duration: number; // seconds
  tools: string[];
  note?: string;
  src: string;
  thumb: string;
  poster: string;
}

const C = (id: string) => ({
  src: `/media/clips/${id}/clip.mp4`,
  thumb: `/media/clips/${id}/thumb.mp4`,
  poster: `/media/clips/${id}/poster.jpg`,
});

const HEIZOU = {
  set: "Heizou combat kit",
  kinds: ["animation", "vfx"] as ClipKind[],
  ratio: "16/9" as const,
  tools: ["Animation: Blender", "VFX: Roblox Studio"],
  note: "Animated in Blender, VFX built in Roblox Studio. Plays the animation clean first, then with the wind VFX.",
};

export const clips: Clip[] = [
  { id: "heizou-skill", title: "Skill: Charged Burst", desc: "A hold-to-charge skill that releases as a dashing burst. Holding the button freezes the pose, release fires it.", duration: 8.0, ...HEIZOU, ...C("heizou-skill") },
  { id: "heizou-burst", title: "Ultimate: Air Ball", desc: "A jumping kick that launches an air ball, with the landing timed on separate left and right foot markers.", duration: 6.0, ...HEIZOU, ...C("heizou-burst") },
  { id: "heizou-charged", title: "Charged Attack", desc: "A punch into a rising slash with a hop out. Two hits, a dash and three landings in two seconds.", duration: 6.1, ...HEIZOU, ...C("heizou-charged") },
  { id: "heizou-attack-1", title: "Combo 1: Stepping Punch", desc: "The combo opener: a stepping punch. Each attack starts in the last one's end pose, so 1 to 5 chain cleanly.", duration: 3.0, ...HEIZOU, ...C("heizou-attack-1") },
  { id: "heizou-attack-2", title: "Combo 2: Elbow", desc: "An elbow strike that chains straight out of the opening punch.", duration: 3.2, ...HEIZOU, ...C("heizou-attack-2") },
  { id: "heizou-attack-3", title: "Combo 3: Kick and Sweep", desc: "A kick into a jumping leg sweep that hits all around him.", duration: 3.5, ...HEIZOU, ...C("heizou-attack-3") },
  { id: "heizou-attack-4", title: "Combo 4: Triple Kick", desc: "A three-kick flurry from a planted stance, one hit marker per kick.", duration: 4.4, ...HEIZOU, ...C("heizou-attack-4") },
  { id: "heizou-attack-5", title: "Combo 5: Finisher", desc: "The combo finisher: a leaping kick into a spinning sweep.", duration: 4.8, ...HEIZOU, ...C("heizou-attack-5") },
];

export const clipLength = (s: number) => `0:${String(Math.round(s)).padStart(2, "0")}`;
