import React from "react";
import { Button, Card, CardBody, CardText, CardTitle } from "react-bootstrap";
import "./styles/vehicle-menu.css";

export function VehicleItem() {
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
          <Button style={{width: "100%"}} variant="outline-primary" title="Editar" className="float-end">
            Ver mas
          </Button>
        </CardBody>
      </CardBody>
    </Card>
  );
}
