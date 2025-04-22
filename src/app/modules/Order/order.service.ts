// src/app/modules/order/service/order.service.ts
import { Order, IOrder } from '../Order/order.model';
import mongoose from 'mongoose';
const createOrder = async (orderData: Partial<IOrder>): Promise<IOrder> => {
    return await Order.create(orderData);
  };
  
  const getProviderOrders = async (providerId: string): Promise<IOrder[]> => {
    return await Order.find({ providerId: new mongoose.Types.ObjectId(providerId) }).populate('mealId customerId');
  };
  
  const getAllOrders = async (): Promise<IOrder[]> => {
    return await Order.find().populate('mealId customerId providerId');
  };
  
  export const OrderService = {
    createOrder,
    getProviderOrders,
    getAllOrders,
  };