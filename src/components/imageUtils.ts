import { ImageState } from "./common";

export function setDefaultImages() {
  return {
    textureImage: setDefaultImage("/assets/texture.jpg"),
    normalImage: setDefaultImage("/assets/normal.jpg"),
    aoImage: setDefaultImage("/assets/ao.png"),
    displacementImage: setDefaultImage("/assets/disp.png"),
    environmentImage: "background.hdr"
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
