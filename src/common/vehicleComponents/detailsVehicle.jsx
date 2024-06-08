import React, { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import "../../styles/vehicle-info.css";
import { Button, Table } from "react-bootstrap";
import { NavbarDriver } from "../../Views/driver/navbarDriver";
import { NavbarSupervisor } from "../../Views/supervisor/navbarSupervisor";
import { NavbarAdministrator } from "../../Views/administrator/navabarAdministrator";
import { VehicleInfo } from "./vehicleInfo";
import { PerformancePanel } from "./performancePanel";
import { IrregularitiesPanel } from "./irregularitiesPanel";
import { GasGraphics } from "./gas-graphics";
import { ListItems } from "../../hooks/crudhooks";
import { GasChangesRecentURL } from "../../api/apiurl";
import { LogoutToken } from "../../hooks/logoutToken";
import { formatDate, formatTime } from "../../utils/timeFormatters";
import RoleBasedNavbar from "../roleBasedNavbar";

export function DetailsVehicle() {
  LogoutToken();
  const navigation = useNavigate();
  const { id } = useParams();

  localStorage.setItem("vehicleId", id);

  const [gasChangeData, setGasChangeData] = useState();

  ListItems(`${GasChangesRecentURL}/${id}`, setGasChangeData);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <RoleBasedNavbar />

      <Button className="button-back" onClick={() => navigation(`/menu`)}>
        Atras
      </Button>
      <div className="menu-container-border">
        <div style={{ width: "100%" }}>
          <VehicleInfo vehicleId={id} />
        </div>

        <div className="panel-container">
          <PerformancePanel vehicleId={id} bdetails={true} title={"Rendimiento"} />
        </div>

        <div className="panel-container">
          <IrregularitiesPanel vehicleId={id} />
        </div>

        <div style={{ width: "100%" }}>
          <Button onClick={() => navigation(`/cambiar-neumatico/${id}`)}>Registar cambio de llantas</Button>
        </div>

        <div className="gas-panel">
          <div className="gas-imagen"></div>
          <div className="gas-data">
            <Table variant="dark" striped bordered hover>
              <thead>
                <tr>
                  <th>Día de instalación</th>
                  <th>Hora de instalación</th>
                </tr>
              </thead>
              <tbody>
                {gasChangeData &&
                  gasChangeData.map((data, index) => (
                    <tr key={index}>
                      <td>{formatDate(data.changeDate)}</td>
                      <td>{formatTime(data.changeTime)}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <Button style={{ margin: "0px" }} onClick={() => navigation(`/registro-cambios-gas/${id}`)}>
              Ver registros completos
            </Button>
          </div>
          <div className="gas-stats">
            <GasGraphics />
            <Button style={{ margin: "0px" }} onClick={() => navigation(`/registro-rendimiento-gas/${id}`)}>
              Ver registros completos
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
