"use client";

import {
  type CSSProperties,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Float,
  Html,
  KeyboardControls,
  Lightformer,
  Sparkles,
  useCursor,
  useKeyboardControls
} from "@react-three/drei";
import {
  CuboidCollider,
  Physics,
  RigidBody,
  type RapierRigidBody
} from "@react-three/rapier";
import gsap from "gsap";
import { Howl } from "howler";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
import type { LocaleCode } from "@/lib/portfolio-data";

export type CinematicWorldFocus =
  | "core"
  | "projects"
  | "experience"
  | "skills"
  | "certificates";

export type CinematicWorldQuality = "cinematic" | "performance";

type CinematicPortfolioWorldProps = {
  audioEnabled: boolean;
  focus: CinematicWorldFocus;
  language: LocaleCode;
  onFocusChange: (focus: CinematicWorldFocus) => void;
  quality: CinematicWorldQuality;
  resetSignal: number;
};

type WorldNode = {
  accent: string;
  height: number;
  id: CinematicWorldFocus;
  index: string;
  label: Record<LocaleCode, string>;
  position: [number, number, number];
};

type ControlName = "forward" | "backward" | "left" | "right" | "jump" | "boost";

const controls = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
  { name: "jump", keys: ["Space"] },
  { name: "boost", keys: ["ShiftLeft", "ShiftRight"] }
] satisfies { keys: string[]; name: ControlName }[];

const worldNodes: WorldNode[] = [
  {
    id: "core",
    index: "00",
    label: { en: "Core", id: "Inti" },
    position: [0, 0.28, 0],
    accent: "#65f2c2",
    height: 1.6
  },
  {
    id: "projects",
    index: "01",
    label: { en: "Projects", id: "Proyek" },
    position: [-4.15, 0.32, -1.25],
    accent: "#58d7ff",
    height: 2.1
  },
  {
    id: "experience",
    index: "02",
    label: { en: "Experience", id: "Pengalaman" },
    position: [3.85, 0.32, -1.05],
    accent: "#f8c15d",
    height: 2.35
  },
  {
    id: "skills",
    index: "03",
    label: { en: "Skills", id: "Keahlian" },
    position: [-2.45, 0.32, 3.45],
    accent: "#b89bff",
    height: 1.95
  },
  {
    id: "certificates",
    index: "04",
    label: { en: "Certificates", id: "Sertifikat" },
    position: [3.15, 0.32, 3.28],
    accent: "#ff6f61",
    height: 1.85
  }
];

const cameraByFocus: Record<
  CinematicWorldFocus,
  { position: [number, number, number]; target: [number, number, number] }
