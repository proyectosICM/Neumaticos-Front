import React, { useState } from "react";
import { Button, Card, CardBody, CardText, CardTitle } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

export function VehicleItem() {
  const navigate = useNavigate();
  const rol = localStorage.getItem("rol");

  const handleDetails = () => {
    let ruta;

    switch (parseInt(rol)) {
      case 1:
        ruta = "/supervisor-detalles1";
        break;
      case 2:
        ruta = "/supervisor-detalles";
        break;
      case 3:
        ruta = "/supervisor-detalles3";
        break;
      case 4:
        ruta = "/supervisor-detalles4";
        break;
      default:
        // Puedes manejar un caso por defecto si rol no coincide con ningún caso
        break;
    }

    navigate(ruta);
  };

  return (
    <Card className="item-card">
      <CardBody>
        <CardTitle>
          <strong>Placa:</strong> ABC-002
        </CardTitle>

        <CardBody>
          <CardText>
            <strong>Empresa:</strong> ICM
          </CardText>

          <CardText>
            <strong>Tipo:</strong> Camión
          </CardText>
          <Button style={{ width: "100%" }} onClick={() => handleDetails()} variant="outline-primary" title="Editar" className="float-end">
            Ver mas
          </Button>
        </CardBody>
      </CardBody>
    </Card>
  );
}
