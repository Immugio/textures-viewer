import { ImageState } from "./common";

export function setDefaultImages() {
  return {
    textureImage: setDefaultImage("/texture.jpg"),
    normalImage: setDefaultImage("/normal.png"),
    aoImage: setDefaultImage("/ao.jpg"),
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
];
