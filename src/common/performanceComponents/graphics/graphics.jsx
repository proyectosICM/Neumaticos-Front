import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { ListItems, ListItems2 } from "../../../hooks/crudhooks";
import axios from "axios";
import { Button } from "react-bootstrap";
import { PerformanceTireHourlyURL } from "../../../api/apiurl";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function Graphics({titulo}) {
  const [data, setData] = useState();

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
/*
  const Listar = async (page) => {
    try {
      const token = await localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8082/api/performance-tire/hourly-averages?tireId=1&year=2024&month=2&day=15`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error al listar", error);
    }
  };
  // useEffect hook to trigger data loading when 'pageNumber' changes
  useEffect(() => {
    Listar();
  }, []);
*/

ListItems2(`${PerformanceTireHourlyURL}?tireId=1&year=2024&month=2&day=15`, setData)
  const labels = data ? data.map((dato) => `${dato.hour}  `) : [];

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
      }
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
