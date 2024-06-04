import React, { useEffect, useState } from "react";

import { VehicleItem } from "./vehicleItem";
import { VehicleCompanyURL, VehicleTypeAndCompanyURL, VehicleTypeURL } from "../../api/apiurl";
import { ListItems } from "../../hooks/crudhooks";
import { PaginacionUtils } from "../../hooks/paginacionUtils";
import { Form } from "react-bootstrap";
import { NavbarSupervisor } from "../../Views/supervisor/navbarSupervisor";
import { NavbarDriver } from "./../../Views/driver/navbarDriver";
import { NavbarAdministrator } from "./../../Views/administrator/navabarAdministrator";
import { ListPaginatedData } from "../../hooks/listPaginatedData";
import { LogoutToken } from "../../hooks/logoutToken";


export function VehicleMenu() { 
  LogoutToken();
  
  const company = localStorage.getItem("empresa");
  const rol = +localStorage.getItem("rol");



  const [pageNumber, setPageNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [data, setData] = useState(null);
  const [vehicletypes, setVehicletypes] = useState(null);

  useEffect(() => {
    const Listar = async (page) => {
      ListPaginatedData(`${VehicleCompanyURL}?companyId=${company}&page=${page}`, setData, setTotalPages, setCurrentPage);
    };
    Listar(pageNumber);
  }, [pageNumber, company]);

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
      {rol === 1 ? <NavbarDriver /> : rol === 2 ? <NavbarSupervisor /> : rol === 3 ? <NavbarAdministrator /> : <h1>sd</h1>}

      <div className="menu-container">
        <div className="titulo">
          <h2> Vehiculos de la Empresa</h2>
        </div>

        <div className="titulo">
          <h5>Filtrar por</h5>
          <div style={{ width: "50%", margin: "0.1rem auto" }}>
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
