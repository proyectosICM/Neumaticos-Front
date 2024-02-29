import React, { useState } from "react";
import "./styles/vehicle-info.css";
import { useNavigate } from "react-router-dom";

import { VehicleCompanyStatusURL, VehicleURL } from "../../api/apiurl";
import { ListItems } from "../../hooks/crudhooks";
import { useNotAuthorized } from "../../hooks/useNotAuthorized";

/**
 * Displays detailed information for a specific vehicle identified by its vehicleId.
 * Fetches data from the server and renders it in a formatted layout.
 *
 * @param {number} vehicleId - Identifier of the vehicle to fetch and display information for.
 */
export function VehicleInfo({ vehicleId }) { 
  // State to store vehicle data
  const [data, setData] = useState(null);

  /**
   * Fetches vehicle information based on the provided vehicleId and updates the component state.
   * This function calls the ListItems utility to make an API request and handle the response.
   *
   * @param {string} vehicleId - The unique identifier for the vehicle to fetch information for.
   * @param {Function} setData - The state setter function to update the component state with fetched data.
   */
  ListItems(`${VehicleURL}/${vehicleId}`, setData);
  // useNotAuthorized(data.id);
  return ( 
    <div className="vehicle-info-container">
      {/* Header displaying the purpose of the container */}
      <h2 style={{ width: "100%", color: "white" }}>Información del Vehículo { vehicleId }</h2>

      {/* First column for basic vehicle information */}
      <div className="vehicle-info-column">
        <p>Id: {data && data.id}</p>
        <p>Placa: {data && data.placa}  - Ejes: {data && data.company.name}</p>
      </div>

      {/* Second column for additional vehicle information */}
      <div className="vehicle-info-column">
        <p>Empresa: {data && data.company.name}</p>
        <p>Tipo de Vehículo: {data && data.vehicleType.name}</p>
        <p></p>
      </div>
    </div>
  );
}
