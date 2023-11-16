import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import "./signup.css"
import axios from "axios";
export const SignUp = () => {
  const navigate= useNavigate()
  const [email, setEmail]=useState();
  const [password, setPassword]=useState();
  const [cpassword, setCpassword]=useState();
  const handleSubmit = (e)=>{
    e.preventDefault()
       axios.post('/signup',{email,password,cpassword})
       .then(result=>
        {console.log(result);
          const token = result.data.token;
          localStorage.setItem("authToken", token); // Set the token in local storage
        navigate("/shop");
        })
        .catch(error => {
          if (error.response) {
            const errorMessage = error.response.data.message || 'An error occurred';
            alert(errorMessage);
          } else {
            alert('An error occurred');
          }
        });
  }
  return (
   
    <div className="containe">
      <div className="wrapper">
        <div className="title"><span>SignUp Form</span></div>
        <form action="#" onSubmit={handleSubmit}>
          <div className="row">
            <i className="fas fa-user"></i>
            <input type="text" name="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Email or Phone" required aria-label="phone" />
          </div>
          <div className="row">
            <i className="fas fa-lock"></i>
            <input type="password" name="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Password" required />
          </div>
          <div className="row">
            <i className="fas fa-lock"></i>
            <input type="password" name="cpassword" onChange={(e)=>setCpassword(e.target.value)} placeholder="Confirm Password" required aria-label="cpassword" />
          </div>
          <div className="row button">
            <input type="submit" value="Sign Up" aria-label="submit" />
          </div>
          <div className="signup-link">Already registered? <Link to="/login">Login</Link></div>
        </form>
        
      </div>
    </div>
  );
};