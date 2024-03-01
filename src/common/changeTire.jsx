import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { NavbarDriver } from "../Views/driver/navbarDriver";
import { NavbarSupervisor } from "../Views/supervisor/navbarSupervisor";
import { NavbarAdministrator } from "../Views/administrator/navabarAdministrator";
import { PerformancePanel } from "./vehicleComponents/performancePanel";
import { ListItems, ListItems2, editarElemento, useTireDetails } from "../hooks/crudhooks";
import { TiresBaseURL, TiresByVehicleAndPositionURL, TiresByVehicleURL, TiresSensorBaseURL } from "../api/apiurl";

export function ChangeTire() {
  const navigation = useNavigate();
  const rol = +localStorage.getItem("rol");
  const { id } = useParams();
  const [tireSelected, setTireSelected] = useState(localStorage.getItem("tireSelected"));

  const [selectedTire, setSelectedTire] = useState("");
  const [selectedSensor, setSelectedSensor] = useState("");
  const [data, setData] = useState("");
  const [tireData, setTireData] = useState();
  const [sensorData, setSensorData] = useState();

  const { tireDetails, tireCode, sensorCode, tireId, sensorId, loading, error } = useTireDetails(id, tireSelected);

  useEffect(() => {
    ListItems2(`${TiresByVehicleURL}?vehicleId=${id}&status=FREE`, setTireData);
    ListItems2(`${TiresSensorBaseURL}?vehicleId=${id}`, setSensorData);

    const currentTireSelected = localStorage.getItem("tireSelected");
    if (currentTireSelected !== tireSelected) {
      setTireSelected(currentTireSelected);
    }
  }, [id, tireSelected]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTireSelected = localStorage.getItem("tireSelected");
      if (currentTireSelected !== tireSelected) {
        setTireSelected(currentTireSelected);
      }
    }, 500);
    return () => clearInterval(intervalId);
  }, [tireSelected]);

  const handleSend = () => {
    const requestData1 = {
      status: "FREE",
      vehicleModel: {
        id: 1,
      },
      positioning: {
        id: 1,
      },
    };

    editarElemento(`${TiresBaseURL}/changeTire/${tireId}`, requestData1);
    const requestData2 = {
      status: "IN_USE",
      vehicleModel: {
        id: id,
      },
      positioning: {
        id: tireSelected,
      },
    };

    editarElemento(`${TiresBaseURL}/changeTire/${tireSelected}`, requestData2);
    console.log("Dat  ", tireSelected);
  };

  return (
    <>
      {/* Render the supervisor-specific navigation bar */}
      {rol === 1 ? <NavbarDriver /> : rol === 2 ? <NavbarSupervisor /> : rol === 3 ? <NavbarAdministrator /> : <h1>sd</h1>}
      <Button className="button-back" onClick={() => navigation(`/detalles/${id}`)}>
        Atras
      </Button>
      <div className="panel-container">
        <PerformancePanel vehicleId={id} title={"Seleccione la llanta que cambiara"} />
      </div>

      <div className="menu-container-border">
        <div className="panel-container">
          <h1>Neumatico asociado</h1>
          <div style={{ border: "3px solid white", width: "70%", margin: "2rem auto" }}>
            <h2>{tireCode}</h2>
          </div>

          <Form style={{ width: "70%", margin: "2rem auto" }}>
            <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Label>Seleccione el neumativo que colocara</Form.Label>
              <Form.Select value={selectedTire} onChange={(event) => setSelectedTire(event.target.value)}>
                {tireData &&
                  tireData.map((tire) => (
                    <option key={tire.id} value={tire.id}>
                      {tire.codname}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
          </Form>

          <Button onClick={() => handleSend()}>Cambiar el neumatico</Button>
        </div>

        <div className="panel-container">
          <h1>Sensor asociado</h1>
          <div style={{ border: "3px solid white", width: "70%", margin: "2rem auto" }}>
            <h2>{sensorCode}</h2>
          </div>

          <Form style={{ width: "70%", margin: "2rem auto" }}>
            <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Label>Seleccione el sensor que colocara</Form.Label>
              <Form.Select value={selectedSensor} onChange={(event) => setSelectedSensor(event.target.value)}>
                {sensorData &&
                  sensorData.map((sensor) => (
                    <option key={sensor.id} value={sensor.id}>
                      {sensor.identificationCode}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
          </Form>
          <Button>Cambiar el sensor instalado en el neumatico</Button>
        </div>
      </div>
    </>
  );
}
