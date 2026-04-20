import mongoose, { Schema, Document } from 'mongoose';

export interface ISizeChart extends Document {
  name: string; 
  gender: 'Male' | 'Female';
  entries: Array<{
    sizeTypeId: mongoose.Types.ObjectId;
    measurementTypeId: mongoose.Types.ObjectId;
    unit: 'cm' | 'in';
    value: number;
  }>;
}

const SizeChartSchema: Schema = new Schema({
  name: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  entries: [{
    sizeTypeId: { type: Schema.Types.ObjectId, ref: 'SizeType', required: true },
    measurementTypeId: { type: Schema.Types.ObjectId, ref: 'MeasurementType', required: true },
    unit: { type: String, enum: ['cm', 'in'], required: true },
    value: { type: Number, required: true, default: 0 }
  }]
}, { timestamps: true });

export default mongoose.model<ISizeChart>('SizeChart', SizeChartSchema);
