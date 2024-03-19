import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { BsPlusCircleFill } from "react-icons/bs";
import { TireModal } from "./tireModal";
import { GrEdit } from "react-icons/gr";
import { GuardarElementos, ListItems2, editarElemento } from "../../../../hooks/crudhooks";
import { TiresBaseURL } from "../../../../api/apiurl";

export function TireTable() {
  const [showModal, setShowModal] = useState(false);

  const handleGuardar = (dto) => {
    const requestData = {
      codname: dto.codname,
      status: dto.estado,
      positioning:
        dto.posicionamiento == ""
          ? null
          : {
              id: dto.posicionamiento,
            },
      vehicleModel:
        dto.vehicle == ""
          ? null
          : {
              id: dto.vehicle,
            },
      companyModel: { 
        id: 1,
      },
    };
    GuardarElementos(TiresBaseURL, requestData)
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
      codname: dto.codname,
      status: dto.estado,
      positioningModel:
        dto.posicionamiento == ""
          ? null
          : {
              id: dto.posicionamiento,
            },
      vehicleModel:
        dto.vehicle == ""
          ? null
          : {
              id: dto.vehicle,
            },
      companyModel: {
        id: 1,
      },
    };
    editarElemento(`${TiresBaseURL}/${dto.id}`, requestData)
      .then(() => {
        handleList();
      })
      .catch((error) => {
        console.error("Error al guardar el neumático:", error);
      });
    setShowModal(false);
  };

  const [data, setData] = useState();

  const handleList = () => {
    ListItems2(TiresBaseURL, setData);
  };

  useEffect(() => {
    handleList();
  }, []);

  const handleCargarDatos = (dat) => {
    setDatosAEditar(dat);
    setShowModal(true);
  };

  const [datosaEditar, setDatosAEditar] = useState();

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
            <th>CODNAME</th>
            <th>ESTADO</th>
            <th>POSICION</th>
            <th>VEHICULO</th>
            <th>EMPRESA</th>
            <th>GESTION</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((dato) => (
              <tr key={dato.id}>
                <td>{dato.id}</td>
                <td>{dato.codname}</td>
                <td>{dato.status}</td>
                <td>{dato.positioningModel ? `${dato.positioningModel.id} - ${dato.positioningModel.description}` : "---"}</td>
                <td>{dato.vehicleModel ? dato.vehicleModel.placa : "---"}</td>
                <td>{dato.companyModel.name}</td>
                <td>
                  <Button variant="warning" onClick={() => handleCargarDatos(dato)}>
                    <GrEdit /> Editar
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <TireModal show={showModal} onHide={() => setShowModal(false)} guardar={handleGuardar} editar={handleEditar} datosaEditar={datosaEditar} />
    </>
  );
}
