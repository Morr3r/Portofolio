"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { usePortfolioStore } from "@/lib/usePortfolioStore";

type MotionProps = {
  motionScale: number;
};

type StarLayerData = {
  colors: Float32Array;
  positions: Float32Array;
};

const nebulaVertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const nebulaFragmentShader = `
  uniform vec2 uPointer;
  uniform float uTime;
  varying vec2 vUv;

  float hash(vec2 point) {
    return fract(sin(dot(point, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 point) {
    vec2 cell = floor(point);
    vec2 local = fract(point);
    vec2 curve = local * local * (3.0 - 2.0 * local);

    float a = hash(cell);
    float b = hash(cell + vec2(1.0, 0.0));
    float c = hash(cell + vec2(0.0, 1.0));
    float d = hash(cell + vec2(1.0, 1.0));

    return mix(mix(a, b, curve.x), mix(c, d, curve.x), curve.y);
  }

  float fbm(vec2 point) {
    float value = 0.0;
    float amplitude = 0.5;

    for (int octave = 0; octave < 5; octave++) {
      value += amplitude * noise(point);
      point *= 2.05;
      amplitude *= 0.52;
    }

    return value;
  }

  float softCircle(vec2 uv, vec2 center, float radius, float blur) {
    float dist = distance(uv, center);
    return 1.0 - smoothstep(radius, radius + blur, dist);
  }

  void main() {
    vec2 uv = vUv;
    vec2 drift = uPointer * 0.055;
    vec2 shifted = uv - vec2(0.5, 0.52) + vec2(drift.x * -0.35, drift.y * 0.24);
    float bandDistance = abs(shifted.y - shifted.x * 0.32);
    float diagonalBand = smoothstep(0.36, 0.02, bandDistance) * smoothstep(0.92, 0.16, length(shifted));
    float bandCore = smoothstep(0.12, 0.0, bandDistance) * smoothstep(0.58, 0.08, length(shifted));
    float dust = fbm(uv * 4.4 + vec2(uTime * 0.014, -uTime * 0.01) + drift);
    float fineDust = fbm(uv * 18.0 - drift * 2.2);
    float microDust = fbm(uv * 54.0 + drift * 1.6);
    float sparkle = pow(hash(floor((uv + drift * 0.08) * 520.0)), 34.0);
    sparkle *= smoothstep(0.22, 0.86, diagonalBand + fineDust * 0.44);
    float starGrid = pow(hash(floor((uv + drift * 0.02) * 760.0)), 72.0);
    float brightStarGrid = pow(hash(floor((uv * vec2(510.0, 380.0)) + 19.0)), 58.0);

    vec3 deepSpace = vec3(0.006, 0.012, 0.034);
    vec3 cobalt = vec3(0.010, 0.070, 0.170);
    vec3 color = mix(deepSpace, cobalt, smoothstep(0.02, 1.0, uv.y));

    float cyanCloud = softCircle(uv, vec2(0.44 + drift.x * 0.35, 0.54 + drift.y * 0.22), 0.10, 0.34);
    float blueCloud = softCircle(uv, vec2(0.34 + drift.x, 0.44 + drift.y * 0.4), 0.22, 0.48);
    float violetCloud = softCircle(uv, vec2(0.74 - drift.x * 0.7, 0.68 - drift.y * 0.38), 0.24, 0.42);
    float magentaCloud = softCircle(uv, vec2(0.86 - drift.x * 0.5, 0.36 - drift.y * 0.2), 0.18, 0.42);
    float amberCore = softCircle(uv, vec2(0.60 + drift.x * 0.24, 0.58 + drift.y * 0.18), 0.055, 0.19);
    float leftStarGlow = softCircle(uv, vec2(0.08 + drift.x * 0.16, 0.64), 0.018, 0.12);
    float lowerStarGlow = softCircle(uv, vec2(0.78 - drift.x * 0.18, 0.24), 0.02, 0.13);
    float shimmer = sin((uv.x * 44.0 + uv.y * 21.0) + uTime * 0.28) * 0.5 + 0.5;
    float vignette = smoothstep(0.94, 0.22, distance(uv, vec2(0.5, 0.52)));

    color += vec3(0.35, 0.82, 1.00) * diagonalBand * (0.16 + dust * 0.22);
    color += vec3(0.92, 0.84, 1.00) * bandCore * (0.18 + fineDust * 0.24);
    color += vec3(0.03, 0.54, 1.00) * cyanCloud * (0.22 + dust * 0.34);
    color += vec3(0.00, 0.35, 0.82) * blueCloud * 0.25;
    color += vec3(0.58, 0.18, 0.88) * violetCloud * (0.22 + fineDust * 0.16);
    color += vec3(0.95, 0.18, 0.58) * magentaCloud * 0.16;
    color += vec3(1.00, 0.72, 0.36) * amberCore * 0.28;
    color += vec3(0.74, 0.94, 1.00) * leftStarGlow * 0.86;
    color += vec3(1.00, 0.94, 0.82) * lowerStarGlow * 0.76;
    color += vec3(0.12, 0.19, 0.36) * microDust * 0.18;
    color += vec3(0.75, 0.94, 1.0) * sparkle * 0.5;
    color += vec3(0.82, 0.94, 1.00) * starGrid * 0.46;
    color += vec3(1.00, 0.82, 0.96) * brightStarGrid * 0.28;
    color += shimmer * diagonalBand * vec3(0.016, 0.034, 0.058);
    color *= mix(0.58, 1.2, vignette);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function createSeededRandom(seed: number) {
  let value = seed;

  return () => {
    value |= 0;
    value = (value + 0x6d2b79f5) | 0;

    let next = Math.imul(value ^ (value >>> 15), 1 | value);
    next = (next + Math.imul(next ^ (next >>> 7), 61 | next)) ^ next;

    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}

function createStarLayer(count: number, seed: number, spread: number, depth: number): StarLayerData {
  const random = createSeededRandom(seed);
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const palette = ["#dff9ff", "#87dfff", "#7fa8ff", "#c4abff", "#ffd49a"].map((color) => new THREE.Color(color));

  for (let index = 0; index < count; index += 1) {
    const positionIndex = index * 3;
    const color = palette[Math.floor(random() * palette.length)];
    const brightness = 0.62 + random() * 0.46;

    positions[positionIndex] = (random() - 0.5) * spread;
    positions[positionIndex + 1] = random() * 8.8 - 1.7;
    positions[positionIndex + 2] = -4.8 - random() * depth;

    colors[positionIndex] = color.r * brightness;
    colors[positionIndex + 1] = color.g * brightness;
    colors[positionIndex + 2] = color.b * brightness;
  }

  return { colors, positions };
}

function createGalacticDustLayer(count: number, seed: number, thickness: number, spread: number): StarLayerData {
  const random = createSeededRandom(seed);
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const palette = ["#eefcff", "#b7f2ff", "#75cfff", "#a99cff", "#df8fff", "#ffd4b2"].map(
    (color) => new THREE.Color(color)
  );

  for (let index = 0; index < count; index += 1) {
    const positionIndex = index * 3;
    const color = palette[Math.floor(random() * palette.length)];
    const x = (random() - 0.5) * spread;
    const bandNoise = (random() - 0.5) * thickness * (0.45 + random() * 1.1);
    const coreBias = Math.pow(random(), 3) * 0.9;
    const y = 2.36 + x * 0.28 + bandNoise - coreBias;
    const brightness = 0.54 + random() * 0.68;

    positions[positionIndex] = x;
    positions[positionIndex + 1] = y;
    positions[positionIndex + 2] = -7.2 - random() * 6.2;

    colors[positionIndex] = color.r * brightness;
    colors[positionIndex + 1] = color.g * brightness;
    colors[positionIndex + 2] = color.b * brightness;
  }

  return { colors, positions };
}

function useReducedMotionPreference() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => setReducedMotion(mediaQuery.matches);

    syncMotionPreference();
    mediaQuery.addEventListener("change", syncMotionPreference);

    return () => {
      mediaQuery.removeEventListener("change", syncMotionPreference);
    };
  }, []);

  return reducedMotion;
}

function NebulaPlane({ motionScale }: MotionProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const forwardVector = useMemo(() => new THREE.Vector3(), []);
  const pointerTarget = useMemo(() => new THREE.Vector2(), []);
  const uniforms = useMemo(
    () => ({
      uPointer: { value: new THREE.Vector2() },
      uTime: { value: 0 }
    }),
    []
  );

  useFrame(({ camera, clock, pointer, viewport }, delta) => {
    const material = materialRef.current;

    if (meshRef.current) {
      camera.getWorldDirection(forwardVector);
      meshRef.current.position.copy(camera.position).addScaledVector(forwardVector, 36);
      meshRef.current.quaternion.copy(camera.quaternion);

      const currentViewport = viewport.getCurrentViewport(camera, meshRef.current.position);
      meshRef.current.scale.set(currentViewport.width * 1.35, currentViewport.height * 1.35, 1);
    }

    if (material) {
      material.uniforms.uTime.value = clock.elapsedTime * (motionScale === 0 ? 0.06 : 1);
      pointerTarget.set(pointer.x * motionScale, pointer.y * motionScale);
      (material.uniforms.uPointer.value as THREE.Vector2).lerp(pointerTarget, Math.min(delta * 2.1, 1));
    }
  });

  return (
    <mesh ref={meshRef} frustumCulled={false} renderOrder={-48}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        depthTest={false}
        depthWrite={false}
        fragmentShader={nebulaFragmentShader}
        uniforms={uniforms}
        vertexShader={nebulaVertexShader}
      />
    </mesh>
  );
}

function StarField({
  count,
  depth,
  motionScale,
  opacity,
  seed,
  size,
  spread
}: MotionProps & {
  count: number;
  depth: number;
  opacity: number;
  seed: number;
  size: number;
  spread: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const { colors, positions } = useMemo(() => createStarLayer(count, seed, spread, depth), [count, depth, seed, spread]);
  const geometry = useMemo(() => {
    const starGeometry = new THREE.BufferGeometry();

    starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    return starGeometry;
  }, [colors, positions]);

  useFrame(({ clock, pointer }, delta) => {
    const points = pointsRef.current;

    if (!points) {
      return;
    }

    const motion = motionScale;
    points.rotation.y += delta * 0.006 * motion;
    points.rotation.x = THREE.MathUtils.lerp(points.rotation.x, pointer.y * 0.018 * motion, Math.min(delta * 1.8, 1));
    points.position.x = THREE.MathUtils.lerp(points.position.x, pointer.x * 0.18 * motion, Math.min(delta * 1.65, 1));
    points.position.y =
      THREE.MathUtils.lerp(points.position.y, Math.sin(clock.elapsedTime * 0.12) * 0.08 * motion, Math.min(delta, 1));
  });

  return (
    <points ref={pointsRef} frustumCulled={false} geometry={geometry} renderOrder={-32}>
      <pointsMaterial
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        opacity={opacity}
        size={size}
        sizeAttenuation
        toneMapped={false}
        transparent
        vertexColors
      />
    </points>
  );
}

function GalacticDustBand({
  count,
  motionScale,
  opacity,
  seed,
  size,
  thickness
}: MotionProps & {
  count: number;
  opacity: number;
  seed: number;
  size: number;
  thickness: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const { colors, positions } = useMemo(() => createGalacticDustLayer(count, seed, thickness, 20.5), [count, seed, thickness]);
  const geometry = useMemo(() => {
    const dustGeometry = new THREE.BufferGeometry();

    dustGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    dustGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    return dustGeometry;
  }, [colors, positions]);

  useFrame(({ clock, pointer }, delta) => {
    const points = pointsRef.current;

    if (!points) {
      return;
    }

    points.position.x = THREE.MathUtils.lerp(points.position.x, pointer.x * -0.24 * motionScale, Math.min(delta * 1.45, 1));
    points.position.y = THREE.MathUtils.lerp(
      points.position.y,
      Math.sin(clock.elapsedTime * 0.11) * 0.07 * motionScale,
      Math.min(delta * 1.1, 1)
    );
    points.rotation.z = THREE.MathUtils.lerp(points.rotation.z, pointer.x * 0.018 * motionScale, Math.min(delta * 1.2, 1));
  });

  return (
    <points ref={pointsRef} frustumCulled={false} geometry={geometry} renderOrder={-36}>
      <pointsMaterial
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        opacity={opacity}
        size={size}
        sizeAttenuation
        toneMapped={false}
        transparent
        vertexColors
      />
    </points>
  );
}

function OrbitingWorlds({ motionScale }: MotionProps) {
  const groupRef = useRef<THREE.Group>(null);
  const leftOrbitRef = useRef<THREE.Group>(null);
  const rightOrbitRef = useRef<THREE.Group>(null);

  useFrame(({ clock, pointer }, delta) => {
    const group = groupRef.current;

    if (group) {
      group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, pointer.x * 0.045 * motionScale, Math.min(delta * 1.4, 1));
      group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, -pointer.y * 0.028 * motionScale, Math.min(delta * 1.4, 1));
    }

    if (leftOrbitRef.current) {
      leftOrbitRef.current.rotation.z = clock.elapsedTime * 0.09 * motionScale;
    }

    if (rightOrbitRef.current) {
      rightOrbitRef.current.rotation.y = clock.elapsedTime * -0.07 * motionScale;
    }
  });

  return (
    <group ref={groupRef} renderOrder={-28}>
      <group position={[-5.85, 2.72, -7.4]} rotation={[0.08, -0.22, -0.12]} scale={1.08}>
        <pointLight color="#38dfff" distance={5.8} intensity={0.52} />
        <mesh>
          <sphereGeometry args={[0.46, 48, 28]} />
          <meshStandardMaterial
            color="#1c7fca"
            emissive="#0b74d6"
            emissiveIntensity={0.34}
            metalness={0.18}
            roughness={0.36}
          />
        </mesh>
        <mesh rotation={[1.18, 0.22, 0.58]}>
          <torusGeometry args={[0.72, 0.012, 10, 128]} />
          <meshBasicMaterial color="#7ee8ff" depthWrite={false} opacity={0.72} toneMapped={false} transparent />
        </mesh>
        <mesh rotation={[1.02, -0.4, 0.18]}>
          <torusGeometry args={[0.88, 0.006, 8, 128]} />
          <meshBasicMaterial color="#b894ff" depthWrite={false} opacity={0.42} toneMapped={false} transparent />
        </mesh>
        <group ref={leftOrbitRef}>
          <mesh position={[0.98, 0.04, 0]}>
            <sphereGeometry args={[0.055, 20, 12]} />
            <meshBasicMaterial color="#ffd18f" toneMapped={false} />
          </mesh>
        </group>
      </group>

      <group position={[5.65, 3.35, -8.7]} rotation={[0.42, 0.38, 0.2]} scale={0.96}>
        <pointLight color="#8e6cff" distance={5.6} intensity={0.38} />
        <mesh>
          <sphereGeometry args={[0.34, 42, 24]} />
          <meshStandardMaterial
            color="#5c3fd7"
            emissive="#5336ff"
            emissiveIntensity={0.28}
            metalness={0.12}
            roughness={0.44}
          />
        </mesh>
        <group ref={rightOrbitRef}>
          <mesh rotation={[1.42, 0.16, -0.34]}>
            <torusGeometry args={[0.56, 0.008, 8, 108]} />
            <meshBasicMaterial color="#6ee7ff" depthWrite={false} opacity={0.58} toneMapped={false} transparent />
          </mesh>
          <mesh position={[-0.62, 0.18, 0]}>
            <sphereGeometry args={[0.036, 18, 10]} />
            <meshBasicMaterial color="#e9fbff" toneMapped={false} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

function ConstellationTrails({ motionScale }: MotionProps) {
  const trailRef = useRef<THREE.Group>(null);

  useFrame(({ clock, pointer }, delta) => {
    const trail = trailRef.current;

    if (!trail) {
      return;
    }

    trail.position.x = THREE.MathUtils.lerp(trail.position.x, pointer.x * -0.24 * motionScale, Math.min(delta * 1.35, 1));
    trail.position.y =
      THREE.MathUtils.lerp(trail.position.y, Math.sin(clock.elapsedTime * 0.16) * 0.06 * motionScale, Math.min(delta, 1));
  });

  return (
    <group ref={trailRef} renderOrder={-30}>
      {[
        [-3.7, 4.8, -6.8, 0.9, 0.008, -0.56, "#69e6ff", 0.46],
        [3.4, 1.72, -6.2, 1.15, 0.007, 0.48, "#b692ff", 0.35],
        [0.5, 5.08, -7.8, 1.35, 0.006, 0.12, "#ffd09a", 0.28]
      ].map(([x, y, z, radius, tube, rotation, color, opacity]) => (
        <mesh
          key={`${x}-${y}-${z}`}
          position={[x as number, y as number, z as number]}
          rotation={[1.18, rotation as number, 0.22]}
        >
          <torusGeometry args={[radius as number, tube as number, 8, 132, Math.PI * 1.34]} />
          <meshBasicMaterial
            color={color as string}
            depthWrite={false}
            opacity={opacity as number}
            toneMapped={false}
            transparent
          />
        </mesh>
      ))}
    </group>
  );
}

export function SpaceBackdrop() {
  const quality = usePortfolioStore((state) => state.quality);
  const reducedMotion = useReducedMotionPreference();
  const motionScale = reducedMotion ? 0 : quality === "cinematic" ? 1 : 0.45;
  const denseStarCount = quality === "cinematic" ? 1160 : 560;
  const distantStarCount = quality === "cinematic" ? 720 : 340;
  const dustCount = quality === "cinematic" ? 1850 : 920;
  const brightDustCount = quality === "cinematic" ? 520 : 260;

  return (
    <>
      <NebulaPlane motionScale={motionScale} />
      <GalacticDustBand
        count={dustCount}
        motionScale={motionScale}
        opacity={0.58}
        seed={77}
        size={0.026}
        thickness={2.15}
      />
      <GalacticDustBand
        count={brightDustCount}
        motionScale={motionScale * 0.72}
        opacity={0.72}
        seed={103}
        size={0.062}
        thickness={0.74}
      />
      <StarField count={denseStarCount} depth={12} motionScale={motionScale} opacity={0.82} seed={19} size={0.035} spread={22} />
      <StarField
        count={distantStarCount}
        depth={20}
        motionScale={motionScale * 0.55}
        opacity={0.56}
        seed={47}
        size={0.05}
        spread={30}
      />
      <ConstellationTrails motionScale={motionScale} />
      <OrbitingWorlds motionScale={motionScale} />
    </>
  );
}
