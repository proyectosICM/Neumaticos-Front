import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Button } from "react-bootstrap";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function GasGraphics() {
  const [data, setData] = useState([
    { hour: "08:30", avgPressure: 80 },
    { hour: "09:30", avgPressure: 70 },
    { hour: "10:30", avgPressure: 62 },
    { hour: "11:30", avgPressure: 40 },
    { hour: "12:30", avgPressure: 38 },
    { hour: "13:30", avgPressure: 25 },
    { hour: "14:30", avgPressure: 12 },

  ]);

  const [labels, setLabels] = useState(data.map((dato) => `${dato.hour}`));

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Presión de Gas Promedio (Ejemplo)",
      },
    },
  };

  const avgPressure = data.map((dato) => dato.avgPressure);

  const dataI = {
    labels,
    datasets: [
      {
        label: `Presión de Gas Promedio (PSI)`,
        data: avgPressure,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  return <Line options={options} data={dataI} className="graph-container" />;
}
