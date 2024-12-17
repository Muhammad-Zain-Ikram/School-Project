import React, { useState,useContext } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { StatsContext } from "./../Context/stats_context";

dayjs.extend(utc);
dayjs.extend(timezone);

const TeacherList = () => {
  const contextData = useContext(StatsContext);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [Data, setData] = useState(contextData.teacherList);
  console.log(contextData)

  // Test data arrays
  const data = contextData;
  const is = Data.map((teacher) => {
    return contextData.teacherAttendence.some(person=> person.attendeId === teacher._id) ? "A" : "P";
  })
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-white shadow-lg sticky top-0 z-20">
        <Link to="/headmaster">
          <button className="flex justify-center items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-700 transition duration-200 ease-in-out">
            <FaArrowLeft />
            Go Back
          </button>
        </Link>
        <DatePicker 
          value={selectedDate}
          onChange={handleDateChange}
          sx={{
            bgcolor: 'white',
            '& .MuiInputBase-root': {
              height: 40
            }
          }}
        />
      </div>

      <div className="flex justify-center mt-8 mx-4">
        <div className="w-full max-w-3xl bg-white border-2 border-gray-600 rounded-lg shadow-lg">
          <div className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-3 font-semibold text-lg sm:text-xl">
            <span>Teacher</span>
            <span>Status</span>
          </div>
          
          {Data.map((teacher,index) => (
            <div
              key={teacher._id}
              className={`flex justify-between items-center px-4 py-3 sm:px-6 sm:py-4 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-gray-200`}
            >
              <span className="text-sm sm:text-lg font-medium">
                {teacher.name}
              </span>
              <span
                className={`text-sm sm:text-lg font-medium w-8 h-8 flex justify-center items-center rounded-full ${
                  is[index] === "P" ? "bg-green-700" : "bg-red-700"
                } text-white`}
              >
                {is[index]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherList;