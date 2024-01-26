import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InfoUserURL } from "../../api/apiurl";
import { ListItems } from "./hooks/crudhooks";

export function Welcome() {
  const navigate = useNavigate();
  const [info, setInfo] = useState(null);
  const username = localStorage.getItem("Username");

  ListItems(`${InfoUserURL}${username}`, setInfo);

  return (
    <>
      <h1>Hola</h1>
      {/* Render your component using the 'info' state */}
      {info && (
        <div>
          <h1>Hola {info.id}</h1>
          {/* Example: <p>{info.someData}</p> */}
        </div>
      )}
    </>
  );
}
