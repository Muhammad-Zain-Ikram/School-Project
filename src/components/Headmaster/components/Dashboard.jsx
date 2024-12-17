import React, { useContext } from "react";
import Logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";
import test from "../../../assets/school/Test.svg";
import Clock from "../../../assets/school/Clock.png";
import { StatsContext } from "./../Context/stats_context";

const Dashboard = () => {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const data = useContext(StatsContext);
  let percentage = data.stats.map(
    (item) =>
      ((item.totalStudents - item.absentCount) / item.totalStudents) * 100
  );
  percentage = percentage.reduce((acc, curr) => acc + Number(curr), 0);
  percentage = percentage / data.stats.length;
  let teacherPercentage =
    (data.teacherList.length -
    data.teacherAttendence.length) / data.teacherList.length * 100;
  const offset = circumference - (teacherPercentage / 100) * circumference;

  return (
    <>
     <div className="relative flex items-center w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg justify-between px-4 md:px-9">
  <div className="flex items-center">
    <img
      src={Logo}
      alt="School Logo"
      className="w-14 md:w-16 transition-transform duration-300 transform hover:scale-110"
      aria-label="School Logo"
    />
  </div>
  <div className="absolute inset-0 flex justify-end mx-2 items-center md:justify-center">
    <p className="text-2xl md:text-3xl font-bold text-white transition-all duration-300">
      Good Morning
    </p>
  </div>
</div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row justify-center items-center lg:gap-6 mt-8">
        {/* Left Section */}
        <div className="flex flex-col items-center">
          {/* Students Attendance */}
          <Link to="students">
            <div className="card cursor-pointer w-[250px] h-[250px] bg-[#54117B] rounded-xl m-5 p-4 shadow-lg hover:shadow-gray-700 shadow-black transition-shadow">
              <p className="text-lg font-medium text-white text-center mb-4">
                Students Average Attendance
              </p>
              <div className="relative w-36 h-36 mx-auto">
                <svg className="w-full h-full -rotate-90">
                  {/* Background Circle */}
                  <circle
                    cx="72"
                    cy="72"
                    r="60"
                    fill="none"
                    stroke="#Ff0000"
                    strokeWidth="10"
                  />
                  {/* Progress Circle */}
                  <circle
                    cx="72"
                    cy="72"
                    r="60"
                    fill="none"
                    stroke="#00FF00"
                    strokeWidth="10"
                    strokeDasharray="377"
                    strokeDashoffset={377 - (377 * percentage) / 100}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center ">
                  <span className="text-3xl font-bold text-white">
                    {Math.round(percentage)}%
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Vertical Divider */}
        <div className="h-[80vh] w-[2px] bg-gray-300 hidden lg:block"></div>

        <div className="flex flex-col items-center">
          {/* Teachers Attendance */}
          <Link to="teachers">
          <div className="flex flex-col items-center">
            <div className="card cursor-pointer w-[250px] h-[250px] bg-[#1E1E1E] rounded-xl m-5 p-4 shadow-lg hover:shadow-gray-700 shadow-black transition-shadow">
              <p className="text-lg font-medium text-white text-center mb-4">
                Teacher Average Attendance
              </p>
              <div className="relative w-36 h-36 mx-auto">
                <svg className="w-full h-full -rotate-90">
                  {/* Background Circle */}
                  <circle
                    cx="72"
                    cy="72"
                    r="60"
                    fill="none"
                    stroke="#ff0000"
                    strokeWidth="10"
                  />
                  {/* Progress Circle */}
                  <circle
                    cx="72"
                    cy="72"
                    r="60"
                    fill="none"
                    stroke="#E1FF00"
                    strokeWidth="10"
                    strokeDasharray="377"
                    strokeDashoffset={377 - (377 * teacherPercentage) / 100}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center ">
                  <span className="text-3xl font-bold text-white">
                    {Math.round(teacherPercentage)}%
                  </span>
                </div>
              </div>
            </div>
        </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
{
  /* <div className=" cursor-pointer w-[250px] h-[250px] bg-[#180161] rounded-xl m-5 p-4 shadow-lg hover:shadow-gray-700 shadow-black transition-shadow flex justify-center items-center flex-col lg:hidden">
            <p className="text-lg font-medium text-white text-center mb-4">
              Test Result
            </p>
            <img src={test} alt="Test Result" className="w-36 h-36 mx-auto" />
          </div> */
}
