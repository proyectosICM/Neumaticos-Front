import React, { useState } from "react";

import {  VehicleURL } from "../../api/apiurl";
import { ListItems } from "../../hooks/crudhooks";
import "../../styles/vehicle-info.css"

export function VehicleInfo({ vehicleId }) { 
  const [data, setData] = useState(null);

  ListItems(`${VehicleURL}/${vehicleId}`, setData);

  return ( 
    <div className="vehicle-info-container">
      <h2 style={{ width: "100%", color: "white" }}>Información del Vehículo { vehicleId }</h2>

      <div className="vehicle-info-column">
        <p>Id: {data && data.id}</p>
        <p>Placa: {data && data.placa}  - Ejes: {data && data.companyModel.name}</p>
      </div>
      <div className="vehicle-info-column">
        <p>Empresa: {data && data.companyModel.name}</p>
        <p>Tipo de Vehículo: {data && data.vehicleType.name}</p>
        <p></p>
      </div>
    </div>
  );
}
