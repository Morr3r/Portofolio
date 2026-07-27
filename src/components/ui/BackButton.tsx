"use client";

import { ArrowLeft } from "lucide-react";
import { usePortfolioStore } from "@/lib/usePortfolioStore";

export function BackButton() {
  const isPanelOpen = usePortfolioStore((state) => state.isPanelOpen);
  const resetView = usePortfolioStore((state) => state.resetView);

  if (!isPanelOpen) {
    return null;
  }

  return (
    <button className="room-back-button" type="button" onClick={resetView} aria-label="Return to full room view">
      <ArrowLeft size={18} />
      <span>Room</span>
    </button>
  );
}

