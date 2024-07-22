import React from 'react';
import Button from './base/Button';
import Input from './base/Input';
import Socials from './components/Socials';
import LoginSignup from './pages/Login-Signup'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./utils/routes.jsx";

const App = ()=>{
    return(
        <div className="flex column center">
        <BrowserRouter>
        <Routes>
          <Route path={routes.login} element={<LoginSignup />} />
          <Route path={routes.home} element={<div>HOME</div>} />
          <Route path="/*" element={<h3>Not Found</h3>} />
        </Routes>
      </BrowserRouter>
    </div>
    )
}
export default App;