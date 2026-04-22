import React from 'react'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CheckoutPath from './CheckoutPath'
import '../CartStyles/Payment.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'


const Payment = () => {
  const navigate=useNavigate();
    const orderItem=JSON.parse(sessionStorage.getItem('orderItem'));
    const {user}=useSelector(state=>state.user);
    const{shippingInfo}=useSelector(state=>state.cart);
    const completePayment=async(amount)=>{
      try{
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
        handler: async function (response) {
          // Handle the payment success response here
          const{data}=await axios.post('/api/v1/paymentVerification',{
             razorpay_payment_id:response.razorpay_payment_id,
            razorpay_order_id:response.razorpay_order_id,
            razorpay_signature:response.razorpay_signature
          });
          if(data.success){
            navigate(`/paymentSuccess?reference=${data.reference}`);
            // You can also send the response to your backend for verification
          }else{
            alert("Payment verification failed");
          }
          // You can also send the response to your backend for verification
        },
      //  callback_url: '/api/v1/paymentVerification', // Your success URL
        prefill: {
          name: user.name,
          email: user.email,
          contact: shippingInfo.phoneNumber
        },
        theme: {
          color: '#7c4abd'
        },
      };
    const rzp = new window.Razorpay(options);
      rzp.open();
    }catch(error){
      toast.error(error.message,{autoclose:3000});
    //  console.error("Error processing payment:", error);
    //  alert("There was an error processing your payment. Please try again.");
    }
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
