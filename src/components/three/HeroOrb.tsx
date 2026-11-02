import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Float, Torus } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { usePerfTier, type PerfSettings } from "@/hooks/usePerfTier";
import aleemPic from "@/assets/Aleempic1.png";

/** Circular 3D portrait medallion: beveled metal disc, cyan glowing rim and depth. */
function PhotoMedallion({ perf }: { perf: PerfSettings }) {
  const texture = useLoader(THREE.TextureLoader, aleemPic);
  const group = useRef<THREE.Group>(null);

  const seg = Math.max(24, Math.round(64 * perf.detail));
  const tube = Math.max(6, Math.round(16 * perf.detail));

  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = perf.tier === "high" ? 4 : 1;
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
  }, [texture, perf.tier]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g || perf.reducedMotion) return;
    const tx = -state.pointer.y * 0.28 * perf.parallax;
    const ty = state.pointer.x * 0.42 * perf.parallax;
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, tx, 4, delta);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, ty, 4, delta);
  });

  return (
    <group ref={group} position={[0, 0, 0.4]}>
      {/* metal body giving the portrait real thickness */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.14]}>
        <cylinderGeometry args={[1.42, 1.42, 0.28, seg]} />
        <meshStandardMaterial color="#0b1a29" metalness={0.9} roughness={0.28} />
      </mesh>
      {/* portrait face */}
      <mesh position={[0, 0, 0.01]}>
        <circleGeometry args={[1.36, seg]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      {/* polished rim */}
      <Torus args={[1.42, 0.05, tube, seg]}>
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#0891b2"
          emissiveIntensity={0.7}
          metalness={1}
          roughness={0.2}
        />
      </Torus>
      {/* accent halo */}
      <Torus args={[1.66, 0.012, 6, seg]} rotation={[0.4, 0.2, 0]}>
        <meshBasicMaterial color="#fbbf24" transparent opacity={0.6} />
      </Torus>
    </group>
  );
}

function Rings({ perf }: { perf: PerfSettings }) {
  const g = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (g.current && !perf.reducedMotion) g.current.rotation.z += delta * 0.1;
  });
  const seg = Math.max(48, Math.round(160 * perf.detail));
  return (
    <group ref={g} rotation={[1.1, 0.2, 0]}>
      <Torus args={[2.9, 0.014, 6, seg]}>
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.7} />
      </Torus>
      {perf.extras && (
        <Torus args={[3.35, 0.01, 6, seg]} rotation={[0.5, 0.4, 0]}>
          <meshBasicMaterial color="#fbbf24" transparent opacity={0.5} />
        </Torus>
      )}
    </group>
  );
}

export default function HeroOrb() {
  const perf = usePerfTier();

  return (
    <Canvas
      dpr={perf.dpr}
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ antialias: perf.antialias, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 6]} intensity={1.4} color="#bae6fd" />
      {perf.extras && (
        <pointLight position={[-4, -2, 3]} intensity={22} color="#fbbf24" distance={14} />
      )}
      <Suspense fallback={null}>
        <Float
          speed={perf.reducedMotion ? 0 : 1.2}
          rotationIntensity={perf.reducedMotion ? 0 : 0.28 * perf.parallax}
          floatIntensity={perf.reducedMotion ? 0 : 0.7 * perf.parallax}
        >
          <PhotoMedallion perf={perf} />
        </Float>
      </Suspense>
      <Rings perf={perf} />
    </Canvas>
  );
}

// Preload texture so it loads immediately in cache
useLoader.preload(THREE.TextureLoader, aleemPic);
