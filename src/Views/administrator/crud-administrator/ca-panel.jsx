import React from "react";
import { NavbarAdministrator } from "../navabarAdministrator";
import { FaTruck } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CaItem } from "./ca-item";

export function CaPanel() {
  const navigate = useNavigate();
  return (
    <>
      {/* Navigation component specific to the administrator role. */}
      <NavbarAdministrator />
      <h1>Hola</h1>
      <div className="menu-container">
        <CaItem name="Neumaticos" />
        <CaItem name="Vehiculos" />
        <CaItem name="Usuarios" />
      </div>
    </>
  );
}
