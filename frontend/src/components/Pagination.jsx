import React from 'react'
import '../componentStyles/Pagination.css'
import { useSelector } from 'react-redux';

const Pagination = ({
    currentPage,
    onPageChange,
    activeClass='active',
    nextPageText="next",
    prevPageText="prev",
    firstPageText='1st',
    lastPageText='last',
}) => {
     const{totalPages,products} = useSelector((state)=>state.product);
     if(products.length===0|| totalPages<=1) return null; 
     //generate page numbers
     const getPageNumbers=()=>{
        const pageNumbers=[];
        const pageWindow=2;
        for(let i=Math.max(1,currentPage-pageWindow);i<=Math.min(totalPages,currentPage+pageWindow);i++){
            pageNumbers.push(i);
        }
        return pageNumbers;
     }
  return (
    <div className='pagination'>
        {/* first and prev buttons*/}
       {
        currentPage>1 &&(
            <>
            <button className='pagination-btn' onClick={()=>onPageChange(1)}>{firstPageText}</button>
            <button className='pagination-btn' onClick={()=>onPageChange(currentPage-1)}>{prevPageText}</button>
            </>
        )
       }

         {/* page numbers */}
        { getPageNumbers().map((number)=>(
            <button key={number} className={`pagination-btn ${currentPage===number?activeClass:''}`} onClick={()=>onPageChange(number)}>
                {number}
            </button>
         ))}

         {/* next and last buttons*/}
       {
        currentPage<totalPages &&(
            <>
            <button className='pagination-btn' onClick={()=>onPageChange(currentPage+1)}>{nextPageText}</button>
            <button className='pagination-btn' onClick={()=>onPageChange(totalPages)}>{lastPageText}</button>
            </>
        )
       }
    </div>
  )
}

export default Pagination
