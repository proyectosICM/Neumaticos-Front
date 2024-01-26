import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export function Redirect(){
    const navigate = useNavigate();
    const [nav, setNav] = useState();
    const rol = localStorage.getItem('rol');

    return(
        <>
            <h1>Redirigido</h1>
        </>
    );
}