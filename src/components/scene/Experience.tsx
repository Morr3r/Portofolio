"use client";

import { CameraRig } from "@/components/scene/CameraRig";
import { Effects } from "@/components/scene/Effects";
import { Environment } from "@/components/scene/Environment";
import { Particles } from "@/components/scene/Particles";
import { Room } from "@/components/scene/Room";
import { SpaceBackdrop } from "@/components/scene/SpaceBackdrop";

export function Experience() {
  return (
    <>
      <color attach="background" args={["#02040c"]} />
      <SpaceBackdrop />
      <Environment />
      <Room />
      <Particles />
      <CameraRig />
      <Effects />
    </>
  );
}
