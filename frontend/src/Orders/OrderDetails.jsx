import React from 'react'
import '../OrderStyles/OrderDetails.css'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import{useDispatch} from 'react-redux'
import { getOrderDetails } from '../features/order/orderSlice'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'

const OrderDetails = () => {
    const{orderId} = useParams();
    const{ order,loading,error} = useSelector(state => state.order);
     console.log("full order state",order);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrderDetails(orderId));
        if (error) {
           toast.error(error,{autoClose:3000});
                     dispatch(removeErrors());
        }
    }, [dispatch, error,orderId]);
const{
    shippingInfo={},
    orderItems=[],
    paymentInfo={},
    orderStatus,
    totalPrice,
    taxPrice,
    shippingPrice,
    itemPrice,
    paidAt
}=order;

  return (
 <>
 <PageTitle title={orderId}/>
 <Navbar/>
 {loading ?(<Loader/>):( <div className='order-box'>ui
    <div className='table-block'>
        <h2 className='table-title'>Order Items</h2>
        <table className='table-main'>
            <thead>
                <tr>
                    <th className='head-cell'>Image</th>
                    <th className='head-cell'>Name</th>
                    <th className='head-cell'>Quantity</th>
                    <th className='head-cell'>Price</th>
                </tr>
            </thead>
            <tbody>
              {orderItems.map((item)=>(
                 <tr className='table-row'>
                    <td className='table-cell'><img src={item.image} alt={item.name} className='item-image'/></td>
                    <td className='table-cell'>{item.name}</td>
                    <td className='table-cell'>{item.quantity}</td>
                    <td className='table-cell'>{item.price}</td>
                </tr>
              ))  }
            </tbody>
        </table>
    </div>
    {/* shipping details */}
    <div className='table-block'>
        <h2 className='table-title'>Shipping Details</h2>
        <table className='table-main'>
            <tbody>
                <tr className='table-row'>
                <th className='table-cell'>Address</th>
                <td className='table-cell'>{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state}, {shippingInfo.country}, {shippingInfo.pincode}</td>
                </tr>
                 <tr className='table-row'>
                <th className='table-cell'>Phone</th>
                <td className='table-cell'>{shippingInfo.phoneNo}</td>
                </tr>
                </tbody>
                </table>
        </div>
        {/*order details*/}
        <div className='table-block'>
            <h2 className='table-title'>Order Summary</h2>
            <table className='table-main'>
                <tbody>
                    <tr className='table-row'>
                        <th className='table-cell'>Order Status</th>
                        <td className='table-cell'>
                            <span className='status-tag processing'>Processing</span>
                        </td>
                    </tr>
                    <tr className='table-row'>
                        <th className='table-cell'>Payment Status</th>
                        <td className='table-cell'>
                        <span className='pay-tag paid'>PAID</span>
                        </td>
                    </tr>
                    {paidAt &&( <tr className='table-row'>
                        <th className='table-cell'>Paid-At</th>
                        <td className='table-cell'> {new Date(paidAt).toLocaleString()}
                        </td>
                    </tr>)}
                      <tr className='table-row'>
                        <th className='table-cell'>Item Price</th>
                        <td className='table-cell'>{itemPrice}</td>
                    </tr>
                      <tr className='table-row'>
                        <th className='table-cell'>Tax Price</th>
                        <td className='table-cell'>{taxPrice}</td>
                    </tr>
                      <tr className='table-row'>
                        <th className='table-cell'>Shippin Price</th>
                        <td className='table-cell'>{shippingPrice}</td>
                    </tr>
                      <tr className='table-row'>
                        <th className='table-cell'>Total Price</th>
                        <td className='table-cell'>{totalPrice}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>)}
    <Footer/>
 </>
  )
}

export default OrderDetails
