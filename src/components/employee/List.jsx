import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';
import DataTable from 'react-data-table-component';
import axios from 'axios';


const List = () => {

    const [employees, setEmployees] = useState([])
    const [empLoading, setEmpLoading] = useState(false) //null
    const [filteredEmployee, setFilteredEmployee] = useState([])

    useEffect(() => {

        const fetchEmployees = async () => {
            setEmpLoading(true)
            try {
                const responnse = await axios.get("http://localhost:5000/api/employee", {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
                console.log("Fetched Employees Data:", responnse.data); // ✅ Check response
                console.log(responnse.data);
                if (responnse.data.success) {
                    let sno = 1;
                    console.log(responnse.data);
                    const data = await responnse.data.employees.map((emp) => (
                        {
                            _id: emp._id,
                            sno: sno++,
                            dep_name: emp.department ? emp.department.dep_name : "N/A",
                            name: emp.userId.name,
                            // dob: new Date(emp.dob).toDateString(),
                            dob: new Date(emp.dob).toLocaleDateString(),
                            // profileImage: <img src={`http://localhost:5000/${emp.userId.profileImage}`} ></img>,
                            profileImage: (
                                <img
                                    width={40}
                                    src={`http://localhost:5000/${emp.userId.profileImage}`}
                                    alt="Profile"
                                    className="rounded-full "
                                />
                            ),

                            action: <EmployeeButtons Id={emp._id} />
                        }
                    ))
                    setEmployees(data)
                    setFilteredEmployee(data)
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            }
            finally {
                setEmpLoading(false)
            }
        };
        fetchEmployees()
    }, [])

    const handleFilter = (e) => {
        const records = employees.filter((emp) => (
            emp.name.toLowerCase().includes(e.target.value.toLowerCase())
        ))
        setFilteredEmployee(records)
    }

    return (
        <div className='p-6'>
            <div className='text-center'>
                <h3 className='text-2xl font-bold'>
                    Manage Employee
                </h3>
            </div>

            <div className='flex justify-between items-center'>
                <input type="text" name="" id="" placeholder='Search by Dep Name' onChange={handleFilter} className='px-4 py-0.5 border' />
                <Link to="/admin-dashboard/add-employee" className="px-4 py-1 rounded text-white bg-teal-600">Add New Employee</Link>
            </div>
            <div className='mt-6'>
                <DataTable columns={columns} data={filteredEmployee} pagination />
            </div>
        </div>
    );
}

export default List;
