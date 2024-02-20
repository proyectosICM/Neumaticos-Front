import React, { useState } from "react";
import { ListItems } from "../../hooks/crudhooks";
import { IrregularitiesTiredBaseURL } from "../../api/apiurl";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { PerformancePanel } from "../vehicleComponents/performancePanel";
import { NavbarDriver } from "../../Views/driver/navbarDriver";
import { NavbarSupervisor } from "../../Views/supervisor/navbarSupervisor";
import { NavbarAdministrator } from "../../Views/administrator/navabarAdministrator";

export function IrregularitiesDetails() {
  const navigation = useNavigate();
  const { id, b } = useParams();
  const [data, setData] = useState();

  ListItems(`${IrregularitiesTiredBaseURL}/${id}`, setData);
  const vehicleId = +localStorage.getItem("vehicleId");

  const handleBack = () => {
    if (b == "r") {
      return navigation(`/detalles/${vehicleId}`);
    } else {
      return navigation(`/incidencias/${b}`);
    }
  };
  const rol = +localStorage.getItem("rol");
  return (
    <div>
      {/* Render the supervisor-specific navigation bar */}
      {rol === 1 ? <NavbarDriver /> : rol === 2 ? <NavbarSupervisor /> : rol === 3 ? <NavbarAdministrator /> : <h1>sd</h1>}
      <Button className="button-back" onClick={() => handleBack()}>
        Atras
      </Button>
      {data ? (
        <div style={{ margin: "2rem auto", width: "80%", fontSize: "1.5rem" }}>
          <h2>Detalle de Irregularidad {data.id} </h2>
          <p>
            <strong>Dia en que se registro la incidencia: </strong> {new Date(data.createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong>Hora en que se registro la incidencia: </strong> {new Date(data.createdAt).toLocaleTimeString()}
          </p>
          <p>
            <strong>Nombre:</strong> {data.nameIrregularity}
          </p>
          <p>
            <strong>Detalles:</strong> {data.detailsIrregularity}
          </p>
          <p>
            <strong>Placa del Vehículo:</strong> {data.vehicleModel.placa}
          </p>
          <p>
            <strong>Compañía:</strong> {data.company.name}
          </p>
          <p>
            <strong>Tipo de Vehículo:</strong> {data.vehicleModel.vehicleType.name}
          </p>
          {/* Ajustar Visibilidad */}
          {data.status !== true && (
            <div>
              <p>
                <strong>Incidencia Revisada por:</strong> Supervisor Marco
              </p>
              <p>
                <strong>Dia de Revision:</strong> {new Date(data.updatedAt).toLocaleDateString()}
              </p>
              <Button>Marcar como revisada</Button>
            </div>
          )}

          <div className="panel-container">
            <PerformancePanel vehicleId={data.vehicleModel.id} />
          </div>
        </div>
      ) : (
        <p>Cargando detalles de la irregularidad...</p>
      )}
    </div>
  );
}
