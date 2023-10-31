import { useState } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { CameraController } from "./components/CameraController";
import { useControls } from "leva";
import { setDefaultImages } from "./components/imageUtils";
import { ImageUploader } from "./components/ImageUploader";
import { Box } from "./Box";
import { MirroredRepeatWrapping, RepeatWrapping, Texture, Vector2 } from "three";
import { ImageState } from "./components/common";

function App() {
  const [images, setImages] = useState<ImageState>(setDefaultImages());

  const { lightIntensity } = useControls({
    lightIntensity: {
      value: 1,
      min: 0,
      max: 3,
      step: 0.1,
    },
  });

  const { aoMapIntensity } = useControls({
    aoMapIntensity: {
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

  const {
    roughness,
    metalness,
  } = useControls("Material", {
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
  });

  const { mirrorWrapX, mirrorWrapY } = useControls("Mirror Wrap", {
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
  const normalMap = createTexture(images.normalImage, mirrorWrapX, mirrorWrapY)
  const aoMap = createTexture(images.aoImage, mirrorWrapX, mirrorWrapY)

  const materialProps = {
    map,
    normalMap,
    aoMap,
    roughness,
    metalness,
    aoMapIntensity,
    normalScale: new Vector2(normalScale, normalScale)
  };

  return (
    <div className="app" >
      <Canvas>
        <CameraController />
        <ambientLight color={"#5C5C5C"} />
        <directionalLight position={[1, 1, 1]} intensity={lightIntensity} />
        <Box materialProps={materialProps} />
      </Canvas>

      <ImageUploader images={images} setImages={setImages} />
    </div >
  );
}

export default App;
