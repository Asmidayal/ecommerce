import React, { useState } from 'react'
import '../UserStyles/Form.css'
import PageTitle from '../components/PageTitle';
import { useParams } from 'react-router';

const ResetPassword = () => {
     const[password,setPassword]=useState('');
     const[confirmPassword,setConfirmPassword]=useState('');
     const {token}=useParams();
   const resetPasswordSubmit=(e)=>{
    e.preventDefault();
    const data={
        password,
        confirmPassword,
    }
    console.log(data);
   }
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
