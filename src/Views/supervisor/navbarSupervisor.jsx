import React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { LogoutToken } from "../../hooks/logoutToken";

/**
 * NavbarSupervisor provides a consistent navigation bar for the supervisor dashboard.
 * It facilitates easy navigation across different sections of the supervisor interface such as the vehicle menu,
 * recent incidents, and messages. Additionally, it includes a logout functionality for security purposes.
 */
export function NavbarSupervisor() {
  // useNavigate hook from React Router for programmatically navigating between routes.
  const navigation = useNavigate();

  // handleLogout clears the authentication token from local storage and redirects the user to the login page,
  // effectively logging the user out of the application.
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigation("/login");
  }; 

  return (
    <Navbar bg="dark" variant="dark" className="justify-content-between">
      {/* Brand acts as a home button, redirecting the user to the supervisor's main page */}
      <Navbar.Brand style={{ marginLeft: "25px", cursor: "pointer" }} onClick={() => navigation("/menu")}>
        Inicio
      </Navbar.Brand>
      {/* Navigation links to different sections of the supervisor's dashboard */}
      <Nav>
        <Nav.Link onClick={() => navigation("/menu")}>Menu de vehiculos</Nav.Link>
        <Nav.Link onClick={() => navigation("/incidencias/g")}>Incidencias recientes</Nav.Link>
        <Nav.Link onClick={() => navigation("/mensajes")}>Mensajes</Nav.Link>
      </Nav>
      {/* Logout button to end the session */}
      <Button style={{ marginRight: "25px" }} onClick={handleLogout} variant="outline-light">
        Cerrar Sesión
      </Button>
    </Navbar>
  );
}
