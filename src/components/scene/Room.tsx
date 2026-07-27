"use client";

import { InteractiveObjects } from "@/components/scene/InteractiveObjects";
import { KenneyModel } from "@/components/scene/KenneyModel";

const plankRows = Array.from({ length: 18 }, (_, index) => index);
const bookColors = ["#f4f0de", "#264a73", "#f6a540", "#e85350", "#1d2f53", "#6ebd68"];

function RoomShell() {
  return (
    <group>
      <mesh receiveShadow position={[0, -0.06, 0]}>
        <boxGeometry args={[6.1, 0.12, 5.15]} />
        <meshStandardMaterial color="#d89458" roughness={0.72} />
      </mesh>

      {plankRows.map((row) => (
        <mesh key={row} receiveShadow position={[0, 0.012, -2.42 + row * 0.29]}>
          <boxGeometry args={[5.92, 0.012, 0.012]} />
          <meshStandardMaterial color="#f0b47c" roughness={0.78} />
        </mesh>
      ))}

      {[-2.42, -1.84, -1.26, -0.68, -0.1, 0.48, 1.06, 1.64, 2.22].map((z) => (
        <mesh key={`grain-${z}`} receiveShadow position={[0, 0.018, z]}>
          <boxGeometry args={[5.84, 0.01, 0.006]} />
          <meshStandardMaterial color="#b96f3d" roughness={0.9} />
        </mesh>
      ))}

      <mesh receiveShadow position={[0, 1.56, -2.63]}>
        <boxGeometry args={[6.1, 3.12, 0.12]} />
        <meshStandardMaterial color="#ad9785" roughness={0.84} />
      </mesh>

      <mesh receiveShadow position={[3.05, 1.56, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[5.15, 3.12, 0.12]} />
        <meshStandardMaterial color="#c8b9a8" roughness={0.82} />
      </mesh>

      <mesh position={[0, 3.14, -2.52]}>
        <boxGeometry args={[6.18, 0.08, 0.16]} />
        <meshStandardMaterial color="#211b1a" roughness={0.7} />
      </mesh>
      <mesh position={[-3.08, 1.56, -2.52]}>
        <boxGeometry args={[0.12, 3.16, 0.16]} />
        <meshStandardMaterial color="#211b1a" roughness={0.7} />
      </mesh>
      <mesh position={[3.09, 3.14, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[5.2, 0.08, 0.16]} />
        <meshStandardMaterial color="#211b1a" roughness={0.7} />
      </mesh>
      <mesh position={[3.09, 1.56, 2.58]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.12, 3.16, 0.16]} />
        <meshStandardMaterial color="#211b1a" roughness={0.7} />
      </mesh>

      <mesh position={[0, 0.16, -2.5]}>
        <boxGeometry args={[6.12, 0.16, 0.14]} />
        <meshStandardMaterial color="#b66d39" roughness={0.7} />
      </mesh>
      <mesh position={[2.96, 0.16, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[5.12, 0.16, 0.14]} />
        <meshStandardMaterial color="#b66d39" roughness={0.7} />
      </mesh>
    </group>
  );
}

function WallWindow() {
  return (
    <group position={[2.98, 1.74, -1.46]} rotation={[0, -Math.PI / 2, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.92, 1.48, 0.08]} />
        <meshStandardMaterial color="#f2e7d8" roughness={0.42} />
      </mesh>
      <mesh position={[0, 0, 0.052]}>
        <planeGeometry args={[0.66, 1.16]} />
        <meshBasicMaterial color="#74c8ff" toneMapped={false} />
      </mesh>
      <mesh position={[-0.18, 0.18, 0.056]}>
        <planeGeometry args={[0.2, 0.58]} />
        <meshBasicMaterial color="#9adaff" transparent opacity={0.45} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0, 0.062]}>
        <boxGeometry args={[0.035, 1.2, 0.018]} />
        <meshStandardMaterial color="#e7d8c8" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0, 0.064]}>
        <boxGeometry args={[0.68, 0.035, 0.018]} />
        <meshStandardMaterial color="#e7d8c8" roughness={0.4} />
      </mesh>
    </group>
  );
}

