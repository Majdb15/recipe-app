import React from 'react';
import Button from './base/Button';
import Input from './base/Input';
import Socials from './components/Socials';
import LoginSignup from './pages/Login-Signup'
import NavBar from './components/NavBar';
import Popup from './base/popup';
import HomePage from './pages/HomePage/HomePage';
import RecipeViewDetails from './components/RecipeViewDetails'
import RecipeReviewForm from './components/RecipeReviewForm';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./utils/routes.jsx";
import RecipeShare from './components/RecipeShare';


const App = ()=>{
    return(
        <div className="flex column center">
        <BrowserRouter>
        <Routes>
          <Route path={routes.login} element={<LoginSignup />} />
          <Route path={routes.home} element={<HomePage></HomePage>} />
          <Route path="/recipe_details/:id" element={<RecipeViewDetails />} />
          <Route path="/recipe_review/:id" element={<RecipeReviewForm />} />
          <Route path="/recipe_share/:id" element={<RecipeShare />} />
          <Route path="/*" element={<h3>Not Found</h3>} />
        </Routes>
      </BrowserRouter>
    </div>
    )
}
export default App;