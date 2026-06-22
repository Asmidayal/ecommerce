import React from 'react'
import '../OrderStyles/MyOrders.css'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import PageTitle from '../components/PageTitle'
import { Link } from 'react-router-dom'
import { LaunchOutlined } from '@mui/icons-material'

const MyOrders = () => {
  return (
    <>
    <Navbar/>
    <PageTitle title="My Orders"/>
    <div className='my-orders-container'>
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
              <tr>
                <td>1111</td>
                <td>5</td>
                <td>Processing</td>
                <td>400</td>
                <td><Link to="/order/:id"><LaunchOutlined/></Link></td>
              </tr>
            </tbody>
            </table>
            </div>
    </div>
    <Footer/>
    </>
  )
}

export default MyOrders

