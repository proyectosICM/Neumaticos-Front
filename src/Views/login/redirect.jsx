import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogoutToken } from "../../hooks/logoutToken";

/**
 * Component responsible for redirecting users based on their role after logging in.
 * Utilizes the LogoutToken hook to clear authentication tokens in case the token is invalid during component initialization.
 */
export function Redirect() {
  // Invoking the LogoutToken function to check the validity of the access token and, if invalid, terminating the session
  LogoutToken();
  // State to store the destination navigation path
  const [nav, setNav] = useState();
  // Hook to access navigation functionality
  const navigate = useNavigate();
  // Retrieve the user's role from local storage
  const rol = localStorage.getItem("rol");

  // Effect to determine the destination navigation path based on the user's role
  useEffect(() => {
    let tempNav;
    switch (rol) {
      case "1":
        tempNav = "/driver";
        break;
      case "2":
        tempNav = `/menu`;
        break;
      case "3":
        tempNav = "/menu";
        break;
      case "4":
        tempNav = "/sa";
        break;
      default:
        tempNav = "/";
        break;
    }
    setNav(tempNav);
  }, [rol]);

  // Effect to navigate to the determined path when the state is updated
  useEffect(() => {
    if (nav) {
      navigate(nav);
    }
  }, [navigate, nav]);

  return null;
}
