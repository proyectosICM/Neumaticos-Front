import { Redirect } from "./Views/login/redirect";
import { Welcome } from "./Views/login/welcome";
import { Login } from "./Views/login/login";
import { VehicleInfo } from "./common/vehicleComponents/vehicleInfo";
import { DriverDashboard } from "./Views/driver/driverDashboard";
import { Profile } from "./common/profile";
import { VehicleMenu } from "./common/vehicleComponents/vehicleMenu";
import { SADashboard } from "./Views/systemAdministrator/saDashboard";
import { SupervisorDashboard } from "./Views/supervisor/supervisorDashboard";
import { ForkliftWith4Tires } from "./common/tireComponents/forkliftsTypes/forkliftWith4Tires";
import { SupervisorFullPerformance } from "./Views/supervisor/supervisorFullPerformance";
import { ISPanel } from "./Views/supervisor/irregularities-supervisor/is-panel";
import { ISDetails } from "./Views/supervisor/irregularities-supervisor/is-details";
import { CaPanel } from "./Views/administrator/crud-administrator/ca-panel";
import { Irregularities } from "./common/irregularitiesComponents/irregularities";
import { ComingSoonPage } from "./common/comingSoonPage";
import { DetailsVehicle } from "./common/vehicleComponents/detailsVehicle";

// Array of route definitions
export const routes = [
  /**
   * Default route
   */
  { path: "/", component: <Login /> },

  /**
   * Login and access to the application
   */
  { path: "/login", component: <Login /> },
  { path: "/welcome", component: <Welcome /> },
  { path: "/redirect", component: <Redirect /> },

  /**
   * Driver
   */
  { path: "/driver", component: <DriverDashboard /> },

  /**
   * Supervisor
   */
  { path: "/supervisor", component: <SupervisorDashboard /> },


  { path: "/menu", component: <VehicleMenu /> },

  { path: "/mensajes", component: <ComingSoonPage /> },

  { path: "/incidencias", component: <Irregularities /> },

  { path: "/detalles/:id", component: <DetailsVehicle /> },

  { path: "/panel-performance", component: <SupervisorFullPerformance /> },

  //Panel irregularities for supervisor
  { path: "/is-panel", component: <ISPanel /> },

  // Route to display detailed information about a specific irregularity for supervisors.
  { path: "/is-details/:id", component: <ISDetails /> },



  /**
   * Administrator
   */




  //Panel crud for administrator
  { path: "/ca-panel", component: <CaPanel /> },

  /**
   * System Administrator
   */
  { path: "/sa", component: <SADashboard /> },

  /**
   * Test routes
   */
  { path: "/f4", component: <ForkliftWith4Tires /> },
];
