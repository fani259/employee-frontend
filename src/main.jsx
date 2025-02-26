import React from "react";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthContext from "./context/authContext.jsx"; // ✅ Use exact case

createRoot(document.getElementById('root')).render(
  <AuthContext>
    <App />
  </AuthContext>
)
