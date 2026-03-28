import React, { useEffect } from 'react'
import '../pageStyles/ProductDetails.css'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Rating from '../components/Rating';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { getProductDetails } from '../features/productSlice';
import { removeErrors } from '../features/productSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';


const ProductDetails = () => {
  
        const[userRating, setUserRating] = useState(0);
        const[quantity,setQuantity]=useState(1);
        const handleRatingChange = (newRating) => {
            setUserRating(newRating);
            } 
          const{loading,error,product} = useSelector((state)=>state.product);
          const dispatch=useDispatch();
          const{id}=useParams();//to get product id from url(url in home.jsx), to make product pages dynamic
          useEffect(()=>{
            if(id){
              dispatch(getProductDetails(id));
             }
             return()=>{
                dispatch(removeErrors());
             }
          },[dispatch,id])
           useEffect(()=>{
                  if(error){
                      toast.error(error.message,{autoClose:3000});
                      dispatch(removeErrors()); //dispatching action to remove error from state after showing error message
                  }
                  },[dispatch,error])
                  if(loading){
                    return(
                        <>
                        <Navbar/>
                        <Loader/>
                        <Footer/>
                        </>
                    )
                  }
                  if(error|| !product){
                    return(
                        <>
                         <PageTitle title='Product Details-LeaBeauty'/>
                            <Navbar/>
                        <Footer/>
                        </>  
                    )
                  }
                  const decreaseQuantity=()=>{
                    if(quantity<=1){
                         toast.error('quantity cannot be less than 1',{position:'top-center',autoClose:3000});
                                dispatch(removeErrors());
                                return;
                    }
                       setQuantity(qty=>qty-1)
                  }
                     const increaseQuantity=()=>{
                        if(product.stock<=quantity){
                              toast.error('cannot exceed available stock',{position:'top-center',autoClose:3000});
                                dispatch(removeErrors());
                                return;
                        }
                    setQuantity(qty=>qty+1)
                  }
        
          return (
   <>
   <PageTitle title={`${product.name} -LeaBeauty`}/>
   <Navbar/>
   <div className='product-details-container'>
    <div className='product-detail-container'>
        <div className='product-image-container'>
            <img src={product.image[0].url.replace('./','/')} alt=""className='product-detail-image'></img>
            </div>
            <div className='product-info'>
                <h2>{product.name}</h2>
                <p className='product-description'>{product.description}</p>
                <p className='product-price'>Price:₹{product.price}/-</p>
                <div className='product-rating'>
                    <Rating value={product.ratings} disabled={true}
                    />
                    <span className='productCardSpan'>({product.numOfReviews} {product.numOfReviews===1?'Review':'Reviews'})</span>
                </div>
                <div className='stock-status'>
                    <span className={product.stock>0?'in-stock':'out-of-stock'}> {product.stock>0?`In stock(${product.stock} available)`: 'Out of stock'}</span>
                </div>
               { product.stock>0 &&(<> <div className='quantity-controls'>
                    <span className='quantity-label'>Quantity:</span>
                    <button className='quantity-button' onClick={decreaseQuantity}>-</button>
                    <input type='text' value={quantity} className='quantity-value' readOnly/>
                    <button className='quantity-button' onClick={increaseQuantity}>+</button>
                </div>
                <button className='add-to-cart-btn'onClick={addToCart}>Add to Cart
                </button>
                </>)}
                <form className='review-form'>
                    <h3>Write a Review</h3>
                    <Rating
                    value={0} 
                    disabled={false}
                    onRatingChange={handleRatingChange}
                    />
                    <textarea className='review-input' placeholder='Write your review here'></textarea>
                    <button className='submit-review-btn'>Submit Review</button>
                </form>
            </div>
    </div>
    <div className='reviews-container'>
        <h3>Customer Reviews</h3>
      {product.reviews && product.reviews.length>0?(<div className='reviews-section'>
           {product.reviews.map((review,index)=>(
            <div className='review-item' key={index}>
                <div className='review-header'>
                    <Rating value={review.rating} disabled={true}/>
                </div>
                <p className='review-comment'>{review.comment}</p>
                <p className='review-name'>by {review.name}</p>
            </div>
           )) }
        </div>):(<p className='no-reviews'>No reviews yet. Be the first to review this product!</p>
    )}
    </div>
    </div>
   <Footer/>
   </>
  )
}

export default ProductDetails
