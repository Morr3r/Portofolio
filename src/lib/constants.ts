import type { InteractiveObjectId, SectionId } from "@/lib/portfolio-data";

export const COLORS = {
  background: "#050510",
  surface: "#11111f",
  accentBlue: "#4f8cff",
  accentPurple: "#9b5cff",
  warmLight: "#ffb86b",
  text: "#f5f7ff",
  mutedText: "#9ca3af"
} as const;

export const SECTION_OBJECT_MAP: Record<SectionId, InteractiveObjectId> = {
  intro: "room",
  about: "poster",
  skills: "whiteboard",
  projects: "laptop",
  experience: "arcade",
  contact: "phone"
};

export const OBJECT_SECTION_MAP: Record<InteractiveObjectId, SectionId> = {
  room: "intro",
  poster: "about",
  whiteboard: "skills",
  laptop: "projects",
  arcade: "experience",
  phone: "contact"
};

export const DESKTOP_BREAKPOINT = 760;

