"use client";

import { ContactShadows, Environment } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";

import { BusinessUniverse } from "@/components/business/immersive/business-universe";
import { GonaMark3D } from "@/components/business/immersive/gona-mark-3d";
import { damp } from "@/components/business/immersive/business-motion";

type SceneProps = {
  scrollProgress: number;
  pointer: MutableRefObject<{ x: number; y: number }>;
  reducedMotion: boolean;
  mobile: boolean;
};

function Lights({
  pointer,
  scrollProgress,
}: {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  scrollProgress: number;
}) {
  const key = useRef<THREE.DirectionalLight>(null);
  useFrame(() => {
    if (!key.current) return;
    key.current.position.x = 2 + pointer.current.x * 1.2;
    key.current.position.y = 3 + pointer.current.y * 0.8;
    key.current.intensity = 1.15 + Math.min(scrollProgress, 0.5) * 0.25;
  });
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight ref={key} position={[2.2, 3.2, 2.5]} intensity={1.2} color="#fff5e0" />
      <directionalLight position={[-2.5, 1.2, -1.5]} intensity={0.55} color="#FFD400" />
    </>
  );
}

function CameraRig({
  scrollProgress,
  reducedMotion,
}: {
  scrollProgress: number;
  reducedMotion: boolean;
}) {
  const { camera } = useThree();
  useFrame((_, dt) => {
    const t = Math.min(dt, 0.05);
    if (reducedMotion) {
      camera.position.set(0, 0.2, 4.2);
      camera.lookAt(0, 0.1, 0);
      return;
    }
    const z = 4.4 - Math.min(scrollProgress, 0.7) * 1.1;
    const y = 0.25 + scrollProgress * 0.15;
    camera.position.x = damp(camera.position.x, 0, 3, t);
    camera.position.y = damp(camera.position.y, y, 3, t);
    camera.position.z = damp(camera.position.z, z, 3, t);
    camera.lookAt(0, 0.05, 0);
  });
  return null;
}

function SceneInner(props: SceneProps) {
  return (
    <>
      <color attach="background" args={["#0c0c0c"]} />
      <fog attach="fog" args={["#0c0c0c", 6.5, 14]} />
      <Lights pointer={props.pointer} scrollProgress={props.scrollProgress} />
      <Environment preset="city" environmentIntensity={0.25} />
      <CameraRig
        scrollProgress={props.scrollProgress}
        reducedMotion={props.reducedMotion}
      />
      <GonaMark3D {...props} />
      <BusinessUniverse
        scrollProgress={props.scrollProgress}
        reducedMotion={props.reducedMotion}
      />
      <ContactShadows
        position={[0, -1.35, 0]}
        opacity={0.35}
        scale={8}
        blur={2.4}
        far={3.5}
      />
    </>
  );
}

export function Business3DScene(props: SceneProps & { visible: boolean }) {
  const dpr = useMemo(() => (props.mobile ? ([1, 1.25] as [number, number]) : ([1, 1.5] as [number, number])), [props.mobile]);

  useEffect(() => {
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <div className="biz-v3-canvas-host absolute inset-0">
      <Canvas
        dpr={dpr}
        gl={{
          antialias: !props.mobile,
          powerPreference: "high-performance",
          alpha: false,
        }}
        camera={{ position: [0, 0.25, 4.4], fov: 42, near: 0.1, far: 40 }}
        frameloop={props.visible ? "always" : "demand"}
        onCreated={({ gl }) => {
          gl.setClearColor("#0c0c0c");
        }}
      >
        <Suspense fallback={null}>
          <SceneInner {...props} />
        </Suspense>
      </Canvas>
    </div>
  );
}
