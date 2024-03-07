import React from "react";
import { NavbarDriver } from "../../../driver/navbarDriver";
import { NavbarSupervisor } from "../../../supervisor/navbarSupervisor";
import { NavbarAdministrator } from "../../navabarAdministrator";
import { VehicleTable } from "./vehicleTable";

export function VehicleC() {
  const rol = +localStorage.getItem("rol");
  return (
    <div>
      {rol === 1 ? <NavbarDriver /> : rol === 2 ? <NavbarSupervisor /> : rol === 3 ? <NavbarAdministrator /> : <h1>...</h1>}
      <div className="menu-container">
        <VehicleTable />
      </div>
    </div>
  );
}
