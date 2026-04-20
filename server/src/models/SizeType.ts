import mongoose, { Schema, Document } from 'mongoose';

export interface ISizeType extends Document {
  name: string; // e.g., "S", "M", "L"
}

const SizeTypeSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
});

export default mongoose.model<ISizeType>('SizeType', SizeTypeSchema);
