import React from "react";
import { NavbarSupervisor } from "./navbarSupervisor";
import { PerformancePanel } from "../../common/vehicleComponents/performancePanel";
import { ForkliftWith4Tires } from "../../common/tireComponents/forkliftsTypes/forkliftWith4Tires";

export function SupervisorFullPerformance() {
  return (
    <div style={{height: "800px"}}> 
      {/* Render the supervisor-specific navigation bar */}
      <NavbarSupervisor />
      {/*
      <div style={{ width: "80%", height: "30rem", margin: "2rem auto", border: "white 2px solid", fontSize: "1em", borderRadius: "1.4rem" }}>
        <PerformancePanel />
      </div>
*/}
      <ForkliftWith4Tires /> 
    </div>
  );
}
