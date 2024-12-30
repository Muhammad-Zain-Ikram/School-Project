import React from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackBtn from "../../../utility/backbtn";
import { StatsContext } from "./../Context/stats_context";
import { AttendenceContext } from "../../../utility/AttendenceContext";
const ClassesLists = () => {
  const navigate = useNavigate();
  const data = useContext(StatsContext);
  const attendance = useContext(AttendenceContext);
  const Data = attendance.classes;

  const Percentage = data.stats.map(
    (item) =>
      ((item.totalStudents - item.absentCount) / item.totalStudents) * 100
  ).filter(value => value !== null && !isNaN(value));

  const classesids = data.stats.map((item) => item._id);

  const newClassData = Data.filter(
    (cls, index) => cls._id == classesids[index]
  );

  const handleRowClick = (e) => {
    e.preventDefault();
    const classId = e.currentTarget.dataset.classid;
    attendance.updateGrade(classId);
    navigate("/headmaster/studentAttendance");
  };

  return (
    <>
      <BackBtn link="/headmaster" />
      <h2 className="text-2xl font-bold ml-2 my-4 text-center text-blue-700">
        Class Percentage
      </h2>
      <div className="flex justify-center mt-8 mx-2">
        <div className="w-full max-w-3xl bg-white border-2 border-gray-600 rounded-lg shadow-lg">
          <div className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-4 font-semibold text-lg md:text-xl shadow-md">
            <span>Class</span>
            <span>Percentage</span>
          </div>

          {Percentage.map((el, index) => (
            <div
              key={index}
              className={`cursor-pointer flex justify-between items-center px-6 py-2 transition duration-300 ease-in-out transform hover:scale-105 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-gray-200 shadow-lg my-5 rounded-md`}
              data-classid={newClassData[index]._id}
              onClick={handleRowClick}
            >
              <span className="text-lg ">{newClassData[index].label}</span>
              <span className="text-lg ">{Math.round(el)}%</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ClassesLists;
