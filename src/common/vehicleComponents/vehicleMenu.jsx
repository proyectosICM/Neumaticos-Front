import React, { useEffect, useState } from "react";

import { VehicleItem } from "./vehicleItem";
import { PaginacionUtils } from "../../hooks/paginacionUtils";
import { Form } from "react-bootstrap";
import { LogoutToken } from "../../hooks/logoutToken";
import RoleBasedNavbar from "../roleBasedNavbar";
import { useVehicleData } from "../../hooks/useVehicleData";

export function VehicleMenu() {
  LogoutToken();


  const company = localStorage.getItem("empresa");
  const {
    data, 
    vehicletypes,
    pageNumber,
    currentPage,
    totalPages,
    setPageNumber,
    setCurrentPage,
    handleTypeChange,
  } = useVehicleData(company);


  return (
    <div>
      <RoleBasedNavbar />
      <div className="menu-container">
        <div className="titulo">
          <h2> Vehiculos de la Empresa</h2>
        </div>

        <div className="titulo">
          <h5>Filtrar por</h5>
          <div style={{ width: "50%", margin: "0.1rem auto" }}>
            <Form.Select aria-label="Default select example" onChange={handleTypeChange}>
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
