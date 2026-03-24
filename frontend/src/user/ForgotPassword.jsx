import React, { useState, useEffect } from 'react'
import '../UserStyles/Form.css'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { forgotPassword, removeErrors, removeSuccess } from '../features/user/userSlice'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'

const ForgotPassword = () => {
  const[email,setEmail]=useState("");
  const{loading,error,success,message}=useSelector(state=>state.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();
   const forgotPasswordEmail=(e)=>{
    e.preventDefault();
          const myForm=new FormData();
    myForm.set('email',email);
    dispatch(forgotPassword(myForm))
     setEmail("");
   }
    useEffect(()=>{
                      if(error){
                          toast.error(error.message,{position:'top-center',autoClose:3000});
                          dispatch(removeErrors()); //dispatching action to remove error from state after showing error message
                      }
                      },[dispatch,error])
              useEffect(()=>{
                               if(success){
                                toast.success(message,{autoClose:3000});
                                dispatch(removeSuccess()); 
                                     }
                                 },[dispatch,success])            
  return (
    <>
 {loading?(<Loader/>):( <>
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
   </>)}
   </>
  )
}

export default ForgotPassword
