import React, { useState } from 'react';
import { Navigate, Outlet } from "react-router-dom";
import authService from '../auth/auth';



// Protected Route component

const PrivateRoutes = () => {
// Placeholder authentication
const [auth, setAuth] = useState(false);



    return (
        authService() ? <Outlet /> : <Navigate to="/login" />
    );
}

export default PrivateRoutes;
