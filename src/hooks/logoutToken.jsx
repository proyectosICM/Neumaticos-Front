// Importing jwtDecode to decode JWT tokens and useEffect hook from React.
import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

// This function checks the validity of the user's authentication token.
export function LogoutToken() {
  const navigate = useNavigate();

  // useEffect hook to run the token validation logic on component mount.
  useEffect(() => {
    // Retrieving the token from localStorage.
    const token = localStorage.getItem("token");
    if (token) {
      // Decoding the token to access its expiry time.
      const decodedToken = jwtDecode(token);
      const currentDate = new Date();

      // Checking if the token has expired.
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        // If the token has expired, remove it from localStorage and redirect to the login page.
        console.log("El token ha expirado");
        localStorage.removeItem("token");
        navigate("/login");
      }
    } else {
      // If there is no token, redirect to the login page.
      navigate("/login");
    }
  }, [navigate]);

  // This component does not render anything, so it returns null.
  return null;
}
