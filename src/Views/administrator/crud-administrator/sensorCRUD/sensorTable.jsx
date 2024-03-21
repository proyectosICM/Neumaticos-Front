import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { BsPlusCircleFill } from "react-icons/bs";
import { GuardarElementos, ListItems2, editarElemento } from "../../../../hooks/crudhooks";
import { TireSensorByCompanyIdURL, TiresSensorBaseURL } from "../../../../api/apiurl";
import { GrEdit } from "react-icons/gr";
import { SensorModal } from "./sensorModal";
import { ListPaginatedData } from "../../../../hooks/listPaginatedData";
import { PaginacionUtils } from "../../../../hooks/paginacionUtils";
import { sensorRequestData } from "./sensorDTO";

export function SensorTable() {
  // State to show the modal
  const [showModal, setShowModal] = useState();
  // Pagination states
  const [pageNumber, setPageNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [data, setData] = useState();
  const [datosaEditar, setDatosAEditar] = useState();
  const company = localStorage.getItem("empresa");

  const handleList = (pageNumber) => {
    ListPaginatedData(`${TireSensorByCompanyIdURL}?companyId=${company}&page=${pageNumber}`, setData, setTotalPages, setCurrentPage);
  };

  useEffect(() => {
    handleList(pageNumber);
  }, [pageNumber]);

  const handleCargarDatos = (dto) => {
    setDatosAEditar(dto);
    setShowModal(true);
  };

  const handleGuardar = (dto) => {
    const requestData = sensorRequestData(dto);

    GuardarElementos(TiresSensorBaseURL, requestData)
      .then(() => {
        handleList(pageNumber); // Actualiza la lista una vez que se haya completado el guardado
      })
      .catch((error) => {
        console.error("Error al guardar el neumático:", error);
        // Manejar el error aquí
      });
    setShowModal(false);
  };

  const handleEditar = (dto) => {
    const requestData = sensorRequestData(dto);

    editarElemento(`${TiresSensorBaseURL}/${dto.id}`, requestData)
      .then(() => {
        handleList(pageNumber);
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
            <th>ESTADO</th>
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
                <td>{dato.status ? "EN USO" : "LIBRE"} </td>
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
      <PaginacionUtils setPageNumber={setPageNumber} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
      <SensorModal show={showModal} onHide={() => setShowModal()} guardar={handleGuardar} editar={handleEditar} datosaEditar={datosaEditar} />
    </>
  );
}
