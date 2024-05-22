import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { ListItems, ListItems2 } from "../../../hooks/crudhooks";
import axios from "axios";
import { Button } from "react-bootstrap";
import { PerformanceTireDaylyURL } from "../../../api/apiurl";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function Graphics({ titulo, data, labs }) {
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

  const [labels, setLabels] = useState();

  //ListItems2(`${PerformanceTireDaylyURL}?tireId=1&year=2024&month=2&day=15`, setData);
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


  const avgTemperature = data ? data.map((dato) => dato.avgTemperature) : [];
  const avgPressure = data ? data.map((dato) => dato.avgPressure) : [];
  const avgBatteryLevel = data ? data.map((dato) => dato.avgBatteryLevel) : [];

  const dataI = {
    labels,
    datasets: [
      {
        label: `Temperatura Promedio ° C`,
        data: avgTemperature,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: `Presión Promedio PSI`,
        data: avgPressure,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
      {
        label: `Nivel de Batería Promedio %`,
        data: avgBatteryLevel,
        borderColor: "rgba(255, 206, 86, 1)",
        backgroundColor: "rgba(255, 206, 86, 0.5)",
      },
    ],
  };

  return (
    <>
      {/* 
        <Line />
    */}
      <Line options={options} data={dataI} />
      <Button>Ver detalles</Button>
    </>
  );
}
