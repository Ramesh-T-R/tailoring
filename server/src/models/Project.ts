import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  id: string;
  name: string;
  customerName: string;
  gender: string;
  dressType: string;
  measurements: {
    gender: string;
    height: number;
    chest: number;
    waist: number;
    hips: number;
    shoulderWidth: number;
    armLength: number;
    neckCircumference: number;
  };
  fabric: {
    type: string;
    weight: string;
    stretch: number;
    recommendedNeedle: string;
    recommendedPresserFoot: string;
  };
  pieces: Array<{
    id: string;
    name: string;
    points: Array<{ x: number; y: number }>;
    seamAllowance: number;
    grainLineAngle: number;
  }>;
  version: number;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  customerName: { type: String, required: true },
  gender: { type: String, required: true },
  dressType: { type: String, required: true },
  measurements: {
    gender: String,
    height: Number,
    chest: Number,
    waist: Number,
    hips: Number,
    shoulderWidth: Number,
    armLength: Number,
    neckCircumference: Number,
  },
  fabric: {
    type: String,
    weight: String,
    stretch: Number,
    recommendedNeedle: String,
    recommendedPresserFoot: String,
  },
  pieces: [{
    id: String,
    name: String,
    points: [{ x: Number, y: Number }],
    seamAllowance: Number,
    grainLineAngle: Number,
  }],
  version: { type: Number, default: 1 },
}, { timestamps: true });

export default mongoose.model<IProject>('Project', ProjectSchema);
