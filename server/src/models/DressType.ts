import mongoose, { Schema, Document } from 'mongoose';

export interface IDressType extends Document {
  name: string;
  gender: 'Male' | 'Female';
  description: string;
  sizeChartId: mongoose.Types.ObjectId;
}

const DressTypeSchema: Schema = new Schema({
  name: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  description: { type: String, required: true },
  sizeChartId: { type: Schema.Types.ObjectId, ref: 'SizeChart', required: true }
}, { timestamps: true });

export default mongoose.model<IDressType>('DressType', DressTypeSchema);
