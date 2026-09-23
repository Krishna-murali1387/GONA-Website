"use client";

import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";

import { damp } from "@/components/business/immersive/business-motion";
import { siteConfig } from "@/config/site.config";

type Props = {
  scrollProgress: number;
  pointer: MutableRefObject<{ x: number; y: number }>;
  reducedMotion: boolean;
  mobile: boolean;
};

/**
 * OPTION B — official GONA mark as dimensional layered planes.
 * No invented letter geometry; uses /brand/gona-logo.png.
 */
export function GonaMark3D({ scrollProgress, pointer, reducedMotion, mobile }: Props) {
  const group = useRef<THREE.Group>(null);
  const texture = useTexture(siteConfig.assets.logo);
  const rot = useRef({ x: 0, y: 0 });

  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
  }, [texture]);

  const scale = mobile ? 1.35 : 1.75;

  useFrame((_, dt) => {
    if (!group.current) return;
    const t = Math.min(dt, 0.05);

    if (reducedMotion) {
      group.current.rotation.x = 0.08;
      group.current.rotation.y = -0.12;
      group.current.position.y = 0.1;
      group.current.scale.setScalar(scale * 0.92);
      return;
    }

    const p = scrollProgress;
    // Entrance → universe: gentle scroll-driven yaw
    const scrollYaw = p * 0.85;
    const scrollPitch = p * 0.18;
    const rise = -p * 0.35;
    const shrink = 1 - Math.min(p, 0.55) * 0.22;

    const targetY = pointer.current.x * 0.12 + scrollYaw;
    const targetX = pointer.current.y * 0.07 + scrollPitch;

    rot.current.y = damp(rot.current.y, targetY, 4.2, t);
    rot.current.x = damp(rot.current.x, targetX, 4.2, t);

    group.current.rotation.y = rot.current.y;
    group.current.rotation.x = rot.current.x;
    group.current.position.y = 0.15 + rise;
    group.current.scale.setScalar(scale * shrink);
  });

  return (
    <group ref={group}>
      {/* Graphite depth plate */}
      <mesh position={[0, 0, -0.045]} castShadow={false}>
        <planeGeometry args={[1.08, 1.08]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.55} roughness={0.42} />
      </mesh>
      {/* Soft bevel ring */}
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[1.02, 1.02]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.4} roughness={0.5} />
      </mesh>
      {/* Official mark face */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial
          map={texture}
          transparent
          metalness={0.15}
          roughness={0.35}
          emissive="#FFD400"
          emissiveIntensity={0.08}
        />
      </mesh>
      {/* Yellow accent edge hint */}
      <mesh position={[0, 0, -0.06]}>
        <planeGeometry args={[1.14, 1.14]} />
        <meshBasicMaterial color="#FFD400" transparent opacity={0.12} />
      </mesh>
    </group>
  );
}