function WallShelf() {
  return (
    <group>
      <mesh castShadow position={[-0.2, 2.2, -2.48]}>
        <boxGeometry args={[1.82, 0.08, 0.22]} />
        <meshStandardMaterial color="#2a211d" roughness={0.48} />
      </mesh>

      {Array.from({ length: 14 }, (_, index) => {
        const width = index % 3 === 0 ? 0.12 : 0.09;
        const height = 0.32 + (index % 4) * 0.035;

        return (
          <mesh
            castShadow
            key={index}
            position={[-0.98 + index * 0.12, 2.42 + height / 2 - 0.16, -2.36]}
            rotation={[0, index % 2 === 0 ? 0.05 : -0.04, 0]}
          >
            <boxGeometry args={[width, height, 0.2]} />
            <meshStandardMaterial color={bookColors[index % bookColors.length]} roughness={0.62} />
          </mesh>
        );
      })}

      <KenneyModel name="plantSmall1" position={[-1.18, 2.26, -2.32]} scale={0.28} />
      <mesh castShadow position={[0.9, 2.03, -2.39]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.12, 0.018, 12, 30]} />
        <meshStandardMaterial color="#111111" roughness={0.55} />
      </mesh>
      <mesh castShadow position={[1.12, 2.03, -2.39]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.12, 0.018, 12, 30]} />
        <meshStandardMaterial color="#111111" roughness={0.55} />
      </mesh>
    </group>
  );
}

function DeskSetup() {
  return (
    <group>
      <mesh castShadow receiveShadow position={[0.05, 0.78, -1.84]}>
        <boxGeometry args={[2.25, 0.12, 0.72]} />
        <meshStandardMaterial color="#201915" roughness={0.52} />
      </mesh>
      <mesh castShadow receiveShadow position={[1.06, 0.74, -1.28]}>
        <boxGeometry args={[0.72, 0.1, 1.12]} />
        <meshStandardMaterial color="#201915" roughness={0.52} />
      </mesh>

      {[-0.92, 0.96].map((x) => (
        <mesh castShadow key={x} position={[x, 0.36, -1.84]}>
          <boxGeometry args={[0.08, 0.72, 0.08]} />
          <meshStandardMaterial color="#130f0d" roughness={0.5} />
        </mesh>
      ))}

      <mesh castShadow receiveShadow position={[-1.35, 0.34, -1.56]}>
        <boxGeometry args={[0.56, 0.68, 0.6]} />
        <meshStandardMaterial color="#1b1512" roughness={0.58} />
      </mesh>
      {[-0.13, 0.12].map((offset) => (
        <mesh key={offset} position={[-1.35, 0.36 + offset, -1.245]}>
          <boxGeometry args={[0.46, 0.035, 0.022]} />
          <meshStandardMaterial color="#3a2d26" roughness={0.52} />
        </mesh>
      ))}

      <mesh castShadow position={[-0.28, 1.14, -2.24]}>
        <boxGeometry args={[0.76, 0.46, 0.04]} />
        <meshStandardMaterial color="#141414" roughness={0.35} />
      </mesh>
      <mesh position={[-0.28, 1.14, -2.214]}>
        <planeGeometry args={[0.66, 0.34]} />
        <meshBasicMaterial color="#ffc3c9" toneMapped={false} />
      </mesh>
      <mesh castShadow position={[0.52, 1.14, -2.24]}>
        <boxGeometry args={[0.76, 0.46, 0.04]} />
        <meshStandardMaterial color="#141414" roughness={0.35} />
      </mesh>
      <mesh position={[0.52, 1.14, -2.214]}>
        <planeGeometry args={[0.66, 0.34]} />
        <meshBasicMaterial color="#f5f6ff" toneMapped={false} />
      </mesh>
      <mesh castShadow position={[0.12, 0.9, -2.14]}>
        <boxGeometry args={[0.07, 0.34, 0.07]} />
        <meshStandardMaterial color="#111111" roughness={0.4} />
      </mesh>
      <mesh castShadow position={[0.12, 0.76, -2.02]}>
        <boxGeometry args={[0.74, 0.045, 0.28]} />
        <meshStandardMaterial color="#111111" roughness={0.4} />
      </mesh>

      <mesh castShadow position={[-0.26, 0.87, -1.64]}>
        <boxGeometry args={[0.52, 0.035, 0.18]} />
        <meshStandardMaterial color="#eee6da" roughness={0.5} />
      </mesh>
      <mesh castShadow position={[0.58, 0.87, -1.62]}>
        <sphereGeometry args={[0.08, 24, 12]} />
        <meshStandardMaterial color="#efe7db" roughness={0.48} />
      </mesh>

      <mesh castShadow position={[-0.88, 0.9, -1.54]}>
        <cylinderGeometry args={[0.055, 0.045, 0.18, 18]} />
        <meshStandardMaterial color="#f4d271" roughness={0.42} />
      </mesh>
      <pointLight color="#5e8eff" distance={2.7} intensity={1.4} position={[0.12, 0.92, -1.88]} />

      <KenneyModel
        name="chairDesk"
        position={[-0.46, 0.06, -0.72]}
        rotation={[0, Math.PI, 0]}
        scale={[1.48, 2.25, 1.48]}
      />
    </group>
  );
}

