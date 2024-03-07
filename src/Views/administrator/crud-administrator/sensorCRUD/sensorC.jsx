import React from 'react'
import { NavbarDriver } from '../../../driver/navbarDriver';
import { NavbarSupervisor } from '../../../supervisor/navbarSupervisor';
import { NavbarAdministrator } from '../../navabarAdministrator';
import { SensorTable } from './sensorTable';

export function SensorC(){
    const rol = +localStorage.getItem("rol");
    return(
        <div>
        {rol === 1 ? <NavbarDriver /> : rol === 2 ? <NavbarSupervisor /> : rol === 3 ? <NavbarAdministrator /> : <h1>sd</h1>}
        <div className="menu-container">
            <SensorTable />
        </div>
      </div>
    );
}
