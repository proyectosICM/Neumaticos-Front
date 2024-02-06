import React from "react";
// import { TireInfo } from "../common/tireComponents/tireInfo"; // Asumiendo que tienes un componente TireInfo para la información del neumático

import "./forklift.css";

export const ForkliftWith4Tires = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div style={{ width: "100%", height: "90%", border: "2px green solid" }}>
        <div style={{ width: "100%", height: "80%", border: "2px blue solid", display: "flex", flexDirection: "row" }}>
          <div className="tires-l">
            <div className="info tire-1">
              <div style={{ margin: "50% 0" }}>
                <div>22 PSI</div> <div>22 ºC</div> <div>100%</div>
              </div>
            </div>
            <div className="info tire-2">
              <div style={{ margin: "50% 0" }}>
                <div>22 PSI</div> <div>22 ºC</div> <div>100%</div>
              </div>
            </div>
          </div>

          <div className="tires-l">
            <div className="tire tire-1"></div>
            <div className="tire tire-2"></div>
          </div>

          <div className="base-forklift"></div>

          <div className="tires-r">
            <div className="tire tire-3"></div>
            <div className="tire tire-4"></div>
          </div>
          <div className="tires-r">
            <div className="info tire-1">
              <div style={{ margin: "50% 0" }}>
                <div>22 PSI</div> <div>22 ºC</div> <div>100%</div>
              </div>
            </div>
            <div className="info tire-2">
              <div style={{ margin: "50% 0" }}>
                <div>22 PSI</div> <div>22 ºC</div> <div>100%</div>
              </div>
            </div>
          </div>
        </div>
        <div className="spare-tire"></div>
        <div className="spare-info">
          <div style={{ margin: "5% 0" }}>
            <div>22 PSI - 22 ºC - 100%</div>
          </div>
        </div>
      </div>
    </div>
  );
};
