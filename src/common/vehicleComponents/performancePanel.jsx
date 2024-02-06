import React from "react";
import { ForkliftWith4Tires } from "../tireComponents/tireGraphics/forkliftWith4Tires";

export function PerformancePanel() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <h2>Forklift Information</h2>
      <ForkliftWith4Tires />
    </div>
  );
}
