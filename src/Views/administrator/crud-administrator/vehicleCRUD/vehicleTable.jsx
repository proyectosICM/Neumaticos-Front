import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { BsPlusCircleFill } from "react-icons/bs";
import { VehicleCompanyURL, VehicleURL } from "../../../../api/apiurl";
import { ListItems2 } from "../../../../hooks/crudhooks";
import { GrEdit } from "react-icons/gr";
import { VehicleModal } from "./vehicleModal";

export function VehicleTable() {
  const [showModal, setShowModal] = useState();
  const [data, setData] = useState();
  const [datosaEditar, setDatosAEditar] = useState();

  const handleList = () => {
    ListItems2(VehicleURL, setData);
  };

  useEffect(() => {
    handleList();
  }, []);

  const handleCargarDatos = (dto) => {
    setDatosAEditar(dto);
    setShowModal(true);
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
            <th>PLACA</th>
            <th>TIPO DE VEHICULO</th>
            <th>EMPRESA</th>
            <th>TEMPERATURA ESTANDAR</th>
            <th>PRESION ESTANDAR</th>
            <th>ESTADO</th>
            <th>GESTION</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((dato) => (
              <tr key={dato.id}>
                <td>{dato.id}</td>
                <td>{dato.placa}</td>
                <td>{dato.vehicleType && dato.vehicleType.name}</td>
                <td>{dato.company && dato.company.name}</td>
                <td>{dato.standardTemperature}</td>
                <td>{dato.standardPressure}</td>
                <td>{dato.status ? "Habilitado" : "Inhabilitado"}</td>
                <td>
                  <Button variant="warning" onClick={() => handleCargarDatos(dato)}>
                    <GrEdit /> Editar
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <VehicleModal show={showModal} onHide={()=> setShowModal()} />
    </>
  );
}
