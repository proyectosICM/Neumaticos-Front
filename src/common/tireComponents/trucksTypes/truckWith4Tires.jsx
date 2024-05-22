import React, { useState } from "react";
import "../../../styles/truck-styles.css";
import { useTireDetails } from "../../../hooks/crudhooks";

export const TruckWith4Tires = ({ vehicleId }) => {
  const [positioning, setPositioning] = useState(null);
  const { tireDetails, loading, error } = useTireDetails(vehicleId, positioning);

  /**
   * Event handler for tire selection. Updates the `positioning` state which triggers fetching tire details.
   * @param {number} pos - The position code of the selected tire.
   */
  const handleSelectTire = (pos) => setPositioning(pos);
  return (
    <>
      <div style={{ width: "100%", height: "75%", display: "flex", flexDirection: "row" }}>
        {/* Left side tires interaction area */}
        <div className="trk-tires-l">
          <div className="trk-tire" onClick={() => handleSelectTire(1)}></div>
          <div className="trk-blank"></div>
          <div className="trk-tire" onClick={() => handleSelectTire(3)}></div>
        </div>

        {/* Center placeholder for the truck base */}
        <div className="base-truck "></div>

        {/* Right side tires interaction area */}
        <div className="trk-tires-r">
          <div className="trk-tire" onClick={() => handleSelectTire(2)}></div>
          <div className="trk-blank"></div>
          <div className="trk-tire" onClick={() => handleSelectTire(4)}></div>
        </div>
      </div>
      <div className="trk-info-tire">
        <div>{positioning}</div>
      </div>
    </>
  );
};
