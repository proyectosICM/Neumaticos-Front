import React from 'react'
import { NavbarAdministrator } from "../Views/administrator/navabarAdministrator";
import { NavbarDriver } from "../Views/driver/navbarDriver";
import { NavbarSupervisor } from "../Views/supervisor/navbarSupervisor";

export function NotAuthorized() {
  const rol = +localStorage.getItem("rol");
  return (
    <div>
      {rol === 1 ? <NavbarDriver /> : rol === 2 ? <NavbarSupervisor /> : rol === 3 ? <NavbarAdministrator /> : <h1>sd</h1>}
      <h1>A intentado acceder a un recurso no autorizado para su empresa o rol</h1>
    </div>
  );
}
