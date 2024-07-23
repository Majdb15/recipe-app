import React from 'react';
import './style.css';

const Navbar = () => {
  return (

<nav className="navbar">
    <div className="navbar-left">
        <a href="/" className="logo">
        Home
        </a>
    </div>
    <div className="navbar-center">
        <ul className="nav-links">
        <li>
            <a href="/products">Recipes</a>
        </li>
        <li>
            <a href="/about">Shared with me</a>
        </li>
        <li>
            <a href="/contact">Publish a recipe</a>
        </li>
        </ul>
    </div>
    <div className="navbar-right">
        <a href="/cart" className="cart-icon">
        <i className="fas fa-shopping-cart"></i>
        <span className="cart-count">0</span>
        </a>
        <a href="/account" className="user-icon">
        <i className="fas fa-user"></i>
        </a>
    </div>
</nav>
);
};

export default Navbar;