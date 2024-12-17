import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Get from "./components/Account/GetStarted.jsx";
import Admin from "./components/Admin/Admin.jsx";
import App from "./App.jsx";
import AdminTeachers from "./components/Admin/components/teachers.jsx";
import Students from "./components/Admin/components/students.jsx";
import Teachers from "./components/Teacher/teachers.jsx";
import Attendance from "./components/Teacher/components/attendance";
import Addstudent from "./components/Admin/components/studentsinfo.jsx"
import Teachersattend from "./components/Admin/components/Teacherattend.jsx"
import Removestudent from "./components/Admin/components/removestudent.jsx"
import Addteacher from "./components/Admin/components/addTeacher.jsx"
import ClassesLists from "./components/Headmaster/components/ClassesLists.jsx";
import Home from './components/Teacher/components/home.jsx'
import PrivateRoute from "./utility/PrivateRoute.jsx";
import { AuthProvider } from "./utility/AuthContext.jsx";
import Class from "./components/Admin/components/class.jsx";
import View from "./components/Admin/components/view.jsx";
import Substitution from "./components/Admin/components/Substitution.jsx";
import Classadd from "./components/Admin/components/classadd.jsx";
import Manage from "./components/Admin/components/manage.jsx";
import Test from "./components/Admin/components/test.jsx";
import Addtest from "./components/Admin/components/addtest.jsx"
import {AttendenceProvider} from "./utility/AttendenceContext.jsx";
import Headmaster from "./components/Headmaster/home.jsx";
import TeacherList from "./components/Headmaster/components/TeacherList.jsx";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StatsProvider } from "./components/Headmaster/Context/stats_context";
import Dashboard from "./components/Headmaster/components/Dashboard.jsx";
const router = createBrowserRouter([
  // Public Routes
  { path: "/", element: <App /> },
  { path: "/login", element: <Get /> },

  // Headmaster Routes
  {
    path: "/headmaster",
    element: (
      <PrivateRoute roles={["Principal"]}>
        <StatsProvider>
        <Headmaster />
        </StatsProvider>
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: (
            <Dashboard />
        ),
      },
      {
        path: "students",
        element: (
            <ClassesLists />
        ),
      },
      {
        path: "teachers",
        element: (
            <TeacherList/>
        ),
      },
    ],
  },

  // Admin Routes
  {
    path: "/admin",
    element: (
      <PrivateRoute roles={["Admin"]}>
        <AttendenceProvider type="Teacher">
        <Admin />
        </AttendenceProvider>
      </PrivateRoute>
     
    ),
    children: [
    { path: "", element: <Teachersattend />}, // Empty String for index route
    { path: "teachers", element:<AdminTeachers/> },
    { path: "students", element:<Students /> },
    { path: "students/add", element: <Addstudent /> },
    { path: "teachers/add", element: <Addteacher />},
    { path: "students/remove", element:<Removestudent />},
    { path: "class", element:<Class />},
    { path: "class/view", element:<View /> },
    { path: "class/add", element:<Classadd /> },
    { path: "teachers/substitution", element:<Substitution /> },
    { path: "teachers/manage", element:<Manage /> },
    { path: "test", element:<Test />},
    { path: "test/add-test", element:<Addtest />},
    ],
  },

  // Teacher Routes
  {
    path: "/teachers",
    element: (
      <PrivateRoute roles={["Teacher"]}>
        <AttendenceProvider type="Student">
        <Teachers />
        </AttendenceProvider>
      </PrivateRoute>
    ),
    children: [
      { path: "",element: (<Home  />),},
      {path: "attendance",element: (<Attendance />),},
    ],
  },

  // Unauthorized Route
  { path: "/unauthorized", element: <div>Unauthorized Access</div> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    </LocalizationProvider>
  </StrictMode>
);
