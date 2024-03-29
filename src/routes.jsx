import { Redirect } from "./Views/login/redirect";
import { Welcome } from "./Views/login/welcome";
import { Login } from "./Views/login/login";
import { VehicleMenu } from "./common/vehicleComponents/vehicleMenu";
import { SADashboard } from "./Views/systemAdministrator/saDashboard";
import { SupervisorDashboard } from "./Views/supervisor/supervisorDashboard";
import { ForkliftWith4Tires } from "./common/tireComponents/forkliftsTypes/forkliftWith4Tires";
import { SupervisorFullPerformance } from "./Views/supervisor/supervisorFullPerformance";
import { CaPanel } from "./Views/administrator/crud-administrator/ca-panel";
import { Irregularities } from "./common/irregularitiesComponents/irregularities";
import { ComingSoonPage } from "./common/comingSoonPage";
import { DetailsVehicle } from "./common/vehicleComponents/detailsVehicle";
import { Performance } from "./common/performanceComponents/performance";
import { IrregularitiesDetails } from "./common/irregularitiesComponents/irregularitiesDetails";
import { NotAuthorized } from "./common/notAuthorized";
import { ChangeTire } from "./common/changeTire";
import { TireC } from "./Views/administrator/crud-administrator/tireCRUD/tireC";
import { SensorC } from "./Views/administrator/crud-administrator/sensorCRUD/sensorC";
import { VehicleC } from "./Views/administrator/crud-administrator/vehicleCRUD/vehicleC";


// Array of route definitions for the application
export const routes = [
  // Default route
  { path: "/", component: <Login /> },

  // Route for the login page
  { path: "/login", component: <Login /> },
  // Route for the welcome page after successful login
  { path: "/welcome", component: <Welcome /> },
  // Route for redirecting users after certain actions
  { path: "/redirect", component: <Redirect /> },

  { path: "/notAuthorized", component: <NotAuthorized /> },

  // Route for displaying a paginated menu of vehicles
  { path: "/menu", component: <VehicleMenu /> },

  // Route for displaying a coming soon page (page in development)
  { path: "/mensajes", component: <ComingSoonPage /> },

  // Route for displaying a table od irregularities
  { path: "/incidencias/:p", component: <Irregularities /> },

  { path: "/incidencia-detalles/:id/:b", component: <IrregularitiesDetails /> },

  // Route for displaying a page that contains deails of vehicle
  { path: "/detalles/:id", component: <DetailsVehicle /> },

  { path: "/cambiar-neumatico/:id", component: <ChangeTire /> },

  { path: "/rendimiento/:id/:b", component: <Performance /> },

  { path: "/panel-performance", component: <SupervisorFullPerformance /> },


  // Administrator

  //Panel crud for administrator
  { path: "/ca-panel", component: <CaPanel /> },

  // CRUD Neumaticos
  { path: "/tireCRUD", component: <TireC /> },
  { path: "/sensorCRUD", component: <SensorC /> },

  { path: "/vehicleCRUD", component: <VehicleC /> },
  // System Administrator
  { path: "/sa", component: <SADashboard /> },
];


