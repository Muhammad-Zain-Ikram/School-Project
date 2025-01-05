import React from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import { FaUserGraduate } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { AiOutlineEye } from "react-icons/ai";
import { MdEditNote } from "react-icons/md";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Gradient Navbar */}
      <nav className="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-blue-500 to-sky-600 text-white shadow-lg">
        <div className="flex items-center space-x-4">
          <img src={Logo} alt="logo" className="h-10 md:h-14" />
        </div>
        <p className="text-lg md:text-xl font-bold tracking-wide">
          UHS Teacher
        </p>
      </nav>

      {/* Main Section */}
      <div className="flex flex-wrap justify-center md:justify-between items-center gap-4 p-4 sm:p-6 md:p-8 max-w-screen-lg mx-auto">        {/* Row 1 */}
        <NavLink
          to="/teachers/attendance"
          className="w-[45%] p-6 bg-white text-white flex flex-col justify-center items-center text-center rounded-lg shadow-sm shadow-black hover:scale-105 transition-transform"
        >
          <span className="text-sky-600 text-3xl pb-2 lg:text-7xl md:text-4xl">
            <FaUserGraduate />
          </span>
          <p className="text-sky-600 font-semibold text-xl lg:text-3xl md:text-2xl">
            Students
          </p>
        </NavLink>

        <Link
          to="your"
          className="w-[45%] p-6 bg-white text-white flex flex-col justify-center items-center text-center rounded-lg shadow-sm shadow-black hover:scale-105 transition-transform"
        >
          <span className="text-orange-600 text-3xl pb-2 lg:text-7xl md:text-4xl">
            <SlCalender />
          </span>
          <p className="font-semibold text-xl lg:text-3xl md:text-2xl text-orange-600">
            Attendance
          </p>
        </Link>

        {/* Row 2 */}
        <NavLink
          to="view-test"
          className="w-[45%] p-6 bg-white text-white flex flex-col justify-center items-center text-center rounded-lg shadow-sm shadow-black hover:scale-105 transition-transform"
        >
          <span className="text-emerald-600 text-3xl pb-2 lg:text-7xl md:text-4xl">
            <MdEditNote />
          </span>
          <p className="text-emerald-600 font-semibold text-lg lg:text-3xl md:text-2xl">
            Enter Marks
          </p>
        </NavLink>

        <NavLink
          to="all-test"
          className="w-[45%] p-6 bg-white flex flex-col justify-center items-center text-center rounded-lg shadow-sm shadow-black hover:scale-105 transition-transform"        >
          <span className="text-rose-700 text-3xl pb-2 lg:text-7xl md:text-4xl">
            <AiOutlineEye />
          </span>
          <p className="font-semibold text-lg lg:text-3xl md:text-2xl text-rose-700 ">
            View Marks
          </p>
        </NavLink>

        {/* Row 3 */}
        <NavLink
          to="students"
          className="flex-grow flex-shrink-0 w-full md:w-[48%] p-6 bg-white flex flex-col justify-center items-center text-center rounded-lg shadow-sm shadow-black hover:scale-105 transition-transform"
        >
          <span className="text-blue-600 text-3xl pb-2 lg:text-7xl md:text-4xl">
            <AiOutlineEye />
          </span>
          <p className="font-semibold text-xl lg:text-3xl md:text-2xl text-blue-600">
            View Attendance
          </p>
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
