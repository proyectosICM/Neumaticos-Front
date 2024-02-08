import React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

/**
 * Navbar component for the System Administrator dashboard.
 * It includes navigation links and a logout button.
 */
export function NavbarAdministrator() {
  const navigation = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigation("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" className="justify-content-between">
      <Navbar.Brand style={{ marginLeft: "25px", cursor: "pointer" }} onClick={() => navigation("/sa")}>
        Inicio
      </Navbar.Brand>
      <Nav>
        <Nav.Link onClick={() => navigation("/ma-panel")}>Menu Vehiculos</Nav.Link>
        <Nav.Link onClick={() => navigation("/ia-panel")}>Incidencias Recientes</Nav.Link>
        <Nav.Link onClick={() => navigation("/msg-panel")}>Mensajes</Nav.Link>
        <Nav.Link>Panel Administrador</Nav.Link>
      </Nav>
      <Button style={{ marginRight: "25px" }} onClick={handleLogout} variant="outline-light">
        Cerrar Sesión
      </Button>
    </Navbar>
  );
}
