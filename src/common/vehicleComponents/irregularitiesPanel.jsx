import React from "react";

export function IrregularitiesPanel() {
  return (
    <div style={{ width: "100%", height: "100%", margin: "0 auto", border: "2px solid green" }}>
      <h1 style={{ textAlign: "center" }}>Irregularidades Recientes</h1>
      <div style={{ width: "100%", height: "90%", margin: "0 auto", border: "2px solid blue" }}>
        {/* Bloque de irregularidades superiores */}
        <div style={{ display: "flex", width: "100%", height: "30%", flexDirection: "row", justifyContent: "center", border: "2px solid white" }}>
          <div style={{ width: "40%", height: "80%", border: "2px solid red", margin: "auto", display: "flex", alignItems: "center", justifyContent: "center", padding: "10px" }}>
            Baja de batería en dispositivo
          </div>
          <div style={{ width: "40%", height: "80%", border: "2px solid red", margin: "auto", display: "flex", alignItems: "center", justifyContent: "center", padding: "10px" }}>
            Temperatura demasiado alta
          </div>
        </div>

        {/* Bloque de irregularidades inferiores */}
        <div style={{ display: "flex", width: "100%", height: "30%", flexDirection: "row", justifyContent: "center", border: "2px solid white" }}>
          <div style={{ width: "40%", height: "40%", border: "2px solid red", margin: "auto", display: "flex", alignItems: "center", justifyContent: "center", padding: "10px" }}>
            Presión demasiado alta
          </div>
          <div style={{ width: "40%", height: "40%", border: "2px solid red", margin: "auto", display: "flex", alignItems: "center", justifyContent: "center", padding: "10px" }}>
            Presión demasiado baja
          </div>
        </div>

        <div style={{ display: "flex", width: "100%", height: "30%", flexDirection: "row", justifyContent: "center", border: "2px solid white" }}>
          <div style={{ width: "40%", height: "40%", border: "2px solid red", margin: "auto", display: "flex", alignItems: "center", justifyContent: "center", padding: "10px" }}>
            Presión demasiado alta
          </div>
          <div style={{ width: "40%", height: "40%", border: "2px solid red", margin: "auto", display: "flex", alignItems: "center", justifyContent: "center", padding: "10px" }}>
            Presión demasiado baja
          </div>
        </div>
      </div>
    </div>
  );
}
