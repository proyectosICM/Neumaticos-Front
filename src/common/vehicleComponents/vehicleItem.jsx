import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaTruck } from "react-icons/fa";
import { LogoutToken } from "../../hooks/logoutToken";

export function VehicleItem({ data }) {
  LogoutToken();
  const navigate = useNavigate(); 

  const handleDetails = () => {
    navigate(`/detalles/${data.id}`)

    localStorage.setItem("vehicleId", data.id);
    
    localStorage.setItem("vehicleType", data.vehicleType.id);
  }

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
        onClick={() => handleDetails()}
        variant="outline-primary"
        title="Editar"
        className="float-end"
      >
        Ver mas
      </Button>
    </div>
  );
}
