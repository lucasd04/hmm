import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css'

export const Register = () => {
    // useNavigate to change the page url when called
    const navigate = useNavigate(); 

    // Submit handler
    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios
        .post('http://localhost:1337/api/auth/local/register', {
          username: e.target[0].value,
          email: e.target[1].value,
          password: e.target[2].value,
        })
        .then(response => {
          console.log('User profile', response.data.user);
          console.log('User token', response.data.jwt);
          
          // Save data to sessionStorage
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
            <div id='registerform'>
                <h2 id='headerTitle'>Nieuw account</h2>
                <div class='row'>
                    <label>Username</label>
                    <input type={'text'} placeholder={'Username'} required minlength={3} maxLength={25}/>
                </div>
                <div class='row'>
                    <label>E-mail</label>
                    <input type={'email'} placeholder={'E-mail'} minlength={6} required maxLength={30}/>
                </div>  
                <div class='row'>
                    <label>Password</label>
                    <input type={'password'} placeholder={'Password'} required minLength={8}/>
                </div>  
                <div id='button' class='row'>
                    <button type='submit'>Aanmaken</button>
                    <Link to={'/login'}>Ik heb een account</Link>
                </div>
            </div>
        </form>
    )
}