> = {
  core: {
    position: [0, 5.2, 8.4],
    target: [0, 0.75, 0.35]
  },
  projects: {
    position: [-4.9, 4.25, 5.1],
    target: [-2.75, 0.9, -0.75]
  },
  experience: {
    position: [4.85, 4.15, 5.15],
    target: [2.6, 1, -0.55]
  },
  skills: {
    position: [-4.6, 3.9, 7],
    target: [-1.65, 0.9, 2.6]
  },
  certificates: {
    position: [4.35, 3.85, 7.05],
    target: [2.25, 0.9, 2.5]
  }
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const writeString = (view: DataView, offset: number, value: string) => {
  for (let index = 0; index < value.length; index += 1) {
    view.setUint8(offset + index, value.charCodeAt(index));
  }
};

const createAmbientWavDataUri = () => {
  const sampleRate = 22050;
  const durationSeconds = 1.6;
  const sampleCount = Math.floor(sampleRate * durationSeconds);
  const bytesPerSample = 2;
  const dataSize = sampleCount * bytesPerSample;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  writeString(view, 0, "RIFF");
  view.setUint32(4, 36 + dataSize, true);
  writeString(view, 8, "WAVE");
  writeString(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * bytesPerSample, true);
  view.setUint16(32, bytesPerSample, true);
  view.setUint16(34, 16, true);
  writeString(view, 36, "data");
  view.setUint32(40, dataSize, true);

  for (let index = 0; index < sampleCount; index += 1) {
    const time = index / sampleRate;
    const envelope = Math.sin(Math.PI * (index / sampleCount));
    const signal =
      Math.sin(2 * Math.PI * 82 * time) * 0.18 +
      Math.sin(2 * Math.PI * 164 * time + 0.8) * 0.06 +
      Math.sin(2 * Math.PI * 246 * time + 1.7) * 0.035;
    const sample = clamp(signal * envelope, -1, 1);

    view.setInt16(44 + index * bytesPerSample, sample * 0x7fff, true);
  }

  const bytes = new Uint8Array(buffer);
  let binary = "";

  for (let index = 0; index < bytes.length; index += 1) {
    binary += String.fromCharCode(bytes[index]);
  }

  return `data:audio/wav;base64,${window.btoa(binary)}`;
};

function AssetPipelineBridge() {
  const gl = useThree((state) => state.gl);

  useEffect(() => {
    const ktx2Loader = new KTX2Loader()
      .setTranscoderPath("/basis/")
      .detectSupport(gl);
    const gltfLoader = new GLTFLoader();

    gltfLoader.setKTX2Loader(ktx2Loader);

    return () => {
      ktx2Loader.dispose();
    };
  }, [gl]);

  return null;
}

function SoundEngine({ audioEnabled, focus }: Pick<CinematicPortfolioWorldProps, "audioEnabled" | "focus">) {
  const ambientRef = useRef<Howl | null>(null);
  const pulseRef = useRef<Howl | null>(null);
  const fadeTimerRef = useRef(0);
  const previousFocusRef = useRef(focus);

  useEffect(() => {
    const ambientSource = createAmbientWavDataUri();

    ambientRef.current = new Howl({
      src: [ambientSource],
      loop: true,
      volume: 0
    });
    pulseRef.current = new Howl({
      src: [ambientSource],
      loop: false,
      rate: 1.45,
      volume: 0.05
    });

    return () => {
      window.clearTimeout(fadeTimerRef.current);
      ambientRef.current?.unload();
      pulseRef.current?.unload();
      ambientRef.current = null;
      pulseRef.current = null;
    };
  }, []);

  useEffect(() => {
    const ambient = ambientRef.current;

    if (!ambient) {
      return;
    }

    window.clearTimeout(fadeTimerRef.current);

    if (audioEnabled) {
      if (!ambient.playing()) {
        ambient.play();
      }

      ambient.fade(ambient.volume(), 0.16, 650);
      return;
    }

    if (ambient.playing()) {
      ambient.fade(ambient.volume(), 0, 420);
      fadeTimerRef.current = window.setTimeout(() => ambient.stop(), 460);
    }
  }, [audioEnabled]);

  useEffect(() => {
    if (!audioEnabled || previousFocusRef.current === focus) {
      previousFocusRef.current = focus;
      return;
    }

    pulseRef.current?.play();
    previousFocusRef.current = focus;
  }, [audioEnabled, focus]);

  return null;
}

function CameraRig({
  focus,
  quality
}: Pick<CinematicPortfolioWorldProps, "focus" | "quality">) {
  const camera = useThree((state) => state.camera);
  const pointer = useThree((state) => state.pointer);
  const lookAtRef = useRef(new THREE.Vector3(...cameraByFocus.core.target));
  const cameraTarget = useMemo(() => new THREE.Vector3(), []);
  const focusTarget = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    const nextCamera = cameraByFocus[focus];
    const timeline = gsap.timeline();

    timeline.to(camera.position, {
      x: nextCamera.position[0],
      y: nextCamera.position[1],
      z: nextCamera.position[2],
      duration: quality === "cinematic" ? 1.35 : 0.65,
      ease: "power3.out"
    });
    timeline.to(
      lookAtRef.current,
      {
        x: nextCamera.target[0],
        y: nextCamera.target[1],
        z: nextCamera.target[2],
        duration: quality === "cinematic" ? 1.2 : 0.5,
        ease: "power3.out"
      },
      0
    );

    return () => {
      timeline.kill();
    };
  }, [camera, focus, quality]);

  useFrame(({ clock }, delta) => {
    const nextCamera = cameraByFocus[focus];
    const drift = quality === "cinematic" ? 1 : 0.35;
    const breathe = Math.sin(clock.elapsedTime * 0.34) * 0.08 * drift;

    cameraTarget.set(
      nextCamera.position[0] + pointer.x * 0.18 * drift,
      nextCamera.position[1] + pointer.y * 0.1 * drift + breathe,
      nextCamera.position[2]
    );
    focusTarget.set(
      lookAtRef.current.x + pointer.x * 0.09 * drift,
      lookAtRef.current.y + pointer.y * 0.06 * drift,
      lookAtRef.current.z
    );

    camera.position.lerp(cameraTarget, Math.min(delta * 1.85, 1));
    camera.lookAt(focusTarget);
  });

  return null;
}

