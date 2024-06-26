import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { BsPlusCircleFill } from "react-icons/bs";
import { TireModal } from "./tireModal";
import { GrEdit } from "react-icons/gr";
import { GuardarElementos, ListItems2, editarElemento } from "../../../../hooks/crudhooks";
import { TiresBaseURL, TiresByCompanyIdURL } from "../../../../api/apiurl";
import { PaginacionUtils } from "../../../../hooks/paginacionUtils";
import { ListPaginatedData } from "../../../../hooks/listPaginatedData";
import { TireRequestData } from "./tireDTO";

export function TireTable() {
  const company = localStorage.getItem("empresa");
  // State to show the modal
  const [showModal, setShowModal] = useState(false);
  // Pagination states
  const [pageNumber, setPageNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [data, setData] = useState();
  const [datosaEditar, setDatosAEditar] = useState();

  const handleGuardar = (dto) => {
    const requestData = TireRequestData(dto);
   /* const requestData = {
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
    };*/

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

  const handleList = (pageNumber) => {
    // ListItems2(TiresBaseURL, setData);
    ListPaginatedData(`${TiresByCompanyIdURL}?companyId=${company}&page=${pageNumber}`, setData, setTotalPages, setCurrentPage);
  };

  useEffect(() => {
    handleList(pageNumber);
  }, [pageNumber]);

  const handleCargarDatos = (dat) => {
    setDatosAEditar(dat);
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
                <td>{dato.positioningModel ? `${dato.positioningModel.locationCode} - ${dato.positioningModel.description}` : "---"}</td>
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
      <PaginacionUtils setPageNumber={setPageNumber} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
      <TireModal show={showModal} onHide={() => setShowModal(false)} guardar={handleGuardar} editar={handleEditar} datosaEditar={datosaEditar} />
    </>
  );
}
