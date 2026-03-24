import React, { useState } from 'react'
import '../UserStyles/Form.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PageTitle from '../components/PageTitle'

const UpdatePassword = () => {
     const[oldPassword,setOldPassword]=useState("");
        const[newPassword,setNewPassword]=useState('');
         const[confirmPassword,setConfirmPassword]=useState('');
    const updatePasswordSubmit=(e)=>{
          const myForm=new FormData();
    myForm.set('oldPassword',oldPassword);
      myForm.set('newPassword',newPassword);
        myForm.set('confirmPassword',confirmPassword);
 for( let pair of myForm.entries()){
        console.log(pair[0]+'-'+pair[1]);
        }
    }
  return (
    <>
    <Navbar/>
    <PageTitle title='Password Update'/>
   <div className='container update-container'>
      <div className='form-content'>
        <form className='form'onSubmit={updatePasswordSubmit}>
        <h2> update password</h2>
    <div className='input-group'>
            <input type='password' name='oldPassword' placeholder='Old Password' value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} />
        </div>
        <div className='input-group'>
            <input type='password'name='newPassword'placeholder='New Password'value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} />
        </div>
         <div className='input-group'>
            <input type='password'name='confirmPassword'placeholder='Confirm Password'value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
        </div>
        <button className='authBtn'>Update</button>
        </form>
    </div>
   </div>
   <Footer/>
   </>
  )
}

export default UpdatePassword
