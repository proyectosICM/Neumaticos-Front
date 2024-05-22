import React, { useEffect, useState } from "react";
import { ForkliftWith4Tires } from "../tireComponents/forkliftsTypes/forkliftWith4Tires";
import { ForkliftWith6Tires } from "../tireComponents/forkliftsTypes/forkliftWith6Tires";
import { TruckWith4Tires } from "../tireComponents/trucksTypes/truckWith4Tires";
import { TruckWith6Tires } from "./../tireComponents/trucksTypes/truckWith6Tires";
import { Button } from "react-bootstrap";
import { TruckWith10Tires } from "../tireComponents/trucksTypes/truckWith10Tires";
import { TruckWith14Tires } from "../tireComponents/trucksTypes/truckWith14Tires";
import { ListItems } from "../../hooks/crudhooks";
import { VehicleURL } from "../../api/apiurl";
import { useNavigate } from "react-router-dom";

/**
 * PerformancePanel component showcases the performance aspects of vehicles, specifically forklifts and trucks.
 * It dynamically renders performance details based on the type of vehicle (e.g., forklift or truck) and its tire configuration.
 * This component is flexible to include different vehicle types and configurations by incorporating respective components.
 *
 * @param {number} vehicleId - The unique identifier of the vehicle for which the performance details are displayed.
 * This ID is passed down to the child components to fetch and display relevant performance data.
 */
export function PerformancePanel({ vehicleId, bdetails, title }) {
  const navigation = useNavigate();
  const [data, setData] = useState();

  ListItems(`${VehicleURL}/${vehicleId}`, setData);

  // Determina qué componente mostrar basado en data.vehicleType.id
  const renderVehicleComponent = () => {
    switch (data?.vehicleType?.id) {
      case 1:
        return <ForkliftWith4Tires vehicleId={vehicleId} bdetails={bdetails} />;
      case 2:
        return <ForkliftWith6Tires vehicleId={vehicleId} />;
      case 3:
        return <TruckWith4Tires vehicleId={vehicleId} />;
      case 4:
        return <TruckWith6Tires vehicleId={vehicleId} />;
      case 5:
        return <TruckWith10Tires vehicleId={vehicleId} />;
      case 6:
        return <TruckWith14Tires vehicleId={vehicleId} />;
      default:
        return null; // o cualquier componente por defecto o manejo de error
    }
  };

  return (
    <div style={{ width: "100%", height: "90%", padding: "2rem 0 0 0" }}>
      <h2>{title}</h2>
      {renderVehicleComponent()}
      
    </div>
  );
}



