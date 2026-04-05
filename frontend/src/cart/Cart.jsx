import React from 'react'
import '../CartStyles/Cart.css'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CartItem from './CartItem'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Cart = () => {
    const{cartItems}=useSelector(state=>state.cart);
    console.log(cartItems);
  return (
    <>
      <Navbar/>
       <PageTitle title='Your Cart'/>
   {cartItems.length===0?(
    <div className='empty-cart-container'>
        <p className='empty-cart-message'>Your cart is empty</p>
        <Link to='/products' className='viewProducts'>Shop Now</Link>
    </div>
   ):( <>
    
    <div className='cart-page'>
        <div className='cart-items'>
            <div className='cart-items-heading'>Your Cart</div>
            <div className='cart-table'>
                <div className='cart-table-header'>
                    <div className='header-product'>Product</div>
                    <div className='header-quantity'>Quantity</div>
                    <div className='header-total item-total-heading'>Item Total</div>
                    <div className='header-action'>Actions</div>
                </div>
                {/* cart items*/}
               {cartItems&& cartItems.map(item=><CartItem item={item} key={item.name}/>)}
              {/*<div className='cart-item'>
                    <div className='item-info'>
                        <img src="" alt="Product Image" className='item-image'/>
                        <div className='item-details'>
                            <h3 className='item-name'>Lipstick</h3>
                            <p className='item-price'><strong>Price:</strong>200/-</p>
                            <p className='item-quantity'><strong>Quantity:</strong>1</p>
                        </div>
                    </div>
                    <div className='quantity-controls'>
                        <button className='quantity-button decrease-btn'>-</button>
                        <input type='number' value={1} className='quantity-input' readOnly min="1"/>
                         <button className='quantity-button increase-btn'>+</button>
                        
                    </div>

                    <div className='item-total'>
                        <span className='item-total-price'>₹200/-</span>
                        </div>
                         <div className='item-actions'>
                            <button className='update-item-btn'>Update</button>
                            <button className='remove-item-btn'>Remove</button>
                        </div>
                    </div>*/}
                </div>
            </div>
            {/* cart summary*/}
            <div className='price-summary'>
                <div className='price-summary-heading'>price summary</div>
                <div className='summary-item'>
                    <p className='summary-label'>Subtotal:</p>
                    <p className='summary-value'>₹200/-</p>
            </div>
               <div className='summary-item'>
                    <p className='summary-label'>Tax(18%)</p>
                    <p className='summary-value'>10/-</p>
            </div>
               <div className='summary-item'>
                    <p className='summary-label'>Shipping:</p>
                    <p className='summary-value'>₹50/-</p>
            </div>
               <div className='summary-total'>
                    <p className='total-label'>Total:</p>
                    <p className='total-value'>₹260/-</p>
            </div>
            <button className='checkout-btn'>Proceed to Checkout</button>
        </div>
    </div>
    
    </>)}
      <Footer/>
    </>
  )
}

export default Cart
