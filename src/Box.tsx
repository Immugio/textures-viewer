import { useRef } from "react";
import { Mesh, Texture } from "three";
import { MaterialProps } from "./components/common";
interface BoxProps {
  materialProps: MaterialProps;
}
export function Box({ materialProps }: BoxProps) {
  const mesh = useRef<Mesh>(null);
  const {
    map,
    normalMap,
    aoMap,
    normalScale,
    opacity,
    roughness,
    metalness,
    bumpScale,
    aoMapIntensity,
    envMapIntensity,
    displacementScale,
    displacementBias,
    emissiveIntensity,
    lightMapIntensity,
  } = materialProps;

  const data = {
    map: !map ? new Texture : map,
    normalMap: !normalMap ? new Texture : normalMap,
    aoMap: !aoMap ? new Texture : aoMap,
    normalScale,
    opacity,
    roughness,
    metalness,
    bumpScale,
    aoMapIntensity,
    envMapIntensity,
    displacementScale,
    displacementBias,
    emissiveIntensity,
    lightMapIntensity,
  };

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        // map={null}
        // normalMap={null}
        // aoMap={null}
        {...data}
        transparent={true} />
    </mesh>
  );
}