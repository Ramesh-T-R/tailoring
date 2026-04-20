export type Gender = 'Male' | 'Female' | 'Other';

export interface MeasurementProfile {
  gender: Gender;
  height: number;
  chest: number;
  waist: number;
  hips: number;
  shoulderWidth: number;
  armLength: number;
  neckCircumference: number;
}

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

export interface ProjectState {
  id: string;
  name: string;
  customerName: string;
  gender: Gender;
  dressType: string;
  measurements: MeasurementProfile;
  fabric: FabricProperty;
  pieces: PatternPiece[];
  version: number;
  parentVersionId?: string;
}
