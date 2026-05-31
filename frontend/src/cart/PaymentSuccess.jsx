import React from 'react'
import '../CartStyles/PaymentSuccess.css'
import { useSearchParams } from 'react-router'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PageTitle from '../components/PageTitle'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { createOrder } from '../features/order/orderSlice';
import { removeSuccess, removeErrors } from '../features/order/orderSlice';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const reference = searchParams.get('reference');
    const {cartItems,shippingInfo}=useSelector((state)=>state.cart);
    const{loading,success,error}=useSelector((state)=>state.order);
    const dispatch=useDispatch();
    useEffect(()=>{
      const createOrderData = async()=>{
     try{
      const orderItem=JSON.parse(sessionStorage.getItem('orderItem'));
         if (!orderItem) return;
      const orderData={
        shippingInfo:{
        address:shippingInfo.address,
        city:shippingInfo.city,
        state:shippingInfo.state,
        country:shippingInfo.country,
        pincode:shippingInfo.pincode,
        phoneNo:shippingInfo.phoneNumber,
      },
      orderItems:cartItems.map(item=>({
        name:item.name,
        price:item.price,
        quantity:item.quantity,
        image:item.image,
        product:item.product,
      })),
      paymentInfo:{
        id:reference,
        status:'succeeded',
      },
      itemPrice:orderItem.subtotal,
      taxPrice:orderItem.tax,
      shippingPrice:orderItem.shippingCharges,
      totalPrice:orderItem.total,
     }
     console.log('Creating order with data:', orderData);
     dispatch(createOrder(orderData));
     sessionStorage.removeItem('orderItem');
     }catch(error){
      console.log('Error creating order:', error.message);
      toast.error(error.message||"Failed to create order",{position:'top-center',autoClose:3000});
     }
    }
    createOrderData();
    },[dispatch, reference])
    useEffect(()=>{
      if(success){
        toast.success("Order created successfully!",{position:'top-center',autoClose:3000});
        dispatch(removeSuccess());
      }
    },[success, dispatch])
    useEffect(()=>{
      if(error){
        toast.error(error || "Failed to create order",{position:'top-center',autoClose:3000});
        dispatch(removeErrors());
      }
    },[error, dispatch])
  return (
    <>
    <PageTitle title="Payment Status"/>
    <Navbar/>
    <div className="payment-success-container">
      <div className="success-content">
      <div className="success-icon">
        <div className="checkmark"></div>
      </div>
      <h1>Order Confirmed!</h1>
      <p>Your payment was successful. Reference Id <strong>{reference}</strong></p>
      <Link to="/orders/user" className="explore-btn">View Orders</Link>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default PaymentSuccess
