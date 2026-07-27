"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Hud } from "@/components/ui/Hud";
import { MobileFallback } from "@/components/ui/MobileFallback";
import { DESKTOP_BREAKPOINT } from "@/lib/constants";
import { usePortfolioStore } from "@/lib/usePortfolioStore";

const PortfolioCanvas = dynamic(
  () => import("@/components/scene/PortfolioCanvas").then((module) => module.PortfolioCanvas),
  {
    loading: () => <div className="room-stage room-stage-skeleton" aria-hidden="true" />,
    ssr: false
  }
);

export function PortfolioExperience() {
  const [isMobile, setIsMobile] = useState(false);
  const hasEntered = usePortfolioStore((state) => state.hasEntered);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${DESKTOP_BREAKPOINT}px)`);
    const syncViewport = () => setIsMobile(mediaQuery.matches);

    syncViewport();
    mediaQuery.addEventListener("change", syncViewport);

    return () => {
      mediaQuery.removeEventListener("change", syncViewport);
    };
  }, []);

  const appClassName = hasEntered
    ? "portfolio-room-app has-entered min-h-screen overflow-hidden"
    : "portfolio-room-app min-h-screen overflow-hidden";

  return (
    <main className={appClassName}>
      {isMobile ? <div className="room-stage mobile-static-room" aria-hidden="true" /> : <PortfolioCanvas />}
      <Hud />
      <MobileFallback />
    </main>
  );
}
