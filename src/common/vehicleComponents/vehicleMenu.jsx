import React, { useEffect, useState } from "react";

import axios from "axios";
import { VehicleItem } from "./vehicleItem";
import { VehicleCompanyURL, VehicleTypeAndCompanyURL, VehicleTypeURL } from "../../api/apiurl";
import { ListItems } from "../../hooks/crudhooks";
import { PaginacionUtils } from "../../hooks/paginacionUtils";
import { Button, Form } from "react-bootstrap";
import { NavbarSupervisor } from "../../Views/supervisor/navbarSupervisor";
import { NavbarDriver } from "./../../Views/driver/navbarDriver";
import { NavbarAdministrator } from "./../../Views/administrator/navabarAdministrator";
import { ListPaginatedData } from "../../hooks/listPaginatedData";
import { LogoutToken } from "../../hooks/logoutToken";

/**
 * Component that displays a menu of vehicles.
 * It fetches vehicle data from the server based on company and pagination.
 */
export function VehicleMenu() {
  // Hook to handle logout when the token is not available
  LogoutToken();

  // Retrieving the company ID from local storage
  const company = localStorage.getItem("empresa");

  // Retrieving the role ID from local storage for access control
  const rol = +localStorage.getItem("rol");

  // States for managing pagination: current page, page number, and total number of pages
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
      console.log("Listado")
    };
    Listar(pageNumber);
  }, []);

  ListItems(VehicleTypeURL, setVehicletypes);

  const handleType = (e) => {
    const selectedTypeId = e.target.value;
    
    setData("")
    if(selectedTypeId === "Todos"){
      ListPaginatedData(`${VehicleCompanyURL}?companyId=${company}&page=${pageNumber}`, setData, setTotalPages, setCurrentPage);
    } else {
      ListPaginatedData(`${VehicleTypeAndCompanyURL}?vehicleTypeId=${selectedTypeId}&companyId=${company}&page=${pageNumber}`, setData, setTotalPages, setCurrentPage);
    }
  };

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
          <div style={{ width: "50%", margin: "0.2rem auto" }}>
            <Form.Select aria-label="Default select example" onChange={handleType}>
              <option>Todos</option>
              {vehicletypes &&
                vehicletypes.map((d, index) => (
                  <option key={index} value={d.id}>
                    {d.name}
                  </option>
                ))}
            </Form.Select>
          </div>


        </div>

        {data && data.map((d, index) => <VehicleItem key={index} data={d} />)}
        <PaginacionUtils setPageNumber={setPageNumber} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
}
