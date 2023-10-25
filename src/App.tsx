import { useState, ChangeEvent } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Box } from "./Box";
import { CameraController } from "./CameraController";
import { useControls } from "leva";

interface ImageInputs {
  key: keyof ImageState;
  label: string;
}

interface ImageState {
  textureImage: HTMLImageElement | null;
  normalImage: HTMLImageElement | null;
  aoImage: HTMLImageElement | null;
}

const imageInputs: ImageInputs[] = [
  { key: "textureImage", label: "Texture" },
  { key: "normalImage", label: "Normal" },
  { key: "aoImage", label: "AO" },
];

const defaultImages: ImageState = {
  textureImage: setdefaultImage("/texture.jpg"),
  normalImage: setdefaultImage("/normal.png"),
  aoImage: setdefaultImage("/ao.jpg"),
};

function setdefaultImage(src: string): HTMLImageElement {
  const image = new Image();
  image.src = src;
  return image;
}

function App() {
  const [images, setImages] = useState<ImageState>(defaultImages);

  const { lightIntensity, aoIntensity } = useControls({
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

  const loadImage = async (
    e: ChangeEvent<HTMLInputElement>,
    key: keyof ImageState
  ) => {
    if (e?.target?.files?.[0]) {
      const data = URL.createObjectURL(e.target.files[0]);
      const image = document.createElement("img");

      image.onload = () => {
        setImages((prevImages) => ({ ...prevImages, [key]: image }));
      };

      image.src = data;
    }
  };

  const removeImage = (key: keyof ImageState) => {
    setImages((prevImages) => ({ ...prevImages, [key]: null }));
  };

  return (
    <div className="app">
      <Canvas>
        <CameraController />
        <ambientLight color={"#5C5C5C"} />
        <directionalLight position={[1, 1, 1]} intensity={lightIntensity} />
        <Box
          mapImage={images.textureImage}
          normalImage={images.normalImage}
          aoImage={images.aoImage}
          aoIntensity={aoIntensity}
        />
      </Canvas>

      <div className="files">
        {imageInputs.map((input: ImageInputs) => (
          <div key={input.key}>
            <p>{input.label}</p>
            {images[input.key] ? (
              <div className="image-container">
                <button
                  className="remove-button"
                  onClick={() => removeImage(input.key)}
                >
                  X
                </button>
                <img
                  width={100}
                  height={100}
                  src={images[input.key]!.src}
                  alt={input.label}
                />
              </div>
            ) : (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => loadImage(e, input.key)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
