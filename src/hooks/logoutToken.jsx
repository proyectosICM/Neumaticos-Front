import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * LogoutToken component to handle automatic redirection to the login page if the token is not present.
 * It checks for the presence of a token in localStorage and navigates to the login page if no token is found.
 */
export function LogoutToken() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // useEffect hook to automatically navigate to the login page if no token is present
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // Returning null as this component does not render anything
  return null;
}
