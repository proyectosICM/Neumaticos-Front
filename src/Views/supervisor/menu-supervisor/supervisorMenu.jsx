import React from "react";
import { NavbarSupervisor } from "../navbarSupervisor";
import { VehicleMenu } from "../../../common/vehicleComponents/vehicleMenu";

/**
 * SupervisorMenu component, representing the main menu for a supervisor.
 * It includes the NavbarSupervisor for navigation and the VehicleMenu for vehicle-related actions.
 */
export function SupervisorMenu() {
  /**
   * Retrieve the company ID from local storage to scope the application's data and actions to this specific company.
   * This value is used to ensure that the displayed information and performed actions are relevant to the currently selected company.
   */
  const company = localStorage.getItem("empresa");

  return (
    <div>
      {/* Render the supervisor-specific navigation bar */}
      <NavbarSupervisor />

      {/* Render the menu for vehicle-related actions, passing the company ID as a prop */}
      <VehicleMenu company={company} />
    </div>
  );
}
