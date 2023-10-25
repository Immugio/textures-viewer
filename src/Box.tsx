import { useRef, useState } from "react";
import {
  Mesh,
  MirroredRepeatWrapping,
  RepeatWrapping,
  Texture,
  Vector2,
} from "three";
import { useControls } from "leva";

type Props = {
  normalImage: HTMLImageElement | null;
  mapImage: HTMLImageElement | null;
  aoImage: HTMLImageElement | null;
};

export function Box({ mapImage, normalImage, aoImage }: Props) {
  const mesh = useRef<Mesh>(null!);
  const [active, setActive] = useState(false);

  const { lightIntensity, aoIntensity } = useControls("Intensity", {
    lightIntensity: {
      value: 1,
      min: 0,
      max: 3,
      step: 0.1,
    },
    aoIntensity: {
      value: 1,
      min: 0.1,
      max: 10,
      step: 0.1,
    },
  });

  const { repeatX, repeatY, normalScale } = useControls("Repeat", {
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

  const placeholderTexture = new Texture();
  placeholderTexture.image = new Image();

  const createTexture = (
    image: HTMLImageElement | null,
    wrapX: boolean,
    wrapY: boolean
  ): Texture | null => {
    if (image) {
      const texture = new Texture();
      texture.image = image;

      if (image.complete) {
        texture.needsUpdate = true;
      } else {
        image.addEventListener("load", () => {
          texture.needsUpdate = true;
        });
      }

      texture.repeat.set(repeatX, repeatY);
      texture.wrapS = wrapX ? MirroredRepeatWrapping : RepeatWrapping;
      texture.wrapT = wrapY ? MirroredRepeatWrapping : RepeatWrapping;

      return texture;
    } else {
      return placeholderTexture;
    }
  };

  const texture = createTexture(mapImage, mirrorWrapX, mirrorWrapY);
  const normal = createTexture(normalImage, mirrorWrapX, mirrorWrapY);
  const aoTexture = createTexture(aoImage, mirrorWrapX, mirrorWrapY);

  return (
    <>
      <directionalLight position={[1, 1, 1]} intensity={lightIntensity} />

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
    </>
  );
}
