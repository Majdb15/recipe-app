import React from 'react';
import Navbar from '../../components/NavBar';

const HomePage = ()=>{
    console.log(localStorage.getItem("userID"));
    return(
        <Navbar></Navbar>
    )
}

export default HomePage;