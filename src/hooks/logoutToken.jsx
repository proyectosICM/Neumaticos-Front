import { jwtDecode } from "jwt-decode";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import jwtDecode from "jwt-decode";

export function LogoutToken() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentDate = new Date();

      // Convertir la fecha de expiración de segundos a milisegundos
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        console.log("El token ha expirado");
        localStorage.removeItem("token"); // Opcional: eliminar el token expirado
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return null;
}
