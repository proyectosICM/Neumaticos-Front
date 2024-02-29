import React, { useEffect, useState } from "react";
import { NavbarDriver } from "../../Views/driver/navbarDriver";
import { NavbarSupervisor } from "../../Views/supervisor/navbarSupervisor";
import { NavbarAdministrator } from "../../Views/administrator/navabarAdministrator";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { PerformancePanel } from "../vehicleComponents/performancePanel";
import { Graphics } from "./graphics/graphics";
import { ListItems2 } from "../../hooks/crudhooks";
import { PerformanceTireAllYearslyURL, PerformanceTireDaylyURL, PerformanceTireMonthlyURL, PerformanceTireYearlyURL } from "../../api/apiurl";

export function Performance() {
  const navigation = useNavigate();
  const [dataDay, setDataDay] = useState();
  const [dayLabels, setDayLabels] = useState();
  const [dataMouth, setDataMouth] = useState();
  const [dataYear, setDataYear] = useState();
  const [dataAllYears, setDataAllYears] = useState();
  const { id } = useParams();
  const rol = +localStorage.getItem("rol");
  const [tireSelected, setTireSelected] = useState(localStorage.getItem("tireSelected"));

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear(); 
  const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-based.
  const currentDay = currentDate.getDate(); 

  // UseEffect for handling tireSelected updates and fetching data
  useEffect(() => {
    const fetchData = async () => {
      await ListItems2(`${PerformanceTireDaylyURL}?tireId=${tireSelected}&year=${currentYear}&month=${currentMonth}&day=${currentDay}`, setDataDay);
      await ListItems2(`${PerformanceTireMonthlyURL}?tireId=${tireSelected}&year=${currentYear}&month=${currentMonth}`, setDataMouth);
      await ListItems2(`${PerformanceTireYearlyURL}?tireId=${tireSelected}&year=${currentYear}`, setDataYear);
      await ListItems2(`${PerformanceTireAllYearslyURL}?tireId=${tireSelected}`, setDataAllYears);
    };

    const intervalId = setInterval(() => {
      const currentTireSelected = localStorage.getItem("tireSelected");
      if (currentTireSelected !== tireSelected) {
        setTireSelected(currentTireSelected);
        fetchData(); // Fetch data on tire selection update
      }
    }, 500);

    fetchData(); // Initial fetch

    return () => clearInterval(intervalId);
  }, [tireSelected, currentYear, currentMonth, currentDay]);

  // Update dayLabels based on dataDay
  useEffect(() => {
    if (dataDay) {
      const labels = dataDay.map((dato) => `${dato.hour}h`);
      setDayLabels(labels);
      console.log(labels);
    }
  }, [dataDay]);

  return (
    <>
      {/* Render the supervisor-specific navigation bar */}
      {rol === 1 ? <NavbarDriver /> : rol === 2 ? <NavbarSupervisor /> : rol === 3 ? <NavbarAdministrator /> : <h1>sd</h1>}

      <Button className="button-back" onClick={() => navigation(`/detalles/${id}`)}>
        Atras
      </Button>
      <div className="panel-container">
        <PerformancePanel vehicleId={id} bdetails={false} title={"Rendimiento"} />
      </div>

      <div style={{ width: "80%", height: "300px", margin: "auto", display: "flex", flexDirection: "row" }}>
        <div style={{ width: "30%", height: "100%", margin: "auto" }}>
          <Graphics titulo={"Rendimiento Diario"} data={dataDay} labs={"day"} />
        </div>
        <div style={{ width: "30%", height: "100%", margin: "auto" }}>
          <Graphics titulo={"Rendimiento Mensual"} data={dataMouth} labs={"month"} />
        </div>
        <div style={{ width: "30%", height: "100%", margin: "auto" }}>
          <Graphics titulo={"Rendimiento Anual"} data={dataYear} labs={"year"} />
        </div>
      </div>
      <div style={{ width: "30%", height: "100%", margin: "auto" }}>
        <Graphics titulo={"Rendimiento total"} data={dataAllYears} labs={"ayear"} />
      </div>
    </>
  );
}
