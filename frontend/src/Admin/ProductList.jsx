import React from 'react'
import '../AdminStyles/ProductsList.css'
import Navbar from '../components/Navbar'
import PageTitle from '../components/PageTitle'
import { Link } from 'react-router-dom'
import { Edit, Delete } from '@mui/icons-material'

const ProductList = () => {
  return (
  <>
  <Navbar/>
  <PageTitle title="All Products"/>
  <div className="product-list-container">
                <h1 className="product-list-title">All Products</h1>
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>SNo.</th>
                            <th>Product Image</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Ratings</th>
                            <th>Categories</th>
                            <th>Stock</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                         <td>1</td>
                         <td><img src="" alt="Product Image"/></td>
                         <td>Lipstick</td>
                        <td>300/-</td>
                        <td>4.5</td>
                         <td>Lips</td>
                         <td>4</td>
                        <td>5-06-2026</td>
                         <td>
                            <Link to ='/admin/products/:productId' className='action-icon edit-icon'><Edit/></Link>
                               <Link to ='/admin/products/:productId' className='action-icon delete-icon'><Delete/></Link>
                         </td>
                        </tr>
                    </tbody>
                </table>
            </div>
  </>
  )
}

export default ProductList
