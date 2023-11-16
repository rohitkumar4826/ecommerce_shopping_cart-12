import React from "react"
import "./login.css";
import {useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {useNavigate} from "react-router-dom";
export const Admin = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const navigate = useNavigate();
    const handleSubmit=(e)=>{
      e.preventDefault();
      console.log('email,password',email,password);
      axios.post('/admin',{email,password})
      .then(result=>
       {console.log(result.data);
       navigate("/userview");
       }
       )
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
    <>
    <div className="containe">
      <div className="wrapper">
        <div className="title"><span>Admin Form</span></div>
        <form method="post" onSubmit={handleSubmit}  className="form" >
          <div className="row">
            <i className="fas fa-user"></i>
            <input type="text" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} aria-label="phone" required  />
          </div>
          <div className="row">
            <i className="fas fa-lock"></i>
            <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} aria-label="password" required  />
          </div>
          <div className="signup-link">Not a member? <Link to="/">Signup Now</Link></div>
          <div className="row button">
            <input type="submit" value="Login" aria-label="submit" />
          </div>
        </form>
      </div>
    </div>
    
    </>
  );
};

