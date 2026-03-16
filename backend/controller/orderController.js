import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import handleError from "../utils/handleError.js";
import handleAsyncErrors from "../middlewares/handleAsyncErrors.js";

//create new order
export const newOrder= handleAsyncErrors(async (req,res,next) => {
 const{shippingInfo,orderItems,paymentInfo,itemPrice,taxPrice,shippingPrice,totalPrice}=req.body;
 const order= await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt:Date.now(),
    user:req.user._id
 })
 res.status(200).json({
    success:true,
    order
 })
})

//GET single order
export const singleOrder= handleAsyncErrors(async (req,res,next) => {
    const order= await Order.findById(req.params.id).populate("user","name email");
    if(!order){
     return next(new handleError("order not found", 404));  
    }
    res.status(200).json({
        success:true,
        order
    })
})

// all my orders
export const allOrders= handleAsyncErrors(async (req,res,next) => {
    const orders= await Order.find({user:req.user._id}); 
      if(!orders){
     return next(new handleError("order not found", 404));  
    }
    res.status(200).json({
        success:true,
        orders
    })
})
// get ll orders -admin
export const getAllOrders= handleAsyncErrors(async (req,res,next) => {
    const orders= await Order.find(); 
    let totalAmount=0;
    orders.forEach(order=>{
        totalAmount+=order.totalPrice
    })
    res.status(200).json({
        success:true,
        orders,
        totalAmount
    })
})
//update order status
export const updateOrderStatus= handleAsyncErrors(async (req,res,next) => {
     const order= await Order.findById(req.params.id);
     if(!order){
     return next(new handleError("order not found", 404));  
    }
      if(order.orderStatus==='Delivered'){
     return next(new handleError("already been delivered", 404));  
    }
    await Promise.all(order.orderItems.map(item=>updateQuantity(item.product, item.quantity)
))
order.orderStatus=req.body.status;
  if(order.orderStatus==='Delivered'){
     order.deliveredAt=Date.now();
    }
    await order.save({validateBeforeSave:false});
     res.status(200).json({
        success:true,
       order
    })
})
async function updateQuantity(id,quantity){
    const product= await Product.findById(id);
    if(!product){
          return next(new handleError("product not found", 404)); 
    }
    product.stock-=quantity;
    await product.save({validateBeforeSave:false});
}

//delete order
export const deleteOrder= handleAsyncErrors(async (req,res,next) => {
    const order= await Order.findById(req.params.id);
      if(!order){
     return next(new handleError("order not found", 404));  
    }
    if(order.orderStatus!=='Delivered'){
          return next(new handleError("order is under processing cannot be deleted", 404));  
    }
    await Order.deleteOne({_id:req.params.id});
    res.status(200).json({
        success:true,
        message:"order deleted successfully"
    })
})
