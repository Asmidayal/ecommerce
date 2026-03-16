import React from 'react'
import '../componentStyles/Rating.css'
import { useState } from 'react';

const Rating = ({value, onRatingChange, disabled}) => {
     const[hoverRating, setHoverRating] =useState(0);
     const[selectedRating, setSelectedRating] =useState(value);
     //handle star hover
     const handleMouseEnter = (rating) => {
        if(!disabled){
            setHoverRating(rating);
        }
    }
//mouse leave
    const handleMouseLeave = () => {
        if(!disabled){
            setHoverRating(0);
        }
    }
//handle click
    const handleClick = (rating) => {
        if(!disabled){
            setSelectedRating(rating);
            if(onRatingChange){
                onRatingChange(rating); // if rating is changed ,passing back to parent component 
            }
        }
    }
    //function to generate star class based on rating and hover state
    const generateStar= (index) => {
        const stars=[];
        for(let i=1; i<=5; i++){
            const isFilled = i <= (hoverRating || selectedRating);
            stars.push(
                <span key={i} className={`star ${isFilled ? 'filled' : 'empty'}`} 
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(i)}
                style={{pointerEvents:disabled?'none':'auto'}} //disabling mouse events
                >★</span>
            )
        }
        return stars;
    }
  return (
    <div>
    <div className='rating'>{generateStar()}</div>
    </div>
  )
}

export default Rating
