//  # Component for displaying a single recipe
import React from 'react';
import Button from '../../base/Button'
import './style.css'

const RecipeCard = ({imageURL,name,onViewMoreClick})=>{
    return(
        <div className='recipe-container flex column  '>
            <p className='bold black-text'>{name}</p>
            <img src={imageURL} width='200px' height={'130px'}/>
            <Button text={'view more'} bgColor="nav-color" onClick={onViewMoreClick}></Button>
            
        </div>
    )
}

export default RecipeCard;