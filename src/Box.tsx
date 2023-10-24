import { useLoader } from "@react-three/fiber";
import { useRef, useState } from "react";
import {
  Mesh,
  MirroredRepeatWrapping,
  RepeatWrapping,
  Texture,
  TextureLoader,
  Vector2,
} from "three";
import { useControls } from "leva";

type Props = {
  normalImage: HTMLImageElement | null;
  mapImage: HTMLImageElement | null;
  aoImage: HTMLImageElement | null;
  aoIntensity: number;
};

export function Box({ mapImage, normalImage, aoImage, aoIntensity }: Props) {
  const mesh = useRef<Mesh>(null!);
  const [active, setActive] = useState(false);

  const { repeatX, repeatY } = useControls("Repeat", {
    repeatX: {
      value: 4,
      min: 1,
      max: 10,
      step: 1,
    },
    repeatY: {
      value: 4,
      min: 1,
      max: 10,
      step: 1,
    },
  });
  const { normalScale } = useControls({
    normalScale: {
      value: 2,
      min: 0.5,
      max: 10,
      step: 0.1,
    },
  });

  const { mirrorWrapX, mirrorWrapY } = useControls("Mirror Wrap", {
    mirrorWrapX: {
      value: false,
    },
    mirrorWrapY: {
      value: false,
    },
  });

  const defaultTexture = useLoader(TextureLoader, "texture.jpg");
  const texture = mapImage ? new Texture(mapImage) : defaultTexture;
  texture.repeat.set(repeatX, repeatY);
  texture.wrapS = mirrorWrapX ? MirroredRepeatWrapping : RepeatWrapping;
  texture.wrapT = mirrorWrapY ? MirroredRepeatWrapping : RepeatWrapping;
  texture.needsUpdate = true;

  const defaultNormal = useLoader(TextureLoader, "normal.png");
  const normal = normalImage ? new Texture(normalImage) : defaultNormal;
  normal.wrapS = mirrorWrapX ? MirroredRepeatWrapping : RepeatWrapping;
  normal.wrapT = mirrorWrapY ? MirroredRepeatWrapping : RepeatWrapping;
  normal.needsUpdate = true;

  const defaultAO = useLoader(TextureLoader, "ao.jpg");
  const aoTexture = aoImage ? new Texture(aoImage) : defaultAO;
  aoTexture.wrapS = mirrorWrapX ? MirroredRepeatWrapping : RepeatWrapping;
  aoTexture.wrapT = mirrorWrapY ? MirroredRepeatWrapping : RepeatWrapping;
  aoTexture.needsUpdate = true;

  return (
    <mesh ref={mesh} onClick={() => setActive(!active)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        map={texture}
        normalMap={normal}
        normalScale={new Vector2(normalScale, normalScale)}
        aoMap={aoTexture}
        aoMapIntensity={aoIntensity}
      />
    </mesh>
  );
}
