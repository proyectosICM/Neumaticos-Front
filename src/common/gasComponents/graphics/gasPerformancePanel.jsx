import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";


import { GasGraphic } from "./gasGraphic";
import { ListItems, ListItemsTimed } from "../../../hooks/crudhooks";
import { GasRecordsStatsDAURL, GasRecordsStatsHAURL, GasRecordsStatsMAURL, GasRecordsStatsYAURL } from "../../../api/apiurl";

export function GasPerformancePanel() {
  const navigation = useNavigate();
  const { id } = useParams();
  const rol = +localStorage.getItem("rol");
  const [tireSelected, setTireSelected] = useState(localStorage.getItem("tireSelected"));

  const [dataHour, setDataHour] = useState();
  const [dataDay, setDataDay] = useState();
  const [dataMouth, setDataMouth] = useState();
  const [dataYear, setDataYear] = useState();

  ListItemsTimed(`${GasRecordsStatsHAURL}?vehicleId=${id}`, setDataHour);
  ListItemsTimed(`${GasRecordsStatsDAURL}?vehicleId=${id}`, setDataDay);
  ListItemsTimed(`${GasRecordsStatsMAURL}?vehicleId=${id}`, setDataMouth);
  ListItemsTimed(`${GasRecordsStatsYAURL}?vehicleId=${id}`, setDataYear);

  return (
    <>

      <div style={{ width: "80%", height: "300px", margin: "auto", display: "flex", flexDirection: "row" }}>
        <div style={{ width: "30%", height: "100%", margin: "auto" }}>
          <GasGraphic titulo={"Rendimiento Diario"} data={dataHour} labs={"day"} />
        </div>
        <div style={{ width: "30%", height: "100%", margin: "auto" }}>
          <GasGraphic titulo={"Rendimiento Mensual"} data={dataDay} labs={"month"} />
        </div>
        <div style={{ width: "30%", height: "100%", margin: "auto" }}>
          <GasGraphic titulo={"Rendimiento Anual"} data={dataMouth} labs={"year"} />
        </div>
      </div>
      <div style={{ width: "30%", height: "100%", margin: "auto" }}>
        <GasGraphic titulo={"Rendimiento total"} data={dataYear} labs={"ayear"} />
      </div>
    </>
  );
}
