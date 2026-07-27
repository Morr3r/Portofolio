"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";
import { cameraTargets } from "@/lib/camera-targets";
import { usePortfolioStore } from "@/lib/usePortfolioStore";

export function CameraRig() {
  const camera = useThree((state) => state.camera);
  const pointer = useThree((state) => state.pointer);
  const activeSection = usePortfolioStore((state) => state.activeSection);
  const quality = usePortfolioStore((state) => state.quality);
  const setTransitioning = usePortfolioStore((state) => state.setTransitioning);
  const [reducedMotion, setReducedMotion] = useState(false);
  const basePositionRef = useRef(new THREE.Vector3(...cameraTargets.intro.position));
  const lookAtRef = useRef(new THREE.Vector3(...cameraTargets.intro.target));
  const cameraTarget = useMemo(() => new THREE.Vector3(), []);
  const lookTarget = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  useEffect(() => {
    const nextTarget = cameraTargets[activeSection];
    const duration = reducedMotion ? 0.05 : quality === "cinematic" ? 1.24 : 0.62;
    const ease = activeSection === "intro" ? "power3.inOut" : "expo.inOut";
    const timeline = gsap.timeline({
      onStart: () => setTransitioning(true),
      onComplete: () => setTransitioning(false)
    });

    timeline.to(basePositionRef.current, {
      x: nextTarget.position[0],
      y: nextTarget.position[1],
      z: nextTarget.position[2],
      duration,
      ease
    });
    timeline.to(
      lookAtRef.current,
      {
        x: nextTarget.target[0],
        y: nextTarget.target[1],
        z: nextTarget.target[2],
        duration: Math.max(0.05, duration * 0.92),
        ease
      },
      0
    );

    return () => {
      timeline.kill();
      setTransitioning(false);
    };
  }, [activeSection, quality, reducedMotion, setTransitioning]);

  useFrame(({ clock }, delta) => {
    const drift = reducedMotion ? 0 : quality === "cinematic" ? 1 : 0.35;
    const breathe = Math.sin(clock.elapsedTime * 0.42) * 0.045 * drift;

    cameraTarget.set(
      basePositionRef.current.x + pointer.x * 0.16 * drift,
      basePositionRef.current.y + pointer.y * 0.08 * drift + breathe,
      basePositionRef.current.z
    );
    lookTarget.set(
      lookAtRef.current.x + pointer.x * 0.055 * drift,
      lookAtRef.current.y + pointer.y * 0.04 * drift,
      lookAtRef.current.z
    );

    camera.position.lerp(cameraTarget, Math.min(delta * 5, 1));
    camera.lookAt(lookTarget);
  });

  return null;
}

