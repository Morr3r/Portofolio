import type { SectionId } from "@/lib/portfolio-data";

export type VectorTuple = [number, number, number];

export type CameraTargetConfig = {
  position: VectorTuple;
  target: VectorTuple;
  label: string;
};

export const cameraTargets: Record<SectionId, CameraTargetConfig> = {
  intro: {
    label: "Room overview",
    position: [-4.95, 3.85, 5.45],
    target: [0.04, 1.08, -0.34]
  },
  about: {
    label: "About frames",
    position: [-3.25, 2.65, 3.05],
    target: [-1.08, 1.6, -2.35]
  },
  skills: {
    label: "Skill whiteboard",
    position: [-3.45, 2.72, 2.95],
    target: [-2.18, 1.55, -2.28]
  },
  projects: {
    label: "Project laptop",
    position: [-2.65, 2.34, 3.05],
    target: [-0.28, 0.98, -1.65]
  },
  experience: {
    label: "Arcade cabinet",
    position: [-2.15, 2.55, 3.35],
    target: [2.08, 0.9, -0.35]
  },
  contact: {
    label: "Contact cube",
    position: [-2.95, 2.32, 4.15],
    target: [1.42, 0.55, 1.35]
  }
};
