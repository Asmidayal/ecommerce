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
import { toast } from 'react-toastify'
import { removeErrors, removeSuccess } from '../features/admin/adminSlice'
import Loader from '../components/Loader'

const ProductList = () => {
    const {products,loading,error} = useSelector((state)=>state.admin);
    console.log( products);
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(fetchAdminProducts());
    },[dispatch])
    useEffect(()=>{
        if(error){
            toast.error(error,{autoClose:3000});
            dispatch(removeErrors()); //dispatching action to remove error from state after showing error message
        }
    },[dispatch,error])
if(!products || products.length===0){
    return(
        <div className="product-list-container">
            <h1 className="product-list-title">Admin Products</h1>
            <p className="no-admin-products">No Products Found</p>
        </div>
    )
}
const handleDelete = (productId) => {
  const isConfirmed = window.confirm('Are you sure you want to delete this product?');
  if (isConfirmed) {
    dispatch(deleteProduct(productId)).then((action) => {
      if (action.type === 'admin/deleteProduct/fulfilled') {
        toast.success("Product Deleted Successfully", {
          position: 'top-center',
          autoClose: 3000
        });
        dispatch(removeSuccess());
      }
    });
  }
};

  return (
    <>
 {loading?(<Loader/>):(<>
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
                         <td><img src={product.image?.[0].url} alt="Product Image" className='admin-product-image'/></td>
                         <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.ratings}</td>
                         <td>{product.category}</td>
                         <td>{product.stock}</td>
                        <td>{new Date(product.createdAt).toLocaleString()}</td>
                         <td>
                            <Link to ={`/admin/products/${product._id}`} className='action-icon edit-icon'><Edit/></Link>
                            <button className="action-icon delete-icon" onClick={() => handleDelete(product._id)}><Delete/></button>
                         </td>
                        </tr> 
  ))  }
                    </tbody>
                </table>
            </div>
  </>)}
  </>
  )
}

export default ProductList
