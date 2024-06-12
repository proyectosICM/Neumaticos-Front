import { useEffect, useState, useCallback } from "react";
import { VehicleCompanyURL, VehicleTypeAndCompanyURL, VehicleTypeURL } from "../api/apiurl";
import { ListPaginatedData } from "./listPaginatedData";
import { ListItems } from "./crudhooks";

export function useVehicleData(company) {
  const [pageNumber, setPageNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState(null);
  const [vehicletypes, setVehicletypes] = useState(null);
  const [selectedTypeId, setSelectedTypeId] = useState("Todos");

  const fetchVehicles = useCallback(
    (page, typeId = "Todos") => {
      const url =
        typeId === "Todos"
          ? `${VehicleCompanyURL}?companyId=${company}&page=${page}`
          : `${VehicleTypeAndCompanyURL}?vehicleTypeId=${typeId}&companyId=${company}&page=${page}&size=8`;
      ListPaginatedData(url, setData, setTotalPages, setCurrentPage);
    },
    [company]
  );

  useEffect(() => {
    fetchVehicles(pageNumber, selectedTypeId);
  }, [pageNumber, selectedTypeId, fetchVehicles]);


  ListItems(VehicleTypeURL, setVehicletypes);

  const handleTypeChange = (e) => {
    setSelectedTypeId(e.target.value);
    setPageNumber(0);
  };

  return {
    data,
    vehicletypes,
    pageNumber,
    currentPage,
    totalPages,
    setPageNumber,
    setCurrentPage,
    handleTypeChange,
  };
}
