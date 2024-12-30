import React, { useContext, useState } from "react";
import BackBtn from "../../../utility/backbtn";
import { AttendenceContext } from "../../../utility/AttendenceContext";
import utc from "dayjs/plugin/utc";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

dayjs.extend(utc);

const StudentAttend = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const attendance = useContext(AttendenceContext);
  const list = attendance.list;
  console.log(list)
  const handleChange = (newDate) => {
    const updatedDate =
      newDate === ""
        ? ""
        : dayjs(newDate)
            .utc()
            .startOf("day")
            .format("YYYY-MM-DDTHH:mm:ss.SSS") + "+00:00";
    setSelectedDate(dayjs(newDate));
    attendance.updateDate(updatedDate);
    setIsPickerOpen(false);
  };
  return (
    <div>
      <div className="flex  justify-between items-center p-4 bg-white shadow-lg sticky top-0 z-20">
        <div className="">
          <BackBtn link="/headmaster/students" />
        </div>
        <div className="">
          <DatePicker
            value={selectedDate}
            onChange={handleChange}
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
            <span>Name</span>
            <span>Status</span>
          </div>

          {list.map((std, index) => (
            <div
              key={std.attendeId}
              className={`flex justify-between items-center px-4 py-3 sm:px-6 sm:py-4  hover:bg-gray-100 border-b border-b-gray-300`}
            >
              <span className="text-sm sm:text-lg font-medium">{std.name}</span>
              <span
                className={`text-sm sm:text-lg font-medium w-8 h-8  flex justify-center items-center rounded-full ${
                  std.status === "Present" ? "bg-green-700" : "bg-red-700"
                } text-white`}
              >
                {std.status == "Present" ? "P" : "A"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentAttend;
