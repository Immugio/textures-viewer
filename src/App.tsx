import React, { useState } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Box } from "./Box";
import { CameraController } from "./CameraController";
import { useControls } from "leva";

function App() {
  const [textureImage, setTextureImage] = useState<HTMLImageElement | null>(null);
  const [normalImage, setNormalImage] = useState<HTMLImageElement | null>(null);
  const { lightIntensity } = useControls({
    lightIntensity: {
      value: 1,
      min: 0,
      max: 3,
      step: 0.1,
    }
  });

  async function loadImage(e: React.ChangeEvent<HTMLInputElement>, setter: (image: HTMLImageElement) => void) {
    if (e?.target?.files?.[0]) {
      const data = URL.createObjectURL(e.target.files[0]);
      const image = document.createElement("img");
      image.src = data;
      setter(image);
      return;
    }
  }

  return (
        <div className="app">
            <Canvas>
                <CameraController/>
                <ambientLight color={"#5C5C5C"}/>
                <directionalLight position={[1, 1, 1]} intensity={lightIntensity}/>
                <Box mapImage={textureImage} normalImage={normalImage} />
            </Canvas>
          <div className="files">
            <div>
              <p>Texture</p>
              <input type="file" accept="image/*" onChange={e => loadImage(e, setTextureImage)} />
            </div>
            <div>
              <p>Normal</p>
              <input type="file" accept="image/*" onChange={e => loadImage(e, setNormalImage)} />
            </div>
          </div>
        </div>
    );
}

export default App;