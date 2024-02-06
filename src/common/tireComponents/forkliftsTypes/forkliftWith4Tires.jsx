import React from "react";
// import { TireInfo } from "../common/tireComponents/tireInfo"; // Asumiendo que tienes un componente TireInfo para la información del neumático

import "./forklift4.css";

export const ForkliftWith4Tires = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div style={{ width: "100%", height: "90%", border: "2px blue solid", display: "flex", flexDirection: "row" }}>
        {/* image tire left */}
        <div className="tires-l">
          <div className="tire-content">
            <div className="tire"></div>
            <div className="info">
              <span>20 psi</span>
              <span>20 C</span>
              <span>100%</span>
            </div>
          </div>
          <div className="tire-content">
            <div className="tire"></div>
            <div className="info">
              <span>20 psi</span>
              <span>20 C</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* image tire left */}
        <div className="base-forklift"></div>

        {/* image tire rigth */}
        <div className="tires-r">
        <div className="tire-content">
            <div className="tire"></div>
            <div className="info">
              <span>20 psi</span>
              <span>20 C</span>
              <span>100%</span>
            </div>
          </div>
          <div className="tire-content">
            <div className="tire"></div>
            <div className="info">
              <span>20 psi</span>
              <span>20 C</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
