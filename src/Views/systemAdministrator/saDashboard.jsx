import React from "react";
import { DASHBOARD_ITEMS } from "./dashboardSAConstants";
import { NavbarSA } from "./navbarSA";
import { ItemDashboard } from "./itemDashboard";

/**
 * System Administrator Dashboard component displaying a set of predefined items.
 * It utilizes the NavbarSA, ItemDashboard, and DASHBOARD_ITEMS to render the dashboard content.
 */
export function SADashboard() {
  return (
    <>
      {/* Navbar specific to the System Administrator dashboard */}
      <NavbarSA />

      {/* Container for displaying dashboard items */}
      <div className="menu-container">
        {DASHBOARD_ITEMS.map((item, index) => (
          <ItemDashboard key={index} title={item.title} icon={item.icon} description={item.description} />
        ))}
      </div>
    </>
  );
}
