import React from 'react';
import Button from './base/Button';
import Input from './base/Input';
import Socials from './components/Socials';
import LoginSignup from './pages/Login-Signup'
import NavBar from './components/NavBar';
import Popup from './base/popup';
import HomePage from './pages/HomePage/HomePage';
import RecipeViewDetails from './components/RecipeViewDetails'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./utils/routes.jsx";


const App = ()=>{
    return(
        <div className="flex column center">
        <BrowserRouter>
        <Routes>
          <Route path={routes.login} element={<LoginSignup />} />
          <Route path={routes.home} element={<HomePage></HomePage>} />
          <Route path="/recipe_details/:id" element={<RecipeViewDetails />} />
          <Route path="/*" element={<h3>Not Found</h3>} />
        </Routes>
      </BrowserRouter>
    </div>
    )
}
export default App;