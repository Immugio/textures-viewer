import { ImageState } from "./common";

export function setDefaultImages() {
  return {
    textureImage: setDefaultImage("/assets/texture.jpg"),
    normalImage: setDefaultImage("/assets/normal.jpg"),
    aoImage: setDefaultImage("/assets/ao.jpg"),
    displacementImage: setDefaultImage("/assets/displacement.jpg"),
  };
}

export function setDefaultImage(src: string): HTMLImageElement {
  const image = new Image();
  image.src = src;
  return image;
}

export interface ImageInputs {
  key: keyof ImageState;
  label: string;
}

export const imageInputs: ImageInputs[] = [
  { key: "textureImage", label: "Texture" },
  { key: "normalImage", label: "Normal" },
  { key: "aoImage", label: "AO" },
  { key: "displacementImage", label: "Displacement" },
];
