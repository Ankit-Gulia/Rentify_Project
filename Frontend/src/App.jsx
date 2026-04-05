
import React, {useState} from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import ListingDetails from './pages/ListingDetails.jsx'
import AddListing from './pages/AddListing.jsx';
import EditListing from './pages/EditListing.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import ProtectedRoute from './components/Protected.jsx';
import NotFound from './pages/NotFound.jsx';
import Footer from './components/Footer.jsx';
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
          <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<Navigate to="/listing" />} />
          <Route path='/listing' element={<Home/>} />
          <Route path='/listing/:id' element={<ListingDetails/>}/>
          <Route path='/listing/add' element={
            <ProtectedRoute>
              <AddListing/>
            </ProtectedRoute>
          }/>
          <Route path='/listing/:id/edit' element={
            <ProtectedRoute>
              <EditListing/>
            </ProtectedRoute>
            }/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
        <Footer/>
    </BrowserRouter>
    )
}

export default App