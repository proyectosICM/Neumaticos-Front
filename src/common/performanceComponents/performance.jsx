import React, { useEffect, useState } from "react";
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
  const [tireSelected, setTireSelected] = useState(localStorage.getItem("tireSelected"));

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTireSelected = localStorage.getItem("tireSelected");
      if (currentTireSelected !== tireSelected) {
        setTireSelected(currentTireSelected);
      }
    }, 500); // Cada 1000 milisegundos (1 segundo)

    return () => clearInterval(intervalId); // Limpiar el intervalo cuando el componente se desmonte
  }, [tireSelected]);

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

      <div style={{ width: "80%", height: "300px", margin: "auto", display: "flex", flexDirection: "row" }}>
        <h1>Tire {tireSelected && tireSelected}</h1>
        <div style={{ width: "30%", height: "100%", margin: "auto" }}>
          <Graphics titulo={"Rendimiento Diario"} />
        </div>
        <div style={{ width: "30%", height: "100%", margin: "auto" }}>
          <Graphics titulo={"Rendimiento Mensual"} />
        </div>
        <div style={{ width: "30%", height: "100%", margin: "auto" }}>
          <Graphics titulo={"Rendimiento Anual"} />
        </div>
      </div>
    </>
  );
}
