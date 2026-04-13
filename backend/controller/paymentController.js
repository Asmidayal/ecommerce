import { instance } from "../server";
import handleAsyncErrors from "../middlewares/handleAsyncErrors";

export const processPayment=handleAsyncErrors(async(req,res)=>{
    const options={
        amount:10000,
        currency:"INR",
    }
    const order=await instance.orders.create(options);
    res.status(200).json({
        success:true,
        order
    })
})