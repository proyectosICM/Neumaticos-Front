import React from 'react'
import { Button, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { LogoutToken } from '../../hooks/logoutToken';

/**
 * Navbar component for the Supervisor dashboard.
 * It includes navigation links and a logout button.
 */
export function NavbarSupervisor(){
    const navigation = useNavigate();

    const handleLogout = () => {    
      localStorage.removeItem('token');
      navigation('/login');
    };


 
    return(
        <Navbar bg="dark" variant="dark" className="justify-content-between">
        <Navbar.Brand style={{marginLeft: "25px", cursor:"pointer"}} onClick={() => navigation("/supervisor")}>Inicio</Navbar.Brand>
        <Nav>
          <Nav.Link onClick={() => navigation("/supervisor-menu")} >Menu de vehiculos</Nav.Link>
          <Nav.Link >Incidencias recientes</Nav.Link>
          <Nav.Link >Dispositivos</Nav.Link>
        </Nav>
        <Button style={{marginRight: "25px"}} onClick={handleLogout} variant="outline-light">Cerrar Sesión</Button>
      </Navbar>
    );
}