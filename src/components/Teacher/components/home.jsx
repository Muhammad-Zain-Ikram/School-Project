import React from "react";
import { NavLink,Link } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import { FaUserGraduate } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { AiOutlineEye } from "react-icons/ai";
import { MdEditNote } from "react-icons/md";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Gradient Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-blue-500 to-sky-600 text-white shadow-lg">
        <div className="flex items-center space-x-4">
          <img src={Logo} alt="logo" className="h-14" />
        </div>
        <p className="text-2xl font-extrabold tracking-wide">UHS Teacher</p>
      </nav>

      {/* Main Section */}
      <div className="grid grid-cols-2 gap-4 p-4 sm:gap-6 sm:p-8 md:p-12 h-[80vh]">
        <NavLink
          to="/teachers/attendance"
          className="p-6 bg-white text-white flex flex-col justify-center items-center text-center rounded-lg shadow-lg hover:scale-105 transition-transform"
        >
          <span className="text-sky-600 text-7xl pb-3">
            <FaUserGraduate />
          </span>
          <p className="text-sky-600 font-semibold text-2xl">Students</p>
        </NavLink>

        {/* Teachers Box */}
        <Link
          to="attendance"
          className="p-6 bg-white flex flex-col justify-center items-center text-center rounded-lg shadow-lg hover:scale-105 transition-transform"
        >
          <span className="text-7xl text-orange-600 pb-3">
            <SlCalender />
          </span>
          <p className="font-semibold text-2xl text-orange-600">Attendence</p>
        </Link>

        {/* Enter Marks Box
        <NavLink
          to="/teacher/marks"
          className="p-6 bg-white text-white flex flex-col justify-center items-center text-center rounded-lg shadow-lg hover:scale-105 transition-transform"
        >
          <span className="text-7xl text-emerald-600 pb-3">
            <MdEditNote/>
          </span>
          <p className=" text-emerald-600 font-semibold text-2xl">Enter Marks</p>
        </NavLink>

        {/* View Marks Box */}
        {/* <NavLink
          to="/teacher/view-marks"
          className="p-6 bg-white flex flex-col justify-center items-center text-center rounded-lg shadow-lg hover:scale-105 transition-transform"
        >
          <span className="text-7xl text-rose-700 pb-3">
            <AiOutlineEye />
          </span>
          <p className="font-semibold text-2xl text-rose-700">View Marks</p>
        </NavLink> */}
      </div>
    </div>
  );
};

export default Home;
