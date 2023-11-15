import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './userview.css'
export const Userview = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Fetch user data from the API
    let token= localStorage.getItem('authToken');
    axios.post('http://localhost:3001/admin', {token}) // Adjust the API endpoint to match your server's route for user data
      .then((response) => {
        console.log('this is error',response.data);
        setUserData(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <div className='userviewcontainer'>
      <h2>User Data</h2>
      <ul>
        {userData.map((user, index) => (
          <li key={index}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Message: {user.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

