import React from "react";
import { ForkliftWith4Tires } from "../tireComponents/forkliftsTypes/forkliftWith4Tires";
import { ForkliftWith6Tires } from "../tireComponents/forkliftsTypes/forkliftWith6Tires";
import { TruckWith4Tires } from "../tireComponents/trucksTypes/truckWith4Tires";
import { TruckWith6Tires } from './../tireComponents/trucksTypes/truckWith6Tires';

export function PerformancePanel() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <h2>Rendimiento</h2>
      <ForkliftWith4Tires />
    </div>
  );
}
