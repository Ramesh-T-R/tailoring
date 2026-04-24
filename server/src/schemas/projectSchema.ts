import { z } from 'zod';

export const ProjectMeasurementSchema = z.object({
  measurementTypeId: z.string(),
  value: z.number()
});

export const FabricSchema = z.object({
  type: z.string(),
  weight: z.string(),
  stretch: z.number().min(0).max(1),
  recommendedNeedle: z.string().optional(),
  recommendedPresserFoot: z.string().optional(),
});

export const PieceSchema = z.object({
  id: z.string(),
  name: z.string(),
  points: z.array(z.object({ x: z.number(), y: z.number() })),
  seamAllowance: z.number().min(0),
  grainLineAngle: z.number(),
});

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  customerName: z.string(),
  gender: z.enum(['Male', 'Female']),
  dressType: z.string(),
  selectedDesignCombinations: z.array(z.any()).optional(),
  sizeTypeId: z.string().optional(),
  measurements: z.array(ProjectMeasurementSchema),
  fabric: FabricSchema,
  pieces: z.array(PieceSchema),
  version: z.number().optional(),
});
