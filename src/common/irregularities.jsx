import React from "react";
import { Table } from "react-bootstrap";

export function Irregularities() {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Dia</th>
            <th>Hora</th>
            <th>Placa</th>
            <th>Categoria</th>
            <th>Neumatico asociado</th>
            <th>Incidencia</th>
            <th>Detalles</th>
            <th>Estado</th>
            <th>Gestion</th>
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
