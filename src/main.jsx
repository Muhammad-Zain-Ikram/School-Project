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
import Addteacher from "./components/Admin/components/addTeacher.jsx"
import ClassesLists from "./components/Headmaster/components/ClassesLists.jsx";
import Home from './components/Teacher/components/home.jsx'
import PrivateRoute from "./utility/PrivateRoute.jsx";
import { AuthProvider } from "./utility/AuthContext.jsx";
import Class from "./components/Admin/components/class.jsx";
import View from "./components/Admin/components/manageClasses.jsx";
import Substitution from "./components/Admin/components/Substitution.jsx";
import Classadd from "./components/Admin/components/classadd.jsx";
import Manage from "./components/Admin/components/manage.jsx";
import Test from "./components/Admin/components/test.jsx";
import Addtest from "./components/Admin/components/addtest.jsx"
import {AttendenceProvider} from "./utility/AttendenceContext.jsx";
import Headmaster from "./components/Headmaster/home.jsx";
import Allstudent from "./components/Admin/components/allstudent.jsx";
import TeacherList from "./components/Headmaster/components/TeacherList.jsx";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StatsProvider } from "./components/Headmaster/Context/stats_context";
import Dashboard from "./components/Headmaster/components/Dashboard.jsx";
import Managetest from "./components/Admin/components/managetest.jsx";
import Addmarks from "./components/Teacher/components/addmarks.jsx";
import Viewtest from "./components/Teacher/components/viewtest.jsx";
import Viewmarks from "./components/Teacher/components/viewmarks.jsx";
import Alltest from "./components/Teacher/components/alltest.jsx";
import Ownattend from "./components/Teacher/components/ownattend.jsx";
import ViewStudentattendance from "./components/Teacher/components/studentattendance.jsx";
import TestResult from "./components/Headmaster/components/testresult.jsx";
import ViewMarks from "./components/Headmaster/components/viewmarks.jsx";
import ViewHeadmaster from "./components/Headmaster/components/view.jsx";
import StudentAttend from "./components/Headmaster/components/studentAttend.jsx";
import Session from "./components/Admin/components/Session.jsx";
import { Analytics } from '@vercel/analytics/react';
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
        <AttendenceProvider type="Student">
        <Headmaster />
        </AttendenceProvider>
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
      {
        path: "result",
        element: (
            <TestResult/>
        ),
      },
      {
        path: "view",
        element: (
            <ViewHeadmaster/>
        ),
      },
      {
        path: "view-marks",
        element: (
            <ViewMarks/>
        ),
      },
      {
        path: "studentAttendance",
        element: (
            <StudentAttend/>
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
    { path: "", element: <Teachersattend />}, 
    { path: "teachers", element:<AdminTeachers/> },
    { path: "session", element:<Session/> },
    { path: "students", element:<Allstudent /> },
    { path: "students/add", element: <Addstudent /> },
    { path: "teachers/add", element: <Addteacher />},
    { path: "class", element:<Class />},
    { path: "class/manage", element:<View /> },
    { path: "class/add", element:<Classadd /> },
    { path: "teachers/substitution", element:<Substitution /> },
    { path: "teachers/manage", element:<Manage /> },
    { path: "students/manage", element:<Students /> },
    { path: "test", element:<Test />},
    { path: "test/add-test", element:<Addtest />},
    { path: "test/manage", element:<Managetest />},
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
      { path: "",element: <Home  />,},
      {path: "attendance",element: <Attendance />,},
      {path: "your", element: <Ownattend/>},
      {path: "students", element: <ViewStudentattendance/>},

      {path: "add-marks",element: <Addmarks />,},
      {path: "view-test",element: <Viewtest />,},

      {path: "all-test",element: <Alltest/>},
      {path: "view-marks",element: <Viewmarks />,},
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
      <Analytics />
    </AuthProvider>
    </LocalizationProvider>
  </StrictMode>
);
