import { z } from 'zod';

export const MeasurementSchema = z.object({
  gender: z.string(),
  height: z.number().min(50).max(250),
  chest: z.number().min(20).max(200),
  waist: z.number().min(20).max(200),
  hips: z.number().min(20).max(200),
  shoulderWidth: z.number().min(10).max(100),
  armLength: z.number().min(10).max(150),
  neckCircumference: z.number().min(10).max(80),
});

export const FabricSchema = z.object({
  type: z.string(),
  weight: z.string(),
  stretch: z.number().min(0).max(1),
  recommendedNeedle: z.string(),
  recommendedPresserFoot: z.string(),
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
  gender: z.string(),
  dressType: z.string(),
  measurements: MeasurementSchema,
  fabric: FabricSchema,
  pieces: z.array(PieceSchema),
  version: z.number().optional(),
});
