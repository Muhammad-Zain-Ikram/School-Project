import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import { SiGoogleclassroom } from "react-icons/si";
import {
  FaChalkboardTeacher,
  FaUserGraduate,
  FaRegCalendarAlt,
} from "react-icons/fa";
import { MdOutlineChecklist, MdOutlineAutorenew } from "react-icons/md";

function NavBar() {
  const menus = [
    {
      name: "Attendance",
      img: <MdOutlineChecklist />,
      path: "/admin",
      exact: true,
    },
    { name: "Teacher", img: <FaChalkboardTeacher />, path: "/admin/teachers" },
    { name: "Student", img: <FaUserGraduate />, path: "/admin/students" },
    { name: "Test", img: <FaRegCalendarAlt />, path: "/admin/test" },
    { name: "Classes", img: <SiGoogleclassroom />, path: "/admin/class" },
    { name: "Session", img: <MdOutlineAutorenew />, path: "/admin/session" },
  ];

  return (
    <div className="h-screen w-20 lg:w-64 bg-gradient-to-b from-blue-700 to-blue-500 text-white  shadow-lg flex flex-col justify-between">
      {/* Logo */}
      <div className="flex items-center justify-center py-4">
        <img
          src={Logo}
          alt="Logo"
          className="h-8 md:h-10 lg:h-16 transition-transform hover:scale-105"
        />
      </div>

      {/* Menu Items */}
      <div className="flex items-center justify-center">
        <ul className="flex-1 space-y-6 mx-8 flex flex-col justify-center">
          {menus.map((menu, index) => (
            <li key={index} className="group">
              <NavLink
                to={menu.path}
                end={menu.exact}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-3 lg:px-4 py-2 lg:py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-white text-blue-700 shadow-md"
                      : "hover:bg-blue-600 hover:text-white"
                  }`
                }
              >
                <span className="text-2xl">{menu.img}</span>
                <span className="hidden lg:block text-sm lg:text-lg font-medium">
                  {menu.name}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      {/* Footer */}
      <div className="pt-4">
        <span className="text-xs text-gray-300 block text-center ">
          © 2024
          <span className="text-sm text-white font-medium px-1 pb-1 md:block">
            ZB Infinity
          </span>
        </span>
      </div>
    </div>
  );
}

export default NavBar;
