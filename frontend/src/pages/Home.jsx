import React from 'react'
import Footer from '../components/Footer';
import '../pageStyles/Home.css'
import Navbar from '../components/Navbar';
import ImageSlider from '../components/ImageSlider';
import Product from '../components/Product';
import PageTitle from '../components/PageTitle';
import Loader from '../components/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getProduct } from '../features/productSlice';
import { toast } from 'react-toastify';
import { removeErrors } from '../features/productSlice';

const Home = () => {
    const{loading,error,products,productCount}=useSelector((state)=>state.product);//accessing product state from global state(store)
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(getProduct({keyword:''})); //fetching products when home component mounts
    },[dispatch])
    useEffect(()=>{
        if(error){
            toast.error(error.message,{autoClose:3000});
            dispatch(removeErrors()); //dispatching action to remove error from state after showing error message
        }
        },[dispatch,error])
  return (
    <>
    { loading ? (<Loader/>) :( <>
    <PageTitle title='Home -LeaBeauty'/>
    <Navbar/>
    <ImageSlider/>
    <div className='home-container'>
    <h2 className='home-heading'>Trending Now</h2>
    <div className='home-product-container'>
      {products.map((product,index)=>(
      <Product product={product} key={index}/> //prop
      ))}

</div>
    </div>
          <Footer/>
     </> 
  )}
  </>
  )
}

export default Home
