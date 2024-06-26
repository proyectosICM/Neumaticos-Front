import React, { useEffect, useState } from "react";

import { Button, Table } from "react-bootstrap";
import { LogoutToken } from "../../hooks/logoutToken";
import { useNavigate, useParams } from "react-router-dom";
import { ListPaginatedData } from "../../hooks/listPaginatedData";
import { GasRecordsExportURL, GasRecordsVehiclePages } from "../../api/apiurl";
import { PaginacionUtils } from "../../hooks/paginacionUtils";
import { formatDate, formatTime } from "../../utils/timeFormatters";
import { GasPerformancePanel } from "./graphics/gasPerformancePanel";
import RoleBasedNavbar from './../roleBasedNavbar';


export function GasPerformanceRecords() {
  LogoutToken();
  const navigation = useNavigate(); 

  const { id } = useParams();

  const [pageNumber, setPageNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [data, setData] = useState(null);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const Listar = async (page) => {
      ListPaginatedData(`${GasRecordsVehiclePages}/${id}?page=${page}`, setData, setTotalPages, setCurrentPage);
    };
    Listar(pageNumber);
  }, [pageNumber, id]);

  const handleDownload = async () => {
    try {
      const response = await fetch(`${GasRecordsExportURL}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "gas_records.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Error downloading the file", error);
    }
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <RoleBasedNavbar />

      <Button className="button-back" onClick={() => navigation(`/detalles/${id}`)}>
        Atras
      </Button>
      <div className="menu-container-border">
        <h1>Registros de rendimientos de gas</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Día</th>
              <th>Hora</th>
              <th>Placa del vehiculo</th>
              <th>Presion registrada</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((d, index) => (
                <tr>
                  <td>{d.id}</td>
                  <td>{formatDate(d.day)}</td>
                  <td>{formatTime(d.hour)}</td>
                  <td>{d.vehicleModel.placa}</td>
                  <td>{d.pressure} psi</td>
                </tr>
              ))}
          </tbody>
        </Table>
        
        <Button variant="success" onClick={handleDownload}>Exportar excel</Button>
        <PaginacionUtils setPageNumber={setPageNumber} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />

        <h1> Estadisticas de rendimiento</h1>
        <GasPerformancePanel />
      </div>
    </div>
  );
}
