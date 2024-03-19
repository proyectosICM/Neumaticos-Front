import React, { useEffect, useState } from "react";
import { TireTable } from "./tireTable";
import { NavbarDriver } from "../../../driver/navbarDriver";
import { NavbarSupervisor } from "../../../supervisor/navbarSupervisor";
import { NavbarAdministrator } from "../../navabarAdministrator";
import { ListItems2 } from "../../../../hooks/crudhooks";
import { TiresBaseURL, TiresSensorBaseURL } from "../../../../api/apiurl";

export function TireC() {
  const rol = +localStorage.getItem("rol");

  return (
    <div>
      {rol === 1 ? <NavbarDriver /> : rol === 2 ? <NavbarSupervisor /> : rol === 3 ? <NavbarAdministrator /> : <h1>sd</h1>}
      <div className="menu-container">
        <h1 style={{width:"100%"}}>Neumaticos</h1>
        <TireTable />
      </div>
    </div>
  );
}
