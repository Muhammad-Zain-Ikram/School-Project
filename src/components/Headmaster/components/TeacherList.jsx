import React, { useState, useContext } from "react";
import BackBtn from "../../../utility/backbtn";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { StatsContext } from "./../Context/stats_context";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const TeacherList = () => {
  const contextData = useContext(StatsContext);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const Data = contextData.teacherList;
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  // Test data arrays
  const is = Data.map((teacher) => {
    return contextData.teacherAttendence.some(
      (person) => person.attendeId === teacher._id
    )
      ? "A"
      : "P";
  });

  const handleDateChange = (newDate) => {
    const updatedDate =
      newDate === ""
        ? ""
        : dayjs(newDate)
            .utc()
            .startOf("day")
            .format("YYYY-MM-DDTHH:mm:ss.SSS") + "+00:00";
    setSelectedDate(dayjs(newDate));
    contextData.changeDate(updatedDate);
    setIsPickerOpen(false);
  };
  const handleClick = () => {
    contextData.changeDate("");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex  justify-between items-center p-4 bg-white shadow-lg sticky top-0 z-20">
        <div className="" onClick={handleClick}>
          <BackBtn link="/headmaster" />
        </div>
        <div className="">
          <DatePicker
            value={selectedDate}
            onChange={handleDateChange}
            open={isPickerOpen}
            onOpen={() => setIsPickerOpen(true)}
            onClose={() => setIsPickerOpen(false)}
            maxDate={dayjs()}
            sx={{
              bgcolor: "white",
              "& .MuiInputBase-root": {
                height: 30,
              },
            }}
          />
        </div>
      </div>

      <div className="flex justify-center my-8 mx-4">
        <div className="w-full max-w-3xl bg-white border-2 border-gray-600 rounded-lg shadow-lg">
          <div className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-3 font-semibold text-lg sm:text-xl">
            <span>Teacher</span>
            <span>Status</span>
          </div>

          {Data.map((teacher, index) => (
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
