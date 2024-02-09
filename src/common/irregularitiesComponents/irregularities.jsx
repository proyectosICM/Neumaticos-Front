import React from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function Irregularities({data}) {

  const navigation = useNavigate();
  return (
    <>
      <h1>Incidencias Recientes</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Día</th>
            <th>Hora</th>
            <th>Placa</th>
            <th>Categoría</th>
            <th>Neumático asociado</th>
            <th>Incidencia</th>
            <th>Detalles</th>
            <th>Estado</th>
            <th>Gestión</th>
          </tr>
        </thead>
        <tbody>
          {data &&  data.map((incidencia, index) => (
            <tr key={index}
              style={{
                color: "black",
                background: incidencia.status ? "green" : "red", // Ejemplo de cómo podrías cambiar el color de fondo basado en el estado
              }}
            >
              <td>{new Date(incidencia.createdAt).toLocaleDateString()}</td>
              <td>{new Date(incidencia.createdAt).toLocaleTimeString()}</td>
              <td>{incidencia.vehicleModel.placa}</td>
              <td>{incidencia.vehicleModel.vehicleType.name}</td>
              <td>{/* Aquí puedes poner el neumático asociado si tienes esa información */}</td>
              <td>{incidencia.nameIrregularity}</td>
              <td>{incidencia.detailsIrregularity}</td>
              <td>{incidencia.status ? "Activo" : "Inactivo"}</td>
              <td><Button onClick={() => navigation(`/is-details/${incidencia.id}`)}>Ver detalles</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