function GroundSystem() {
  return (
    <RigidBody type="fixed" colliders={false}>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[7.8, 120]} />
        <meshStandardMaterial
          color="#07100d"
          metalness={0.42}
          roughness={0.56}
          emissive="#091a15"
          emissiveIntensity={0.55}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.018, 0]}>
        <ringGeometry args={[2.1, 2.14, 96]} />
        <meshBasicMaterial color="#65f2c2" transparent opacity={0.38} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[4.05, 4.09, 128]} />
        <meshBasicMaterial color="#58d7ff" transparent opacity={0.22} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.022, 0]}>
        <ringGeometry args={[6.25, 6.29, 144]} />
        <meshBasicMaterial color="#f8c15d" transparent opacity={0.18} />
      </mesh>

      {worldNodes.slice(1).map((node) => (
        <mesh
          key={`rail-${node.id}`}
          position={[node.position[0] / 2, 0.035, node.position[2] / 2]}
          rotation={[0, Math.atan2(node.position[0], node.position[2]), 0]}
        >
          <boxGeometry args={[0.035, 0.026, Math.hypot(node.position[0], node.position[2])]} />
          <meshBasicMaterial color={node.accent} transparent opacity={0.38} />
        </mesh>
      ))}

      <CuboidCollider args={[8, 0.08, 8]} position={[0, -0.08, 0]} />
      <CuboidCollider args={[8.1, 0.7, 0.12]} position={[0, 0.62, -7.88]} />
      <CuboidCollider args={[8.1, 0.7, 0.12]} position={[0, 0.62, 7.88]} />
      <CuboidCollider args={[0.12, 0.7, 8.1]} position={[-7.88, 0.62, 0]} />
      <CuboidCollider args={[0.12, 0.7, 8.1]} position={[7.88, 0.62, 0]} />
    </RigidBody>
  );
}

