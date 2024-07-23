import React, { useState } from 'react';
import Input from '../../base/Input';
import Button from '../../base/Button';
import TextArea from '../../base/TextArea';
import './style.css';
import { IoMdStar } from "react-icons/io";

const RecipeReviewForm = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div className='container'>
      <div className='flex column center full-width'>
        <form className='form-container flex column full-height'>
          <h1>Review</h1>
          <Input placeHolder='Email' type='text' />
          <TextArea placeHolder={'Review Message'} type={'textarea'} className='textarea' />
          
          <div className='stars'>
            {[...Array(5)].map((star, i) => {
              const ratingValue = i + 1;
              return (
                <label key={i} className="star-label">
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => setRating(ratingValue)}
                  />
                  <IoMdStar
                    className="star"
                    size={30}  // Adjusted the size here
                    color={ratingValue <= (hover || rating) ? "#2B2073" : "#e4e5e9"}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
                  />
                </label>
              );
            })}
            </div>
            <Button text='Submit Review' />
            <p>rating is {rating}</p>
        </form>
      </div>
    </div>
  );
};

export default RecipeReviewForm;
