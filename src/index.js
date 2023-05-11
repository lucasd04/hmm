import React from 'react';
import ReactDOM from 'react-dom/client';
// Import 'react-router' om op elk url het juiste component te laten zien
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './index.css';
import reportWebVitals from './reportWebVitals';
import { Navbar } from './components/Navbar/Navbar';
import { Index } from './components/Index/Index';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Navbar />
      <Routes>
        {/* Index page */}
        <Route path="/home" element={ <Index /> } />

        {/* Login page */}
        <Route path="/login" element={ <Login /> } />

        {/* Register page */}
        <Route path="/register" element={ <Register /> } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
