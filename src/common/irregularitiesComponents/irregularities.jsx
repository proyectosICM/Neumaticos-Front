import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { NavbarDriver } from "../../Views/driver/navbarDriver";
import { NavbarSupervisor } from "../../Views/supervisor/navbarSupervisor";
import { NavbarAdministrator } from "../../Views/administrator/navabarAdministrator";
import axios from "axios";
import { IrregularitiesByCompanyPageURL } from "../../api/apiurl";

export function Irregularities() {
  const navigation = useNavigate();
  const rol = +localStorage.getItem("rol");

  // Pagination state
  const [pageNumber, setPageNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [data, setData] = useState();
  const companyId = localStorage.getItem("empresa");

  const Listar = async (page) => {
    try {
      const token = await localStorage.getItem("token");
      const response = await axios.get(`${IrregularitiesByCompanyPageURL}?companyId=${companyId}&page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.content);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.number + 0);
    } catch (error) {
      console.error("Error al listar", error);
    }
  };

  // useEffect hook to trigger data loading when 'pageNumber' changes
  useEffect(() => {
    Listar(pageNumber);
  }, [pageNumber]);

  return (
    <div>
      {/* Render the supervisor-specific navigation bar */}
      {rol === 1 ? <NavbarDriver /> : rol === 2 ? <NavbarSupervisor /> : rol === 3 ? <NavbarAdministrator /> : <h1>sd</h1>}

      <div className="menu-container-border">
        <h1>Incidencias Recientes</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
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
                  <td>{new Date(incidencia.createdAt).toLocaleDateString()}</td>
                  <td>{new Date(incidencia.createdAt).toLocaleTimeString()}</td>
                  <td>{incidencia.vehicleModel.placa}</td>
                  <td>{incidencia.vehicleModel.vehicleType.name}</td>
                  <td>{incidencia.tire.id}</td>
                  <td>{incidencia.nameIrregularity}</td>
                  <td>{incidencia.detailsIrregularity}</td>
                  <td>{incidencia.status ? "Activo" : "Inactivo"}</td>
                  <td>
                    <Button onClick={() => navigation(`/is-details/${incidencia.id}`)}>Ver detalles</Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
