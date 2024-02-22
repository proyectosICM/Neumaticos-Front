import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { NavbarDriver } from "../../Views/driver/navbarDriver";
import { NavbarSupervisor } from "../../Views/supervisor/navbarSupervisor";
import { NavbarAdministrator } from "../../Views/administrator/navabarAdministrator";
import axios from "axios";
import { IrregularitiesByCompanyAndVehiclePageURL, IrregularitiesByCompanyPageURL } from "../../api/apiurl";
import { PaginacionUtils } from "../../hooks/paginacionUtils";
import { ListPaginatedData } from "../../hooks/listPaginatedData";
import { LogoutToken } from "../../hooks/logoutToken";

export function Irregularities() {

  LogoutToken();
  const navigation = useNavigate();
  const rol = +localStorage.getItem("rol");

  const { p } = useParams();

  // Pagination state
  const [pageNumber, setPageNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [data, setData] = useState();
  const companyId = localStorage.getItem("empresa");
  const vehicleId = +localStorage.getItem("vehicleId");

  useEffect(() => {
    let url;
    if (p === "v") {
      url = `${IrregularitiesByCompanyAndVehiclePageURL}?companyId=${companyId}&vehicleId=${vehicleId}`;
    } else if (p == "g") {
      url = `${IrregularitiesByCompanyPageURL}?companyId=${companyId}`;
    }
    const Listar = async (page) => {
      ListPaginatedData(`${url}&page=${page}`, setData, setTotalPages, setCurrentPage);
    };
    Listar(pageNumber);
  }, [pageNumber, p]);

  return (
    <div>
      {/* Render the supervisor-specific navigation bar */}
      {rol === 1 ? <NavbarDriver /> : rol === 2 ? <NavbarSupervisor /> : rol === 3 ? <NavbarAdministrator /> : <h1>sd</h1>}

      {p === "v" && (
        <Button className="button-back" onClick={() => navigation(`/detalles/${vehicleId}`)}>
          Atras
        </Button>
      )}

      <div className="menu-container-border">
        <h1>Incidencias Recientes</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Día</th>
              <th>Hora</th>
              <th>Placa</th>
              <th>Categoría</th>
              <th>Neumático asociado</th>
              <th>Incidencia</th>
              <th>Detalles</th>
              <th>Estado</th>
              <th>Gestión</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((incidencia, index) => (
                <tr
                  key={index}
                  style={{
                    color: "black",
                    background: incidencia.status ? "green" : "red", // Ejemplo de cómo podrías cambiar el color de fondo basado en el estado
                  }}
                >
                  <td>{incidencia.id}</td>
                  <td>{new Date(incidencia.createdAt).toLocaleDateString()}</td>
                  <td>{new Date(incidencia.createdAt).toLocaleTimeString()}</td>
                  <td>{incidencia.vehicleModel.placa}</td>
                  <td>{incidencia.vehicleModel.vehicleType.name}</td>
                  <td>{incidencia.tire.id}</td>
                  <td>{incidencia.nameIrregularity}</td>
                  <td>{incidencia.detailsIrregularity}</td>
                  <td>{incidencia.status ? "Activo" : "Inactivo"}</td>
                  <td>
                    {/*   <Button onClick={() => handleDetails(incidencia.id)}>Ver detalles</Button> */}
                    <Button onClick={() => navigation(`/incidencia-detalles/${incidencia.id}/${p}`)}>Ver detalles</Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <PaginacionUtils setPageNumber={setPageNumber} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
}
