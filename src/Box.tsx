import { useRef, useState } from "react";
import {
  Mesh,
  MirroredRepeatWrapping,
  RepeatWrapping,
  Texture,
  Vector2,
} from "three";
import { useControls } from "leva";
import { ImageState, setDefaultImages } from "./imageUtils";

export function Box({ images }: { images: ImageState }) {
  const mesh = useRef<Mesh>(null!);
  const [active, setActive] = useState(false);

  const { aoIntensity } = useControls({
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

  const allImagesAreNull =
    images.textureImage === null &&
    images.normalImage === null &&
    images.aoImage === null;
  const { textureImage, aoImage, normalImage } = setDefaultImages();

  const texture = allImagesAreNull
    ? createTexture(textureImage, mirrorWrapX, mirrorWrapY)
    : createTexture(images.textureImage, mirrorWrapX, mirrorWrapY);
  const normal = allImagesAreNull
    ? createTexture(normalImage, mirrorWrapX, mirrorWrapY)
    : createTexture(images.normalImage, mirrorWrapX, mirrorWrapY);
  const aoTexture = allImagesAreNull
    ? createTexture(aoImage, mirrorWrapX, mirrorWrapY)
    : createTexture(images.aoImage, mirrorWrapX, mirrorWrapY);

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
