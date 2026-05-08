import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link, useSearchParams } from 'react-router-dom'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Reviews from '../components/Reviews';
import { AuthContext } from "../components/AuthContext";
import toast from "react-hot-toast";

function ListingDetails() {

  const { user, setUser } = useContext(AuthContext);

  const [listing, setListing] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try{
        let res = await axios.delete(`https://rentify-project-sw8s.onrender.com/listing/${id}`,  {withCredentials : true});
        toast.success(res.data.message);
        navigate('/listing');
    }catch(err){
        toast.error(err.response?.data?.message);
    }
  };

  //fetching existing data.
  useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await axios.get(`https://rentify-project-sw8s.onrender.com/listing/${id}`,  {withCredentials : true});
        setListing(res.data); 
        setReviews(res.data.reviews);
      }catch(err){
        setListing(null);
        toast.error(err.response.data.message);
      }
    }

    fetchData();
  }, []);


  //if listing not found
  if (!listing) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Page Not Found!
      </p>
    );
  }


  return (
    <>
    {listing && (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Image Section */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-8">
          <img
            src={listing.image.url}
            alt={listing.image.filename}
            className="w-full h-96 sm:h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
          {/* Left Column - Details */}
          <div className="lg:col-span-2">
            
            {/* Header Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
                    {listing.title}
                  </h1>
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <span className="text-2xl">📍</span>
                    <p className="text-lg">{listing.location}</p>
                  </div>
                </div>
              </div>

              {/* Price Badge */}
              <div className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-bold text-2xl mb-4 shadow-lg">
                ₹{listing.price.toLocaleString('en-IN')} / month
              </div>

              {/* Description */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">About this property</h3>
                <p className="text-gray-700 leading-relaxed text-base">
                  {listing.description}
                </p>
              </div>
            </div>

            {/* Host Information Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">About the Host</h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                  {listing.owner.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900">@{listing.owner.username}</p>
                  <p className="text-gray-600">Property Owner</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Property Actions</h3>
              
              { user?._id === listing?.owner?._id && (
                <div className="space-y-4">
                  <Link to={`/listing/${id}/edit`} className="w-full block">
                    <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                      ✏️ Edit Listing
                    </button>
                  </Link>

                  <button 
                    onClick={handleDelete} 
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    🗑️ Delete Listing
                  </button>
                </div>
              )}

              {user?._id !== listing?.owner?._id && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <p className="text-gray-700 text-sm">
                    ℹ️ Contact the property owner for more information
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <Reviews reviews={reviews} setReviews={setReviews} id={id}/>
        </div>

      </div>
    </div>
    )}
    </>
  )
};

export default ListingDetails;
