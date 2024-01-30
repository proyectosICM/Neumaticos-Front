import React from "react";
import { Button, Table } from "react-bootstrap";

export function Irregularities() {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Dia</th>
            <th>Hora</th>
            <th>Incidencia</th>
            <th>Bateria</th>
            <th>Placa</th>
            <th>Conductor</th>
            <th>Estado</th>
            <th>Gestion</th>
            <th>Detalles</th>
          </tr>
        </thead>
        <tbody>
          <tr
            style={{
              color: "black",
              background: "green",
            }}
          >
            <td>{/* new Date(incidencia.dia).toLocaleDateString() */}</td>

    
          </tr>
        </tbody>
      </Table>
    </>
  );
}
