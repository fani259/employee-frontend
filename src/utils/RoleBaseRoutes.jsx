import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authcontext";

const RoleBaseRoutes = ({ requiredRole }) => {
    const { user } = useAuth();

    console.log("User Role in RoleBaseRoutes:", user?.role); // ✅ Debugging

    if (!user || !requiredRole.includes(user.role)) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

export default RoleBaseRoutes;
