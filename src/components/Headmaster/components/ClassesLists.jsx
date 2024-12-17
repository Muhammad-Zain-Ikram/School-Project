import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { StatsContext } from './../Context/stats_context';

const ClassesLists = () => {
  const data = useContext(StatsContext)
  const classdata = data.stats.map((item) => item.label);
  const Percentage = data.stats.map(item => ((item.totalStudents - item.absentCount) / item.totalStudents * 100));
  const classesids = data.stats.map(item => item._id);
  console.log(classesids)
  return (
  <>
        <Link to="/headmaster">
    <button
        className="flex justify-center items-center gap-2 absolute top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-700 transition duration-200 ease-in-out"
      >
        <FaArrowLeft />
        Go Back
      </button>
        </Link>
    <div className="flex justify-center mt-16 mx-2">
      <div className="w-full max-w-3xl bg-white border-2 border-gray-600 rounded-lg shadow-lg">
        <div className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-4 font-semibold text-xl shadow-md">
          <span>Class</span>
          <span>Percentage</span>
        </div>
        <div className="w-full h-[2px] bg-gray-600"></div>

        {classdata.map((className, index) => (
          <div
            key={classesids[index]}
            className={`cursor-pointer flex justify-between items-center px-6 py-4 transition duration-300 ease-in-out transform hover:scale-105 ${
              index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
            } hover:bg-gray-200 shadow-lg my-5 rounded-md`}
          >
            <span className="text-lg font-medium">{className}</span>
            <span className="text-lg font-medium">{Math.round(Percentage[index])}%</span>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default ClassesLists;
