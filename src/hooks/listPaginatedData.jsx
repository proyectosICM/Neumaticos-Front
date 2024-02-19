import { useState, useEffect } from "react";
import axios from "axios";

export function ListPaginatedData (url, setData,setTotalPages, setCurrentPage) {
  const fetchData = async () => {
    try {
      const token = await localStorage.getItem("token");
      const response = await axios.get(`${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.content);
      setTotalPages(response.data.totalPages); 
      setCurrentPage(response.data.number + 0);
      console.log("Data updated");
    } catch (error) {
      console.error("Error listing items", error);
      const token = await localStorage.getItem("token");
    }
  };
  fetchData();
};
