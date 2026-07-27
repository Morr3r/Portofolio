"use client";

import { ArrowUpRight } from "lucide-react";
import { interactiveObjects, portfolioProfile, portfolioSections } from "@/lib/portfolio-data";
import { usePortfolioStore } from "@/lib/usePortfolioStore";

export function MobileFallback() {
  const activeSection = usePortfolioStore((state) => state.activeSection);
  const openSection = usePortfolioStore((state) => state.openSection);
  const resetView = usePortfolioStore((state) => state.resetView);

  return (
    <section className="mobile-fallback" aria-label="Mobile portfolio navigation">
      <div className="mobile-room-preview" aria-hidden="true">
        <span className="mobile-wall" />
        <span className="mobile-desk" />
        <span className="mobile-screen" />
        <span className="mobile-poster" />
        <span className="mobile-board" />
      </div>
      <div className="mobile-copy">
        <span>{portfolioProfile.role}</span>
        <h1>{portfolioProfile.name}</h1>
        <p>{portfolioProfile.intro}</p>
      </div>
      <div className="mobile-section-grid">
        <button className={activeSection === "intro" ? "active" : ""} type="button" onClick={resetView}>
          Intro
        </button>
        {interactiveObjects.map((object) => (
          <button
            className={activeSection === object.section ? "active" : ""}
            key={object.id}
            type="button"
            onClick={() => openSection(object.section)}
          >
            <span>{portfolioSections[object.section].eyebrow}</span>
            <ArrowUpRight size={15} />
          </button>
        ))}
      </div>
    </section>
  );
}

