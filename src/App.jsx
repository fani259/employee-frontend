
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Admindashboard from "./pages/Admindashboard";
import Employeedashboard from "./pages/Employeedashboard";
import PrivateRoutes from "./utils/privateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";
import AdminSummary from "./components/dashboard/AdminSummary";
import DepartmentList from "./components/department/DepartmentList";
import AddDepartment from "./components/department/AddDepartment";
import EditDepartment from "./components/department/EditDepartment";
import ErrorBoundary from "./ErrorBoundary";
import List from "./components/employee/List";
import Add from "./components/employee/Add";
import View from "./components/employee/View";
import Edit from "./components/employee/Edit";
import AddSalary from "./components/salary/Add";
import ViewSalary from "./components/salary/View";
import Summary from "./components/EmployeeDashboard/Summary";
import LeaveList from "./components/leave/List"
import AddLeave from "./components/leave/Add"
import Setting from "./components/EmployeeDashboard/Setting";
import Table from "./components/leave/Table";
import Detail from "./components/leave/Detail";


function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary >
        <Routes>
          <Route path="/" element={<Navigate to="/admin-dashboard" />} />

          <Route path="/login" element={<Login />} />

          <Route element={<PrivateRoutes />}>
            <Route element={<RoleBaseRoutes requiredRole={["admin"]} />}>
              <Route path="/admin-dashboard" element={<Admindashboard />}>
                <Route index element={<AdminSummary />} />
                <Route path="/admin-dashboard/departments" element={<DepartmentList />} />
                <Route path="/admin-dashboard/add-department" element={<AddDepartment />} />
                <Route path="/admin-dashboard/department/:id" element={<EditDepartment />} />
                <Route path="/admin-dashboard/employees" element={<List />} />
                <Route path="/admin-dashboard/add-employee" element={<Add />} />
                <Route path="/admin-dashboard/employees/:id" element={<View />} />
                <Route path="/admin-dashboard/employees/edit/:id" element={<Edit />} />
                <Route path="/admin-dashboard/employees/salary/:id" element={<ViewSalary />} />
                <Route path="/admin-dashboard/salary/add" element={<AddSalary />} />
                <Route path="/admin-dashboard/leaves" element={<Table />} />
                <Route path="/admin-dashboard/leaves/:id" element={<Detail />} />
                <Route path="/admin-dashboard/employees/leaves/:id" element={<LeaveList />} />
                <Route path="/admin-dashboard/setting" element={<Setting />} />


              </Route>

            </Route>
          </Route>



          <Route element={<PrivateRoutes />}>
            <Route element={<RoleBaseRoutes requiredRole={["admin", "employee"]} />}>
              <Route path="/employee-dashboard" element={<Employeedashboard />}>
                <Route index element={<Summary />} />
                <Route path="/employee-dashboard/profile/:id" element={<View />} />
                <Route path="/employee-dashboard/leaves/:id" element={<LeaveList />} />
                <Route path="/employee-dashboard/add-leave" element={<AddLeave />} />
                <Route path="/employee-dashboard/salary/:id" element={<ViewSalary />} />
                <Route path="/employee-dashboard/setting" element={<Setting />} />
              </Route>
            </Route>
          </Route>


        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
