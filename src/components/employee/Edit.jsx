import React, { useEffect, useState } from 'react';
import { fetchDepartments } from '../../utils/EmployeeHelper';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';


const Edit = () => {

    const [employee, setEmployee] = useState({
        name: "",
        maritalStatus: "",
        designation: "",
        salary: 0,
        department: "",
    });
    const [departments, setDepartments] = useState(null)
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments()
            setDepartments(departments)
        }
        getDepartments()
    }, []);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const responnse = await axios.get(`http://localhost:5000/api/employee/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
                if (responnse.data.success) {
                    const employee = responnse.data.employee
                    setEmployee((prev) => ({
                        ...prev,
                        name: employee.userId.name,
                        martialStatus: employee.maritalStatus,
                        designation: employee.designation,
                        salary: employee.salary,
                        department: employee.department
                    }))
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            }
        }

        fetchEmployee()
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target
        setEmployee((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()


        try {
            const response = await axios.put(`http://localhost:5000/api/employee/${id}`, employee, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log([...formDataObj]); // Debugging: Check formData before sending

            if (response.data.success) {
                navigate("/admin-dashboard/employees");
            }




        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }
    }



    return (

        <>{departments && employee ? (
            <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
                <h2 className='text-2xl font-bold mb-6'>EDit Employee</h2>
                <form onSubmit={handleSubmit}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

                        <div>
                            <label className='block text-sm font-medium text-gray-700'>Name</label>
                            <input type="text" name='name' placeholder='Insert Name' className='mt-1 p-2 block w-full border border-gray-300 rounded-md ' required onChange={handleChange} value={employee.name} />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700'>Martial Status</label>
                            <select name="maritalStatus" onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required value={employee.maritalStatus}>
                                <option value="">Select Status</option>
                                <option value="single">Single</option>
                                <option value="married">Married</option>
                            </select>
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700'>Designation</label>
                            <input type="text" name='designation' placeholder='Designation' className='mt-1 p-2 block w-full border border-gray-300 rounded-md ' required onChange={handleChange} value={employee.designation} />
                        </div>



                        <div>
                            <label className='block text-sm font-medium text-gray-700'>Salary</label>
                            <input type="number" name='salary' placeholder='Salary' className='mt-1 p-2 block w-full border border-gray-300 rounded-md ' required onChange={handleChange} value={employee.salary} />
                        </div>


                        <div className='col-span-2'>
                            <label className='block text-sm font-medium text-gray-700'>Department</label>
                            <select name="department" onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required value={employee.department}>
                                <option value="">Select Status</option>
                                {departments.map(dep => (
                                    <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                                ))}
                            </select>
                        </div>

                    </div>
                    <button type='submit' className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'> Edit Employee </button>
                </form>
            </div>
        ) : <div> Loading .....</div >} </>
    );
}

export default Edit;
