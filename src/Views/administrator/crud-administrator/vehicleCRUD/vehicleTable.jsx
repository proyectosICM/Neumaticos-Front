import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { BsPlusCircleFill } from "react-icons/bs";
import { VehicleCompanyURL, VehicleURL } from "../../../../api/apiurl";
import { GuardarElementos, ListItems2, editarElemento } from "../../../../hooks/crudhooks";
import { GrEdit } from "react-icons/gr";
import { VehicleModal } from "./vehicleModal";
import { ListPaginatedData } from "../../../../hooks/listPaginatedData";
import { PaginacionUtils } from "../../../../hooks/paginacionUtils";

export function VehicleTable() {
  const company = localStorage.getItem("empresa");
  // State to show the modal
  const [showModal, setShowModal] = useState();
  // Pagination states
  const [pageNumber, setPageNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [data, setData] = useState();
  const [datosaEditar, setDatosAEditar] = useState();

  const handleList = (pageNumber) => {
    // ListItems2(TiresBaseURL, setData);
    ListPaginatedData(`${VehicleCompanyURL}?companyId=${company}&page=${pageNumber}`, setData, setTotalPages, setCurrentPage);
  };

  useEffect(() => {
    handleList(pageNumber);
  }, [pageNumber]);

  const handleCargarDatos = (dto) => {
    setDatosAEditar(dto);
    setShowModal(true);
  };

  const handleGuardar = (dto) => {
    const requestData = {
      placa: dto.placa,
      company: {
        id: 1,
      },
      vehicleType: {
        id: dto.vehicleType,
      },
      status: true,
      standardTemperature: dto.standardTemperature,
      standardPressure: dto.standardPressure,
    };

    GuardarElementos(VehicleURL, requestData)
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
      placa: dto.placa,
      company: {
        id: 1,
      },
      vehicleType: {
        id: dto.vehicleType,
      },
      status: true,
      standardTemperature: dto.standardTemperature,
      standardPressure: dto.standardPressure,
    };

    editarElemento(`${VehicleURL}/${dto.id}`, requestData)
      .then(() => {
        handleList();
        // console.log("d")
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
      <PaginacionUtils setPageNumber={setPageNumber} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
      <VehicleModal show={showModal} onHide={() => setShowModal()} guardar={handleGuardar} editar={handleEditar} datosaEditar={datosaEditar} />
    </>
  );
}
