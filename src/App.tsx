import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { Canvas, ThreeElements, useLoader, useThree } from "@react-three/fiber";
import { RepeatWrapping, TextureLoader, Vector2 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function App() {
  return (
    <div className="app">
      <Canvas>
          <CameraController />
        <ambientLight color={"#5C5C5C"} />
        <directionalLight position={[10, 10, 10]} />
        <Box position={[0, 0, 0]} />
      </Canvas>
    </div>
  );
}

export default App;

const CameraController = () => {
    const { camera, gl } = useThree();
    camera.position.set(2, .5, .5);
    useEffect(
        () => {
            const controls = new OrbitControls(camera, gl.domElement);
            controls.minDistance = 1;
            controls.maxDistance = 100;
            return () => {
                controls.dispose();
            };
        },
        [camera, gl]
    );
    return null;
};

function Box(props: ThreeElements['mesh']) {
  const mesh = useRef<THREE.Mesh>(null!)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false);

  const map = useLoader(TextureLoader, "texture.jpg");
  map.repeat.set(3, 3);
  map.wrapS = map.wrapT = RepeatWrapping;

  const normal = useLoader(TextureLoader, "normal.png");
    normal.repeat.set(3, 3);
    normal.wrapS = normal.wrapT = RepeatWrapping;

 // useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
  return (
      <mesh
          {...props}
          ref={mesh}
          onClick={(event) => setActive(!active)}
          onPointerOver={(event) => setHover(true)}
          onPointerOut={(event) => setHover(false)}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial map={map} normalMap={normal} normalScale={new Vector2(2, 2)} />
      </mesh>
  )
}