function WorldNodeBeacon({
  active,
  language,
  node,
  onFocusChange,
  quality
}: {
  active: boolean;
  language: LocaleCode;
  node: WorldNode;
  onFocusChange: (focus: CinematicWorldFocus) => void;
  quality: CinematicWorldQuality;
}) {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group | null>(null);
  const bloomColor = useMemo(() => new THREE.Color(node.accent), [node.accent]);

  useCursor(hovered);

  useEffect(() => {
    if (!groupRef.current) {
      return;
    }

    const timeline = gsap.timeline();

    timeline.to(groupRef.current.scale, {
      x: active ? 1.12 : 1,
      y: active ? 1.12 : 1,
      z: active ? 1.12 : 1,
      duration: quality === "cinematic" ? 0.72 : 0.28,
      ease: "power3.out"
    });

    return () => {
      timeline.kill();
    };
  }, [active, quality]);

  return (
    <RigidBody type="fixed" colliders={false} position={node.position}>
      <group
        ref={groupRef}
        onClick={(event) => {
          event.stopPropagation();
          onFocusChange(node.id);
        }}
        onPointerOut={() => setHovered(false)}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
        }}
      >
        <mesh castShadow receiveShadow position={[0, node.height / 2, 0]}>
          <boxGeometry args={[0.72, node.height, 0.72]} />
          <meshStandardMaterial
            color="#0f1715"
            emissive={node.accent}
            emissiveIntensity={active ? 0.42 : 0.16}
            metalness={0.58}
            roughness={0.35}
          />
        </mesh>

        <mesh position={[0, node.height + 0.08, 0]}>
          <boxGeometry args={[1.05, 0.12, 1.05]} />
          <meshStandardMaterial
            color={node.accent}
            emissive={node.accent}
            emissiveIntensity={active || hovered ? 1.15 : 0.58}
            metalness={0.26}
            roughness={0.22}
          />
        </mesh>

        <Float
          floatIntensity={quality === "cinematic" ? 0.65 : 0.2}
          rotationIntensity={quality === "cinematic" ? 0.38 : 0.08}
          speed={active ? 1.55 : 0.95}
        >
          <mesh position={[0, node.height + 0.72, 0]}>
            <octahedronGeometry args={[0.34, 0]} />
            <meshStandardMaterial
              color={node.accent}
              emissive={node.accent}
              emissiveIntensity={active || hovered ? 1.9 : 0.85}
              metalness={0.18}
              roughness={0.2}
            />
          </mesh>
        </Float>

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]}>
          <ringGeometry args={[0.82, 0.88, 72]} />
          <meshBasicMaterial color={node.accent} transparent opacity={active ? 0.72 : 0.34} />
        </mesh>

        <Html
          center
          className="world-node-label"
          distanceFactor={9}
          position={[0, node.height + 1.18, 0]}
          transform
        >
          <span style={{ "--node-accent": node.accent } as CSSProperties}>
            <small>{node.index}</small>
            {node.label[language]}
          </span>
        </Html>

        <pointLight
          color={bloomColor}
          distance={active ? 5.2 : 3.3}
          intensity={active || hovered ? 3.7 : 1.45}
          position={[0, node.height + 1.1, 0]}
        />
      </group>

      <CuboidCollider args={[0.74, node.height / 2, 0.74]} position={[0, node.height / 2, 0]} />
    </RigidBody>
  );
}

