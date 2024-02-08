import React, { useState } from "react";
import { NavbarSupervisor } from "../navbarSupervisor";
import { Irregularities } from "../../../common/irregularities";
import { PaginacionUtils } from "../../../hooks/paginacionUtils";

export function ISPanel() {
  // Pagination state
  const [pageNumber, setPageNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  return (
    <>
      {/* Navigation component specific to the supervisor role. */}
      <NavbarSupervisor />

      {/* Page title for recent issues. */}
      <h1>Incidencias Recientes</h1>

      {/* Main container that includes the issue list and pagination. */}
      <div className="menu-container-border">
        {/* Component to display the list of issues. */}
        <Irregularities />

        {/* Pagination utility component, provides navigation between issue pages. */}
        <PaginacionUtils setPageNumber={setPageNumber} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
      </div>
    </>
  );
}
