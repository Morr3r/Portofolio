"use client";

import type { CSSProperties } from "react";
import { useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { BackButton } from "@/components/ui/BackButton";
import { ContentPanel } from "@/components/ui/ContentPanel";
import { SECTION_OBJECT_MAP } from "@/lib/constants";
import type { SectionId } from "@/lib/portfolio-data";
import { usePortfolioStore } from "@/lib/usePortfolioStore";

const roomNavItems = [
  { section: "about", label: "ABOUT ME", accent: "#9b5cff" },
  { section: "projects", label: "PROJECTS", accent: "#6ee7ff" },
  { section: "experience", label: "ARCADE MACHINE", accent: "#ff5a45" },
  { section: "skills", label: "WHITEBOARD", accent: "#4f8cff" },
  { section: "contact", label: "RUBIK'S CUBE", accent: "#f6d34d" }
] satisfies { accent: string; label: string; section: SectionId }[];

function playTone(enabled: boolean) {
  if (!enabled) {
    return;
  }

  const AudioContextClass =
    window.AudioContext ||
    (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

  if (!AudioContextClass) {
    return;
  }

  const context = new AudioContextClass();
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = "sine";
  oscillator.frequency.value = 520;
  gain.gain.setValueAtTime(0.0001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.045, context.currentTime + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.16);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + 0.18);
}

export function Hud() {
  const activeSection = usePortfolioStore((state) => state.activeSection);
  const audioEnabled = usePortfolioStore((state) => state.audioEnabled);
  const enterExperience = usePortfolioStore((state) => state.enterExperience);
  const hasEntered = usePortfolioStore((state) => state.hasEntered);
  const openSection = usePortfolioStore((state) => state.openSection);
  const toggleAudio = usePortfolioStore((state) => state.toggleAudio);

  const handleOpenSection = useCallback(
    (section: SectionId) => {
      playTone(audioEnabled);
      openSection(section);
    },
    [audioEnabled, openSection]
  );

  const handleStart = () => {
    playTone(audioEnabled);
    enterExperience();
  };

  const handleToggleAudio = () => {
    toggleAudio();
    playTone(!audioEnabled);
  };

  return (
    <div className={hasEntered ? "room-hud" : "room-hud room-hud-start"}>
      {!hasEntered ? (
        <button className="start-ring" type="button" onClick={handleStart} aria-label="Start portfolio room">
          <span>START</span>
        </button>
      ) : (
        <>
          <nav className="room-nav" aria-label="Room objects">
            {roomNavItems.map((item) => (
              <button
                aria-current={activeSection === item.section ? "page" : undefined}
                className={activeSection === item.section ? "active" : ""}
                key={item.section}
                onClick={() => handleOpenSection(item.section)}
                style={{ "--nav-accent": item.accent } as CSSProperties}
                type="button"
              >
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <BackButton />
          <ContentPanel />
          <span className="selected-anchor" aria-hidden="true">
            {SECTION_OBJECT_MAP[activeSection]}
          </span>
        </>
      )}

      <div className="hud-actions scene-audio" aria-label="Scene audio">
        <button
          type="button"
          onClick={handleToggleAudio}
          aria-label={audioEnabled ? "Mute UI sounds" : "Enable UI sounds"}
        >
          {audioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
      </div>
    </div>
  );
}
