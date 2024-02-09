import React from "react";
import { ForkliftWith4Tires } from "../tireComponents/forkliftsTypes/forkliftWith4Tires";
import { ForkliftWith6Tires } from "../tireComponents/forkliftsTypes/forkliftWith6Tires";
import { TruckWith4Tires } from "../tireComponents/trucksTypes/truckWith4Tires";
import { TruckWith6Tires } from './../tireComponents/trucksTypes/truckWith6Tires';
import { Button } from "react-bootstrap";

/**
 * PerformancePanel component showcases the performance aspects of vehicles, specifically forklifts and trucks.
 * It dynamically renders performance details based on the type of vehicle (e.g., forklift or truck) and its tire configuration.
 * This component is flexible to include different vehicle types and configurations by incorporating respective components.
 * 
 * @param {number} vehicleId - The unique identifier of the vehicle for which the performance details are displayed. 
 * This ID is passed down to the child components to fetch and display relevant performance data.
 */
export function PerformancePanel({vehicleId}) { 
  return (
    <div style={{ width: "100%", height: "90%" }}>
      <h2>Rendimiento</h2>
      <ForkliftWith6Tires vehicleId={vehicleId} />

       {/* Button to navigate to more detailed performance data. Implement onClick handler to define the navigation logic. */}
      <Button>Ver mas detalles</Button> 
    </div>
  );
}
