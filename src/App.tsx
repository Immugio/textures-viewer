import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { CameraController } from "./components/CameraController";
import { useControls } from "leva";
import { setDefaultImages } from "./components/imageUtils";
import { ImageUploader } from "./components/ImageUploader";
import { Box } from "./Box";
import { MirroredRepeatWrapping, RepeatWrapping, Texture, Vector2 } from "three";
import { ImageState } from "./components/common";
import { Environment } from '@react-three/drei'

function App() {
  const [images, setImages] = useState<ImageState>(setDefaultImages());

  const { lightIntensity, aoMapIntensity, normalScaleX, normalScaleY } = useControls({
    lightIntensity: {
      value: 5,
      min: 0,
      max: 10,
      step: 0.1,
    },
    aoMapIntensity: {
      value: 1,
      min: 0.1,
      max: 10,
      step: 0.1,
    },
    normalScaleX: {
      value: 2,
      min: 0.5,
      max: 10,
      step: 0.1,
    },
    normalScaleY: {
      value: 2,
      min: 0.5,
      max: 10,
      step: 0.1,
    },
  });

  const { repeatX, repeatY } = useControls("Repeat", {
    repeatX: {
      value: 1,
      min: 1,
      max: 10,
      step: 1,
    },
    repeatY: {
      value: 1,
      min: 1,
      max: 10,
      step: 1,
    },
  });

  const {
    opacity,
    emissive,
    emissiveIntensity,
    roughness,
    metalness,
    displacementBias,
    displacementScale,
    envMapIntensity
  } = useControls("Material", {
    emissive: {
      value: "#000",
    },
    emissiveIntensity: {
      value: 0.2,
      min: 0,
      max: 1,
      step: 0.01,
    },
    roughness: {
      value: 0.5,
      min: 0,
      max: 1,
      step: 0.01,
    },
    metalness: {
      value: 0.0,
      min: 0,
      max: 1,
      step: 0.01,
    },
    displacementBias: {
      value: 0.0,
      min: -1.0,
      max: 1.0,
      step: 0.01,
    },
    displacementScale: {
      value: 0.0,
      min: 0.0,
      max: 2.0,
      step: 0.01,
    },
    opacity: {
      value: 1.0,
      min: 0,
      max: 1,
      step: 0.01,
    },
    envMapIntensity: {
      value: 1.0,
      min: 0,
      max: 2,
      step: 0.01,
    },
  });

  const {
    widthSegments,
    heightSegments,
    depthSegments,
  } = useControls("BoxGeometry", {
    widthSegments: {
      value: 50,
      min: 1,
      max: 100,
      step: 1,
    },
    heightSegments: {
      value: 50,
      min: 1,
      max: 100,
      step: 1,
    },
    depthSegments: {
      value: 50,
      min: 1,
      max: 100,
      step: 1,
    },
  });

  const { mirrorWrapX, mirrorWrapY } = useControls("MirrorWrap", {
    mirrorWrapX: {
      value: false,
    },
    mirrorWrapY: {
      value: false,
    },
  });

  const createTexture = (
    image: HTMLImageElement | null,
    wrapX: boolean,
    wrapY: boolean
  ): Texture | null => {

    if (!image) {
      return null;
    } else {

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
    }
  };

  const map = createTexture(images.textureImage, mirrorWrapX, mirrorWrapY)
  const aoMap = createTexture(images.aoImage, mirrorWrapX, mirrorWrapY)
  const normalMap = createTexture(images.normalImage, mirrorWrapX, mirrorWrapY)
  const displacementMap = createTexture(images.displacementImage, mirrorWrapX, mirrorWrapY)

  const materialProps = {
    map,
    aoMap,
    normalMap,
    displacementMap,
    opacity,
    roughness,
    metalness,
    emissive,
    aoMapIntensity,
    envMapIntensity,
    emissiveIntensity,
    displacementBias,
    displacementScale,
    normalScale: new Vector2(normalScaleX, normalScaleY)
  };

  return (
    <div className="app" >
      <Canvas>
        <Environment
          files="/assets/background.hdr"
        />
        <CameraController />
        <directionalLight position={[3.3, 1.0, 4.4]} intensity={lightIntensity} />
        <ambientLight color={"#5C5C5C"} />
        <Box materialProps={materialProps}
          widthSegments={widthSegments}
          heightSegments={heightSegments}
          depthSegments={depthSegments} />
      </Canvas>

      <ImageUploader images={images} setImages={setImages} />
    </div >
  );
}

export default App;
