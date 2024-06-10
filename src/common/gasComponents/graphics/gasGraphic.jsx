import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Button } from "react-bootstrap";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function GasGraphic({ titulo, data, labs }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      }, 
      title: {
        display: true,
        text: `${titulo}`,
      },
    },
  };

  const [labels, setLabels] = useState([]);

  useEffect(() => {
    let lbl = [];
    switch (labs) {
      case "day":
        lbl = data ? data.map((dato) => `${dato.hour}`) : [];
        break;
      case "month":
        lbl = data ? data.map((dato) => `${dato.day}`) : [];
        break;
      case "year":
        lbl = data ? data.map((dato) => `${dato.month}`) : [];
        break;
      case "ayear":
        lbl = data ? data.map((dato) => `${dato.year} Y`) : [];
        break;
      default:
        break;
    }
    setLabels(lbl);
  }, [data, labs]);

  const avgPressure = data ? data.map((dato) => dato.avgPressure) : [];

  const dataI = {
    labels,
    datasets: [
      {
        label: `Presión Promedio PSI`,
        data: avgPressure,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <>
      <Line options={options} data={dataI} />
      <Button>Ver detalles</Button>
    </>
  );
}
