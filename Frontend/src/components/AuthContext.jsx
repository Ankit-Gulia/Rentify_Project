import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
  const [user, setUser] = useState(null);   // user info
  // const [loading, setLoading] = useState(true);

  // run once when app loads
  useEffect(() => {
   const fetchUser = async() => {
    await axios.get("https://rentify-project-sw8s.onrender.com/api/auth/check", { withCredentials: true })
      .then(res => {
        if (res.data.isAuthenticated) {
          setUser(res.data.user); // user logged in
        } else {
          setUser(null);
        }
        // setLoading(false);
      })
      .catch(() => {
        setUser(null);
        // setLoading(false);
      });
   }  

   fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
