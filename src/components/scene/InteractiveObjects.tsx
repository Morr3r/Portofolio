"use client";

import { Text } from "@react-three/drei";
import { InteractiveObject } from "@/components/scene/InteractiveObject";
import { interactiveObjects } from "@/lib/portfolio-data";
import type { InteractiveObjectId } from "@/lib/portfolio-data";

const getObjectConfig = (id: InteractiveObjectId) => {
  const object = interactiveObjects.find((item) => item.id === id);

  if (!object) {
    throw new Error(`Missing interactive object config: ${id}`);
  }

  return object;
};

const rubikColors = [
  "#f6d34d",
  "#e94f37",
  "#2f80ed",
  "#27ae60",
  "#ffffff",
  "#f2994a",
  "#2f80ed",
  "#27ae60",
  "#e94f37"
];

function AboutFrames() {
  return (
    <InteractiveObject
      config={getObjectConfig("poster")}
      labelOffset={[0, 0.62, 0.16]}
      position={[-1.08, 1.65, -2.53]}
      ringPosition={[0, -1.53, 0.32]}
      ringRadius={0.42}
    >
      {[
        [-0.22, 0.22, "#1c77bd", "in"],
        [0.16, 0.02, "#242424", "gh"],
        [-0.22, -0.28, "#7b6b60", "cv"]
      ].map(([x, y, color, label]) => (
        <group key={`${label}`} position={[x as number, y as number, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.27, 0.27, 0.07]} />
            <meshStandardMaterial color="#362c28" roughness={0.55} />
          </mesh>
          <mesh position={[0, 0, 0.045]}>
            <planeGeometry args={[0.19, 0.19]} />
            <meshBasicMaterial color={color as string} toneMapped={false} />
          </mesh>
          <Text
            anchorX="center"
            anchorY="middle"
            color="#ffffff"
            fontSize={0.055}
            position={[0, -0.005, 0.058]}
          >
            {label as string}
          </Text>
        </group>
      ))}
    </InteractiveObject>
  );
}

function SkillWhiteboard() {
  return (
    <InteractiveObject
      config={getObjectConfig("whiteboard")}
      labelOffset={[0, 0.72, 0.16]}
      position={[-2.2, 1.55, -2.54]}
      ringPosition={[0, -1.45, 0.34]}
      ringRadius={0.56}
    >
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.18, 0.78, 0.08]} />
        <meshStandardMaterial color="#f0e8dd" roughness={0.34} />
      </mesh>
      <mesh position={[0, 0, 0.052]}>
        <planeGeometry args={[1.0, 0.62]} />
        <meshBasicMaterial color="#fffaf2" toneMapped={false} />
      </mesh>
      <Text
        anchorX="center"
        anchorY="middle"
        color="#f05d56"
        fontSize={0.09}
        position={[0, 0.22, 0.066]}
      >
        WELCOME
      </Text>
      <Text
        anchorX="center"
        anchorY="middle"
        color="#3657d6"
        fontSize={0.052}
        position={[-0.02, -0.02, 0.066]}
      >
        FLUTTER REACT UI
      </Text>
      {[
        [-0.22, -0.12, 0.36, -0.18, "#3657d6"],
        [0.18, -0.2, 0.34, 0.12, "#3657d6"],
        [-0.32, 0.08, 0.26, 0.35, "#f05d56"],
        [0.34, 0.08, 0.2, -0.28, "#27ae60"]
      ].map(([x, y, width, rotation, color]) => (
        <mesh key={`${x}-${y}`} position={[x as number, y as number, 0.068]} rotation={[0, 0, rotation as number]}>
          <boxGeometry args={[width as number, 0.018, 0.01]} />
          <meshBasicMaterial color={color as string} toneMapped={false} />
        </mesh>
      ))}
    </InteractiveObject>
  );
}

