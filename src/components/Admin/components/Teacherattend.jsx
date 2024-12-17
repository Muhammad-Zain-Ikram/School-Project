import React, {useState, useContext} from 'react';
import {Attendance} from '../../layoutattendance';
import { sendJSONRequest} from '../../../utility/sendJson';
import {AttendenceContext} from '../../../utility/AttendenceContext';
import { SuccessPopup } from '../../../utility/Popups';

const Teacherattend = React.memo(() =>{
  const [isVisible, setIsVisible] = useState(false);
  const [issent, setIsSent] = useState(true);
  const { list, attendence, updateAttend } = useContext(AttendenceContext);
  const [teacherList,setTeacherList] = useState(list)
  const [AttendenceData,setAttendenceData] = useState(attendence)
  const handleStatus = (attendeId)=>{
    const newTeacher = teacherList.map(data=>{
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
    setTeacherList(newTeacher)
    setIsSent(false)
  }

  const handleCilck = async () => {
    if (teacherList.length === 0) {
      console.log("No Teachers to Mark Attendance");
      return;
    }

    const data = {
      teacher : teacherList.map(({name , ...rest})=> rest),
      attendence : AttendenceData
    }

    try {
      if(!issent){
        await sendJSONRequest(`${process.env.REACT_APP_PORT}/portal/mark/attendence`, data);
        updateAttend()
        setIsVisible(true);
        setIsSent(true);
        setTimeout(() => setIsVisible(false), 3000);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <div className="py-6 px-2 lg:px-4 bg-white shadow-md rounded-lg">
      {list ||list.length !== 0 ? <Attendance name="Teacher Attendance" data={teacherList} onStatusChange={handleStatus}/> : "Loading.."}
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
}); 

export default Teacherattend;
