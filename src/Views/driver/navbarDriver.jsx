import React from 'react'
import { Button, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function NavbarDriver(){
    const navigation = useNavigate();

    const handleLogout = () => {    
      // Lógica para realizar el logout, por ejemplo, limpiar el token de localStorage
      localStorage.removeItem('token');
      // Redirigir a la página de inicio de sesión después del logout
      navigation('/login');
    };

    return(
        <Navbar bg="dark" variant="dark" className="justify-content-between">
        <Navbar.Brand style={{marginLeft: "25px", cursor:"pointer"}} onClick={() => navigation("/")}>Inicio</Navbar.Brand>
        <Nav>
          <Nav.Link  >Rutas</Nav.Link>
          <Nav.Link >Galería de Cercas</Nav.Link>
          <Nav.Link >Dispositivos</Nav.Link>
        </Nav>
        <Button style={{marginRight: "25px"}} onClick={handleLogout} variant="outline-light">Cerrar Sesión</Button>
      </Navbar>
    );
}