import React from "react";
import { NavbarSupervisor } from "../navbarSupervisor";

import { Irregularities } from "../../../common/irregularitiesComponents/irregularities";
import { IrregularitiesDetails } from "../../../common/irregularitiesComponents/irregularitiesDetails";
import { useParams } from "react-router-dom";

export function ISDetails() {
  const { id } = useParams();
  // Checking if a token is present in localStorage
  const vehicleId = localStorage.getItem("vehicleId");
  return (
    <div>
      {/* Navigation component specific to the supervisor role. */}
      <NavbarSupervisor />
      <IrregularitiesDetails id={id} vehicleId={vehicleId} />
    </div>
  );
}
