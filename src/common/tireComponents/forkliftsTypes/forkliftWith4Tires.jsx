import React, { useState } from "react";

import "./forklift4.css";
import { TiresByVehicleAndPositionURL } from "../../../api/apiurl";
import axios from "axios";

/**
 * Displays a forklift graphic where users can interact with each tire to view detailed information.
 * @param {number} vehicleId - Identifier for the vehicle to fetch tire details.
 */
export const ForkliftWith4Tires = ({ vehicleId }) => {
  // State to hold the details of the selected tire.
  const [tireDetails, setTireDetails] = useState("");

  /**
   * Fetches details for a tire based on its position on the forklift and updates state.
   * @param {number} positioning - The position code of the tire to fetch details for.
   */
  const handleSelectTire = async (positioning) => {
    try {
      const token = localStorage.getItem("token");

      // Fetch tire details from the API using the vehicle ID and tire positioning code.
      const { data } = await axios.get(`${TiresByVehicleAndPositionURL}?vehicleId=${vehicleId}&positioningCode=${positioning}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // If data is received, parse and set the tire details for display.
      if (data && data.length > 0) {
        const {
          pressure,
          temperature,
          batteryLevel,
          positioning: { locationCode },
        } = data[0];
        setTireDetails(`${locationCode} : ${pressure} PSI - ${temperature} º C - ${batteryLevel} %`);
      }
    } catch (error) {
      console.error("Error fetching tire details", error);
      // Clear previous details in case of error to avoid displaying incorrect information.
      setTireDetails("");
    }
  };

  return (
    <>
      <div style={{ width: "100%", height: "75%", display: "flex", flexDirection: "row" }}>
        {/* Left side tires interaction area */}
        <div className="tires-l-m4">
          <div className="tire-m4" onClick={() => handleSelectTire(1)}></div>
          <div className="tire-m4" onClick={() => handleSelectTire(2)}></div>
        </div>

        {/* Center placeholder for the forklift base */}
        <div className="base-forklift"></div>

        {/* Right side tires interaction area */}
        <div className="tires-r-m4">
          <div className="tire-m4" onClick={() => handleSelectTire(3)}></div>
          <div className="tire-m4" onClick={() => handleSelectTire(4)}></div>
        </div>
      </div>

      {/* Display area for the fetched tire details. */}
      <div className="info-tire">
        <p>{tireDetails}</p>
      </div>
    </>
  );
};
