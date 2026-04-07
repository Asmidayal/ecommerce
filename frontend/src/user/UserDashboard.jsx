import React, { useState } from 'react'
import '../UserStyles/UserDashboard.css'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import '../features/user/userSlice';
import { logout,removeSuccess } from '../features/user/userSlice';
import { useSelector } from 'react-redux';
function UserDashboard  ({user})  {
    const {cartItems}=useSelector(state=>state.cart);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const[menuVisible,setMenuVisible]=useState(false);
    function toggleMenu(){
        setMenuVisible(!menuVisible);
    }
    const options=[
        {name:'Orders',funcName:orders},
          {name:'Account',funcName:profile},
          {name:`Cart (${cartItems.length})`, funcName:myCart,isCart:true},
            {name:'LogOut',funcName:logoutUser}
    ]
    if(user.role==='admin'){
        options.unshift({
        name:'Admin Dashboard',funcName:dashboard
        })
        
    }
    function orders(){
    navigate('/orders/user')
    }
     function profile(){
    navigate('/profile')
    }
        function myCart(){
    navigate('/cart')
        }
     function logoutUser(){
    dispatch(logout())
    .unwrap()//converting action to promise
    .then(()=>{
        toast.success('Logout successful',{autoClose:3000})
        dispatch(removeSuccess())
        navigate('/login')
    })
    .catch((error)=>{
         toast.success(error.message||'Logout failed',{autoClose:3000})
    })
    }
    function dashboard(){
        navigate('admin/dashboard')
    }
  return (
    <>
    <div className={`overlay ${menuVisible?'show':''}`}>onClick={toggleMenu}</div>
    <div className='dashboard-container'>
        <div className='profile-header' onClick={toggleMenu}>
            <img src={user.avatar.url?user.avatar.url:'./images/sun.jpeg'} alt='Profile Picture' className='profile-avatar'></img>
            <span className='profile-name'> {user.name||'User'}</span>
        </div>
  { menuVisible &&( <div className='menu-options'>
        {options.map((item)=>(
        <button key={item.name}className='menu-option-btn'onClick={item.funcName}>{item.name}</button>
))}
    </div>)}
      
    </div>
    </>
  )
}

export default UserDashboard
