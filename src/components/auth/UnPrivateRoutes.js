import { Navigate, Outlet } from "react-router-dom";
import authService from '../auth/auth';



// Protected Route component

const UnPrivateRoutes = () => {
    // Placeholder authentication


    return (
        authService() ? <Navigate to="/app/login" /> : <Outlet />
    );
}

export default UnPrivateRoutes;
