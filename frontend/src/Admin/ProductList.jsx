import React from 'react'
import '../AdminStyles/ProductsList.css'
import Navbar from '../components/Navbar'
import PageTitle from '../components/PageTitle'

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
                         <td></td>
                         <td></td>
                         <td></td>
                        <td></td>
                        <td></td>
                         <td></td>
                        <td></td>
                        <td></td>
                         <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
  </>
  )
}

export default ProductList
