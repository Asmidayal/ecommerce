import React, { useState } from 'react'
import '../CartStyles/Shipping.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PageTitle from '../components/PageTitle'
import CheckoutPath from './CheckoutPath'
import { useDispatch, useSelector } from 'react-redux'

const Shipping = () => {
    const {shippingInfo}=useSelector(state=>state.cart);
    const dispatch=useDispatch();
    const[pincode,setPincode]=useState();
     const[address,setAddress]=useState();
     const[phoneNumber,setPhoneNumber]=useState();
      const[state,setState]=useState();
       const[city,setCity]=useState();

  return (
   <>
   <PageTitle title="Shipping Info"/>
   <Navbar/>
   <CheckoutPath activePath={0}/>
   <div className='shippinf-form-container'>
    <h1 className='shipping-form-header'>Shipping Information</h1>
    <form className='shipping-form'>
        <div className='shipping-section'>
            <div className='shipping-form-group'>
                <label htmlFor='address'>Address</label>
                <input type='text' id='address' name='address' placeholder='Enter your address'/>

            </div>
             <div className='shipping-form-group'>
                <label htmlFor='pinCode'>Pin Code</label>
                <input type='number' id='pinCode' name='pinCode' placeholder='Enter your pin code'/>

            </div>
             <div className='shipping-form-group'>
                <label htmlFor='phoneNumber'>Phone Number</label>
                <input type='tel' id='phoneNumber' name='phoneNumber' placeholder='Enter your phone number'/>

            </div>
        </div>
        <div className='shipping-section'>
            <div className='shipping-form-group'>
                <label htmlFor='country'>Country</label>
                <select id='country' name='country'>                
                    <option value=''>Select Country</option>
                <option value='IN'>India</option>
                <option value='US'>USA</option>
                </select>
            </div>
              <div className='shipping-form-group'>
                <label htmlFor='state'>State</label>
                <select id='state' name='state'>                
                    <option value=''>Select State</option>
               
                </select>
            </div>
             <div className='shipping-form-group'>
                <label htmlFor='city'>City</label>
                <select id='city' name='city'>                
                    <option value=''>Select City</option>
               
                </select>
            </div>
        </div>
        <button className='shipping-submit-btn'>Continue</button>
    </form>
   </div>
   <Footer/>
   </>
  )
}

export default Shipping