function ExplorerVehicle({
  onFocusChange,
  resetSignal
}: Pick<CinematicPortfolioWorldProps, "onFocusChange" | "resetSignal">) {
  const bodyRef = useRef<RapierRigidBody | null>(null);
  const vehicleRef = useRef<THREE.Group | null>(null);
  const jumpLatchRef = useRef(false);
  const lastZoneRef = useRef<CinematicWorldFocus>("core");
  const [, getKeys] = useKeyboardControls<ControlName>();

  const resetVehicle = useCallback(() => {
    const body = bodyRef.current;

    if (!body) {
      return;
    }

    body.setTranslation({ x: 0, y: 0.75, z: 1.35 }, true);
    body.setLinvel({ x: 0, y: 0, z: 0 }, true);
    body.setAngvel({ x: 0, y: 0, z: 0 }, true);
    body.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true);
    lastZoneRef.current = "core";
    onFocusChange("core");
  }, [onFocusChange]);

  useEffect(() => {
    resetVehicle();
  }, [resetSignal, resetVehicle]);

  useFrame((_, delta) => {
    const body = bodyRef.current;

    if (!body) {
      return;
    }

    const keys = getKeys();
    const direction = new THREE.Vector3(
      (keys.right ? 1 : 0) - (keys.left ? 1 : 0),
      0,
      (keys.backward ? 1 : 0) - (keys.forward ? 1 : 0)
    );
    const isMoving = direction.lengthSq() > 0.01;

    if (isMoving) {
      direction.normalize();
      const speed = keys.boost ? 9.6 : 6.4;

      body.applyImpulse(
        {
          x: direction.x * speed * delta,
          y: 0,
          z: direction.z * speed * delta
        },
        true
      );

      const angle = Math.atan2(direction.x, direction.z);

      body.setRotation(
        {
          x: 0,
          y: Math.sin(angle / 2),
          z: 0,
          w: Math.cos(angle / 2)
        },
        true
      );
    }

    const velocity = body.linvel();
    const maxVelocity = keys.boost ? 5.8 : 3.6;

    body.setLinvel(
      {
        x: clamp(velocity.x, -maxVelocity, maxVelocity),
        y: velocity.y,
        z: clamp(velocity.z, -maxVelocity, maxVelocity)
      },
      true
    );

    if (keys.jump && !jumpLatchRef.current && Math.abs(velocity.y) < 0.08) {
      body.applyImpulse({ x: 0, y: 0.28, z: 0 }, true);
      jumpLatchRef.current = true;
    }

    if (!keys.jump) {
      jumpLatchRef.current = false;
    }

    const position = body.translation();

    if (position.y < -3 || Math.abs(position.x) > 10 || Math.abs(position.z) > 10) {
      resetVehicle();
      return;
    }

    let nextZone: CinematicWorldFocus = "core";
    let nearestDistance = Number.POSITIVE_INFINITY;

    worldNodes.forEach((node) => {
      const dx = position.x - node.position[0];
      const dz = position.z - node.position[2];
      const distance = Math.sqrt(dx * dx + dz * dz);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nextZone = node.id;
      }
    });

    if (nearestDistance < 1.55 && nextZone !== lastZoneRef.current) {
      lastZoneRef.current = nextZone;
      onFocusChange(nextZone);
    }

    if (vehicleRef.current) {
      vehicleRef.current.rotation.z = THREE.MathUtils.lerp(
        vehicleRef.current.rotation.z,
        -velocity.x * 0.035,
        0.16
      );
      vehicleRef.current.rotation.x = THREE.MathUtils.lerp(
        vehicleRef.current.rotation.x,
        velocity.z * 0.025,
        0.16
      );
    }
  });

  return (
    <RigidBody
      ref={bodyRef}
      angularDamping={2.8}
      colliders="cuboid"
      friction={1.1}
      linearDamping={1.25}
      position={[0, 0.75, 1.35]}
      restitution={0.18}
    >
      <group ref={vehicleRef}>
        <mesh castShadow position={[0, 0.13, 0]}>
          <boxGeometry args={[0.9, 0.26, 1.16]} />
          <meshStandardMaterial
            color="#111918"
            emissive="#65f2c2"
            emissiveIntensity={0.34}
            metalness={0.7}
            roughness={0.28}
          />
        </mesh>
        <mesh castShadow position={[0, 0.38, -0.05]}>
          <boxGeometry args={[0.52, 0.28, 0.55]} />
          <meshStandardMaterial
            color="#1f2c2a"
            emissive="#58d7ff"
            emissiveIntensity={0.28}
            metalness={0.62}
            roughness={0.23}
          />
        </mesh>
        <mesh position={[0, 0.2, -0.63]}>
          <boxGeometry args={[0.52, 0.045, 0.035]} />
          <meshBasicMaterial color="#65f2c2" />
        </mesh>
        {[
          [-0.52, -0.02, -0.38],
          [0.52, -0.02, -0.38],
          [-0.52, -0.02, 0.38],
          [0.52, -0.02, 0.38]
        ].map(([x, y, z]) => (
          <mesh key={`${x}-${z}`} castShadow position={[x, y, z]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.15, 0.04, 12, 26]} />
            <meshStandardMaterial color="#050807" metalness={0.5} roughness={0.38} />
          </mesh>
        ))}
        <pointLight color="#65f2c2" distance={3.2} intensity={2.2} position={[0, 0.4, -0.86]} />
      </group>
    </RigidBody>
  );
}

