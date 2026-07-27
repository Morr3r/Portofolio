"use client";

import { create } from "zustand";
import { SECTION_OBJECT_MAP } from "@/lib/constants";
import type { InteractiveObjectId, SectionId } from "@/lib/portfolio-data";

export type QualityMode = "cinematic" | "performance";

type PortfolioState = {
  activeSection: SectionId;
  hoveredObjectId: InteractiveObjectId | null;
  selectedObjectId: InteractiveObjectId | null;
  isPanelOpen: boolean;
  isTransitioning: boolean;
  quality: QualityMode;
  audioEnabled: boolean;
  hasEntered: boolean;
  setHoveredObject: (objectId: InteractiveObjectId | null) => void;
  selectObject: (objectId: InteractiveObjectId, section: SectionId) => void;
  openSection: (section: SectionId) => void;
  resetView: () => void;
  setTransitioning: (isTransitioning: boolean) => void;
  toggleQuality: () => void;
  toggleAudio: () => void;
  enterExperience: () => void;
};

export const usePortfolioStore = create<PortfolioState>((set) => ({
  activeSection: "intro",
  hoveredObjectId: null,
  selectedObjectId: null,
  isPanelOpen: false,
  isTransitioning: false,
  quality: "cinematic",
  audioEnabled: false,
  hasEntered: false,
  setHoveredObject: (objectId) => set({ hoveredObjectId: objectId }),
  selectObject: (objectId, section) =>
    set({
      activeSection: section,
      selectedObjectId: objectId,
      isPanelOpen: section !== "intro",
      hasEntered: true
    }),
  openSection: (section) =>
    set({
      activeSection: section,
      selectedObjectId: section === "intro" ? null : SECTION_OBJECT_MAP[section],
      isPanelOpen: section !== "intro",
      hasEntered: true
    }),
  resetView: () =>
    set({
      activeSection: "intro",
      hoveredObjectId: null,
      selectedObjectId: null,
      isPanelOpen: false
    }),
  setTransitioning: (isTransitioning) => set({ isTransitioning }),
  toggleQuality: () =>
    set((state) => ({
      quality: state.quality === "cinematic" ? "performance" : "cinematic"
    })),
  toggleAudio: () => set((state) => ({ audioEnabled: !state.audioEnabled })),
  enterExperience: () => set({ hasEntered: true })
}));
