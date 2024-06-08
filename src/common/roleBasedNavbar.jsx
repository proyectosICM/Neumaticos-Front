import React from 'react';
import { NavbarDriver } from '../Views/driver/navbarDriver';
import { NavbarSupervisor } from '../Views/supervisor/navbarSupervisor';
import { NavbarAdministrator } from '../Views/administrator/navabarAdministrator';


const RoleBasedNavbar = () => {
  const rol = +localStorage.getItem("rol");

  if (rol === 1) {
    return <NavbarDriver />;
  } else if (rol === 2) {
    return <NavbarSupervisor />;
  } else if (rol === 3) {
    return <NavbarAdministrator />;
  } else {
    return <h1>Cargando</h1>;
  }
};

export default RoleBasedNavbar;
