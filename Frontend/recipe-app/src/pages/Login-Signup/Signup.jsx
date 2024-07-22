import React from "react";
import { useState } from "react";
import './style.css'
import Input from "../../base/Input";
import Button from "../../base/Button";
import Socials from "../../components/Socials"

const SignUpForm = ()=> {

  const handelSignup = (e)=>{
    e.preventDefault();
    console.log("signup pressed")
  }

  return (
    <div className="form-container sign-up-container">
      <form>
        <h1>Crate Account</h1>
        <Socials></Socials>
        <span>or use your email for registration</span>
        <Input placeHolder='Name' type='text'></Input>
        <Input placeHolder='Email' type='text'></Input>
        <Input placeHolder='Password' type='password'></Input>
        <Button text='Sign in' onClick={handelSignup}></Button>
      </form>
    </div>
  );
}

export default SignUpForm;