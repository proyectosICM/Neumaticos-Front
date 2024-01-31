import React from "react";
import { NavbarSupervisor } from "./navbarSupervisor";
import { VehicleInfo } from "../../common/vehicleComponents/vehicleInfo";

/**
 * SupervisorVinfo component, representing the supervisor-specific view for vehicle information.
 * It includes the NavbarSupervisor for navigation and the VehicleInfo component for displaying vehicle details.
 */
export function SupervisorVinfo() {
  return (
    <>
      {/* Render the supervisor-specific navigation bar */}
      <NavbarSupervisor />

      {/* Render the component for displaying vehicle information */}
      <div style={{width: "40rem", border: "2px solid red", margin: "2rem auto", fontSize: "1em"}}> 
        <VehicleInfo />
      </div>
    </>
  );
}
