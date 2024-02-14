import React from "react";
import { NavbarDriver } from "../Views/driver/navbarDriver";
import { NavbarSupervisor } from "../Views/supervisor/navbarSupervisor";
import { NavbarAdministrator } from "../Views/administrator/navabarAdministrator";

export function ComingSoonPage() {
  const rol = +localStorage.getItem("rol");
  return (
    <>
      {/* Render the supervisor-specific navigation bar */}
      {rol === 1 ? <NavbarDriver /> : rol === 2 ? <NavbarSupervisor /> : rol === 3 ? <NavbarAdministrator /> : <h1>sd</h1>}
      <div className="coming-soon-container">
        <h1>Coming Soon!</h1>
        <p>We are working hard to bring you this page. Stay tuned!</p>
      </div>
    </>
  );
}
