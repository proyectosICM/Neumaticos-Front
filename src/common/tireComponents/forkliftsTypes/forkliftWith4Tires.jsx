import React, { useState } from "react";

import "../../../styles/forklift-styles.css";

import { useTireDetails } from "../../../hooks/crudhooks";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

/**
 * Displays a forklift graphic where users can interact with each tire to view detailed information.
 * Uses the custom hook `useTireDetails` to fetch tire details based on the vehicle ID and the positioning of the tire clicked.
 * @param {number} vehicleId - Identifier for the vehicle to fetch tire details.
 */
export const ForkliftWith4Tires = ({ vehicleId,bdetails  }) => {
  const [positioning, setPositioning] = useState(null);
  const { tireDetails, tireCode, sensorCode, loading, error } = useTireDetails(vehicleId, positioning);
  const navigation = useNavigate();
  /**
   * Event handler for tire selection. Updates the `positioning` state which triggers fetching tire details.
   * @param {number} pos - The position code of the selected tire.
   */
  const handleSelectTire = (pos) => {
    setPositioning(pos);
    localStorage.setItem("tireSelected", pos); 
  };

  const posSel = localStorage.getItem("tireSelected");

  return (
    <>
      <div style={{ width: "100%", height: "65%", display: "flex", flexDirection: "row" }}>
        {/* Left side tires interaction area */}
        <div className="fkl-tires-l">
          <div className="fkl-tire" onClick={() => handleSelectTire(1)}></div>
          <div className="fkl-blank"></div>
          <div className="fkl-tire" onClick={() => handleSelectTire(3)}></div>
        </div>

        {/* Center placeholder for the forklift base */}
        <div className="base-forklift"></div>

        {/* Right side tires interaction area */}
        <div className="fkl-tires-r">
          <div className="fkl-tire" onClick={() => handleSelectTire(2)}></div>
          <div className="fkl-blank"></div>
          <div className="fkl-tire" onClick={() => handleSelectTire(4)}></div>
        </div>
      </div>

      {/* Display area for the fetched tire details. */}
      <div className="fkl-info-tire">
        <p>Posicion seleccionada </p>
        <p>{tireDetails}</p>
        <p>{tireCode && `Codigo del neumatico: ${tireCode}`}</p>
        <p>{sensorCode && `Codigo del sensor: ${sensorCode}`}</p>
        {bdetails && <Button onClick={() => navigation(`/rendimiento/${vehicleId}/v`)}>Ver mas detalles</Button>}
      </div>
    </>
  );
};