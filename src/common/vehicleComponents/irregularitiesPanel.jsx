import React from "react";
import { Button } from "react-bootstrap";


export function IrregularitiesPanel() {
  return (
    <div className="menu-container">
      <h1 className="title-center">Irregularidades Recientes</h1>
      <div className="irregularity-block">Presión demasiado alta2</div>
      <div className="irregularity-block">Presión demasiado alta2</div>
      <div className="irregularity-block">Presión demasiado alta2</div>
      <div className="irregularity-block">Presión demasiado alta2</div>
      <div className="irregularity-block">Presión demasiado alta2</div>
      <div className="irregularity-block">Presión demasiado alta2</div>
      <Button style={{margin: "1.5rem auto"}}>Ver mas detalles</Button>
    </div>
  );
}
