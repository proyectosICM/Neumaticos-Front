import React from 'react'
import { NavbarSupervisor } from './navbarSupervisor';
import { VehicleMenu } from './../../common/vehicleComponents/vehicleMenu';

export function SupervisorMenu(){
    return(
        <div>
            <NavbarSupervisor />
            <VehicleMenu company={1} />
        </div>
    );
}