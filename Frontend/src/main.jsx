import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react';
import App from './App';
import { AuthProvider } from "./components/AuthContext";

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <App/>
     </AuthProvider>
);
