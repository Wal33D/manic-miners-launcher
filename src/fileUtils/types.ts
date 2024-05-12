export interface MapGenerationParams {
  length?: number;
  width?: number;
  size?: number;
  solidDensity?: number;
  wallDensity?: number;
  oreDensity?: number;
  crystalDensity?: number;
  oreSeamDensity?: number;
  crystalSeamDensity?: number;
  rechargeSeamDensity?: number;
  floodLevel?: number;
  floodType?: 'water' | 'lava';
  flowDensity?: number;
  flowInterval?: number;
  preFlow?: number;
  landslideDensity?: number;
  landslideInterval?: number;
  slugDensity?: number;
  terrain?: number;
  biome?: 'ice' | 'rock' | 'lava';
  smoothness?: number;
  oxygen?: number;
  stats?: boolean;
  save?: boolean;
  name?: string;
  overwrite?: boolean;
  show?: boolean;
  filePath?: string;
}
export interface MapGenerationResult {
  Parameters: number;
  length: number;
  width: number;
  size: string;
  solidDensity: number;
  wallDensity: number;
  oreDensity: number;
  crystalDensity: number;
  oreSeamDensity: number;
  crystalSeamDensity: number;
  rechargeSeamDensity: number;
  floodLevel: number;
  floodType: string;
  flowDensity: number;
  flowInterval: number;
  preFlow: number;
  landslideDensity: number;
  landslideInterval: number;
  monsterDensity: number;
  monsterInterval: number;
  slugDensity: number;
  terrain: number;
  smoothness: number;
  oxygen: number;
  biome: string;
  stats: string;
  save: string;
  name: string;
  show: string;
  filePath: string;
  Results: number;
  Size: string;
  Tiles: number;
  Time: string;
  Speed: string;
  Savedto: string;
}

export interface GenerateDatFileResponse {
  generated: boolean;
  result: MapGenerationResult;
}