function FuturisticDistrict({
  focus,
  language,
  onFocusChange,
  quality
}: Pick<CinematicPortfolioWorldProps, "focus" | "language" | "onFocusChange" | "quality">) {
  const groupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!groupRef.current) {
      return;
    }

    const timeline = gsap.timeline();

    timeline.fromTo(
      groupRef.current.position,
      { y: -0.22 },
      { y: 0, duration: 1.45, ease: "power3.out" }
    );
    timeline.fromTo(
      groupRef.current.rotation,
      { y: -0.16 },
      { y: 0, duration: 1.65, ease: "power3.out" },
      0
    );

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <group ref={groupRef}>
      <GroundSystem />

      {worldNodes.map((node) => (
        <WorldNodeBeacon
          active={focus === node.id}
          key={node.id}
          language={language}
          node={node}
          onFocusChange={onFocusChange}
          quality={quality}
        />
      ))}

      {quality === "cinematic" ? (
        <Sparkles
          color="#65f2c2"
          count={95}
          noise={0.6}
          opacity={0.36}
          scale={[12, 3.2, 12]}
          size={2.8}
          speed={0.23}
        />
      ) : (
        <Sparkles
          color="#58d7ff"
          count={32}
          opacity={0.22}
          scale={[10, 2.3, 10]}
          size={1.9}
          speed={0.1}
        />
      )}
    </group>
  );
}

function SceneLights({ quality }: Pick<CinematicPortfolioWorldProps, "quality">) {
  return (
    <>
      <ambientLight intensity={quality === "cinematic" ? 0.28 : 0.38} />
      <directionalLight
        castShadow={quality === "cinematic"}
        color="#f4efe2"
        intensity={quality === "cinematic" ? 1.85 : 1.2}
        position={[3.6, 6.2, 4.8]}
        shadow-camera-bottom={-8}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-mapSize-height={1536}
        shadow-mapSize-width={1536}
      />
      <pointLight color="#58d7ff" distance={8} intensity={1.6} position={[-3.6, 2.5, 2.4]} />
      <pointLight color="#ff6f61" distance={7} intensity={1.1} position={[3.8, 2.1, 3.1]} />
    </>
  );
}

export function CinematicPortfolioWorld({
  audioEnabled,
  focus,
  language,
  onFocusChange,
  quality,
  resetSignal
}: CinematicPortfolioWorldProps) {
  const dpr = quality === "cinematic" ? [1, 1.75] : [1, 1.2];

  return (
    <div className="cinematic-world-shell" aria-hidden="false">
      <SoundEngine audioEnabled={audioEnabled} focus={focus} />

      <KeyboardControls map={controls}>
        <Canvas
          camera={{ fov: 42, near: 0.1, far: 50, position: cameraByFocus.core.position }}
          dpr={dpr as [number, number]}
          gl={{
            alpha: true,
            antialias: quality === "cinematic",
            powerPreference: "high-performance"
          }}
          shadows={quality === "cinematic" ? "percentage" : false}
        >
          <Suspense fallback={null}>
            <color attach="background" args={["#050807"]} />
            <fog attach="fog" args={["#050807", 8, 20]} />
            <AssetPipelineBridge />
            <SceneLights quality={quality} />

            <Physics gravity={[0, -9.81, 0]} interpolate={quality === "cinematic"}>
              <FuturisticDistrict
                focus={focus}
                language={language}
                onFocusChange={onFocusChange}
                quality={quality}
              />
              <ExplorerVehicle onFocusChange={onFocusChange} resetSignal={resetSignal} />
            </Physics>

            <Lightformer
              color="#65f2c2"
              form="ring"
              intensity={1.6}
              position={[0, 4.2, -4]}
              scale={[7, 2.4, 1]}
            />
            {quality === "cinematic" ? (
              <ContactShadows
                blur={2.4}
                color="#030605"
                far={9}
                opacity={0.42}
                position={[0, 0.01, 0]}
                scale={14}
              />
            ) : null}
            <CameraRig focus={focus} quality={quality} />
          </Suspense>
        </Canvas>
      </KeyboardControls>
    </div>
  );
}
