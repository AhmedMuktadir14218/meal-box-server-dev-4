// src/app/modules/mealProvider/model/mealProvider.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IMealProvider extends Document {
  userId: mongoose.Types.ObjectId;
  cuisineSpecialties: string[];
  pricing: number;
  experience: string;
  availability: boolean;
}

const mealProviderSchema = new Schema<IMealProvider>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  cuisineSpecialties: { type: [String], required: true },
  pricing: { type: Number, required: true },
  experience: { type: String, required: true },
  availability: { type: Boolean, default: true },
});

export const MealProvider = mongoose.model<IMealProvider>('MealProvider', mealProviderSchema);