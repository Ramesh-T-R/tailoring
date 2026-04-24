export type Gender = 'Male' | 'Female' | 'Other';

export interface Vector2D {
  x: number;
  y: number;
}

export interface PatternPiece {
  id: string;
  name: string;
  points: Vector2D[];
  seamAllowance: number;
  grainLineAngle: number;
}

export interface FabricProperty {
  type: string;
  weight: 'Light' | 'Medium' | 'Heavy';
  stretch: number; // 0 to 1
  recommendedNeedle: string;
  recommendedFoot: string;
  recommendedThread: string;
}

export interface ProjectMeasurement {
  measurementTypeId: string;
  value: number;
}

export interface ProjectState {
  id: string;
  name: string;
  customerName: string;
  gender: 'Male' | 'Female';
  dressType: string; // ID
  selectedDesignCombinations: string[]; // IDs
  sizeTypeId: string; // ID
  measurements: ProjectMeasurement[];
  fabric: FabricProperty;
  pieces: PatternPiece[];
  version: number;
  parentVersionId?: string;
}
