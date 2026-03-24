import React from 'react';
import Home from './pages/Home';
import{BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import ProductDetails from './pages/ProductDetails';
import Products from './pages/Products';
import Register from './user/Register';
import Login from './user/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadUser } from './features/user/userSlice';
import UserDashboard from './user/UserDashboard';
import Profile from './user/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import UpdateProfile from './user/UpdateProfile';
import UpdatePassword from './user/UpdatePassword';
import ForgotPassword from './user/ForgotPassword';
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'

function App() {
  const {isAuthenticated,user}=useSelector(state=>state.user);
const dispatch=useDispatch();
useEffect(()=>{
  if(isAuthenticated){
    dispatch(loadUser());
  }
},[dispatch])
console.log(isAuthenticated,user);
  return (
<Router>
  <Routes>
    <Route path ="/" element={<Home/>}/>
     <Route path ="/product/:id" element={<ProductDetails/>}/>
       <Route path ="/products" element={<Products/>}/>
         <Route path ="/products/:keyword" element={<Products/>}/>
            <Route path ="/register" element={<Register/>}/>
             <Route path ="/login" element={<Login/>}/>
              <Route path ="/profile" element={<ProtectedRoute element={<Profile/>}/>}/>
                <Route path ="/profile/update" element={<ProtectedRoute element={<UpdateProfile/>}/>}/>
                 <Route path ="/password/update" element={<ProtectedRoute element={<UpdatePassword/>}/>}/>
                  <Route path ="/password/forgot" element={<ForgotPassword/>}/>
  </Routes> 
  {isAuthenticated && <UserDashboard user={user}/>}
</Router>
  )
}

export default App
