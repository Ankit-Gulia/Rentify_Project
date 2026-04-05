
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import {Link} from 'react-router-dom'

function NotFound() {

    useEffect(() =>{
        toast.error("Page Not found");
    }, [])
  return (
      <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      
      {/* Floating blobs */}
      <div className="absolute w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40 top-10 left-10 animate-blob"></div>
      <div className="absolute w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40 bottom-10 right-10 animate-blob animation-delay-2000"></div>
      <div className="absolute w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40 top-1/2 left-1/2 animate-blob animation-delay-4000"></div>

      {/* Main Content */}
      <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl p-10 text-center max-w-lg w-full">
        
        {/* 404 */}
        <h1 className="text-7xl md:text-8xl font-extrabold text-gray-800">
          404
        </h1>

        <h2 className="mt-3 text-2xl font-semibold text-gray-700">
          Oops! You seem lost
        </h2>

        <p className="mt-2 text-gray-500">
          Don’t worry, even the best developers take wrong turns sometimes.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          
          <Link to="/listing">
            <button className="px-6 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition shadow-md">
              Go Home
            </button>
          </Link>

          <Link to="/listing">
            <button className="px-6 py-2 rounded-xl bg-white border border-gray-300 hover:bg-gray-100 transition">
              View Work
            </button>
          </Link>

        </div>

        {/* Footer */}
        <p className="mt-6 text-sm text-gray-400">
          Error 404 — Page not found
        </p>
      </div>
    </div>
  )
}

export default NotFound