import React from 'react'
import '../UserStyles/Form.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {register, removeSuccess} from '../features/user/userSlice';


const Register = () => {
    const[user,setUser]=useState({
        name:'',
        email:'',
        password:''
    });
const{name,email,password}=user;
const{success,loading,error}=useSelector((state)=>state.user);
const dispatch=useDispatch();
const navigate=useNavigate();
const[avatar,setAvatar]=useState("");
const[avatarPreview,setAvatarPreview]=useState("/images/defaultAvatar.jpg");
const registerDataChange=(e)=>{
    if(e.target.name==='avatar'){
        const reader=new FileReader();
        reader.onload=()=>{
            if(reader.readyState===2){
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }}
            reader.readAsDataURL(e.target.files[0]);  //to show preivew of image and also to send image in form of data url to backend
    }else{
        setUser({...user,[e.target.name]:e.target.value});
    }
}
const registerSubmit=(e)=>{
    e.preventDefault();
    if(!name || !email || !password){
        toast.error('Please fill all fields');
        return;
    }
    const myForm=new FormData();
    myForm.set('name',name);
      myForm.set('email',email);
        myForm.set('password',password);
        myForm.set('avatar',avatar);
        for( let pair of myForm.entries()){
        console.log(pair[0]+'-'+pair[1]);
        }
dispatch(register(myForm))
 
}
 useEffect(()=>{
        if(error){
            toast.error(error,{autoClose:3000});
            dispatch(removeErrors()); //dispatching action to remove error from state after showing error message
        }
        },[dispatch,error])
        useEffect(()=>{
        if(success){
            toast.error("Registration Successful",{autoClose:3000});
            dispatch(removeSuccess()); //dispatching action to remove error from state after showing error message
            navigate('/login');
        }
        },[dispatch,success])
  return (
    <div className='form-container container'>
        <div className='form-content'>
            <form className='form' onSubmit={registerSubmit} encType='multipart/form-data'>
                <h2>Sign Up</h2>
                <div className='input-group'>
                    <input type='text' placeholder='Username' name='name' value={name} onChange={registerDataChange} />
                </div>
                <div className='input-group'>
                    <input type='Email' placeholder='Email' name='email'value={email} onChange={registerDataChange} />  
                </div>
                 <div className='input-group'>
                    <input type='Password' placeholder='Password' name='password'value={password} onChange={registerDataChange} />  
                </div>
                <div className='input-group avatar-group'>
                    <input type='file' placeholder='Avatar' className='file-input' accept='image/'onChange={registerDataChange} />  
                 <img src={avatarPreview} alt='Avatar preview'className='avatar'/>
                </div>
                <button type='submit' className='authBtn'>Sign Up</button>
                <p className='form-links'>Already have an account? <Link to='/login'>SignIn here</Link></p>
            </form>
        </div>
    </div>
  )
}

export default Register
