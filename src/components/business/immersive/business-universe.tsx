"use client";

import { Html, Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

import {
  UNIVERSE_LAYOUT,
  V3_PRODUCTS,
  type V3ProductId,
  damp,
} from "@/components/business/immersive/business-motion";

type NodeProps = {
  id: V3ProductId;
  scrollProgress: number;
  reducedMotion: boolean;
};

function productMeta(id: V3ProductId) {
  return V3_PRODUCTS.find((p) => p.id === id)!;
}

function UniverseNode({ id, scrollProgress, reducedMotion }: NodeProps) {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const meta = productMeta(id);
  const layout = UNIVERSE_LAYOUT[id];
  const available = meta.status === "available";

  const basePos = useMemo(() => {
    const rad = (layout.angle * Math.PI) / 180;
    return new THREE.Vector3(
      Math.cos(rad) * layout.radius,
      layout.elevation,
      Math.sin(rad) * layout.radius,
    );
  }, [layout]);

  useFrame((_, dt) => {
    if (!group.current) return;
    const t = Math.min(dt, 0.05);
    // Appear after entrance
    const appear = Math.max(0, Math.min(1, (scrollProgress - 0.18) / 0.22));
    // Cable advances in transition phase
    const cableAdvance =
      available && scrollProgress > 0.55
        ? Math.min(1, (scrollProgress - 0.55) / 0.25)
        : 0;
    const dimOthers =
      !available && scrollProgress > 0.55
        ? Math.min(1, (scrollProgress - 0.55) / 0.2)
        : 0;

    const towardCamera = available ? cableAdvance * 0.85 : 0;
    const hoverBoost = hovered && available ? 0.2 : 0;
    const target = basePos
      .clone()
      .multiplyScalar(appear)
      .add(new THREE.Vector3(0, 0, towardCamera + hoverBoost));

    if (reducedMotion) {
      group.current.position.copy(basePos.clone().multiplyScalar(0.85));
      group.current.scale.setScalar(available ? 1 : 0.72);
      return;
    }

    group.current.position.x = damp(group.current.position.x, target.x, 3.5, t);
    group.current.position.y = damp(group.current.position.y, target.y, 3.5, t);
    group.current.position.z = damp(group.current.position.z, target.z, 3.5, t);
    const s = (available ? 1 : 0.78) * appear * (1 - dimOthers * 0.45);
    group.current.scale.setScalar(Math.max(0.001, s));
    group.current.visible = appear > 0.02;
  });

  const color = available ? "#FFD400" : "#6a6a6a";

  return (
    <group ref={group}>
      <Line
        points={[
          [0, 0, 0],
          [basePos.x * 0.92, basePos.y * 0.92, basePos.z * 0.92],
        ]}
        color={available ? "#FFD400" : "#333333"}
        lineWidth={available ? 1.2 : 0.6}
        transparent
        opacity={available ? 0.55 : 0.25}
      />
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = available ? "pointer" : "default";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <sphereGeometry args={[available ? 0.12 : 0.08, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={available ? "#FFD400" : "#222222"}
          emissiveIntensity={available ? (hovered ? 0.85 : 0.45) : 0.05}
          metalness={0.35}
          roughness={0.4}
        />
      </mesh>
      <Html
        center
        distanceFactor={6.5}
        style={{ pointerEvents: available ? "auto" : "none" }}
        zIndexRange={[40, 0]}
      >
        <div
          className={`select-none whitespace-nowrap rounded-full border px-2.5 py-1 text-[0.65rem] font-bold tracking-wide backdrop-blur-sm ${
            available
              ? "border-[#FFD400]/50 bg-[#111111]/85 text-[#FFD400]"
              : "border-white/10 bg-[#111111]/75 text-white/45"
          }`}
        >
          {available ? (
            <Link href="/business/cable" className="inline-flex items-center gap-1.5">
              <span>{meta.name}</span>
              <span className="text-[0.55rem] tracking-[0.14em] uppercase opacity-80">
                Available
              </span>
            </Link>
          ) : (
            <span title={meta.subtitle}>
              {meta.name.replace("GONA ", "")}
              <span className="ml-1.5 text-[0.55rem] tracking-[0.12em] text-white/30 uppercase">
                Soon
              </span>
            </span>
          )}
        </div>
      </Html>
    </group>
  );
}

export function BusinessUniverse({
  scrollProgress,
  reducedMotion,
}: {
  scrollProgress: number;
  reducedMotion: boolean;
}) {
  return (
    <group>
      {V3_PRODUCTS.map((p) => (
        <UniverseNode
          key={p.id}
          id={p.id}
          scrollProgress={scrollProgress}
          reducedMotion={reducedMotion}
        />
      ))}
    </group>
  );
}
