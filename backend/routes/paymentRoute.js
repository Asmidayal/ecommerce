import express from 'express';
import { VerifyUserAuth } from '../middlewares/userAuth.js';
import { processPayment } from '../controller/paymentController.js';
const router = express.Router();
router.route('/payment/process').post(VerifyUserAuth,processPayment);
export default router;