import { instance } from "../server.js";
import handleAsyncErrors from "../middlewares/handleAsyncErrors.js";
import crypto from 'crypto';

export const processPayment=handleAsyncErrors(async(req,res)=>{
    const options={
        amount:Number(req.body.amount*100),
        currency:"INR",
    }
    const order=await instance.orders.create(options);
    res.status(200).json({
        success:true,
        order
    })
})
    // send API key to frontend
    export const sendAPIKey=handleAsyncErrors(async(req,res)=>{
    res.status(200).json({
       key: process.env.RAZORPAY_API_KEY,

    })
    })
 export const paymentVerification=handleAsyncErrors(async(req,res)=>{
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;
    const body=razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature=crypto.createHmac('sha256',process.env.RAZORPAY_API_SECRET).update(body.toString()).digest('hex');
   res.status(200).json({
       success:true,

   })
    })
