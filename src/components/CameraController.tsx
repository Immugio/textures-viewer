import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export function CameraController() {
  const { camera, gl } = useThree();
  const [positionSet, setPositionSet] = useState(false);

  useEffect(() => {
    if (!positionSet) {
      camera.position.set(3, 1, 0);
      setPositionSet(true);
    }
  }, [camera.position, positionSet]);

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
}