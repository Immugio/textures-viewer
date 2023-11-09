import { useEffect, useRef } from "react";
import * as THREE from 'three';
import { Mesh } from "three";
import { MaterialProps } from "./components/common";
interface BoxProps {
  materialProps: MaterialProps;
  widthSegments: number;
  heightSegments: number;
  depthSegments: number;
}

export function Box({ materialProps, widthSegments, heightSegments, depthSegments }: BoxProps) {
  const mesh = useRef<Mesh>(null);

  useEffect(() => {
    if (mesh?.current?.material instanceof THREE.MeshStandardMaterial) {
      mesh.current.material.needsUpdate = true;
    }
  }, [materialProps]);

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[2, 2, 2, widthSegments, heightSegments, depthSegments]} />
      <meshStandardMaterial
        {...materialProps}
      />
    </mesh>
  );
}