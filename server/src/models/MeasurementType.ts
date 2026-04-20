import mongoose, { Schema, Document } from 'mongoose';

export interface IMeasurementType extends Document {
  name: string;
  description: string;
}

const MeasurementTypeSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<IMeasurementType>('MeasurementType', MeasurementTypeSchema);
