import React, { useState, useContext, useEffect } from "react";
import { Attendance } from "../../layoutattendance";
import { sendJSONRequest} from "../../../utility/sendJson";
import { AttendenceContext } from "../../../utility/AttendenceContext";
import { SuccessPopup } from "../../../utility/Popups";
import BackBtn from "../../../utility/backbtn";
const StudentAttendance = () => {
  const Backend = import.meta.env.VITE_BACKEND_URL;
  const [isVisible, setIsVisible] = useState(false);
  const [issent, setIsSent] = useState(false);
  const { list, attendence, updateGrade, updateAttend, classes } =
    useContext(AttendenceContext);
  const [studentList, setstudentList] = useState(list);
  const [AttendenceData, setAttendenceData] = useState(attendence);
  useEffect(() => {
    setstudentList(list);
    setAttendenceData(attendence);
  }, [list]);

  const handleGrade = (grade) => {
    updateGrade(grade);
  };
  const handleStatus = (attendeId) => {
    const newTeacher = studentList.map((data) => {
      if (data.attendeId === attendeId) {
        return {
          ...data,
          name: data.name,
          attendeId: attendeId,
          status: data.status === "Present" ? "Absent" : "Present",
        };
      } else return data;
    });
    setstudentList(newTeacher);
  };

  const handleCilck = async () => {
    if (studentList.length === 0) {
      return;
    }

    const data = {
      student: studentList.map(({ name, ...rest }) => rest),
      attendence: AttendenceData,
    };

    try {
      if (!issent) {
        await sendJSONRequest(`${Backend}/portal/mark/attendence`, data);
        setIsVisible(true);
        updateAttend();
        setIsSent(false);
        setTimeout(() => setIsVisible(false), 3000);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="py-2 px-2 lg:px-4 bg-white shadow-md rounded-lg">
        <div className="flex justify-end items-center gap-2 lg:gap-3 lg:flex-row ">
          {classes.map((className) => (
            <button
              key={className._id}
              type="button"
              onClick={() => handleGrade(className._id)}
              className="motion-preset-shrink py-2 px-3 text-sm lg:py-3 lg:px-6 lg:text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
            >
              {className.label}
            </button>
          ))}
        </div>
        <Attendance
          name="Student Attendance"
          data={studentList}
          onStatusChange={handleStatus}
        />
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            onClick={handleCilck}
            className="motion-preset-shrink  py-3 px-5 text-sm lg:py-3 lg:px-6 lg:text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
          >
            Submit
          </button>
        </div>

        <SuccessPopup
          message="Attendance Marked Successfully"
          visible={isVisible}
        />
      </div>
      <BackBtn link="/teachers" />
    </>
  );
};

export default StudentAttendance;
