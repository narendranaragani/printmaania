"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";

const FloatingTee = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.4;
    meshRef.current.position.y = Math.sin(t * 1.4) * 0.12;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <torusKnotGeometry args={[1.1, 0.35, 120, 18]} />
        <meshStandardMaterial
          color="#D32F2F"
          metalness={0.35}
          roughness={0.25}
          envMapIntensity={0.9}
        />
      </mesh>
    </Float>
  );
};

export const HeroCanvas = () => {
  return (
    <div className="relative h-[440px] w-full overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-white/10 via-transparent to-transparent">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 42 }} shadows dpr={[1, 2]}>
        <color attach="background" args={["#050505"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow color="#FFD700" />
        <directionalLight position={[-4, -3, -2]} intensity={0.4} />
        <FloatingTee />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base-dark via-transparent" />
    </div>
  );
};