function ProjectLaptop() {
  return (
    <InteractiveObject
      config={getObjectConfig("laptop")}
      labelOffset={[0, 0.72, 0.16]}
      position={[-0.62, 0.9, -1.55]}
      ringPosition={[0, -0.84, 0.2]}
      ringRadius={0.48}
      rotation={[0, 0.08, 0]}
    >
      <mesh castShadow receiveShadow position={[0, -0.035, 0.14]}>
        <boxGeometry args={[0.72, 0.055, 0.46]} />
        <meshStandardMaterial color="#171717" roughness={0.42} metalness={0.1} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.25, -0.08]} rotation={[-0.14, 0, 0]}>
        <boxGeometry args={[0.76, 0.46, 0.045]} />
        <meshStandardMaterial color="#111111" roughness={0.36} metalness={0.15} />
      </mesh>
      <mesh position={[0, 0.25, -0.052]} rotation={[-0.14, 0, 0]}>
        <planeGeometry args={[0.63, 0.34]} />
        <meshBasicMaterial color="#f7f8ff" toneMapped={false} />
      </mesh>
      <Text
        anchorX="center"
        anchorY="middle"
        color="#111111"
        fontSize={0.045}
        position={[0, 0.29, -0.032]}
        rotation={[-0.14, 0, 0]}
      >
        DIGI PROJECTS
      </Text>
      {[-0.16, -0.06, 0.04, 0.14].map((x) => (
        <mesh key={x} position={[x, 0.01, 0.06]}>
          <boxGeometry args={[0.055, 0.012, 0.028]} />
          <meshStandardMaterial color="#f1eadf" roughness={0.52} />
        </mesh>
      ))}
      <pointLight color="#88b8ff" distance={2.4} intensity={0.82} position={[0, 0.42, 0.08]} />
    </InteractiveObject>
  );
}

function ArcadeCabinet() {
  return (
    <InteractiveObject
      config={getObjectConfig("arcade")}
      labelOffset={[0, 1.25, 0.16]}
      position={[2.08, 0.68, -0.38]}
      ringPosition={[0, -0.62, 0.06]}
      ringRadius={0.5}
      rotation={[0, -0.36, 0]}
    >
      <mesh castShadow receiveShadow position={[0, 0.24, 0]}>
        <boxGeometry args={[0.72, 1.3, 0.62]} />
        <meshStandardMaterial color="#16110f" roughness={0.48} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.98, 0]}>
        <boxGeometry args={[0.84, 0.34, 0.72]} />
        <meshStandardMaterial color="#12100f" roughness={0.46} />
      </mesh>
      {[-0.43, 0.43].map((x) => (
        <mesh castShadow key={x} position={[x, 0.35, 0.02]}>
          <boxGeometry args={[0.06, 1.42, 0.72]} />
          <meshStandardMaterial color="#ff5a45" emissive="#ff5a45" emissiveIntensity={0.25} roughness={0.38} />
        </mesh>
      ))}
      <mesh position={[0, 0.62, 0.334]}>
        <planeGeometry args={[0.48, 0.44]} />
        <meshBasicMaterial color="#12241c" toneMapped={false} />
      </mesh>
      <Text
        anchorX="center"
        anchorY="middle"
        color="#45ff7a"
        fontSize={0.052}
        position={[0, 0.63, 0.342]}
      >
        EXPERIENCE
      </Text>
      <mesh castShadow receiveShadow position={[0, 0.08, 0.39]} rotation={[-0.24, 0, 0]}>
        <boxGeometry args={[0.58, 0.09, 0.34]} />
        <meshStandardMaterial color="#2a211d" roughness={0.42} />
      </mesh>
      {[-0.22, -0.08, 0.08, 0.22].map((x, index) => (
        <mesh castShadow key={x} position={[x, 0.08, 0.57]}>
          <sphereGeometry args={[0.045, 18, 12]} />
          <meshStandardMaterial color={index % 2 === 0 ? "#f2f0df" : "#ff5a45"} roughness={0.36} />
        </mesh>
      ))}
      <pointLight color="#ff5a45" distance={2.4} intensity={1.05} position={[0, 0.74, 0.52]} />
    </InteractiveObject>
  );
}

function ContactRubik() {
  return (
    <InteractiveObject
      config={getObjectConfig("phone")}
      labelOffset={[0, 0.62, 0.08]}
      position={[1.42, 0.47, 1.42]}
      ringPosition={[0, -0.43, 0]}
      ringRadius={0.32}
      rotation={[0, -0.5, 0]}
    >
      {Array.from({ length: 9 }, (_, index) => {
        const x = (index % 3) * 0.105 - 0.105;
        const y = Math.floor(index / 3) * 0.105 - 0.105;

        return (
          <mesh castShadow receiveShadow key={index} position={[x, y, 0.08]}>
            <boxGeometry args={[0.09, 0.09, 0.09]} />
            <meshStandardMaterial color={rubikColors[index]} roughness={0.42} />
          </mesh>
        );
      })}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[0.36, 0.36, 0.12]} />
        <meshStandardMaterial color="#111111" roughness={0.5} />
      </mesh>
    </InteractiveObject>
  );
}

export function InteractiveObjects() {
  return (
    <>
      <AboutFrames />
      <ProjectLaptop />
      <ArcadeCabinet />
      <SkillWhiteboard />
      <ContactRubik />
    </>
  );
}
