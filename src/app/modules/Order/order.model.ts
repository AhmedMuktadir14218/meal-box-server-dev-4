// src/app/modules/order/model/order.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  customerId: mongoose.Types.ObjectId;
  mealId: mongoose.Types.ObjectId;
  providerId: mongoose.Types.ObjectId;
  status: string;
  scheduledDate: Date;
  specialInstructions: string;
  dietPreferencesSnapshot: string[];
}

const orderSchema = new Schema<IOrder>({
  customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  mealId: { type: Schema.Types.ObjectId, ref: 'MealMenu', required: true },
  providerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'in progress', 'delivered'], default: 'pending' },
  scheduledDate: { type: Date, required: true },
  specialInstructions: { type: String },
  dietPreferencesSnapshot: { type: [String], required: true },
});

export const Order = mongoose.model<IOrder>('Order', orderSchema);