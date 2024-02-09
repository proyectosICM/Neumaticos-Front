import React from "react";
import { NavbarSupervisor } from "../navbarSupervisor";
import { VehicleInfo } from "../../../common/vehicleComponents/vehicleInfo";
import { useNavigate, useParams } from "react-router-dom";
import "../../../common/vehicleComponents/styles/vehicle-info.css";
import { PerformancePanel } from "../../../common/vehicleComponents/performancePanel";
import { IrregularitiesPanel } from "../../../common/vehicleComponents/irregularitiesPanel";
import "./supervisorVinfo.css";
import { Button } from "react-bootstrap";

/**
 * SupervisorVinfo component, representing the supervisor-specific view for vehicle information.
 * It includes the NavbarSupervisor for navigation and the VehicleInfo component for displaying vehicle details.
 * Additionally, it integrates PerformancePanel and IrregularitiesPanel for a comprehensive overview of vehicle performance and issues.
 */
export function SupervisorVinfo() {
  const navigation = useNavigate();
  /**
   * Retrieves the vehicle's ID from the URL parameters, ensuring that the ID can be passed to subcomponents for fetching and displaying vehicle-specific data. This ID is crucial for rendering detailed information, performance metrics, and irregularities for the specified vehicle within the supervisor's view.
   */
  const { id } = useParams();

  localStorage.setItem("vehicleId", id);

  return ( 
    <>
      {/* Render the supervisor-specific navigation bar */}
      <NavbarSupervisor />
      <Button className="button-back" onClick={() => navigation(`/supervisor-menu`)}>Atras</Button>
      <div className="menu-container-border">
        {/* Display detailed information for the selected vehicle */}
        <div style={{ width: "100%" }}>
          <VehicleInfo vehicleId={id} />
        </div>

        {/* Basic performance analysis panel for the selected vehicle */}
        <div className="panel-container">
          <PerformancePanel vehicleId={id} />
        </div>

        {/* Panel listing the six most recent irregularities associated with the selected vehicle */}
        <div className="panel-container">
          <IrregularitiesPanel vehicleId={id} />
        </div>
      </div>
    </>
  );
}
