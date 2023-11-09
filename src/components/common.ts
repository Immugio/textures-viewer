import { Color, Texture, Vector2 } from "three";

export interface MaterialProps {
  map: Texture | null;
  normalMap: Texture | null;
  aoMap: Texture | null;
  normalScale: Vector2;
  roughness: number;
  metalness: number;
  aoMapIntensity: number;
  emissive: string;
  emissiveIntensity: number;
  displacementScale: number;
  displacementBias: number;
  opacity: number;
  envMapIntensity: number;
}

export interface ImageState {
  textureImage: HTMLImageElement | null;
  normalImage: HTMLImageElement | null;
  aoImage: HTMLImageElement | null;
  displacementImage: HTMLImageElement | null;
}
