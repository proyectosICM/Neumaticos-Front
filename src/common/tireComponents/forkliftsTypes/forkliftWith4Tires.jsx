import React, { useState } from "react";
// import { TireInfo } from "../common/tireComponents/tireInfo"; // Asumiendo que tienes un componente TireInfo para la información del neumático

import "./forklift4.css";

export const ForkliftWith4Tires = () => {

  const [info, setInfo] = useState();

  const handleSelectTire = (positioning) => {
    setInfo( positioning +  "22 PSI - 22 ºC - 100%");
  }

  return (
    <>
      <div style={{ width: "100%", height: "80%", border: "2px blue solid", display: "flex", flexDirection: "row" }}>
        <div className="tires-l">
          <div className="tire" onClick={() => handleSelectTire(1)}></div>
          <div className="tire" onClick={() => handleSelectTire(2)}></div>
        </div>

        <div className="base-forklift"></div>

        <div className="tires-r">
          <div className="tire" onClick={() => handleSelectTire(3)}></div>
          <div className="tire" onClick={() => handleSelectTire(4)}></div>
        </div>
      </div>
      <div className="spare-info">
          <div style={{ margin: "5% 0" }}>
            <div>{info}</div>
          </div>
        </div>
    </>  
  );
};
