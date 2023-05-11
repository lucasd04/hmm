import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'
import axios from 'axios';

export const Login = () => {
    // useNavigate to change the page url when called
    const navigate = useNavigate(); 

    // Submit handler
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
        .post('http://localhost:1337/api/auth/local', {
            identifier: e.target[0].value,
            password: e.target[1].value,
        })
        .then(response => {
            console.log('User profile', response.data.user);
            console.log('User token', response.data.jwt);
            
            // Save data to sessionStorage
            sessionStorage.setItem("id", response.data.user.id);
            sessionStorage.setItem("token", `Bearer ${response.data.jwt}`);
  
            navigate('/home')
          })
          .catch(error => {
            console.log('An error occurred:', error.response);
          });
    }



    // Return gemaakte form in div
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
        <div id='loginform'>
            <h2 id='headerTitle'>Login</h2>
            <div class='row'>
                <label>Username</label>
                <input type={'text'} placeholder={'Username'} />
            </div>  
            <div class='row'>
                <label>Password</label>
                <input type={'password'} placeholder={'Password'} />
            </div>  
            <div id='button' class='row'>
                <button type='submit'>Inloggen</button>
                <Link to={'/register'}>Geen account?</Link>
            </div>
        </div>
    </form>
    )
}