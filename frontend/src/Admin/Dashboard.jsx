import React from 'react'
import '../AdminStyles/Dashboard.css'

import{
    Dashboard as DashboardIcon,
    Inventory,
    AddBox,
    People,
    ShoppingCart,
    Star
}from '@mui/icons-material'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'

import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getRevenueByMonth } from '../features/order/orderSlice'
import {LineChart,BarChart,Line,Bar,XAxis,YAxis,Tooltip,CartesianGrid,ResponsiveContainer} from 'recharts'
import { fetchAdminProducts } from '../features/admin/adminSlice'
import { fetchAllOrders } from '../features/admin/adminSlice'
const Dashboard = () => {
    const dispatch=useDispatch();
    const {revenueData,revenueLoading}=useSelector((state)=>state.order);
const {orders,products,totalAmount}=useSelector((state)=>state.admin);

    useEffect(()=>{
        dispatch(getRevenueByMonth());
    },[dispatch]);
    useEffect(()=>{
    dispatch(fetchAdminProducts())
    dispatch(fetchAllOrders())
},[dispatch])
const totalProducts=products.length;
const totalOrders=orders.length;
const outOfStock=products.filter(product=>product.stock===0).length;
const inStock=products.filter(product=>product.stock>0).length;
const totalReviews=products.reduce((acc,product)=>acc+(product.reviews.length||0),0)

  return (
    <>
    <PageTitle title="Admin Dashboard"/>
    <div className='dashboard-container'>
        <div className='sidebar'>
            <div className='logo'>
                <DashboardIcon className='logo-icon'/>
               Admin Dashboard
            </div>
            <nav className='nav-menu'>
            <div className='nav-section'>
                <h3>Products</h3>
                <Link to='/admin/products'>
                <Inventory className='nav-icon'/>
                All Products</Link>
                  <Link to='/admin/product/create'>
                <AddBox className='nav-icon'/>
                Create Product</Link>
                </div>
            </nav>
             <nav className='nav-menu'>
            <div className='nav-section'>
                <h3>User</h3>
                <Link to='/admin/users'>
                <People className='nav-icon'/>
                All Users</Link>
              
                </div>
            </nav>
             <nav className='nav-menu'>
            <div className='nav-section'>
                <h3>Orders</h3>
                <Link to='/admin/orders'>
                <ShoppingCart className='nav-icon'/>
                All Orders</Link>
              
                </div>
            </nav>
             <nav className='nav-menu'>
            <div className='nav-section'>
                <h3>Reviews</h3>
                <Link to='/admin/reviews'>
                <Star className='nav-icon'/>
                All Reviews</Link>
              
                </div>
            </nav>
            </div>
<div className='main-content'>
    <div className='stats-grid'>
        <div className='stat-box'>
            <h3>Total Products</h3>
            <p>{totalProducts}</p>
        </div>
        <div className='stat-box'>
            <h3>Total Users</h3>
            <p>{totalAmount}</p>
        </div>
        <div className='stat-box'>
            <h3>Total Orders</h3>
            <p>{totalOrders}</p>
        </div>
        <div className='stat-box'>
            <h3>Total Reviews</h3>
            <p>{totalReviews}</p>
        </div>
        <div className='stat-box'>
            <h3>Total Revenue</h3>
            <p>{totalAmount}</p>
        </div>
        <div className='stat-box'>
            <h3>Out of Stock</h3>
            <p>{outOfStock}</p>
        </div>
        <div className='stat-box'>
            <h3>In Stock</h3>
            <p>{inStock}</p>
        </div>
    </div>
    {/*chart section*/}
    <div className='chart-section'>
        <div className='chart-box'>
            <h3>Revenue Overview</h3>
            <ResponsiveContainer width="100%" aspect={4}>
                <LineChart data={revenueData} margin={{top:5,right:30,left:20,bottom:25}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="month"/>
                    <YAxis domain={[0, 'auto']}/>
                    <Tooltip/>
                    <Line type="monotone" dataKey="revenue" stroke="#bf50eb" activeDot={{r:8}}/>
                </LineChart>
            </ResponsiveContainer>
            </div>
        </div>
    </div>
        </div>
    <Navbar/>
    
    </>
  )
}

export default Dashboard
