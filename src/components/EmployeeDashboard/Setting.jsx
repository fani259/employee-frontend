
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/authcontext';
import axios from 'axios';

const Setting = () => {

    const navigate = useNavigate();
    const { user } = useAuth();
    const [setting, setSetting] = useState({
        userId: user._id,
        oldPassword: "",  // Fixed spelling
        newPassword: "",  // Fixed spelling
        confirmPassword: "",  // Fixed spelling
    });


    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSetting({ ...setting, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (setting.newPassowrd !== setting.confirmPassowrd) {
            setError("Password Not Matched")
        } else {
            try {
                const response = await axios.put(
                    "http://localhost:5000/api/setting/change-password", setting,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                if (response.data.success) {
                    navigate("/admin-dashboard/employees");
                    setError("")
                }
            } catch (error) {
                // If the error is due to wrong old password, update the error message
                if (error.response && error.response.data.error === "Wrong Old Password") {
                    setError("Wrong Old Password");
                } else {
                    setError("Something went wrong. Please try again.");
                }
            }
        }
    }

    return (


        <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
            <h2 className='text-2xl font-bold mb-6'>Change Passowrd</h2>
            <p className='text-red-500'>{error}</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className='text-sm font-medium text-gray-700'> Old Password</label>
                    <input type="password" name='oldPassowrd' placeholder='Change Password' onChange={handleChange} className='mt-1 w-full p-2 border border-gray-300 rounded-md ' required />
                </div>

                <div>
                    <label className='text-sm font-medium text-gray-700'> New Password</label>
                    <input type="password" name='newPassowrd' placeholder='New Password' onChange={handleChange} className='mt-1 w-full p-2 border border-gray-300 rounded-md ' required />
                </div>

                <div>
                    <label className='text-sm font-medium text-gray-700'> Confirm Password</label>
                    <input type="password" name='confirmPassowrd' placeholder='Confirm Password' onChange={handleChange} className='mt-1 w-full p-2 border border-gray-300 rounded-md ' required />
                </div>

                <button type='submit' className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md'>Change Passowrd</button>
            </form>
        </div>
    );
}

export default Setting;
