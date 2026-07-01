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
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

const Dashboard = () => {
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
                  <Link to='/admin/products/create'>
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
            <p>4</p>
        </div>
        <div className='stat-box'>
            <h3>Total Users</h3>
            <p>10</p>
        </div>
        <div className='stat-box'>
            <h3>Total Orders</h3>
            <p>15</p>
        </div>
        <div className='stat-box'>
            <h3>Total Reviews</h3>
            <p>20</p>
        </div>
        <div className='stat-box'>
            <h3>Total Revenue</h3>
            <p>$5,000</p>
        </div>
        <div className='stat-box'>
            <h3>Out of Stock</h3>
            <p>20</p>
        </div>
        <div className='stat-box'>
            <h3>In Stock</h3>
            <p>20</p>
        </div>
    </div>
    </div>
        </div>
    <Navbar/>
    
    </>
  )
}

export default Dashboard
