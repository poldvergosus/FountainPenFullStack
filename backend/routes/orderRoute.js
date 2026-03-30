import express from 'express';
import { placeOrder, allOrders, userOrders, updateStatus, cancelOrder } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import { auth, optionalAuth } from '../middleware/auth.js';

const orderRouter = express.Router();

// Admin features
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

// Payment features
orderRouter.post('/place', optionalAuth, placeOrder);

// User feature
orderRouter.post('/userorders', auth, userOrders); 

orderRouter.post('/cancel', adminAuth, cancelOrder);

export default orderRouter;