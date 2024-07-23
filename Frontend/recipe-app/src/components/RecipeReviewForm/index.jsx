import React, { useState, useEffect } from 'react';
import Input from '../../base/Input';
import Button from '../../base/Button';
import TextArea from '../../base/TextArea';
import Popup from '../../base/popup';
import './style.css';
import { IoMdStar } from "react-icons/io";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const RecipeReviewForm = () => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [email,setEmail]= useState('');
    const [reviewMessage,setReviewMessage]= useState('');
    const { id } = useParams();
    const [emailFlag,setEmailFlag]=useState(false);

    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    useEffect(() => {
      setEmailFlag(email !== '' && !validateEmail(email));
    }, [email]);

    const nav = useNavigate();

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const [isEmptyFieldsPopup, setEmptyFieldsPopup] = useState(false);

  const toggleEmptyFieldsPopup = () => {
    setEmptyFieldsPopup(!isEmptyFieldsPopup);
  };

    const handleReviewSubmission=async (e)=>{
      e.preventDefault();
      if(email===''||reviewMessage===''){
        //toggleEmptyFieldsPopup();
      }
      else {
      const URL = `http://localhost/React-PHP-Recipe-App/recipe-app/Backend/public/api/review/${id}`;
      const response = await fetch(URL, {
        method: 'POST', // Specify the method
        headers: {
          'Content-Type': 'application/json', // Specify the content type
        },
        body: JSON.stringify({
          recipe_id: `${id}`,
          review_message: reviewMessage,
          rating :rating,
          user_id: localStorage.getItem('userID'),
        }),
      });
  
      const data = await response.json();
      console.log(data);
      if(data.message==="Failed to create review."){
        togglePopup();
      }
      else if(data.message==="Review created!"){
        nav('/home');
      }
    }
  }

  return (
    <div className='container'>
      <div className='flex column center full-width'>
        <form className='form-container flex column full-height'>
          <h1>Review</h1>
          <Input placeHolder='Email' type='text' onTextChange={(e) => {setEmail(e.target.value)}} />
          <TextArea placeHolder={'Review Message'} type={'textarea'} className='textarea' onTextChange={(e)=>{setReviewMessage(e.target.value)}} />
          
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
                    size={30}  
                    color={ratingValue <= (hover || rating) ? "#2B2073" : "#e4e5e9"}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
                  />
                </label>
              );
            })}
            </div>
            <Button text='Submit Review' onClick={handleReviewSubmission} />
            {isPopupVisible && <Popup message='Wrong email or password' onClose={()=>{setIsPopupVisible(false)}}></Popup>}
            {isEmptyFieldsPopup && <Popup message='Can not have empty fields' onClose={()=>{setEmptyFieldsPopup(false)}}></Popup>}
        </form>
      </div>
    </div>
  );
};

export default RecipeReviewForm;
