import { useState } from "react";
import axios from "axios";
import {useNavigate, useLocation} from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import toast from "react-hot-toast";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });



  const { setUser } = useContext(AuthContext);

  let navigate = useNavigate();
  let location = useLocation();

  const from = location.state?.from?.pathname || "/listing";

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      return setMessage("All fields are required");
    }

    try {
      const res = await axios.post("https://rentify-project-1.onrender.com/login",formData, {withCredentials: true});
      toast.success(res.data.message);
      setUser(res.data.user);
      navigate(from, {replace : true});

    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        {message && (
          <p className="text-center text-red-500 mb-4">{message}</p>
        )}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
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
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
        >
          Login
        </button>

        <p className="text-center text-sm mt-4">
          Don’t have an account? Sign up
        </p>
      </form>
    </div>
  );
}
