import React from 'react'
import '../AdminStyles/OrdersList.css'
import Navbar from '../components/Navbar'
import PageTitle from '../components/PageTitle'
import Footer from '../components/Footer'

const OrdersList = () => {
  return (
   <>
    <Navbar />
    <PageTitle title="Orders" />
    <div className="ordersList-container">
        <h1 className="ordersList-title">All Orders</h1>
        <div className="ordersList-table-container">
            <table className="ordersList-table">
                <thead>
                    <tr>
                        <th>SNo.</th>
                         <th>Order ID</th> 
                           <th>Status</th>
                         <th>Total Price</th>
                          <th>Number of Items</th>
                            <th>Actions</th>
                    </tr>
                </thead>
            </table>
        </div>
        </div>
    <Footer/>
    </>
  )
}

export default OrdersList
