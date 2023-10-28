import { useState } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Box } from "./Box";
import { CameraController } from "./CameraController";
import { useControls } from "leva";
import { ImageState, setDefaultImages } from "./imageUtils";
import { ImageUploader } from "./ImageUploader";

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

  return (
    <div className="app">
      <Canvas>
        <CameraController />
        <ambientLight color={"#5C5C5C"} />
        <directionalLight position={[1, 1, 1]} intensity={lightIntensity} />
        <Box images={images} />
      </Canvas>

      <ImageUploader images={images} setImages={setImages} />
    </div>
  );
}

export default App;
