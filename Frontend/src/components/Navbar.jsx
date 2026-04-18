// src/components/Navbar.jsx

import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {

  const navigate = useNavigate();

  const { user, setUser ,loading } = useContext(AuthContext);

  const handleLogout = async() => {
    let res = await axios.post('https://rentify-project-sw8s.onrender.com/logout',{}, {withCredentials: true});
    setUser(null);
    toast.success(res.data.message);
    navigate("/listing");
  }

  // if (loading) toast.loading('Loading...');

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-sm bg-white sticky top-0 z-50">

      {/* 🔴 Logo */}
      <h1 className="text-2xl font-bold text-red-500 cursor-pointer">
        🏠 Rentify
      </h1>

      {/* 🔍 Search Bar */}
      {/* <div className="hidden md:flex items-center border rounded-full px-4 py-2 shadow-sm hover:shadow-md transition">
        <input
          type="text"
          placeholder="Search city..."
          className="outline-none px-2"
        />
        <button className="bg-red-500 text-white px-3 py-1 rounded-full">
          Search
        </button>
      </div> */}

      {/* 👤 Right Section */}
      <div className="flex items-center gap-4">

        <Link
          to="/listing"
          className="hidden md:block text-gray-600 hover:text-black"
        >
          All Listings
        </Link>

        <Link
          to="/listing/add"
          className="hidden md:block text-gray-600 hover:text-black"
        >
          Add Listing
        </Link>

        {user ? (
          <>
          <button className="text-gray-600 hover:text-black" onClick={handleLogout}>
            Logout
          </button>

          <i>
          <p className="cursor-pointer hover:text-grey-600">
            @{user.username.toUpperCase()}
          </p>
          </i>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-600 hover:text-black">
              Login
            </Link>

            <Link to="/signup" className="bg-red-500 text-white px-4 py-1 rounded-full">
              Signup
            </Link>
         </>
        )}
      </div>

    </nav>
  );
};

export default Navbar;
