import { Login } from "./Views/login/login";
import { VehicleMenu } from "./common/vehicleComponents/vehicleMenu";
import { SADashboard } from "./Views/systemAdministrator/saDashboard";
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
import { WelcomeAndRedirect } from "./Views/login/welcomeAndRedirect";


// Array of route definitions for the application
export const routes = [
  // Default route
  { path: "/", component: <Login /> },

  // Route for the login page
  { path: "/login", component: <Login /> },

  { path: "/redirectandW", component: <WelcomeAndRedirect /> },

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


