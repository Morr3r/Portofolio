"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, Preload } from "@react-three/drei";
import * as THREE from "three";
import { cameraTargets } from "@/lib/camera-targets";
import { usePortfolioStore } from "@/lib/usePortfolioStore";
import { Experience } from "@/components/scene/Experience";
import { Loader } from "@/components/scene/Loader";

export function PortfolioCanvas() {
  const quality = usePortfolioStore((state) => state.quality);

  return (
    <div className="room-stage" aria-label="Interactive 3D portfolio room">
      <Canvas
        orthographic
        camera={{
          near: 0.1,
          far: 80,
          position: cameraTargets.intro.position,
          zoom: 136
        }}
        dpr={quality === "cinematic" ? [1.4, 2.35] : [1.1, 1.55]}
        gl={{
          alpha: false,
          antialias: true,
          powerPreference: "high-performance"
        }}
        onCreated={({ gl }) => {
          gl.setClearColor("#02040c", 1);
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
        shadows={quality === "cinematic" ? "percentage" : false}
      >
        <Suspense fallback={<Loader />}>
          <Experience />
          <AdaptiveDpr pixelated={quality === "performance"} />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
