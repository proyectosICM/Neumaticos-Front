import React from "react";

import { VehicleInfo } from "../../common/vehicleComponents/vehicleInfo";
import "./driverDashboard.css";
import { Performance } from "../../common/performance";
import { NavbarDriver } from "./navbarDriver";




export function DriverDashboard() {
  return (
    <div className="driver-container">
      <NavbarDriver />

      <div className="dashboard-content">
        <div className="profile">{/* Contenido de Profile */}</div>

        <div className="vehicle-info">
          <VehicleInfo />
        </div>

        <div className="performance">
          <Performance />
        </div>
      </div>
      <div className="irregularities"></div>
    </div>
  );
}
 