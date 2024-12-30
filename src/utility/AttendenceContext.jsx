import React, { useState, useEffect, useMemo, createContext } from "react";
import { sendJSONRequest, getRequest } from "../utility/sendJson";

const AttendenceContext = createContext();

const AttendenceProvider = ({ children, type }) => {
  const [list, setList] = useState([]);
  const [attendence, setAttendence] = useState([]);
  const [grade, setGrade] = useState();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState("");
  const Backend = import.meta.env.VITE_BACKEND_URL;

  const updateGrade = (newGrade) => {
    setGrade(newGrade);
  };

  const updateDate = (newDate) => {
    if (newDate === "") setDate("");
    else {
      const newdate = new Date(newDate);
      newdate.setUTCHours(0, 0, 0, 0);
      const ISODate = newdate.toISOString();
      setDate(ISODate);
    }
  };
  const fetchData = async () => {
    try {
      let gradeDataResponse = await getRequest(`${Backend}/api/getClass`);
      let gradeData = Object.values(gradeDataResponse.data).flat();
      setClasses(gradeData);
      if (type === "Teacher") {
        let teacherData = await getRequest(`${Backend}/api/getTeacher`);
        teacherData = Object.values(teacherData.data).flat();
        let attendData = await sendJSONRequest(
          `${Backend}/api/getTodayAttendence`,
          { type: type }
        );
        attendData = Object.values(attendData.data).flat();
        processData(teacherData, attendData);
        setLoading(false);
      } else if (type === "Student") {
        try {
          let studentDataResponse;
          try {
            studentDataResponse = await sendJSONRequest(
              `${Backend}/api/getStudents`,
              { classes: grade ? grade : "" }
            );
          } catch (error) {
            if (error.status !== 403) {
              throw error;
            }
          }
          let studentData = studentDataResponse
            ? Object.values(studentDataResponse.data).flat()
            : studentDataResponse;
          console.log("Student Data :", studentData)
          let attendDataResponse;

          if (date === "")
            attendDataResponse = await sendJSONRequest(
              `${Backend}/api/getTodayAttendence`,
              { type: "Student", classes: grade ? grade : "" }
            );
          else {
            attendDataResponse = await sendJSONRequest(
              `${Backend}/api/getTodayAttendence`,
              { type: "Student", classes: grade ? grade : "", date: date }
            );
          }
          let attendData;
          if (attendDataResponse.data)
            attendData = Object.values(attendDataResponse.data).flat();
          console.log("attendence :", attendDataResponse)
          processData(studentData, attendData);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const processData = (data, attendenceData) => {
    setAttendence(attendenceData);
    if (!data) setList(data);
    else {
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
  };

  const updateAttend = async () => {
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [grade, type, date]);

  const Data = useMemo(() => {
    return {
      list,
      attendence,
      updateGrade,
      updateAttend,
      classes,
      updateDate,
    };
  }, [list, attendence, updateGrade, updateAttend, updateDate, classes]);

  console.log(Data)
  return (
    <AttendenceContext.Provider value={Data}>
      {!loading ? children : <div>Loading....</div>}
    </AttendenceContext.Provider>
  );
};

export { AttendenceContext, AttendenceProvider };
