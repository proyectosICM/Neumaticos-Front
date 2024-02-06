import React from "react";
import { NavbarSupervisor } from "./navbarSupervisor";
import { VehicleInfo } from "../../common/vehicleComponents/vehicleInfo";
import { useParams } from "react-router-dom";
import "../../common/vehicleComponents/styles/vehicle-info.css";
import { PerformancePanel } from "../../common/vehicleComponents/performancePanel";
import { IrregularitiesPanel } from "../../common/vehicleComponents/irregularitiesPanel";
/**
 * SupervisorVinfo component, representing the supervisor-specific view for vehicle information.
 * It includes the NavbarSupervisor for navigation and the VehicleInfo component for displaying vehicle details.
 */
export function SupervisorVinfo() {
  const { id } = useParams();
  return (
    <>
      {/* Render the supervisor-specific navigation bar */}
      <NavbarSupervisor />
      <div className="menu-container-border">
        {/* Render the component for displaying vehicle information */}
        <div style={{ width: "100%" }}>
          <VehicleInfo vehicleId={id} />
        </div>
        
        <div style={{ width: "45%", height: "30rem", margin: "2rem auto", border: "white 2px solid", fontSize: "1em", borderRadius: "1.4rem" }}>
          <PerformancePanel />
        </div>
        <div style={{ width: "45%", height: "30rem", margin: "2rem auto", border: "white 2px solid", fontSize: "1em", borderRadius: "1.4rem" }}>
          <IrregularitiesPanel />
        </div>
      </div>
    </>
  );
}
