import mongoose, { Schema, Document } from 'mongoose';

export interface IDesignCategory extends Document {
  name: string; // e.g., "Collar", "Sleeve", "Pocket"
}

const DesignCategorySchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
});

export default mongoose.model<IDesignCategory>('DesignCategory', DesignCategorySchema);
