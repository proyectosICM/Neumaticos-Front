import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InfoUserURL } from "../../api/apiurl";
import { ListItems } from "../../hooks/crudhooks";
import { Redirect } from "./redirect";
import { LogoutToken } from "../../hooks/logoutToken";

/**
 * Component responsible for displaying a welcome message and retrieving user information.
 * It utilizes the InfoUserURL and ListItems for fetching user data and the Redirect component for role-based redirection.
 * The LogoutToken hook is used to clear authentication tokens if the token is invalid
 */
export function Welcome() {
  // Invoking the LogoutToken function to check the validity of the access token and, if invalid, terminating the session
  LogoutToken();

  // Hook to access navigation functionality
  const navigate = useNavigate();
  // Hook to access navigation functionality
  const [info, setInfo] = useState(null);
  // Retrieve the username from local storage
  const username = localStorage.getItem("Username");

  // Fetch user information using the InfoUserURL and store it in the 'info' state
  ListItems(`${InfoUserURL}${username}`, setInfo);

  //Data storage and redirection
  useEffect(() => {
    // Check if user information is available
    if (info) {
      // Store relevant user information in local storage
      localStorage.setItem("rol", info.role.id);
      localStorage.setItem("empresa", info.company.id);
      localStorage.setItem("usuario", info.id);
      navigate("/redirect");
    }
  }, [info]); 

  return (
    <>
      {/* Render your component using the 'info' state */}
      {info && (
        <div>
          <h1>Redirigiendo {info.id}</h1>
          {/* Example: <p>{info.someData}</p> */}
        </div>
      )}
    </>
  );
}
