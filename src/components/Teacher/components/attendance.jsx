import React, {useState ,useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {Attendance} from '../../layoutattendance';
import { sendJSONRequest,getRequest } from '../../../utility/sendJson';
import {AttendenceContext} from '../../../utility/AttendenceContext';
import { IoMdArrowRoundBack } from "react-icons/io";
import { SuccessPopup } from '../../../utility/Popups';

const StudentAttendance = () => {

  const [isVisible, setIsVisible] = useState(false);
  const [issent, setIsSent] = useState(false);
  const { list, attendence, updateGrade, updateAttend , classes   } = useContext(AttendenceContext);
  const [studentList,setstudentList] = useState(list)
  const [AttendenceData,setAttendenceData] = useState(attendence)
  console.log(list)
  useEffect(() => {
    setstudentList(list);
    setAttendenceData(attendence);
  }, [list]);

  const handleGrade = (grade) => {
    updateGrade(grade);

  }
  const handleStatus = (attendeId)=>{
    const newTeacher = studentList.map(data=>{
      if (data.attendeId === attendeId) {
          return {...data,
          name : data.name,
          attendeId : attendeId , 
          status : data.status === "Present" ? "Absent" : "Present"
        }  
      }
      else
      return data
    })
    setstudentList(newTeacher)
  }

  const handleCilck = async () => {
    if (studentList.length === 0) {
      console.log("No Student to Mark Attendance");
      return;
    }

    const data = {
      student : studentList.map(({name , ...rest})=> rest),
      attendence : AttendenceData
    }

    try {
      console.log(issent)
      if(!issent){
      await sendJSONRequest(`${process.env.REACT_APP_PORT}/portal/mark/attendence`, data);
      setIsVisible(true);
      updateAttend()
      setIsSent(false);
      setTimeout(() => setIsVisible(false), 3000);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  


  return (
<div className="py-6 px-2 lg:px-4 bg-white shadow-md rounded-lg">

        
        <div className=' absolute top-3 pl-2 text-2xl inline-block'>
        <div className="bg-blue-600 w-[100%] px-2 rounded-full py-2">
        <Link to="/teachers" className="text-white">
        <IoMdArrowRoundBack/>
        </Link>
        </div>
        </div>
        <div className="flex justify-end items-center gap-4 lg:flex-row flex-col">
        {classes.map((className) => (
          <button
            key={className._id}
            type="button"
            onClick={() => handleGrade(className._id)}
            className="motion-preset-shrink py-3 px-6 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
          >
            {className.label}
          </button>
        ))}
        </div>
        {list ||list.length !== 0 ? <Attendance name="Teacher Attendance" data={studentList} onStatusChange={handleStatus}/> : "Loading.."}
      <div className="flex justify-end mt-6">
        <button
          type="submit"
          onClick={handleCilck}
          className="motion-preset-shrink  py-3 px-6 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
        >
          Submit
        </button>
      </div>
      <SuccessPopup message="Attendance Marked Successfully" visible={isVisible} />

    </div>
  );
};

export default StudentAttendance;
