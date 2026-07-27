"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { type ThreeEvent } from "@react-three/fiber";
import { useCursor } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";
import { ObjectLabel } from "@/components/ui/ObjectLabel";
import type { InteractiveObjectConfig } from "@/lib/portfolio-data";
import { usePortfolioStore } from "@/lib/usePortfolioStore";

type InteractiveObjectProps = {
  children: ReactNode;
  config: InteractiveObjectConfig;
  labelOffset?: [number, number, number];
  position: [number, number, number];
  ringPosition?: [number, number, number];
  ringRadius?: number;
  ringRotation?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
};

export function InteractiveObject({
  children,
  config,
  labelOffset,
  position,
  ringPosition = [0, 0.03, 0],
  ringRadius = 0.58,
  ringRotation = [-Math.PI / 2, 0, 0],
  rotation = [0, 0, 0],
  scale = 1
}: InteractiveObjectProps) {
  const groupRef = useRef<THREE.Group | null>(null);
  const hoveredObjectId = usePortfolioStore((state) => state.hoveredObjectId);
  const isPanelOpen = usePortfolioStore((state) => state.isPanelOpen);
  const selectedObjectId = usePortfolioStore((state) => state.selectedObjectId);
  const setHoveredObject = usePortfolioStore((state) => state.setHoveredObject);
  const selectObject = usePortfolioStore((state) => state.selectObject);
  const isHovered = hoveredObjectId === config.id;
  const isActive = selectedObjectId === config.id;

  useCursor(isHovered);

  useEffect(() => {
    if (!groupRef.current) {
      return;
    }

    const targetScale = scale * (isActive ? 1.08 : isHovered ? 1.045 : 1);
    const tween = gsap.to(groupRef.current.scale, {
      x: targetScale,
      y: targetScale,
      z: targetScale,
      duration: 0.32,
      ease: "power3.out"
    });

    return () => {
      tween.kill();
    };
  }, [isActive, isHovered, scale]);

  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setHoveredObject(config.id);
  };

  const handlePointerOut = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setHoveredObject(null);
  };

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    selectObject(config.id, config.section);
  };

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={scale}
      onClick={handleClick}
      onPointerOut={handlePointerOut}
      onPointerOver={handlePointerOver}
    >
      {children}
      <mesh position={ringPosition} rotation={ringRotation} visible={isHovered || isActive}>
        <ringGeometry args={[ringRadius, ringRadius + 0.04, 72]} />
        <meshBasicMaterial color={config.accent} transparent opacity={isActive ? 0.72 : 0.44} />
      </mesh>
      {isHovered && !isPanelOpen && (
        <ObjectLabel
          accent={config.accent}
          hint={config.hint}
          label={config.label}
          position={labelOffset}
        />
      )}
    </group>
  );
}
