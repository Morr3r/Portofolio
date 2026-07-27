"use client";

import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { usePortfolioStore } from "@/lib/usePortfolioStore";

export function Effects() {
  const quality = usePortfolioStore((state) => state.quality);

  if (quality !== "cinematic") {
    return null;
  }

  return (
    <EffectComposer enableNormalPass={false} multisampling={0}>
      <Bloom intensity={0.24} luminanceSmoothing={0.36} luminanceThreshold={0.48} mipmapBlur />
      <Vignette darkness={0.38} eskil={false} offset={0.18} />
    </EffectComposer>
  );
}
