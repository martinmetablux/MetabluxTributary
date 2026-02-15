import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth,AuthProvider } from "../context/AuthContext";
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp: number;
  [key: string]: any; // Allow other properties
}

export function useRequireLogin() {
  const { user, login, token, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!login || !user || !token) {
      console.log("1")
      logout();
      navigate('/login');
      // AuthProvider
    } else {
      try {
        if (token) {
          const decodeduser = jwtDecode<DecodedToken>(token);
          if (decodeduser && decodeduser.exp < Date.now() / 1000) {
            console.log("2")
            logout();
            navigate('/login');
          }
        }
      } catch (err) {
        console.error("Token decode error:", err);
        console.log("3")
        logout();
      }
    }
  }, [login, user, navigate]);
}
