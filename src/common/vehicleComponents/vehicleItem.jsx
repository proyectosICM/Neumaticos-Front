import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaTruck } from "react-icons/fa";
import { LogoutToken } from "../../hooks/logoutToken";

export function VehicleItem({ data }) {
  LogoutToken();
  const navigate = useNavigate(); 

  return (
    <div className="item-card">
      <div className="item-body">
        <div>
          <strong>Empresa:</strong> {data.companyModel && data.companyModel.name}
        </div>
        <div>
          <strong>Placa:</strong> {data && data.placa}
        </div>
        <div>
          <strong>Tipo:</strong> {data && data.vehicleType.name}
        </div>
      </div>

      <FaTruck className="icon-card" />

      <Button
        style={{ width: "80%" }}
        onClick={() => navigate(`/detalles/${data.id}`)}
        variant="outline-primary"
        title="Editar"
        className="float-end"
      >
        Ver mas
      </Button>
    </div>
  );
}
