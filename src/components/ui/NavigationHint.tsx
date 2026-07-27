"use client";

import { MousePointer2 } from "lucide-react";
import { interactiveObjects, portfolioSections } from "@/lib/portfolio-data";
import { usePortfolioStore } from "@/lib/usePortfolioStore";

export function NavigationHint() {
  const activeSection = usePortfolioStore((state) => state.activeSection);
  const hoveredObjectId = usePortfolioStore((state) => state.hoveredObjectId);
  const hoveredObject = interactiveObjects.find((object) => object.id === hoveredObjectId);

  return (
    <div className="navigation-hint" aria-live="polite">
      <MousePointer2 size={16} />
      <span>{hoveredObject ? hoveredObject.hint : portfolioSections[activeSection].description}</span>
    </div>
  );
}

