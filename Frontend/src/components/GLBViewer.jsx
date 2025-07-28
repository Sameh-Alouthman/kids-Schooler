import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import GLBModel from "./GLBModel";

export default function GLBViewer({ url, scale = 1, cameraPos = [0, 1, 5] }) {
  return (
    <div className="w-[100%] h-[100%] relative">
      <Canvas camera={{ position: cameraPos, fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 2, 5]} intensity={1} />
        <Suspense fallback={null}>
          <GLBModel url={url} scale={scale} />
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
