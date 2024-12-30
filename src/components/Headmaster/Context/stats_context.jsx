import React, { createContext, useState, useEffect } from 'react';
import { getRequest, sendJSONRequest } from '../../../utility/sendJson';

const StatsContext = createContext();

const StatsProvider = ({ children }) => {
    const [stats, setStats] = useState([]);
    const [teacherList, setTeacherList] = useState([]);
    const [teacherAttendence, setTeacherAttendence] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [Date, setDate] = useState("")
    const Backend = import.meta.env.BACKEND_URL;
    const fetchStats = async () => {
        try {
            const response = await getRequest(`${Backend}/api/getStats`);
            const teacherResponse = await getRequest(`${Backend}/api/getTeacher`);
            let teacherAttendenceResponse 
            if(Date === ""){
                teacherAttendenceResponse = await sendJSONRequest(`${Backend}/api/getTodayAttendence`, { type : "Teacher" });
            }
            else{
                teacherAttendenceResponse = await sendJSONRequest(`${Backend}/api/getTodayAttendence`, { type : "Teacher",date : Date });
            }
            setTeacherList(Object.values(teacherResponse.data).flat());
            setTeacherAttendence(Object.values(teacherAttendenceResponse.data).flat());
            setStats(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchStats();
    }, [Date]);

    const changeDate = (newDate)=>{
        setDate(newDate)
    }
    return (
        <StatsContext.Provider value={{ stats, teacherList, teacherAttendence , changeDate }}>
            {!loading?children:"isLoading"}
        </StatsContext.Provider>
    );
};
 
export { StatsContext, StatsProvider };