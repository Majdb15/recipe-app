import React from 'react';
import Navbar from '../../components/NavBar';
import RecipeCard from '../../components/RecipeCard';
import RecipesList from '../../components/RecipeList';

import './style.css'

const HomePage = ()=>{
    console.log(localStorage.getItem("userID"));
    return(
            <div className='page-container'>
                    <Navbar className='nav-bar'></Navbar>
                    <div className='recipe-card-container flex row '>
                        <RecipesList></RecipesList>
                    </div>
            </div>
    )
}

export default HomePage;