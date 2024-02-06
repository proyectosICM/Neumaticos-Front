import React from "react";
import { NavbarSupervisor } from "./navbarSupervisor";
import { VehicleMenu } from "./../../common/vehicleComponents/vehicleMenu";

/**
 * SupervisorMenu component, representing the main menu for a supervisor.
 * It includes the NavbarSupervisor for navigation and the VehicleMenu for vehicle-related actions.
 */ 
export function SupervisorMenu() {
  return (
    <div>
      {/* Render the supervisor-specific navigation bar */}
      <NavbarSupervisor />

      {/* Render the menu for vehicle-related actions, passing the company ID as a prop */}
      <VehicleMenu company={1} />
    </div>
  );
}
