import React, { useEffect, useState } from "react";

import { VehicleItem } from "./vehicleItem";
import { VehicleCompanyURL, VehicleTypeURL } from "../../api/apiurl";
import { ListItems } from "../../hooks/crudhooks";
import { PaginacionUtils } from "../../hooks/paginacionUtils";
import axios from "axios";
import { Button } from "react-bootstrap";
import { NavbarSupervisor } from "../../Views/supervisor/navbarSupervisor";
import { NavbarDriver } from "./../../Views/driver/navbarDriver";
import { NavbarAdministrator } from "./../../Views/administrator/navabarAdministrator";
import { ListPaginatedData } from "../../hooks/listPaginatedData";

/**
 * Component that displays a menu of vehicles.
 * It fetches vehicle data from the server based on company and pagination.
 */
export function VehicleMenu() {
  const company = localStorage.getItem("empresa");
  // Pagination state
  const [pageNumber, setPageNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // State to store fetched data
  const [data, setData] = useState(null);
  const [vehicletypes, setVehicletypes] = useState(null);
  /**
   * Function to fetch and update the list of vehicles based on pagination and company.
   * @param {number} page - The page number to retrieve.
   */
  useEffect(() => {
    const Listar = async (page) => {
     ListPaginatedData(`${VehicleCompanyURL}?companyId=${company}&page=${page}`, setData, setTotalPages, setCurrentPage);
    };
    Listar(pageNumber);
  }, [pageNumber]);

  ListItems(VehicleTypeURL, setVehicletypes);

  const rol = +localStorage.getItem("rol");
  return (
    <div>
      {/* Render the supervisor-specific navigation bar */}
      {rol === 1 ? <NavbarDriver /> : rol === 2 ? <NavbarSupervisor /> : rol === 3 ? <NavbarAdministrator /> : <h1>sd</h1>}

      <div className="menu-container">
        <div className="titulo">
          <h1> Vehiculos de la Empresa</h1>
        </div>

        <div className="titulo">
          <h5>Filtrar por</h5>

          <Button className="boton-filtro">Todos</Button>

          {vehicletypes &&
            vehicletypes.map((d, index) => (
              <Button key={index} className="boton-filtro">
                {d.name}
              </Button>
            ))}
        </div>

        {data && data.map((d, index) => <VehicleItem key={index} data={d} />)}
        <PaginacionUtils setPageNumber={setPageNumber} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
}
