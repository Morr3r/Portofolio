"use client";

import { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

type KenneyModelProps = {
  name: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
};

export function KenneyModel({
  name,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1
}: KenneyModelProps) {
  const gltf = useGLTF(`/models/kenney-furniture/${name}.glb`);
  const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material instanceof THREE.MeshStandardMaterial) {
          child.material.roughness = Math.max(child.material.roughness, 0.45);
        }
      }
    });
  }, [scene]);

  return <primitive object={scene} position={position} rotation={rotation} scale={scale} />;
}

useGLTF.preload("/models/kenney-furniture/laptop.glb");
useGLTF.preload("/models/kenney-furniture/desk.glb");
useGLTF.preload("/models/kenney-furniture/chairDesk.glb");
useGLTF.preload("/models/kenney-furniture/bedSingle.glb");
useGLTF.preload("/models/kenney-furniture/bookcaseOpen.glb");

