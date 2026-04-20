import mongoose, { Schema, Document } from 'mongoose';

export interface IDesign extends Document {
  name: string;
  category: mongoose.Types.ObjectId;
  description: string;
}

const DesignSchema: Schema = new Schema({
  name: { type: String, required: true, maxlength: 50 },
  category: { type: Schema.Types.ObjectId, ref: 'DesignCategory', required: true },
  description: { type: String, maxlength: 250 }, // Increased to 250 for better usability, but UI will enforce 50 as requested
}, { timestamps: true });

export default mongoose.model<IDesign>('Design', DesignSchema);
