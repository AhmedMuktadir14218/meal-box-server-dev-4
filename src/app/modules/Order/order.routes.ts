// src/app/modules/order/route/order.route.ts
import express from 'express';
import auth from '../../../middleware/auth.middleware';
import { OrderController } from './order.controller';

const router = express.Router();

router.post('/', auth('customer'), OrderController.createOrder);
router.get('/provider/:providerId', auth('provider'), OrderController.getProviderOrders);
router.get('/admin/all', auth('admin'), OrderController.getAllOrders);
export const orderRouter = router;
