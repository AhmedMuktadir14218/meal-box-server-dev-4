// src/app/modules/order/controller/order.controller.ts
import { Request, Response } from 'express';
import { OrderService } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = await OrderService.createOrder(req.body);
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    res.status(500).json({ success: false, message: errorMessage });
  }
};

const getProviderOrders = async (req: Request, res: Response) => {
  try {
    const orders = await OrderService.getProviderOrders(req.params.providerId);
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    res.status(500).json({ success: false, message: errorMessage });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await OrderService.getAllOrders();
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    res.status(500).json({ success: false, message: errorMessage });
  }
};

export const OrderController = {
  createOrder,
  getProviderOrders,
  getAllOrders,
};