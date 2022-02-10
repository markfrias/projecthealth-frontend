import { Navigate, Outlet } from "react-router-dom";
import authService from '../auth/auth';



// Protected Route component

const PrivateRoutes = () => {
// Placeholder authentication


    return (
        authService() ? <Outlet /> : <Navigate to="/login" />
    );
}

export default PrivateRoutes;
