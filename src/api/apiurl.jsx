// URL Server
export const base = "http://192.168.1.232:8082";

// URL for user authentication (POST request)
export const loginURL = `${base}/login`;

// Base URL for all API requests 
export const apiURL = `${base}/api/`;

// VehicleTypes

export const VehicleTypeURL = `${apiURL}vehicletypes`;

// User
export const UserURL = `${apiURL}users`;
export const InfoUserURL = `${UserURL}/info/`;

// Vehicle
export const VehicleURL = `${apiURL}vehicle`;
export const VehicleCompanyURL = `${apiURL}vehicle/findByCompany`;
export const VehicleCompanyStatusURL = `${apiURL}vehicle/findByCompanyAndStatus`;
export const VehicleTypeAndCompanyURL = `${VehicleURL}/findByVehicleTypeAndCompany`;


/**
 * ITT
 */
export const ITTURL = `${apiURL}IIT`;
export const ITTiURL = `${apiURL}IIT/image`;
export const ITTbyIrregularityURL = `${apiURL}IIT/byIrregularities`;
export const ServerITT = `${apiURL}IIT/byIrregularities`;
export const ImageFiles = `${apiURL}files/allImages`;
export const ITTNameURL = `${ITTURL}/name`
/**
 * Tires
 */
// Base URL for tire-related operations
export const TiresBaseURL = `${apiURL}tire`;

// Retrieves tires associated with a specific vehicle
export const TiresByVehicleURL = `${TiresBaseURL}/vehicle`;

// Retrieves tires based on vehicle ID and tire position
export const TiresByVehicleAndPositionURL = `${TiresBaseURL}/findByVehicleModelIdAndPositioningLocationCode`;

export const TiresByCompanyIdURL = `${TiresBaseURL}/findByCompanyModelId`

/**
 * Tires Sensor
 */
// Base URL for tire-related operations
export const TiresSensorBaseURL = `${apiURL}tireSensor`;

export const TiresSensorByCompanyAndStatus = `${TiresSensorBaseURL}/findByCompanyModelIdAndStatus`;
// Retrieves tires associated with a specific vehicle
export const TiresSensorByVehicleURL = `${TiresSensorBaseURL}/vehicle`;

// Retrieves tires based on vehicle ID and tire position
export const TiresSensorByVehicleAndPositionURL = `${TiresSensorBaseURL}/byVehicleAndPositioning`;

export const TireSensorByCompanyIdURL = `${TiresSensorBaseURL}/findByCompanyModelId`

/**
 * Irregularities 
 */
//Base URL for irregularity-related operations.
export const IrregularitiesTiredBaseURL = `${apiURL}irregularities`;

// Endpoint for retrieving paginated irregularities associated with a specific company.
export const IrregularitiesByCompanyPageURL = `${IrregularitiesTiredBaseURL}/company/page`;
export const IrregularitiesByCompanyAndVehiclePageURL = `${IrregularitiesTiredBaseURL}/companyAndVehicle/page`;

// Retrieves the most recent irregularities across all vehicles.
export const RecentIrregularitiesTiredURL = `${IrregularitiesTiredBaseURL}/recent`;

/**
 * Performance
 */
export const PerformanceTireURL = `${apiURL}performance-tire`;
// Retrieves the most recent irregularities across all vehicles.
export const PerformanceTireDaylyURL = `${PerformanceTireURL}/hourly-averages`;
// Retrieves the most recent irregularities across all vehicles.
export const PerformanceTireMonthlyURL = `${PerformanceTireURL}/daily-averages`;
// Retrieves the most recent irregularities across all vehicles.
export const PerformanceTireYearlyURL = `${PerformanceTireURL}/monthly-averages`;
// Retrieves the most recent irregularities across all vehicles.
export const PerformanceTireAllYearslyURL = `${PerformanceTireURL}/yearly-averages`;

/**
 * Gas Data
 */
export const GasChangesURL = `${apiURL}gas-changes`;
export const GasChangesRecentURL = `${GasChangesURL}/recent`;
export const GasChangeOverRecordsURL = `${GasChangesURL}/records-page`;

export const GasRecordsURL = `${apiURL}gas-records`;
export const GasRecordsVehiclePages = `${GasRecordsURL}/vehicle-page`

/**
 * Positioning
 */
export const PositioningURL = `${apiURL}positioning`;
export const PositioningvehicleType = `${PositioningURL}/vehicleType`