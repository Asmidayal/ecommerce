import React from 'react'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CheckoutPath from './CheckoutPath'
import '../CartStyles/Payment.css'
import { Link } from 'react-router-dom'

const Payment = () => {
    const orderItem=JSON.parse(sessionStorage.getItem('orderItem'));
  return (
  <>
  <PageTitle title="Payment"/>
  <Navbar/>
  <CheckoutPath activePath={2}/>
  <div className='payment-container'>
   <Link to='/order/confirm' className='payment-go-back'>Proceed to Payment</Link> 
   <button className='payment-btn'>Pay({orderItem.total})/-</button>
  </div>
  <Footer/>
  </>
  )
}

export default Payment
