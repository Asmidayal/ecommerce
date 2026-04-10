import React from 'react'
import '../UserStyles/Form.css';
import {Link, useLocation, useNavigate} from  'react-router-dom';
import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {login, removeErrors, removeSuccess} from '../features/user/userSlice';
import { toast } from 'react-toastify';

const Login = () => {
    const[loginEmail,setLoginEmail]=useState("");
    const[loginPassword,setLoginPassword]=useState("");
    const{error,loading,success,isAuthenticated}=useSelector((state)=>state.user);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const location=useLocation();
    const redirect=new URLSearchParams(location.search).get('redirect')||'/';
    const loginSubmit=(e)=>{
    e.preventDefault();
    dispatch(login({email:loginEmail, password:loginPassword}))
    }
    useEffect(()=>{
            if(error){
                toast.error(error,{autoClose:3000});
                dispatch(removeErrors()); //dispatching action to remove error from state after showing error message
            }
            },[dispatch,error])
    useEffect(()=>{
        if(isAuthenticated){
            navigate(redirect)
        }
    },[isAuthenticated])
     useEffect(()=>{
        if(success){
            toast.success("login successful",{autoClose:3000});
            dispatch(removeSuccess())
        }
    },[dispatch,success])

  return (
  <div className='form-container container'>
    <div className='form-content'>
        <form className='form' onSubmit={loginSubmit}>
            <div className='input-group'>
                <input  type='Email' placeholder='Email' name='email'value={loginEmail} onChange={ (e)=>setLoginEmail(e.target.value)}/>
            </div>
            <div className='input-group'>
                  <input type='Password' placeholder='Password' name='password'value={loginPassword} onChange={ (e)=>setLoginPassword(e.target.value)}/> 
            </div>
             <button  className='authBtn'>Sign In</button>
         <p className='form-links'>Forgot your Password? <Link to='/password/forgot'>Reset here</Link></p>
         <p className='form-links'>Don't have an account? <Link to='/register'>Sign Up here</Link></p>
        </form>
    </div>
  </div>
  )
}

export default Login
