import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InfoUserURL } from "../api/apiurl";
import { ListItems } from "../hooks/crudhooks";

/**
 * Profile component to display user information.
 * It fetches user data based on the logged-in user's username.
 */
export function Profile() {
  const navigate = useNavigate();

  // State to store user data
  const [data, setData] = useState(null);

  // Get the username from localStorage
  const username = localStorage.getItem("Username");

  // Fetch user information and update the state
  ListItems(`${InfoUserURL}${username}`, setData);

  return (
    <div>
      <h2>Información del {data && data.role.name}</h2>
      <p>Nombre: {data && data.name}</p>
      <p>Apellidos: {data && data.lastname}</p>
      <p>Correo Electrónico: {data && data.email}</p>
      <p>Empresa: {data && data.company.name}</p>
    </div>
  );
}
