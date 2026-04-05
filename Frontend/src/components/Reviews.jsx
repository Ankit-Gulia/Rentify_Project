import { useState, useEffect,useContext } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./components/AuthContext";
import toast from "react-hot-toast";

const Reviews = ({ reviews, setReviews, id }) => {

  const { user, setUser } = useContext(AuthContext);
  const [form, setForm] = useState({
    rating: 0,
    comment: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.rating || !form.comment) {
      alert("Please fill all fields");
      return;
    }

    //sending reviews to backend.
    try {
      let res = await axios.post(`https://rentify-project-1.onrender.com/listing/${id}/review`, form, {withCredentials : true});
      setReviews((prev) => [...prev, res.data.response]);
      toast.success(res.data.message);
      setForm({
        rating: 0,
        comment: "",
      });
     
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  //render reviews of a listing..
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i}>
        {i < rating ? "⭐" : "☆"}
      </span>
    ));
  };

  const handleDelete = async(rev_id) => {
    try{
     let res =  await axios.delete(`https://rentify-project-1.onrender.com/listing/${id}/review/${rev_id}`, {withCredentials : true});
      toast.success(res.data.message);
      setReviews(prev => prev.filter(rev => rev._id !== rev_id));
    }catch(err){
     toast.error(err.response.data.message);
    }
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>

      {user && (
      // Review form
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-4 mb-6"
      >

        {/* Star Rating Input */}
        <div className="mb-6 mt-4">
          <p className="mb-1 text-2xl">Rating: </p>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`cursor-pointer text-4xl ${star <= form.rating ? "text-yellow-500" : "text-gray-400"
                }`}
              onClick={() =>
                setForm({ ...form, rating: star })
              }
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          placeholder="Write your review..."
          className="w-full border p-2 rounded mb-3 outline-indigo-100"
          value={form.comment}
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mt-3"
        >
          Submit Review
        </button>
      </form>
      )}

      {/* Reviews List */}
      <div>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
          
        ) : (
          reviews.map((rev) => (
            <div
              key={rev._id}
              className="bg-gray-100 p-5 rounded-xl mb-5"
            >
              <div className="text-yellow-500 text-2xl">
                {renderStars(rev.rating)}
              </div>
              <h3 className="mt-5">Created by : {rev.author.username}</h3>
              <p className="text-gray-700 my-4  ">Comment : {rev.comment}</p>

              {user?._id === rev?.author?._id && (
              <button className="cursor-pointer bg-black text-white px-2 py-1 text-xs rounded-sm"
                onClick={() => handleDelete(rev._id)}
              >
                Delete Review
              </button>
              )}
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default Reviews;
