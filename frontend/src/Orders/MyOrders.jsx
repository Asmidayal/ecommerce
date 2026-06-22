import React from 'react'
import '../OrderStyles/MyOrders.css'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import PageTitle from '../components/PageTitle'
import { Link } from 'react-router-dom'
import { LaunchOutlined } from '@mui/icons-material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrders } from '../features/order/orderSlice'
import { toast } from 'react-toastify'
import { removeErrors } from '../features/order/orderSlice'
import Loader from '../components/Loader'


const MyOrders = () => {
  const{orders,loading,error}=useSelector(state=>state.order);
  console.log(orders);
  const dispatch=useDispatch();
  useEffect(()=>{
    if(error){
       toast.error(error,{autoClose:3000});
                  dispatch(removeErrors());
    }
  dispatch(getAllOrders());
  },[dispatch,error]);

  return (
    <>
    <Navbar/>
    <PageTitle title="My Orders"/>
   { loading?(<Loader/>):orders.length>0?(<div className='my-orders-container'>
      <h1>My Orders</h1>
      <div className='table-responsive'>
        <table className='orders-table'>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Item Count</th>
            <th>Status</th>
            <th>Total Price</th>
            <th>View Order</th>
            </tr>
            </thead>
         <tbody>
             { orders.map((order)=>(
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.orderItems.length}</td>
                <td>{order.orderStatus}</td>
                <td>{order.totalPrice}</td>
                <td><Link to={`/order/${order._id}`} className='order-link'><LaunchOutlined/></Link></td>
              </tr>
             
             )) }
            </tbody>
            </table>
            </div>
    </div>):(
      <div className='no-orders'>
        <p className='no-order-message'>You have no orders yet.</p>
        
      </div>
    )}
    <Footer/>
    </>
  )
}

export default MyOrders

