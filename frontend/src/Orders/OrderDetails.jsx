import React from 'react'
import '../OrderStyles/OrderDetails.css'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const OrderDetails = () => {
  return (
 <>
 <PageTitle title='Order Details'/>
 <Navbar/>
  <div className='order-box'>
    <div className='table-block'>
        <h2 className='table-title'>Order Items</h2>
        <table className='table-main'>
            <thead>
                <tr>
                    <th></th>
                </tr>
            </thead>
        </table>
    </div>
    </div>
    <Footer/>
 </>
  )
}

export default OrderDetails
