import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InfoUserURL } from "../../api/apiurl";
import { ListItems, ListItems2 } from "../../hooks/crudhooks";
import { LogoutToken } from "../../hooks/logoutToken";

export function WelcomeAndRedirect() {
  const navigate = useNavigate();
  const [info, setInfo] = useState(null);
  const username = localStorage.getItem("Username");

  LogoutToken();

  // Obtiene información del usuario
  useEffect(() => {
    ListItems2(`${InfoUserURL}${username}`, setInfo);
  }, [username]);

  // Redirige al usuario basado en su rol una vez que la información está disponible
  useEffect(() => {
    if (info) {
      localStorage.setItem("rol", info.role.id);
      localStorage.setItem("empresa", info.company.id);
      localStorage.setItem("usuario", info.id);

      let path;
      switch (info.role.id) {
        case "1":
          path = "/driver";
          break;
        case "2":
        case "3":
          path = "/menu";
          break;
        case "4":
          path = "/sa";
          break;
        default:
          path = "/";
          break;
      }

      navigate(path);
    }
  }, [info, navigate]);

  return null;
}
