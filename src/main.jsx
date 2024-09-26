import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import dotenv from "dotenv"
import axios from 'axios'

axios.defaults.baseURL = 'https://urlshortener-backend-5dvn.onrender.com/api/user';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
