import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { useAuth } from '../../context/authcontext';
import axios from 'axios';


const List = () => {
    const { user } = useAuth()
    const [leaves, setLeaves] = useState([])
    let sno = 1;
    const { id } = useParams()
    const fetchLeaves = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/leave/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            console.log("Fetched Leaves:", response.data); // ✅ Debugging
            if (response.data.success) {
                setLeaves(response.data.leaves || []);  // ✅ Ensure it sets an array
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.message);
            }
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, []);

    if (leaves === null) {
        return <div>Loading ...</div>;  // ✅ Show loading while fetching
    }

    if (leaves.length === 0) {
        return <div className='text-center text-gray-500 mt-10'>No records found.</div>;  // ✅ Show "No records found" when empty
    }

    return (
        <div className='p-6'>
            <div className='text-center'>
                <h3 className='text-2xl font-bold'> Manage Leaves </h3>
            </div>
            <div className='flex justify-between items-center'>
                <input type="text" placeholder='Search' className='px-4 py-0.5 border' />

                {user.role === "employee" &&
                    <Link to="/employee-dashboard/add-leave" className="px-4 py-1 bg-teal-600 rounded text-white" >Add new Leave</Link>
                }

            </div>

            <table className='mt-7 w-full text-sm text-left text-gray-500'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200'>
                    <tr>
                        <th className='px-6 py-3'>SNO</th>
                        <th className='px-6 py-3'>Leave Type</th>
                        <th className='px-6 py-3'>From</th>
                        <th className='px-6 py-3'>To</th>
                        <th className='px-6 py-3'>Description</th>
                        <th className='px-6 py-3'> Status</th>
                    </tr>
                </thead>
                <tbody>
                    {leaves.map((leave) => (
                        <tr key={leave._id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                            <td className='px-6 py-3'> {sno++}</td>
                            <td className='px-6 py-3'>{leave.leaveType}</td>
                            <td className='px-6 py-3'>{new Date(leave.startDate).toLocaleDateString()}</td>
                            <td className='px-6 py-3'>{new Date(leave.endDate).toLocaleDateString()}</td>
                            <td className='px-6 py-3'>{leave.reason}</td>
                            <td className='px-6 py-3'>{leave.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}

export default List;
