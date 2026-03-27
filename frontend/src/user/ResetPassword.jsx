import React, { useEffect, useState } from 'react'
import '../UserStyles/Form.css'
import PageTitle from '../components/PageTitle';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { removeErrors, removeSuccess, resetPassword } from '../features/user/userSlice';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const{success,error,loading}=useSelector(state=>state.user);
    const dispatch=useDispatch();
    const navigate=useNavigate();
     const[password,setPassword]=useState('');
     const[confirmPassword,setConfirmPassword]=useState('');
     const {token}=useParams();
   const resetPasswordSubmit=(e)=>{
    e.preventDefault();
    const data={
        password,
        confirmPassword,
    }
    dispatch(resetPassword({token,userData:data}));
   }
     useEffect(()=>{
                      if(error){
                          toast.error(error.message,{position:'top-center',autoClose:3000});
                          dispatch(removeErrors()); //dispatching action to remove error from state after showing error message
                      }
                      },[dispatch,error])
       useEffect(()=>{
                      if(success){
                            toast.success('password reset successfully',{autoClose:3000});
                             dispatch(removeSuccess()); 
                            navigate('/login');
                             }
                             },[dispatch,success])                     
  return (
 <>
  <PageTitle title='Password Reset'/>
   <div className='container form-container'>
      <div className='form-content'>
        <form className='form'onSubmit={resetPasswordSubmit}>
        <h2> Reset password</h2>
   
        <div className='input-group'>
            <input type='password'name='Password'placeholder='Enter New Password'value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
         <div className='input-group'>
            <input type='password'name='confirmPassword'placeholder='Confirm Password'value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
        </div>
        <button className='authBtn'>Reset Password</button>
        </form>
    </div>
   </div>
 </>
  )
}

export default ResetPassword
