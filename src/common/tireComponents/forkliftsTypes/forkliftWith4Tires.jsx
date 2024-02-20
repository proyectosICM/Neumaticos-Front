import React, { useState } from "react";


import "./forklift-styles.css";
import { useTireDetails } from "../../../hooks/crudhooks";

/**
 * Displays a forklift graphic where users can interact with each tire to view detailed information.
 * Uses the custom hook `useTireDetails` to fetch tire details based on the vehicle ID and the positioning of the tire clicked.
 * @param {number} vehicleId - Identifier for the vehicle to fetch tire details.
 */
export const ForkliftWith4Tires = ({ vehicleId }) => {
  const [positioning, setPositioning] = useState(null);
  const { tireDetails, loading, error } = useTireDetails(vehicleId, positioning);

  /** 
   * Event handler for tire selection. Updates the `positioning` state which triggers fetching tire details.
   * @param {number} pos - The position code of the selected tire.
   */
  const handleSelectTire = (pos) => {
    setPositioning(pos);
    localStorage.setItem("tireSelected", pos);
  }
  return (  
    <>
      <div style={{ width: "100%", height: "75%", display: "flex", flexDirection: "row" }}>
        {/* Left side tires interaction area */}
        <div className="fkl-tires-l">
          <div className="fkl-tire" onClick={() => handleSelectTire(1)}></div>
          <div className="fkl-blank"></div>
          <div className="fkl-tire" onClick={() => handleSelectTire(2)}></div>
        </div>

        {/* Center placeholder for the forklift base */}
        <div className="base-forklift"></div>

        {/* Right side tires interaction area */}
        <div className="fkl-tires-r">
          <div className="fkl-tire" onClick={() => handleSelectTire(3)}></div>
          <div className="fkl-blank"></div>
          <div className="fkl-tire" onClick={() => handleSelectTire(4)}></div>
        </div>
      </div> 

      {/* Display area for the fetched tire details. */}
      <div className="fkl-info-tire">
        <p>{tireDetails}</p>
      </div>
    </>
  ); 
};
