import React from "react";
import { NavbarAdministrator } from "../navabarAdministrator";
import { VehicleMenu } from "../../../common/vehicleComponents/vehicleMenu";

export function MAPanel() {
  return (
    <>
      <NavbarAdministrator />
      {/* Render the menu for vehicle-related actions, passing the company ID as a prop */}
      <VehicleMenu company={1} />
    </>
  );
}
