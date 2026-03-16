import React, { useState } from 'react'
import '../pageStyles/Products.css'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTitle from '../components/PageTitle';
import { useSelector , useDispatch } from 'react-redux';
import Product from '../components/Product';
import { useEffect } from 'react';
import { getProduct } from '../features/productSlice';
import { toast } from 'react-toastify';
import { removeErrors } from '../features/productSlice';
import Loader from '../components/Loader';
import { useLocation } from 'react-router-dom';
import NoProducts from '../components/NoProducts';
import Pagination from '../components/Pagination';
import { useNavigate } from 'react-router-dom';



const Products = () => {
    const{loading,error,products,productCount,resultsPerPage}=useSelector((state)=>state.product);
    const dispatch=useDispatch();
    const location=useLocation();

    
   const searchParams= new URLSearchParams(location.search);
  //  console.log(searchParams);
    const keyword=searchParams.get('keyword'); //access parameter from url
    const category=searchParams.get('category'); //access category parameter from url
    const pageFromURL=parseInt(searchParams.get('page'),10) || 1;
    const [currentPage, setCurrentPage] = useState(pageFromURL);
     const navigate=useNavigate();
     const categories=['Lipsticks','Eyes','Face','Skincare'];
    
     useEffect(()=>{
            dispatch(getProduct({keyword, page:currentPage,category})); //fetching products when home component mounts
        },[dispatch,keyword,currentPage,category])
         useEffect(()=>{
                if(error){
                    toast.error(error.message,{autoClose:3000});
                    dispatch(removeErrors()); //dispatching action to remove error from state after showing error message
                }
                },[dispatch,error])
                const handlePageChange=(page)=>{
                    if(page!==currentPage){
                        setCurrentPage(page); //update value of current page
                    const newSearchParams= new URLSearchParams(location.search); // to get how many parametrs
                    if(page===1){
                        newSearchParams.delete('page'); //remove page parameter from url if page is 1
                    }else{
                        newSearchParams.set('page',page); //update page parameter in url
                    }
                    navigate(`?${newSearchParams.toString()}`); //navigate to new url with updated page parameter
                    }
                }
                const handleCategoryClick=(category)=>{
                    const newSearchParams= new URLSearchParams(location.search);
                    newSearchParams.set('category',category); //update category parameter in url
                    newSearchParams.delete('page');
                    navigate(`?${newSearchParams.toString()}`); //navigate to new url with updated category parameter

                }

  return (
    <>
    { loading?(<Loader/>):(<>
     <PageTitle title="All Products"/>
        <Navbar/>
        <div className='products-layout'>
            <div className='filter-section'>
                <h3 className='filter-heading'>CATEGORIES</h3>
                {/*render categories*/}
                <ul>
                    {
                        categories.map((category)=>{
                            return(
                            <li key={category} onClick={()=>handleCategoryClick(category)}>{category}</li>
                            )
                        })
                   }
                </ul>
                </div>
                <div className='products-section'>
                  {products.length>0?(  <div className='products-product-container'>
                 {products.map((product,index)=>(
                    <Product key={product._id} product={product}/>
                    )) }
                    </div>):(<NoProducts keyword={keyword}/>)}
                    <Pagination
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    />
                </div>
            </div>
        <Footer/>
    </>)}
    </>
  )
}

export default Products
