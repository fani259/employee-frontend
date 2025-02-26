import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

const PrivateRoutes = () => {
    const { user, loading } = useAuth();

    console.log("User in PrivateRoutes after Login:", user); // ✅ Debugging

    if (loading) return <p>Loading...</p>;

    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
