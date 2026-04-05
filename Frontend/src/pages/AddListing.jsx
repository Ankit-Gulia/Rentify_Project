// src/pages/AddListing.jsx

import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast";

const AddListing = () => {

  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    country: "",
    price: "",
  });

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("location", formData.location);
    data.append("country", formData.country);
    data.append("price", formData.price);
    data.append("image", file);

    try {
      const res = await axios.post("https://rentify-project-sw8s.onrender.com/listing", data, { withCredentials: true });
      toast.success(res.data.message);
      navigate("/listing");

    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-6">
        Add New Listing
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full border p-2 rounded-lg"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          className="w-full border p-2 rounded-lg"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          className="w-full border p-2 rounded-lg"
          onChange={handleChange}
          required
        />

        <input
          type="file"
          name="image"
          placeholder="Image URL"
          className="w-full border p-2 rounded-lg"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />

        <input
          type="text"
          name="country"
          placeholder="Country"
          className="w-full border p-2 rounded-lg"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="w-full border p-2 rounded-lg"
          onChange={handleChange}
          required
        />

        <button type='submit' className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600">
          Add Listing
        </button>

      </form>
    </div>
  );
};

export default AddListing;
