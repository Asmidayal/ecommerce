import React from 'react'
import '../AdminStyles/ProductsList.css'
import Navbar from '../components/Navbar'
import PageTitle from '../components/PageTitle'
import { Link } from 'react-router-dom'
import { Edit, Delete } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAdminProducts } from '../features/admin/adminSlice'

const ProductList = () => {
    const {products,loading,error} = useSelector((state)=>state.admin);
    console.log( products);
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(fetchAdminProducts());
    },[dispatch])

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
                  { products.map((product,index)=>(
                    <tr>
                         <td>{index + 1}</td>
                         <td><img src={product.image} alt="Product Image"/></td>
                         <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.ratings}</td>
                         <td>{product.category}</td>
                         <td>{product.stock}</td>
                        <td>{product.createdAt}</td>
                         <td>
                            <Link to ='/admin/products/:productId' className='action-icon edit-icon'><Edit/></Link>
                               <Link to ='/admin/products/:productId' className='action-icon delete-icon'><Delete/></Link>
                         </td>
                        </tr> 
  ))  }
                    </tbody>
                </table>
            </div>
  </>
  )
}

export default ProductList
