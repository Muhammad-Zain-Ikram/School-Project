import React, { useContext } from "react";
import Logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";
import test from "../../../assets/school/Test.svg";
import { StatsContext } from "./../Context/stats_context";

const Dashboard = () => {
  const data = useContext(StatsContext);
  console.log(data)
  let percentage = data.stats.map(
    (item) =>{
      return ((item.totalStudents - item.absentCount) / item.totalStudents) * 100
    }
  ).filter(value => value !== null && !isNaN(value));
  let length = percentage.length
  percentage = percentage.reduce((acc, curr) => acc + Number(curr), 0);
  percentage = percentage / length;
  console.log(percentage)
  let teacherPercentage =
    ((data.teacherList.length - data.teacherAttendence.length) /
      data.teacherList.length) *
    100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Navigation Bar */}
      <nav className="flex justify-between items-center px-4 py-3 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="flex items-center space-x-4">
          <img
            src={Logo}
            alt="logo"
            className="h-10 md:h-12 lg:h-14 transition-all duration-300"
          />
        </div>
        <p className="text-lg md:text-xl lg:text-2xl font-bold tracking-wider">
          UHS Teacher
        </p>
      </nav>

      {/* Main Content */}
      <div className="lg:h-[80vh] px-4 py-8 flex justify-center items-center ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {/* Students Attendance Card */}
          <Link
            to="students"
            className="w-full max-w-sm transform transition-all duration-300 hover:scale-105"
          >
            <div className="card h-[300px] bg-gradient-to-br from-purple-700 to-purple-900 rounded-2xl p-6 shadow-xl hover:shadow-2xl">
              <p className="text-xl font-semibold text-white text-center mb-6">
                Students Average Attendance
              </p>
              <div className="relative w-40 h-40 mx-auto">
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="rgba(255,0,0,0.3)"
                    strokeWidth="12"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="#00FF00"
                    strokeWidth="12"
                    strokeDasharray="440"
                    strokeDashoffset={440 - (440 * percentage) / 100}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-white">
                    {Math.round(percentage)}%
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Teachers Attendance Card */}
          <Link
            to="teachers"
            className="w-full max-w-sm transform transition-all duration-300 hover:scale-105"
          >
            <div className="card h-[300px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-xl hover:shadow-2xl">
              <p className="text-xl font-semibold text-white text-center mb-6">
                Teacher Average Attendance
              </p>
              <div className="relative w-40 h-40 mx-auto">
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="rgba(255,0,0,0.3)"
                    strokeWidth="12"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="#E1FF00"
                    strokeWidth="12"
                    strokeDasharray="440"
                    strokeDashoffset={440 - (440 * teacherPercentage) / 100}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-white">
                    {Math.round(teacherPercentage)}%
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Test Result Card */}
          <div className="w-full max-w-sm transform transition-all duration-300 hover:scale-105">
            <Link to="result">
              <div className="card h-[300px] bg-gradient-to-br from-blue-900 to-blue-950 rounded-2xl p-6 shadow-xl hover:shadow-2xl flex flex-col justify-center items-center">
                <p className="text-xl font-semibold text-white text-center mb-6">
                  Test Result
                </p>
                <img
                  src={test}
                  alt="Test Result"
                  className="w-40 h-40 mx-auto object-contain filter drop-shadow-lg"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
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
