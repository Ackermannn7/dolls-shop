import { Router } from 'express';
import { createPaymentIntent, getKeys, webhook } from './stripeController.js';
import { verifyToken } from '../../middlewares/authMiddleware.js';

const router = Router();

router.get('/keys', getKeys);

router.post('/payment-intent', verifyToken, createPaymentIntent);

router.post('/webhook', webhook);

export default router;
