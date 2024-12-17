import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../../assets/logo.png';
import { SiGoogleclassroom } from "react-icons/si";
import { FaChalkboardTeacher, FaUserGraduate, FaRegCalendarAlt } from "react-icons/fa";
import { MdOutlineChecklist } from "react-icons/md";

function NavBar() {
  const menus = [
    { name: 'Attendance', img: <MdOutlineChecklist />, path: '/admin', exact: true },
    { name: 'Teacher', img: <FaChalkboardTeacher />, path: '/admin/teachers' },
    { name: 'Student', img: <FaUserGraduate />, path: '/admin/students' },
    // { name: 'Test', img: <FaRegCalendarAlt />, path: '/admin/test' },
    { name: 'Classes', img: <SiGoogleclassroom />, path: '/admin/class' },
  ];

  return (
    <div className="h-full flex flex-col justify-between bg-blue-700 text-white">
      {/* Menu Items */}
      <ul className="py-2">
        {menus.map((menu, index) => (
          <li key={index} className="cursor-pointer flex items-center gap-4 p-2">
            <NavLink
              to={menu.path}
              end={menu.exact}
              className={({ isActive }) =>
                `flex  items-center gap-4 my-5 py-2 px-3 rounded-md transition-colors ${
                  isActive ? 'bg-blue-500 w-full' : 'hover:bg-blue-400 w-full'
                }`
              }
            >
              <span className="text-2xl">{menu.img}</span>
              <span className="text-lg hidden lg:block">{menu.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Logo */}
      <div className="flex justify-center items-center pb-4">
        <img src={Logo} alt="Logo" className="h-12 lg:h-20" />
      </div>
    </div>
  );
}

export default NavBar;
