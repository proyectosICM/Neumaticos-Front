import React, { useState } from "react";
import { ListItems } from "../../hooks/crudhooks";
import { IrregularitiesTiredBaseURL } from "../../api/apiurl";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function IrregularitiesDetails({ id, vehicleId }) {
  const navigation = useNavigate();
  const [data, setData] = useState();

  ListItems(`${IrregularitiesTiredBaseURL}/${id}`, setData);
  console.log(data);

  return (
    <div>
        <Button className="button-back" onClick={() => navigation(`/supervisor-detalles/${vehicleId}`)}>Atras</Button>
      {data ? (
        <div>
          <h2>Detalle de Irregularidad</h2>
          <p><strong>Nombre:</strong> {data.nameIrregularity}</p>
          <p><strong>Detalles:</strong> {data.detailsIrregularity}</p>
          <p><strong>Placa del Vehículo:</strong> {data.vehicleModel.placa}</p>
          <p><strong>Compañía:</strong> {data.company.name}</p>
          <p><strong>Tipo de Vehículo:</strong> {data.vehicleModel.vehicleType.name}</p>
          {/* Agrega más detalles según sea necesario */}
        </div>
      ) : (
        <p>Cargando detalles de la irregularidad...</p> // Mensaje mientras se carga la data o en caso de que no haya data
      )}
    </div>
  );
}
