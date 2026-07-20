import React from 'react'
import '../AdminStyles/UpdateProduct.css'
import Navbar from '../components/Navbar'
import PageTitle from '../components/PageTitle'
import Footer from '../components/Footer'

const UpdateProduct = () => {
  return (
   <>
   <Navbar/>
   <PageTitle title="Update Product"/>
   <div className="update-product-wrapper">
    <h1 className='update-product-title'> Update Product</h1>
    <form className="update-product-form" enctype="multipart/form-data">
    <label htmlFor="name" >Product Name</label>
       <input type="text" className='update-product-input' id="name" name="name" required/>
       <label htmlFor="price" >Product Price</label>
       <input type="text" className='update-product-input' id="price" name="price" required/>
    <label htmlFor="description" >Product Description</label>
       <textarea className='update-product-textarea' id="description" name="description" required></textarea>
    </form>
   </div>
   <Footer/>
   </>
  )
}

export default UpdateProduct


