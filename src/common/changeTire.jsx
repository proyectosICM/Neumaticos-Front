import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { NavbarDriver } from "../Views/driver/navbarDriver";
import { NavbarSupervisor } from "../Views/supervisor/navbarSupervisor";
import { NavbarAdministrator } from "../Views/administrator/navabarAdministrator";
import { PerformancePanel } from "./vehicleComponents/performancePanel";
import { ListItems, ListItems2, editarElemento, useTireDetails } from "../hooks/crudhooks";
import { TiresBaseURL, TiresByVehicleAndPositionURL, TiresByVehicleURL, TiresSensorBaseURL, TiresSensorByCompanyAndStatus } from "../api/apiurl";
import Swal from "sweetalert2";

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
  const [codnameSelected, setCodNameSelected] = useState();
  const [codIdentificationCodeSelected, setCodIdentificationCodeSelected] = useState();
  const company = localStorage.getItem("empresa");

  const { tireDetails, tireCode, sensorCode, tireId, setTireCode, sensorId, loading, error } = useTireDetails(id, tireSelected);
  const [mos, setMos] = useState();

  useEffect(() => {
    setMos(tireCode);
  });

  useEffect(() => {
    ListItems2(`${TiresByVehicleURL}?status=FREE`, setTireData);
    ListItems2(`${TiresSensorByCompanyAndStatus}?companyId=${company}&status=${false}`, setSensorData);

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

  const handleComboTire = (event) => {
    const selectedTireId = Number(event.target.value);
    setSelectedTire(selectedTireId);

    const tire = tireData.find((tire) => tire.id === selectedTireId);
    if (tire) {
      setCodNameSelected(tire.codname);
    } else {
      console.log("Neumático no encontrado");
    }
  };

  const handleComboSensor = (event) => {
    const selectedSensorId = Number(event.target.value);
    setSelectedSensor(selectedSensorId);

    const sensor = sensorData.find((sensor) => sensor.id === selectedSensorId);
    if (sensor) {
      setCodIdentificationCodeSelected(sensor.identificationCode);
    } else {
      console.log("Neumático no encontrado");
    }
  };


  const handleTire = () => {
    console.log(tireId);
    console.log(tireSelected);
    if ((tireId != null) & (selectedTire != 0)) {
      const requestData = {
        codname: codnameSelected,
        status: "IN_USE",
        positioningModel: {
          id: tireSelected,
        },
        vehicleModel: {
          id: id,
        },
        companyModel: {
          id: company,
        },
      };

      Swal.fire({
        title: "Procesando...",
        text: "Por favor, espere.",
        allowOutsideClick: false,
        didOpen: async () => {
          Swal.showLoading();
          Promise.all([
            // await editarElemento(`${TiresBaseURL}/changeTire2?id1=${tireId}&id2=${selectedTire}&pos=${tireSelected}&v=${id}`, requestData1),
            await editarElemento(`${TiresBaseURL}/${selectedTire}`, requestData),
            setSelectedTire(""),
            // setTireCode(""),
            console.log(`${TiresBaseURL}/${selectedTire}`),
          ])
            .then(() => {
              Swal.fire({
                title: "¡Completado!",
                text: "El cambio de neumáticos ha sido registrado exitosamente.",
                icon: "success",
              });
            })
            .catch((error) => {
              Swal.fire({
                title: "Error",
                text: "Hubo un problema al registrar el cambio de neumáticos.",
                icon: "error",
              });
            });
        },
      });
      localStorage.removeItem("tireSelected");
      setSelectedTire(0);
      tireId == null;
    }
  };

  const handleSensor = () => {


    const requestData = {
      identificationCode: codIdentificationCodeSelected,
      status: true,
      vehicleModel: {
        id: id,
      },
      positioning: {
        id: tireSelected,
      },
      company: {
        id: company,
      },
    };

    Swal.fire({
      title: "Procesando...",
      text: "Por favor, espere.",
      allowOutsideClick: false,
      didOpen: async () => {
        Swal.showLoading();
        Promise.all([
          await editarElemento(`${TiresSensorBaseURL}/${selectedSensor}`, requestData),
          setSelectedSensor(""),
        ])
          .then(() => {
            Swal.fire({
              title: "¡Completado!",
              text: "El cambio de neumáticos ha sido registrado exitosamente.",
              icon: "success",
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Error",
              text: "Hubo un problema al registrar el cambio de neumáticos.",
              icon: "error",
            });
          });
      },
    });
    localStorage.removeItem("tireSelected");
    setSelectedSensor(0);
    sensorId == null;
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
        {tireSelected && (
          <>
            <div className="panel-container">
              <h1>Neumatico asociado</h1>
              <div style={{ border: "3px solid white", width: "70%", margin: "2rem auto" }}>
                <h2>{tireCode}</h2>
              </div>

              <Form style={{ width: "70%", margin: "2rem auto" }}>
                <Form.Group controlId="exampleForm.SelectCustom">
                  <Form.Label>Seleccione el neumativo que colocara</Form.Label>
                  <Form.Select value={selectedTire} onChange={handleComboTire}>
                    <option value="">Seleccione un Neumatico</option>
                    {tireData &&
                      tireData.map((tire) => (
                        <option key={tire.id} value={tire.id}>
                          {tire.codname}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
              </Form>

              <Button onClick={() => handleTire()}>Cambiar el neumatico</Button>
            </div>
            <div className="panel-container">
              <h1>Sensor asociado</h1>
              <div style={{ border: "3px solid white", width: "70%", margin: "2rem auto" }}>
                <h2>{sensorCode}</h2>
              </div>

              <Form style={{ width: "70%", margin: "2rem auto" }}>
                <Form.Group controlId="exampleForm.SelectCustom">
                  <Form.Label>Seleccione el sensor que colocara</Form.Label>
                  <Form.Select value={selectedSensor} onChange={handleComboSensor}>
                    {sensorData &&
                      sensorData.map((sensor) => (
                        <option key={sensor.id} value={sensor.id}>
                          {sensor.identificationCode}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
              </Form>
              <Button onClick={() => handleSensor()}>Cambiar el sensor instalado en el neumatico</Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
