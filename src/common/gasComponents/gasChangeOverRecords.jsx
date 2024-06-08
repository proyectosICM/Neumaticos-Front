import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { NavbarDriver } from "../../Views/driver/navbarDriver";
import { NavbarSupervisor } from "../../Views/supervisor/navbarSupervisor";
import { NavbarAdministrator } from "../../Views/administrator/navabarAdministrator";
import { useNavigate, useParams } from "react-router-dom";
import { ListPaginatedData } from "../../hooks/listPaginatedData";
import { GasChangeOverRecordsURL } from "../../api/apiurl";
import { PaginacionUtils } from "../../hooks/paginacionUtils";
import { formatDate, formatTime } from "../../utils/timeFormatters";
import RoleBasedNavbar from "../roleBasedNavbar";

export function GasChangeOverRecords() {
  const navigation = useNavigate();
  const rol = +localStorage.getItem("rol");

  const { id } = useParams();

  const [pageNumber, setPageNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [data, setData] = useState(null);

  useEffect(() => {
    const Listar = async (page) => {
      ListPaginatedData(`${GasChangeOverRecordsURL}/${id}?page=${page}`, setData, setTotalPages, setCurrentPage);
    };
    Listar(pageNumber);
  }, [pageNumber, id]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <RoleBasedNavbar />
      <Button className="button-back" onClick={() => navigation(`/detalles/${id}`)}>
        Atras
      </Button>
      <div className="menu-container-border">
        <h1>Registros de cambios de gas</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Día de instalación</th>
              <th>Hora de instalación</th>
              <th>Placa del vehiculo</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((d, index) => (
                <tr key={index}>
                  <td>{formatDate(d.changeDate)}</td>
                  <td>{formatTime(d.changeTime)}</td>
                  <td>{d.vehicleModel.placa}</td>
                </tr>
              ))}
          </tbody>
        </Table>

        <Button variant="success">Exportar excel</Button>
      </div>

      <PaginacionUtils setPageNumber={setPageNumber} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
