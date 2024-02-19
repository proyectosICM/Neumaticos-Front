import React, { useState } from "react";
import { ListItems } from "../../hooks/crudhooks";
import { IrregularitiesTiredBaseURL } from "../../api/apiurl";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

export function IrregularitiesDetails() {
  const navigation = useNavigate();
  const { id, b } = useParams();
  const [data, setData] = useState();

  ListItems(`${IrregularitiesTiredBaseURL}/${id}`, setData);
  const vehicleId = +localStorage.getItem("vehicleId");

  const handleBack = () => {
    if (b == "r") {
      return navigation(`/detalles/${vehicleId}`);
    } else {
      return navigation(`/incidencias/${b}`);
    }
  };

  return (
    <div>
      <Button className="button-back" onClick={() => handleBack()}>
        Atras
      </Button>
      {data ? (
        <div>
          <h2>Detalle de Irregularidad</h2>
          <p>
            <strong>Nombre:</strong> {data.nameIrregularity}
          </p>
          <p>
            <strong>Detalles:</strong> {data.detailsIrregularity}
          </p>
          <p>
            <strong>Placa del Vehículo:</strong> {data.vehicleModel.placa}
          </p>
          <p>
            <strong>Compañía:</strong> {data.company.name}
          </p>
          <p>
            <strong>Tipo de Vehículo:</strong> {data.vehicleModel.vehicleType.name}
          </p>

        </div>
      ) : (
        <p>Cargando detalles de la irregularidad...</p> 
      )}
    </div>
  );
}
