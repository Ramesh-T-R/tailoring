import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  id: string;
  name: string;
  customerName: string;
  gender: 'Male' | 'Female';
  dressType: mongoose.Types.ObjectId;
  selectedDesignCombinations: mongoose.Types.ObjectId[];
  sizeTypeId: mongoose.Types.ObjectId;
  measurements: Array<{
    measurementTypeId: mongoose.Types.ObjectId;
    value: number;
  }>;
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
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  dressType: { type: Schema.Types.ObjectId, ref: 'DressType', required: true },
  selectedDesignCombinations: [{ type: Schema.Types.ObjectId, ref: 'DesignCombination' }],
  sizeTypeId: { type: Schema.Types.ObjectId, ref: 'SizeType' },
  measurements: [{
    measurementTypeId: { type: Schema.Types.ObjectId, ref: 'MeasurementType', required: true },
    value: { type: Number, required: true }
  }],
  fabric: {
    type: { type: String, default: 'Linen' },
    weight: { type: String, default: 'Medium' },
    stretch: { type: Number, default: 0 },
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
