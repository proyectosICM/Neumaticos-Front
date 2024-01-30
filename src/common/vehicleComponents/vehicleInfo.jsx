import React, { useState } from "react";
import "./styles/vehicle-info.css";
import { useNavigate } from "react-router-dom";

import { VehicleCompanyStatusURL, VehicleURL } from "../../api/apiurl";
import { ListItems } from "../../hooks/crudhooks";

/**
 * VehicleInfo component to display information about a specific vehicle.
 * It fetches vehicle data based on the vehicleId and renders the information.
 */
export function VehicleInfo() {
  // State to store vehicle data
  const [data, setData] = useState(null);

  // VehicleId for which information is to be displayed
  const vehicleId = 1;

  // Fetch vehicle information and update the state
  ListItems(`${VehicleURL}/${vehicleId}`, setData);

  return (
    <div className="vehicle-info-container">
      <h2>Información del Vehículo</h2>

      <div className="vehicle-info-column">
        <p>Placa: {data && data.placa}</p>
        <p>Marca: {data && data.marca}</p>
        <p>Modelo: {data && data.modelo}</p>
      </div>

      <div className="vehicle-info-column">
        <p>Empresa: {data && data.company.name}</p>
        <p>Tipo de Vehículo: {data && data.company.name}</p>
        <p>Ejes: {data && data.company.name}</p>
      </div>
    </div>
  );
}
