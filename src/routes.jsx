import { Redirect } from "./Views/login/redirect";
import { Welcome } from "./Views/login/welcome";
import { Login } from "./Views/login/login";
import { VehicleInfo } from "./common/vehicleComponents/vehicleInfo";
import { DriverDashboard } from "./Views/driver/driverDashboard";
import { Profile } from "./common/profile";
import { VehicleMenu } from "./common/vehicleComponents/vehicleMenu";
import { SADashboard } from "./Views/systemAdministrator/saDashboard";
import { SupervisorDashboard } from "./Views/supervisor/supervisorDashboard";
import { SupervisorMenu } from "./Views/supervisor/supervisorMenu";
import { Irregularities } from "./common/irregularities";
import { SupervisorVinfo } from "./Views/supervisor/supervisorVInfo";
import { ForkliftWith4Tires } from "./common/tireComponents/forkliftsTypes/forkliftWith4Tires";
import { SupervisorFullPerformance } from "./Views/supervisor/supervisorFullPerformance";

// Array of route definitions
export const routes = [
  // Default route
  { path: "/", component: <Login /> },

  // Login and access to the application
  { path: "/login", component: <Login /> },
  { path: "/welcome", component: <Welcome /> },
  { path: "/redirect", component: <Redirect /> },

  //
  { path: "/detalles", component: <VehicleInfo /> },

  //Driver
  { path: "/driver", component: <DriverDashboard /> },

  //Supervisor
  { path: "/supervisor", component: <SupervisorDashboard /> },
  { path: "/supervisor-menu", component: <SupervisorMenu /> },
  { path: "/supervisor-detalles/:id", component: <SupervisorVinfo /> },
  { path: "/panel-performance", component: <SupervisorFullPerformance /> },
  //System Administrator
  { path: "/sa", component: <SADashboard /> },

  // Test routes
  { path: "/profile", component: <Profile /> },
  { path: "/vehicle-info", component: <VehicleInfo /> },
  { path: "/vehicle-menu", component: <VehicleMenu /> },
  { path: "/irregularities", component: <Irregularities /> },

  { path: "/f4", component: <ForkliftWith4Tires /> },
];