function SoftSeating() {
  return (
    <group>
      <mesh receiveShadow position={[-0.72, 0.035, 0.95]} scale={[1.18, 1, 0.74]}>
        <cylinderGeometry args={[0.72, 0.72, 0.045, 64]} />
        <meshStandardMaterial color="#b99a85" roughness={0.96} />
      </mesh>
      <mesh castShadow receiveShadow position={[0.45, 0.28, 1.95]} scale={[1.25, 0.58, 0.92]}>
        <sphereGeometry args={[0.48, 36, 18]} />
        <meshStandardMaterial color="#082f63" roughness={0.78} />
      </mesh>
      <mesh castShadow receiveShadow position={[1.42, 0.18, 1.42]} scale={[1, 0.52, 1]}>
        <cylinderGeometry args={[0.44, 0.48, 0.34, 40]} />
        <meshStandardMaterial color="#063a79" roughness={0.74} />
      </mesh>
      <mesh castShadow receiveShadow position={[0.9, 0.2, 2.0]} rotation={[0.18, 0.45, -0.1]} scale={[1.05, 0.36, 0.8]}>
        <boxGeometry args={[0.46, 0.46, 0.18]} />
        <meshStandardMaterial color="#ffd17a" roughness={0.68} />
      </mesh>
    </group>
  );
}

function PlantsAndProps() {
  return (
    <group>
      <KenneyModel name="pottedPlant" position={[1.05, 0.86, -1.03]} scale={0.55} />

      <group position={[2.3, 0.08, 1.02]} rotation={[0, 0.18, 0]}>
        {[-0.18, 0.18].map((x) => (
          <group key={x} position={[x, 0, 0]}>
            <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.09, 0.09, 0.08, 24]} />
              <meshStandardMaterial color="#5a5148" roughness={0.55} metalness={0.28} />
            </mesh>
            <mesh castShadow position={[0.24, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.09, 0.09, 0.08, 24]} />
              <meshStandardMaterial color="#5a5148" roughness={0.55} metalness={0.28} />
            </mesh>
            <mesh castShadow position={[0.12, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.025, 0.025, 0.24, 12]} />
              <meshStandardMaterial color="#2d2925" roughness={0.5} metalness={0.35} />
            </mesh>
          </group>
        ))}
      </group>

      <mesh castShadow receiveShadow position={[2.52, 0.36, 0.55]} rotation={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.72, 24]} />
        <meshStandardMaterial color="#f0c572" roughness={0.56} />
      </mesh>
    </group>
  );
}

export function Room() {
  return (
    <group position={[0, 0, 0]} rotation={[0, 0.02, 0]}>
      <RoomShell />
      <WallWindow />
      <WallShelf />
      <DeskSetup />
      <SoftSeating />
      <PlantsAndProps />
      <InteractiveObjects />
    </group>
  );
}
