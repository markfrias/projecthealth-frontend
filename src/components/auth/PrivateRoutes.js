import React, { useState } from 'react';
import { Navigate, Outlet } from "react-router-dom";



// Protected Route component

const PrivateRoutes = () => {
// Placeholder authentication
const [auth, setAuth] = useState(false);



    return (
        auth ? <Outlet /> : <Navigate to="/login" />
    );
}

export default PrivateRoutes;
