import React, { useEffect } from "react";
import { useState} from "react";
import './style.css'
import Input from "../../base/Input";
import Button from "../../base/Button";
import Socials from "../../components/Socials"
import Popup from "../../base/popup";
import { useNavigate } from "react-router-dom";

const SignUpForm = ()=> {

  const[name,setName]=useState('')

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const [isEmptyFieldsPopup, setEmptyFieldsPopup] = useState(false);

  const toggleEmptyFieldsPopup = () => {
    setEmptyFieldsPopup(!isEmptyFieldsPopup);
  };

  const [password1,setPassword1]= useState('');
  const [password2,setPassword2]= useState('');
  const [passwordMatchFlag,setPasswordMatchFlag]=useState(true);

  const matchPassword = (password1, password2) => {
    return password1 === password2;
  };

  useEffect(() => {
    setPasswordMatchFlag(password1 !== '' && password2 !== '' && !matchPassword(password1, password2));
  }, [password1, password2]);

  const [email,setEmail]=useState('');
  const [emailFlag,setEmailFlag]=useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    setEmailFlag(email !== '' && !validateEmail(email));
  }, [email]);


  const handelSignup = async (e)=>{
    e.preventDefault();
    if(email===''||name===''||password1===''|| password2===''){
      toggleEmptyFieldsPopup();
    }
    else {
    const URL = 'http://localhost/React-PHP-Recipe-App/recipe-app/Backend/public/api/createUser';
    const response = await fetch(URL, {
      method: 'POST', // Specify the method
      headers: {
        'Content-Type': 'application/json', // Specify the content type
      },
      body: JSON.stringify({
        name:name,
        email: email,
        password: password1,
      }),
    });
    const data = await response.json();
      if(data.message==="User created!"){
        console.log("created");
        togglePopup();
      }
    }
  }

  return (
    <div className="form-container sign-up-container">
      <form>
        <h1>Crate Account</h1>
        <Socials></Socials>
        <span>or use your email for registration</span>
        <Input placeHolder='Name' type='text' onTextChange={(e) => {setName(e.target.value)}}></Input>
        <Input placeHolder='Email' type='text' onTextChange={(e) => {setEmail(e.target.value)}}></Input>
        <Input placeHolder='Password' type='password' onTextChange={(e) => {setPassword1(e.target.value)}}></Input>
        <Input placeHolder='Cofirm Password' type='password' onTextChange={(e) => {setPassword2(e.target.value)}}></Input>
        {passwordMatchFlag && <p>Passwords do not match</p>}
        <Button text='Sign in' onClick={handelSignup}></Button>
        {emailFlag && <p>Invalid Email</p>}
        {isPopupVisible && <Popup message='You may login now' onClose={()=>{setIsPopupVisible(false)}}></Popup>}
        {isEmptyFieldsPopup && <Popup message='Can not have empty fields' onClose={()=>{setEmptyFieldsPopup(false)}}></Popup>}
      </form>
    </div>
  );
}
export default SignUpForm;