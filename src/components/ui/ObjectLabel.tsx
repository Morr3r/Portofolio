"use client";

import type { CSSProperties } from "react";
import { Html } from "@react-three/drei";

type ObjectLabelProps = {
  accent: string;
  hint: string;
  label: string;
  position?: [number, number, number];
};

export function ObjectLabel({
  accent,
  hint,
  label,
  position = [0, 0.7, 0]
}: ObjectLabelProps) {
  return (
    <Html center className="object-label" distanceFactor={7.5} position={position} transform>
      <div style={{ "--label-accent": accent } as CSSProperties}>
        <span>{label}</span>
        <small>{hint}</small>
      </div>
    </Html>
  );
}
