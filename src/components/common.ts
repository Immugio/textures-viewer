import { Color, Texture, Vector2 } from "three";

export interface MaterialProps {
  map: Texture | null;
  normalMap: Texture | null;
  aoMap: Texture | null;
  normalScale: Vector2;
  roughness: number;
  metalness: number;
  aoMapIntensity: number;
  
  opacity?: number;
  envMapIntensity?: number;
  displacementScale?: number;
  displacementBias?: number;
  emissive?: Color;
  emissiveIntensity?: number;
  lightMapIntensity?: number;
}

export interface ImageState {
  textureImage: HTMLImageElement | null;
  normalImage: HTMLImageElement | null;
  aoImage: HTMLImageElement | null;
}
