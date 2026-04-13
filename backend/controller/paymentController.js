import { instance } from "../server.js";
import handleAsyncErrors from "../middlewares/handleAsyncErrors.js";

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
