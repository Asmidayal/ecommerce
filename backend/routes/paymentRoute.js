import express from 'express';
import { VerifyUserAuth } from '../middlewares/userAuth.js';
import { processPayment } from '../controller/paymentController.js';
import { sendAPIKey } from '../controller/paymentController.js';
const router = express.Router();
router.route('/payment/process').post(VerifyUserAuth,processPayment);
router.route('/getKey').get(VerifyUserAuth,sendAPIKey);
export default router;