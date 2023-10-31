import { Texture, Vector2 } from "three";

export interface MaterialProps {
  map: Texture | null;
  normalMap: Texture | null;
  aoMap: Texture | null;
  normalScale: Vector2;
  opacity: number;
  roughness: number;
  metalness: number;
  bumpScale: number;
  aoMapIntensity: number;
  envMapIntensity: number;
  displacementScale: number;
  displacementBias: number;
  emissiveIntensity: number;
  lightMapIntensity: number;
}

export interface ImageState {
  textureImage: HTMLImageElement | null;
  normalImage: HTMLImageElement | null;
  aoImage: HTMLImageElement | null;
}
