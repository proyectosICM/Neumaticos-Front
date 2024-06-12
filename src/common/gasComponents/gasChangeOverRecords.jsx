import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ListPaginatedData } from "../../hooks/listPaginatedData";
import { GasChangeOverRecordsURL, GasChangesExportURL } from "../../api/apiurl";
import { PaginacionUtils } from "../../hooks/paginacionUtils";
import { formatDate, formatTime } from "../../utils/timeFormatters";
import RoleBasedNavbar from "../roleBasedNavbar";

export function GasChangeOverRecords() {
  const navigation = useNavigate();
  const { id } = useParams();
 
  const [pageNumber, setPageNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [data, setData] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const Listar = async (page) => {
      ListPaginatedData(`${GasChangeOverRecordsURL}/${id}?page=${page}`, setData, setTotalPages, setCurrentPage);
    };
    Listar(pageNumber);
  }, [pageNumber, id]);

  const handleDownload = async () => {
    try {
      const response = await fetch(`${GasChangesExportURL}/${id}`, {
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
      a.download = "gas_changes.xlsx";
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

        <Button variant="success" onClick={handleDownload}>
          Exportar excel
        </Button>
      </div>

      <PaginacionUtils setPageNumber={setPageNumber} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
