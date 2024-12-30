import React, { useState, useContext } from "react";
import BackBtn from "../../../utility/backbtn";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { AttendenceContext } from "../../../utility/AttendenceContext";

dayjs.extend(utc);

const ViewStudentattendance = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const { updateDate, list } = useContext(AttendenceContext);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const studentList = list;

  const handleDateChange = (newDate) => {
    updateDate(newDate);
    setSelectedDate(dayjs(newDate));
    setIsPickerOpen(false);
  };
  const handleClick = () => {
    updateDate("");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-between items-center p-4 bg-white shadow-lg sticky top-0 z-20">
        <div className="" onClick={handleClick}>
          <BackBtn link="/teachers" />
        </div>
        <div className="">
          <DatePicker
            value={selectedDate}
            onChange={handleDateChange}
            maxDate={dayjs()}
            open={isPickerOpen}
            onOpen={() => setIsPickerOpen(true)}
            onClose={() => setIsPickerOpen(false)}
            sx={{
              bgcolor: "white",
              "& .MuiInputBase-root": {
                height: 30,
              },
            }}
          />
        </div>
      </div>
      <table className="w-full table-fixed text-gray-800 my-4 border border-black">
        <thead className="text-sm font-bold text-white bg-gradient-to-r from-teal-400 to-blue-500">
          <tr>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {!studentList
            ? "You are not the incharge of any class"
            : studentList.map((element) => {
                return (
                  <tr key={element.attendeId}>
                    <td className="px-6 py-4 text-sm">{element.name}</td>
                    <td
                      className={`mx-6 my-2 text-sm sm:text-lg font-medium w-8 h-8 flex justify-center items-center rounded-full ${
                        element.status === "Present"
                          ? "bg-green-700"
                          : "bg-red-700"
                      } text-white`}
                    >
                      {element.status === "Present" ? "P" : "A"}
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
};

export default ViewStudentattendance;
