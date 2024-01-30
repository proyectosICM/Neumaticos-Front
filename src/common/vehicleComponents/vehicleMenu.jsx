import React, { useEffect, useState } from "react";

import "./styles/vehicle-menu.css";
import { VehicleItem } from "./vehicleItem";
import { VehicleCompanyURL } from "../../api/apiurl";
import { ListItems, ListItemsPaginated } from "../../hooks/crudhooks";
import { PaginacionUtils } from "../../hooks/paginacionUtils";
import axios from "axios";

/**
 * Component that displays a menu of vehicles.
 * It fetches vehicle data from the server based on company and pagination.
 */ 
export function VehicleMenu({company}) {
  // Pagination state
  const [pageNumber, setPageNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // State to store fetched data
  const [data, setData] = useState(null);

  /**
   * Function to fetch and update the list of vehicles based on pagination and company.
   * @param {number} page - The page number to retrieve.
   */
  const Listar = async (page) => {
    try {
      const token = await localStorage.getItem("token");
      const response = await axios.get(`${VehicleCompanyURL}?companyId=${company}&page=${pageNumber}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.content);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.number + 0);
    } catch (error) {
      console.error("Error al listar", error);
    }
  };

  // useEffect hook to trigger data loading when 'pageNumber' changes
  useEffect(() => {
    Listar(pageNumber);
  }, [pageNumber]);

  return (
    <div className="menu-container">
      {data && data.map((d, index) => <VehicleItem key={index} />)}
      <PaginacionUtils setPageNumber={setPageNumber} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
 