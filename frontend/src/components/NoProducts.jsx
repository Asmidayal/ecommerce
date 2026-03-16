import React from 'react'
import '../componentStyles/NoProducts.css'


const NoProducts = ({keyword}) => {
  return (
  <div className='no-products-content'>
    <div className='no-products-icon'> ⚠️</div>
         <h3 className='no-products-title'>No Products Found</h3>
         <p className='no-products-message'>{keyword?`Sorry, no products match your search criteria for "${keyword}".`:"Sorry, no products found."}</p>
        </div>
    
  
  )
}

export default NoProducts
