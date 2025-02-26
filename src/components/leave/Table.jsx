import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { columns, LeaveButtons } from '../../utils/LeaveHelper';
import DataTable from 'react-data-table-component';


const Table = () => {

    const [leaves, setLeaves] = useState([])
    const [filteredLeaves, setFilteredLeaves] = useState(null)
    const fetchLeaves = async () => {
        try {
            const responnse = await axios.get("http://localhost:5000/api/leave", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log("Fetched Employees Data:", responnse.data); // ✅ Check response
            console.log(responnse.data);
            if (responnse.data.success) {
                let sno = 1;
                console.log(responnse.data);
                const data = responnse.data.leaves.map((leave) => ({
                    _id: leave._id,
                    sno: sno++,
                    employeeId: leave.employeeId.employeeId,
                    // name: leave.employeeId.userId.dep_name,
                    name: leave.employeeId.userId.name,  // ✅ Fixed access
                    leaveType: leave.leaveType,
                    // department: leave.employeeId.department.name,
                    department: leave.employeeId.department.dep_name, // ✅ Fixed access

                    days: Math.abs(new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 60 * 60 * 24), // ✅ Calculate days
                    status: leave.status,
                    action: <LeaveButtons Id={leave._id} />
                }));

                setLeaves(data)
                setFilteredLeaves(data)
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }
    }
    useEffect(() => {
        fetchLeaves()
    }, []);

    const filterByInput = (e) => {
        const data = leaves.filter(leave =>
            leave.employeeId
                .toLowerCase()
                .includes(e.target.value.toLowerCase())
        );
        setFilteredLeaves(data)
    }

    const filterByButton = (status) => {
        const data = leaves.filter(leave =>
            leave.status
                .toLowerCase()
                .includes(status.toLowerCase())
        );
        setFilteredLeaves(data)
    }
    return (
        <>
            {
                filteredLeaves ? (
                    <div className='p-6' >
                        <div className='text-center'>
                            <h3 className='text-2xl font-bold'> Manage Leaves </h3>
                        </div>
                        <div className='flex justify-between items-center'>
                            <input type="text" placeholder='Search by Emp Id' className='px-4 py-0.5 border'
                                onChange={filterByInput} />

                            <div className='space-x-3'>
                                <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700'
                                    onClick={() => filterByButton("Pending")}
                                >Pending</button>

                                <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700'
                                    onClick={() => filterByButton("Approved")}
                                >Approved</button>

                                <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700'
                                    onClick={() => filterByButton("Rejected")}
                                >Rejected</button>

                            </div>
                        </div>
                        <div className='mt-3'>
                            <DataTable columns={columns} data={filteredLeaves} pagination />
                        </div>
                    </div>
                ) : <div> Loading ...</div>}
        </>
    );
}

export default Table;
