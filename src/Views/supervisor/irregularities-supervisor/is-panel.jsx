import React, { useEffect, useState } from "react";
import { NavbarSupervisor } from "../navbarSupervisor";
import { Irregularities } from "../../../common/irregularitiesComponents/irregularities";
import { PaginacionUtils } from "../../../hooks/paginacionUtils";
import { ListItems, ListItemsPaginated } from "../../../hooks/crudhooks";
import { IrregularitiesByCompanyPageURL } from "../../../api/apiurl";
import axios from "axios";
import { NavbarDriver } from "../../driver/navbarDriver";
import { NavbarAdministrator } from "../../administrator/navabarAdministrator";

export function ISPanel() {
  // Pagination state
  const [pageNumber, setPageNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); 
  const [totalPages, setTotalPages] = useState(0);

  const [data, setData] = useState();
  const companyId = localStorage.getItem("empresa");



  const Listar = async (page) => {
    try {
      const token = await localStorage.getItem("token");
      const response = await axios.get(`${IrregularitiesByCompanyPageURL}?companyId=${companyId}&page=${page}`, {
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
    <>


      {/* Main container that includes the issue list and pagination. */}
      <div className="menu-container-border">
        {/* Component to display the list of issues. */}
        <Irregularities data={data} />

        {/* Pagination utility component, provides navigation between issue pages. */}
        <PaginacionUtils setPageNumber={setPageNumber} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
      </div>
    </>
  );
}
