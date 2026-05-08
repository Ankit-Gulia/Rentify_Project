import { useState, useEffect,useContext } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
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
      let res = await axios.post(`https://rentify-project-sw8s.onrender.com/listing/${id}/review`, form, {withCredentials : true});
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
     let res =  await axios.delete(`https://rentify-project-sw8s.onrender.com/listing/${id}/review/${rev_id}`, {withCredentials : true});
      toast.success(res.data.message);
      setReviews(prev => prev.filter(rev => rev._id !== rev_id));
    }catch(err){
     toast.error(err.response.data.message);
    }
  }

  return (
    <div className="w-full">
      
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Guest Reviews</h2>

      {user && (
      // Review form
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 mb-8 border border-blue-100"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Share Your Experience</h3>

        {/* Star Rating Input */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-900 mb-4">Your Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() =>
                  setForm({ ...form, rating: star })
                }
                className={`text-5xl transition-all duration-200 transform ${
                  star <= form.rating 
                    ? "text-yellow-400 scale-110" 
                    : "text-gray-300 hover:text-yellow-200 hover:scale-105"
                }`}
              >
                ★
              </button>
            ))}
          </div>
          {form.rating > 0 && (
            <p className="text-sm text-gray-600 mt-2">
              {form.rating} out of 5 stars
            </p>
          )}
        </div>

        {/* Comment Textarea */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-900 mb-3">Your Review</label>
          <textarea
            placeholder="Share your experience with this property..."
            className="w-full border-2 border-gray-200 focus:border-blue-500 p-4 rounded-xl mb-4 outline-none resize-none focus:ring-2 focus:ring-blue-200 transition-all duration-300"
            rows="5"
            value={form.comment}
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Submit Review
        </button>
      </form>
      )}

      {/* Reviews List */}
      <div>
        {reviews.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-200">
            <p className="text-gray-500 text-lg">No reviews yet. Be the first to review!</p>
          </div>
          
        ) : (
          <div className="grid gap-5">
            {reviews.map((rev) => (
              <div
                key={rev._id}
                className="bg-white border border-gray-200 hover:border-blue-300 p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {/* Review Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                      {rev.author.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">@{rev.author.username}</p>
                      <p className="text-sm text-gray-500">Guest</p>
                    </div>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-lg">
                      {i < rev.rating ? "⭐" : "☆"}
                    </span>
                  ))}
                  <span className="text-sm text-gray-600 ml-2">({rev.rating}/5)</span>
                </div>

                {/* Comment */}
                <p className="text-gray-700 leading-relaxed mb-4">{rev.comment}</p>

                {/* Delete Button */}
                {user?._id === rev?.author?._id && (
                <button 
                  className="text-sm bg-red-50 hover:bg-red-100 text-red-600 font-medium px-4 py-2 rounded-lg transition-all duration-200 border border-red-200"
                  onClick={() => handleDelete(rev._id)}
                >
                  Delete Review
                </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
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
              <p className="text-gray-700 my-4  ">~@{rev.author.username}</p>

              <div className="text-yellow-500 text-2xl">
                {renderStars(rev.rating)}
              </div>
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
