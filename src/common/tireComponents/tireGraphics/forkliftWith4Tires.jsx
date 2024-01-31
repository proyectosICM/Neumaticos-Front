import React, { useState, useEffect } from "react";
// import { TireInfo } from "../common/tireComponents/tireInfo"; // Asumiendo que tienes un componente TireInfo para la información del neumático

import "./forklift.css";

export const ForkliftWith4Tires = () => {
  return (
    <div>
      <h2>Forklift Information</h2>
      <div className="base-forklift"></div>
      <div className="tire-l tire-1"></div>
      <div className="tire-l tire-1"></div>
    </div>
  );
};
