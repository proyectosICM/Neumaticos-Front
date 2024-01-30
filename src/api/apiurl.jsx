export const base = "http://localhost:8082";

export const loginURL = `${base}/login`;

export const apiURL = `${base}/api/`

// User
export const UserURL = `${apiURL}user`
export const InfoUserURL = `${UserURL}/info/`

// Vehicle
export const VehicleURL = `${apiURL}vehicle`
export const VehicleCompanyURL = `${apiURL}vehicle/findByCompany`
export const VehicleCompanyStatusURL = `${apiURL}vehicle/findByCompanyAndStatus`
