import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';


const UserContext = createContext();


const AuthContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const token = localStorage.getItem("token");
                console.log("Token from localStorage:", token); // ✅ Check if token exists

                if (token) {
                    const response = await axios.post("http://localhost:5000/api/auth/verify", {}, {
                        headers: { "Authorization": `Bearer ${token}` }
                    });

                    console.log("Verify API Response:", response.data); // ✅ Debugging

                    if (response.data.success) {
                        setUser(response.data.user); // ✅ FIXED
                        console.log("User set in context:", response.data.user); // ✅ Check user is being set
                    } else {
                        setUser(null);
                    }
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Verify User Error:", error); // ✅ Debugging
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        verifyUser();
    }, []);


    const login = (user, token) => {
        console.log("Setting User in Context:", user); // ✅ Debugging
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);

    };



    const logout = () => {
        setUser(null);
        // localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <UserContext.Provider value={{ user, login, logout, loading }}>

            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(UserContext);
export default AuthContext;
