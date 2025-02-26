
import React from "react";
import { useAuth } from "../context/authcontext";
import AdminSIdebar from "../components/dashboard/AdminSIdebar";
import Navbar from "../components/dashboard/Navbar";
import AdminSummary from "../components/dashboard/AdminSummary";
import { Outlet } from "react-router";

const Admindashboard = () => {
    const { user, loading } = useAuth();

    console.log("User in AdminDashboard:", user); // ✅ Debugging

    if (loading) return <p>Loading...</p>;
    if (!user) return <p>Unauthorized. Please log in.</p>;

    return (
        <div className="flex">
            <AdminSIdebar />
            <div className="flex-1 ml-64 bg-gray-100 h-screen">
                <Navbar />
                <Outlet />
            </div>
        </div>
    );
};


export default Admindashboard;

