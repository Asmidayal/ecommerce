import React from 'react'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CheckoutPath from './CheckoutPath'
import '../CartStyles/Payment.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Payment = () => {
    const orderItem=JSON.parse(sessionStorage.getItem('orderItem'));
    const {user}=useSelector(state=>state.user);
    const{shippingInfo}=useSelector(state=>state.cart);
    const completePayment=async(amount)=>{
     const {data:keyData} = await axios.get('/api/v1/getKey');
     const{key}=keyData;
     const {data:orderData}=await axios.post('/api/v1/payment/process',{amount});
     const {order}=orderData;

    const options = {
        key, // Replace with your Razorpay key_id
        amount, // Amount is in currency subunits.
        currency: 'INR',
        name: 'LeaBeauty',
        description: 'E-commerce website payment transaction',
        order_id: order.id, // This is the order_id created in the backend
        callback_url: '/api/v1/paymentVerification', // Your success URL
        prefill: {
          name: user.name,
          email: user.email,
          contact: shippingInfo.phoneNumber
        },
        theme: {
          color: '#7c4abd'
        },
      };
    const rzp = new Razorpay(options);
      rzp.open();
    }

  
  
  return (
  <>
  <PageTitle title="Payment"/>
  <Navbar/>
  <CheckoutPath activePath={2}/>
  <div className='payment-container'>
   <Link to='/order/confirm' className='payment-go-back'>Proceed to Payment</Link> 
   <button className='payment-btn' onClick={()=>completePayment(orderItem.total)}>Pay({orderItem.total})/-</button>
  </div>
  <Footer/>
  </>
  )
}

export default Payment
