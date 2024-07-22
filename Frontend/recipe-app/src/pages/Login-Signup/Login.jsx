import React from "react";
import { useState } from "react";
import './style.css'
import Input from "../../base/Input";
import Button from "../../base/Button";
import Socials from "../../components/Socials"

const SignInForm =() => {

  const handleLogin = (e)=>{
    e.preventDefault();
    console.log("login pressed")
  }

  return (
    <div className="form-container sign-in-container">
      <form>
        <h1>Sign in</h1>
        <Socials></Socials>
        <span>or use your account</span>
        <Input placeHolder='Email' type='text'></Input>
        <Input placeHolder='Password' type='password'></Input>
        <a href="#">Forgot your password?</a>
        <Button text='Sign in' onClick={handleLogin}></Button>
      </form>
    </div>
  );
}

export default SignInForm;