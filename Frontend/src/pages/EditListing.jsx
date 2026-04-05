// src/pages/EditListing.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [file, setFile] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    image: "",
    description: ""
  });

  // fetch existing data
  useEffect(() => {
    const fetchListing = async () => {
      const res = await axios.get(`https://rentify-project-sw8s.onrender.com/listing/${id}`, { withCredentials: true });
      setFormData(res.data);
    };
    fetchListing();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("location", formData.location);
    data.append("country", formData.country);
    data.append("price", formData.price);

    // optional image
    if (file) {
      data.append("image", file);
    }

    try {
      await axios.put(`https://rentify-project-sw8s.onrender.com/listing/${id}`, data, { withCredentials: true });
      toast.success("Listing Updated Successfully ✅");
      navigate(`/listing/${id}`);
    } catch (err) {
      toast.error(err.response.data.message);
      navigate(`/listing/${id}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Listing</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border p-2" />
        <input type='text' name="location" value={formData.location} onChange={handleChange} className="w-full border p-2" />
        <input type='number' name="price" value={formData.price} onChange={handleChange} className="w-full border p-2" />
        <input type='file' name="image" className="w-full border p-2" onChange={(e) => setFile(e.target.files[0])} />
        <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border p-2" />

        <button className="bg-red-500 text-white px-6 py-2 rounded" type="submit">
          Update Listing
        </button>
      </form>
    </div>
  );
};

export default EditListing;
