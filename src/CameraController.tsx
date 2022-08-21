import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export function CameraController() {
    const { camera, gl } = useThree();
    camera.position.set(2, .8, .6);
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