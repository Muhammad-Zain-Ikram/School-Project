import React, {useState, useEffect, useMemo,useCallback, createContext} from 'react';
import { sendJSONRequest,getRequest } from '../utility/sendJson';

const AttendenceContext = createContext()

const AttendenceProvider = ({ children,type}) =>{
    const [list,setList] = useState([])
    const [attendence, setAttendence] = useState([])
    const [grade, setGrade] = useState()
    const [classes, setClasses] = useState([])
    const [loading, setLoading] = useState(true)
    const Backend = import.meta.env.VITE_BACKEND_URL;

    const updateGrade = (newGrade) => {
        setGrade(newGrade);
      };
      
    const fetchData =async()=>{
  try {
          if(type === "Teacher"){
              let teacherData = await getRequest(`${Backend}/api/getTeacher`);
              teacherData = Object.values(teacherData.data).flat();
              let attendData = await sendJSONRequest(`${Backend}/api/getTodayAttendence`, {type : type});
              attendData =Object.values(attendData.data).flat()
              processData(teacherData, attendData)
              setLoading(false)
          }
          else if (type === "Student"){
              let studentData = await sendJSONRequest(`${Backend}/api/getStudents`, {classes : grade ? grade : ""});
              studentData = Object.values(studentData.data).flat();
              let attendData = await sendJSONRequest(`${Backend}/api/getTodayAttendence`, {type : type , classes : grade ? grade : ""});
              attendData =Object.values(attendData.data).flat() 
              processData(studentData, attendData)
              let gradeData = await getRequest(`${Backend}/api/getClass`);
              gradeData = Object.values(gradeData.data).flat();
              setClasses(gradeData) 
              setLoading(false)
            }
  } catch (error) {
    console.error("Error:", error);
  }
    }

    const processData = (data,attendenceData)=>{
        console.log("Process Hit!")
        setAttendence(attendenceData)
        console.log("Attendence",attendenceData)
        const newData = data.map((teacher) => {
          const check = attendenceData.some((attendence) => {
            return attendence.attendeId === teacher._id;
          })
            ? "Absent"
            : "Present";

          return {
            name: teacher.name,
            attendeId: teacher._id,
            status: check,
          };
        }, []);
        setList(newData);
    }

    const updateAttend = ()=>{
        fetchData()
    }


    useEffect(() => {
        fetchData()
    }, [grade,type]);
    
    
    
    const Data = useMemo(() => {
        return {
            list,
            attendence,
            updateGrade,
            updateAttend,
            classes
        };
    }, [list, attendence, updateGrade, updateAttend,classes]);
    
    
    return (
        <AttendenceContext.Provider value={Data}>
            {!loading ? children : <div>Loading....</div>}
        </AttendenceContext.Provider>
    )
}

export { AttendenceContext, AttendenceProvider };