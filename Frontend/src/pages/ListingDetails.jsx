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
        let res = await axios.delete(`https://rentify-project-sw8s.onrender.com//listing/${id}`,  {withCredentials : true});
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
    <div className="max-w-5xl mx-auto p-6">
      {/* 🖼 Image */}
      <img
        src={listing.image.url}
        alt={listing.image.filename}
        className="w-full h-96 object-cover rounded-2xl"
      />

      {/* 📄 Info */}
      <div className="mt-6">
        <span className="text-3xl text-gray-800">Hosted by : @{listing.owner.username}</span>
        <p className="text-gray-500 mt-1">{listing.title}</p>
        <p className="text-gray-500 mt-1">{listing.location}</p>

        <p className="text-red-500 text-xl font-semibold mt-3">
          ₹{listing.price} / month
        </p>

        <p className="mt-4 text-gray-700">
          {listing.description}
        </p>

      { user?._id === listing?.owner?._id && (
        <>
        <button onClick={handleDelete} className="mt-4 bg-black text-white px-6 py-2 rounded-xl">
          Delete Listing
        </button>

        <Link to={`/listing/${id}/edit`}>
          <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-xl ml-2 mr-2">
            Edit Listing
          </button>
        </Link>

        </>
      )}

        {/* 📞 Contact Button */}
        <button className="mt-6 bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition">
          Contact Owner
        </button>
      </div>

      <Reviews reviews={reviews} setReviews={setReviews} id={id}/>
    </div>
    )}
    </>
  )
};

export default ListingDetails;