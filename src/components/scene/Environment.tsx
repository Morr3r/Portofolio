"use client";

import { ContactShadows } from "@react-three/drei";
import { usePortfolioStore } from "@/lib/usePortfolioStore";

export function Environment() {
  const quality = usePortfolioStore((state) => state.quality);

  return (
    <>
      <hemisphereLight color="#fff3df" groundColor="#27415f" intensity={1.05} />
      <ambientLight color="#fff5e7" intensity={0.56} />
      <directionalLight
        castShadow={quality === "cinematic"}
        color="#fff2dc"
        intensity={2.15}
        position={[-3.2, 6.4, 4.4]}
        shadow-bias={-0.00018}
        shadow-camera-bottom={-6}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-mapSize-height={quality === "cinematic" ? 4096 : 1024}
        shadow-mapSize-width={quality === "cinematic" ? 4096 : 1024}
      />
      <spotLight
        angle={0.5}
        color="#ffd8a3"
        distance={7.8}
        intensity={1.9}
        penumbra={0.78}
        position={[1.2, 4.1, 1.9]}
      />
      <pointLight color="#6da7ff" distance={4.6} intensity={1.15} position={[0.45, 1.15, -1.65]} />
      <pointLight color="#ff795f" distance={3.6} intensity={1.0} position={[2.35, 1.35, -0.3]} />
      <pointLight color="#32e6ff" distance={7.8} intensity={0.72} position={[-4.2, 3.45, -2.6]} />
      <spotLight
        angle={0.42}
        color="#8b7dff"
        distance={8.5}
        intensity={0.78}
        penumbra={0.92}
        position={[4.6, 4.15, 2.4]}
      />
      {quality === "cinematic" && (
        <ContactShadows
          blur={0.95}
          color="#342519"
          far={4.8}
          opacity={0.3}
          position={[0, 0.018, 0]}
          scale={7.4}
        />
      )}
    </>
  );
}
