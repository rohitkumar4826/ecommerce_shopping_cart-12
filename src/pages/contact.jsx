import React, { useState } from "react";
import "./contact.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/navbar";
export const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
   const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
        // Basic client-side validation
        if (!name || !email || !message) {
          alert("Please fill in all fields.");
          return;
        }
    const token = localStorage.getItem("authToken"); // Get token from local storage

    const data = {
      name,
      email,
      message,
    };

    try {
      const response = await axios.post('/contact', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      navigate("/shop");
      console.log(response.data); // Handle success response
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <>
    <Navbar></Navbar>
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="head">CONTACT US</h2>
        <p type="Name:">
          <input
            className="inname"
            placeholder="Write your name here.."
            aria-label="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </p>
        <p className="email" type="Email:">
          <input
            className="inemail"
            placeholder="Let us know how to contact you back.."
            aria-label="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </p>
        <p className="message" type="Message:">
          <input
            className="inmessage"
            placeholder="What would you like to tell us.."
            aria-label="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></input>
        </p>
        <button className="sendme" type="submit">
          Send Message
        </button>
        <div className="icon">
          {/* <span className="fa fa-phone"></span>+91 8221911147 */}
          <span className="fa fa-envelope-o"></span> rohit4826iiitu@gmail.com
        </div>
      </form>
    </>
  );
};
