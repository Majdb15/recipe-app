import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './style.css';
import { routes } from "../../utils/routes";
const Navbar = () => {
  const navigate = useNavigate(); // Create a navigate function

  // Handler functions for navigation
  const goToHome = () => navigate(routes.home);
  //const goToRecipes = () => navigate(routes.recipes);
  const goToShared = () => navigate(routes.shared_with_me);
  const goToPublish = () => navigate(routes.publish_recipe);
  const goToAccount = () => navigate(routes.account);
  const logout = () => navigate(routes.login);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/" onClick={(e) => { e.preventDefault(); goToHome(); }} className="logo">
          Home
        </a>
      </div>
      <div className="navbar-center">
        <ul className="nav-links">
          <li>
            <a href="/" onClick={(e) => { e.preventDefault(); goToShared(); }}>Shared with me</a>
          </li>
          <li>
            <a href="/" onClick={(e) => { e.preventDefault(); goToPublish(); }}>Publish a recipe</a>
          </li>
          
        </ul>
      </div>
      <div className="navbar-right">
        <a href="/" onClick={(e) => { e.preventDefault(); logout(); }}>Logout</a>
        <a href="/" onClick={(e) => { e.preventDefault(); goToAccount(); }} className="user-icon">
          <i className="fas fa-user fa-2x"></i>
        </a>
        
      </div>
    </nav>
  );
};

export default Navbar;
