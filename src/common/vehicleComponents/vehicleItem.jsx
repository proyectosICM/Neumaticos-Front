import React, { useState } from "react";
import { Button, Card, CardBody, CardText, CardTitle } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { FaTruck } from "react-icons/fa";

export function VehicleItem({ data }) {
  const navigate = useNavigate();
  const rol = localStorage.getItem("rol");
  
  return (
    <div className="item-card">
      <div className="item-body">
        <div>
          <strong>Empresa:</strong> {data.company && data.company.name}
        </div>
        <div>
          <strong>Placa:</strong> {data && data.placa}
        </div>
        <div>
          <strong>Tipo:</strong> Camión
        </div>
      </div>
      <FaTruck className="icon-card" />

      <Button
        style={{ width: "80%" }}
        onClick={() => navigate(`/supervisor-detalles/${data.id}`)}
        variant="outline-primary"
        title="Editar"
        className="float-end"
      >
        Ver mas
      </Button>
    </div>
  );
}
