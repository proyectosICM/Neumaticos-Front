import React from "react";
import { NavbarDriver } from "../../Views/driver/navbarDriver";
import { NavbarSupervisor } from "../../Views/supervisor/navbarSupervisor";
import { NavbarAdministrator } from "../../Views/administrator/navabarAdministrator";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { PerformancePanel } from "../vehicleComponents/performancePanel";
import { Graphics } from "./graphics/graphics";

export function Performance() {
  const navigation = useNavigate();
  const { id } = useParams();
  const rol = +localStorage.getItem("rol");
  return (
    <>
      {/* Render the supervisor-specific navigation bar */}
      {rol === 1 ? <NavbarDriver /> : rol === 2 ? <NavbarSupervisor /> : rol === 3 ? <NavbarAdministrator /> : <h1>sd</h1>}

      <Button className="button-back" onClick={() => navigation(`/detalles/${id}`)}>
        Atras
      </Button>
      <div className="panel-container">
        <PerformancePanel vehicleId={id} />
      </div>

      <div style={{ border: "2px solid red", width: "80%", height: "300px", margin: "auto", display: "flex", flexDirection: "row" }}>
        <div style={{ border: "2px solid red", width: "30%", height: "100%", margin: "auto" }}>
          <Graphics />
        </div>
        <div style={{ border: "2px solid red", width: "30%", height: "100%", margin: "auto" }}>
          <Graphics />
        </div>
        <div style={{ border: "2px solid red", width: "30%", height: "100%", margin: "auto" }}>
          <Graphics />
        </div>
      </div>

    </>
  );
}
