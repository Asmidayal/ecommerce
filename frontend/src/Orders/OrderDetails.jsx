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

const OrderDetails = () => {
    const{orderId} = useParams();
    const{ order,loading,error} = useSelector(state => state.order);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrderDetails(orderId));
        if (error) {
           toast.error(error,{autoClose:3000});
                     dispatch(removeErrors());
        }
    }, [dispatch, error,orderId]);


  return (
 <>
 <PageTitle title={orderId}/>
 <Navbar/>
  <div className='order-box'>
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
                <tr className='table-row'>
                    <td className='table-cell'><img src='' alt='item-image' className='item-image'/></td>
                    <td className='table-cell'>Lipstick</td>
                    <td className='table-cell'>3</td>
                    <td className='table-cell'>300/-</td>
                </tr>
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
                <td className='table-cell'>address, city, state,country, pincode</td>
                </tr>
                 <tr className='table-row'>
                <th className='table-cell'>Phone</th>
                <td className='table-cell'>945763812</td>
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
                        <td className='table-cell'>Processing</td>
                    </tr>
                    <tr className='table-row'>
                        <th className='table-cell'>Payment Status</th>
                        <td className='table-cell'>Paid</td>
                    </tr>
                      <tr className='table-row'>
                        <th className='table-cell'>Paid-At</th>
                        <td className='table-cell'>Paid</td>
                    </tr>
                      <tr className='table-row'>
                        <th className='table-cell'>Item Price</th>
                        <td className='table-cell'>300/-</td>
                    </tr>
                      <tr className='table-row'>
                        <th className='table-cell'>Tax Price</th>
                        <td className='table-cell'>30/-</td>
                    </tr>
                      <tr className='table-row'>
                        <th className='table-cell'>Shippin Price</th>
                        <td className='table-cell'>10/-</td>
                    </tr>
                      <tr className='table-row'>
                        <th className='table-cell'>Total Price</th>
                        <td className='table-cell'>340/-</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <Footer/>
 </>
  )
}

export default OrderDetails
