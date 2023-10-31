import { useEffect, useRef } from "react";
import * as THREE from 'three';
import { Mesh } from "three";
import { MaterialProps } from "./components/common";
interface BoxProps {
  materialProps: MaterialProps;
}
export function Box({ materialProps }: BoxProps) {
  const mesh = useRef<Mesh>(null);

  useEffect(() => {
    if (mesh?.current?.material instanceof THREE.MeshStandardMaterial) {
      mesh.current.material.needsUpdate = true;
    }
  }, [materialProps]);

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        {...materialProps}
      />
    </mesh>
  );
}