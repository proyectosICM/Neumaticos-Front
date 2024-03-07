import React, { useState } from "react";
import { Button, Card, CardBody, CardText, CardTitle } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaTruck } from "react-icons/fa";

/**
 * Component to display a single vehicle item in a list or grid.
 * It shows basic information of the vehicle and provides a button to view more details.
 *
 * @param {Object} data - The vehicle data including company, placa (license plate), and type.
 * @returns A card component representing a vehicle.
 */
export function CaItem({ name, ruta }) {
  const navigate = useNavigate();
  const rol = localStorage.getItem("rol");

  return (
    <div className="item-card">
      <div className="item-body">
        <div>
          <strong>{name}</strong>
        </div>

        {/* Truck icon for visual representation */}
        <FaTruck className="icon-card" />

        {/* Button to navigate to the vehicle's detail view */}
        <Button style={{ width: "80%" }} onClick={() => navigate(`${ruta}`)} variant="outline-primary" title="Editar">
          Ver mas
        </Button>
      </div>
    </div>
  );
}
