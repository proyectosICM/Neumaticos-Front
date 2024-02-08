//export const base = "http://localhost:8082";
export const base = "http://192.168.1.232:8082";
export const loginURL = `${base}/login`;

export const apiURL = `${base}/api/`

// VehicleTypes
export const VehicleTypeURL = `${apiURL}vehicletypes`

// User
export const UserURL = `${apiURL}user`
export const InfoUserURL = `${UserURL}/info/`

// Vehicle
export const VehicleURL = `${apiURL}vehicle`
export const VehicleCompanyURL = `${apiURL}vehicle/findByCompany`
export const VehicleCompanyStatusURL = `${apiURL}vehicle/findByCompanyAndStatus`
