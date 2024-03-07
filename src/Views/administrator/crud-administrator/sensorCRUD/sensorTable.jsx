import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { BsPlusCircleFill } from "react-icons/bs";
import { GuardarElementos, ListItems2, editarElemento } from "../../../../hooks/crudhooks";
import { TiresSensorBaseURL } from "../../../../api/apiurl";
import { GrEdit } from "react-icons/gr";
import { SensorModal } from "./sensorModal";

export function SensorTable() {
  const [showModal, setShowModal] = useState();
  const [data, setData] = useState();
  const [datosaEditar, setDatosAEditar] = useState();

  const handleList = () => {
    ListItems2(TiresSensorBaseURL, setData);
  };

  useEffect(() => {
    handleList();
  }, []);

  const handleCargarDatos = (dto) => {
    setDatosAEditar(dto);
    setShowModal(true);
  };

  const handleGuardar = (dto) => {
    const requestData = {
      identificationCode: dto.identificationCode,
      status: true,
      vehicleModel:
        dto.vehicle == ""
          ? null
          : {
              id: dto.vehicle,
            },
      positioning:
        dto.posicionamiento == ""
          ? null
          : {
              id: dto.posicionamiento,
            },
      company: {
        id: 1,
      },
    };

    GuardarElementos(TiresSensorBaseURL, requestData)
      .then(() => {
        handleList(); // Actualiza la lista una vez que se haya completado el guardado
      })
      .catch((error) => {
        console.error("Error al guardar el neumático:", error);
        // Manejar el error aquí
      });
    setShowModal(false);
  };

  const handleEditar = (dto) => {
    const requestData = {
      identificationCode: dto.identificationCode,
      status: true,
      vehicleModel:
        dto.vehicle == ""
          ? null
          : {
              id: dto.vehicle,
            },
      positioning:
        dto.posicionamiento == ""
          ? null
          : {
              id: dto.posicionamiento,
            },
      company: {
        id: 1,
      },
    };
    editarElemento(`${TiresSensorBaseURL}/${dto.id}`, requestData)
      .then(() => {
        handleList();
      })
      .catch((error) => {
        console.error("Error al guardar el neumático:", error);
      });
    setShowModal(false);
  };

  return (
    <>
      <Button variant="success" onClick={() => setShowModal(true)}>
        <BsPlusCircleFill />
        Agregar
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>IDENTIFICATION-CODE</th>
            <th>VEHICULO</th>
            <th>POSICION</th>
            <th>TEMPERATURA</th>
            <th>PRESION</th>
            <th>BATERIA</th>
            <th>GESTION</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((dato) => (
              <tr key={dato.id}>
                <td>{dato.id}</td>
                <td>{dato.identificationCode}</td>
                <td>{dato.vehicleModel ? dato.vehicleModel.placa : "---"}</td>
                <td>{dato.positioning ? dato.positioning.id : "---"}</td>
                <td>{dato.temperature ? dato.temperature : "---"}</td>
                <td>{dato.pressure ? dato.pressure : "---"}</td>
                <td>{dato.batteryLevel ? dato.batteryLevel : "---"}</td>
                <td>
                  <Button variant="warning" onClick={() => handleCargarDatos(dato)}>
                    <GrEdit /> Editar
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <SensorModal show={showModal} onHide={() => setShowModal()} guardar={handleGuardar} editar={handleEditar} datosaEditar={datosaEditar} />
    </>
  );
}
