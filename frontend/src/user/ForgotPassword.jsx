import React, { useState } from 'react'
import '../UserStyles/Form.css'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const ForgotPassword = () => {
  const[email,setEmail]=useState("");
   const forgotPasswordEmail=(e)=>{
          const myForm=new FormData();
    myForm.set('email',email);
     
   }
  return (
   <>
   <PageTitle title='forgot password'/>
   <Navbar/>
   <div className='containter forgot-container'>
    <div className='form-content email-group'>
    <form className='form'onSubmit={forgotPasswordEmail}>
      <h2>Forgot Password</h2>
      <div className='input-group'>
        <input type='email' placeholder='enter registered Email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
      </div>
      <button className='authBtn'>Send</button>
    </form>
    </div>
   </div>
   <Footer/>
   </>
  )
}

export default ForgotPassword
