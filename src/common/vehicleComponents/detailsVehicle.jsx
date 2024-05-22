import React from "react";

import { useNavigate, useParams } from "react-router-dom";

import "../../styles/vehicle-info.css";
import { Button } from "react-bootstrap";
import { NavbarDriver } from "../../Views/driver/navbarDriver";
import { NavbarSupervisor } from "../../Views/supervisor/navbarSupervisor";
import { NavbarAdministrator } from "../../Views/administrator/navabarAdministrator";
import { VehicleInfo } from "./vehicleInfo";
import { PerformancePanel } from "./performancePanel";
import { IrregularitiesPanel } from "./irregularitiesPanel";
import { useNotAuthorized } from "../../hooks/useNotAuthorized";
import { GasGraphics } from "./gas-graphics";

/**
 * SupervisorVinfo component, representing the supervisor-specific view for vehicle information.
 * It includes the NavbarSupervisor for navigation and the VehicleInfo component for displaying vehicle details.
 * Additionally, it integrates PerformancePanel and IrregularitiesPanel for a comprehensive overview of vehicle performance and issues.
 */
export function DetailsVehicle() {
  const navigation = useNavigate();
  /**
   * Retrieves the vehicle's ID from the URL parameters, ensuring that the ID can be passed to subcomponents for fetching and displaying vehicle-specific data. This ID is crucial for rendering detailed information, performance metrics, and irregularities for the specified vehicle within the supervisor's view.
   */
  const { id } = useParams();

  localStorage.setItem("vehicleId", id);
  const rol = +localStorage.getItem("rol");

  return (
    <div style={{ width: "100%", height: "100%", border: "2px solid   " }}>
      {/* Render the supervisor-specific navigation bar */}
      {rol === 1 ? <NavbarDriver /> : rol === 2 ? <NavbarSupervisor /> : rol === 3 ? <NavbarAdministrator /> : <h1>sd</h1>}

      <Button className="button-back" onClick={() => navigation(`/menu`)}>
        Atras
      </Button>
      <div className="menu-container-border">
        {/* Display detailed information for the selected vehicle */}
        <div style={{ width: "100%" }}>
          <VehicleInfo vehicleId={id} />
        </div>

        {/* Basic performance analysis panel for the selected vehicle */}
        <div className="panel-container">
          <PerformancePanel vehicleId={id} bdetails={true} title={"Rendimiento"} />
        </div>

        {/* Panel listing the six most recent irregularities associated with the selected vehicle */}
        <div className="panel-container">
          <IrregularitiesPanel vehicleId={id} />
        </div>

        <div style={{ width: "100%" }}>
          <Button onClick={() => navigation(`/cambiar-neumatico/${id}`)}>Registar cambio de llantas</Button>
        </div>

        <div className="gas-panel">
          <div className="gas-imagen"></div>
          <div className="gas-data">
            <p>Dia de instalacion </p>
            <p>22/01/2023</p>
            <p>Hora de instalacion </p>
            <p>08:33:54</p>
          </div>
          <div className="gas-stats">
            <GasGraphics />
          </div>
        </div>
      </div>
    </div>
  );
}
