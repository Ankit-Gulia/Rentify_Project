import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    axios.get("https://rentify-project-sw8s.onrender.com/api/auth/check", { withCredentials: true })
      .then(res => {
        // console.log(res.data);
        setIsAuth(res.data.isAuthenticated);
        setLoading(false);
      })
      .catch(() => {
        setIsAuth(false);
        setLoading(false);
      });
  }, []);

  if (loading || isAuth === null) {
    return <div>Loading...</div>;
  }

  if (!isAuth) {
    toast.error("You must be logged in to going On.");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
