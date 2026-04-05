import { useState, useContext} from "react";
import axios from "axios";
import { AuthContext } from "../components/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const { user, setUser ,loading } = useContext(AuthContext);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      return setMessage("All fields are required");
    }

    try {
      const res = await axios.post("https://rentify-project-1.onrender.com/signup", formData, {withCredentials : true});
      setUser(res.data.user);
      toast.success(res.data.message);
      setFormData({
        username: "",
        email: "",
        password: ""
      });
      navigate('/listing');

    } catch (err) {
      setUser(null);
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h2>

        {message && (
          <p className="text-center text-red-500 mb-4">{message}</p>
        )}

        <input
          type="text"
          name="username"
          placeholder="Full Name"
          value={formData.username}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded-lg"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded-lg"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-6 p-2 border rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Sign Up
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account? Login
        </p>
      </form>
    </div>
  );
}
