// src/app/modules/mealMenu/model/menu.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IMealMenu extends Document {
  providerId: mongoose.Types.ObjectId;
  mealName: string;
  description: string;
  ingredients: string[];
  price: number;
  portionSize: string;
  dietTags: string[];
  availability: boolean;
}

const mealMenuSchema = new Schema<IMealMenu>({
  providerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  mealName: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: { type: [String], required: true },
  price: { type: Number, required: true },
  portionSize: { type: String, required: true },
  dietTags: { type: [String], required: true },
  availability: { type: Boolean, default: true },
});

export const MealMenu = mongoose.model<IMealMenu>('MealMenu', mealMenuSchema);