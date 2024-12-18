import React, { createContext, useState, useEffect } from 'react';
import { getRequest, sendJSONRequest } from '../../../utility/sendJson';

const StatsContext = createContext();

const StatsProvider = ({ children }) => {
    const [stats, setStats] = useState([]);
    const [teacherList, setTeacherList] = useState([]);
    const [teacherAttendence, setTeacherAttendence] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await getRequest(`${process.env.REACT_APP_BACKEND_URL}/api/getStats`);
                console.log(response.data);
                const teacherResponse = await getRequest(`${process.env.REACT_APP_BACKEND_URL}/api/getTeacher`);
                const teacherAttendenceResponse = await sendJSONRequest(`${process.env.REACT_APP_BACKEND_URL}/api/getTodayAttendence`, { type : "Teacher" });
                setTeacherList(Object.values(teacherResponse.data).flat());
                setTeacherAttendence(Object.values(teacherAttendenceResponse.data).flat());
                setStats(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);
    
    return (
        <StatsContext.Provider value={{ stats, teacherList, teacherAttendence }}>
            {!loading?children:"isLoading"}
        </StatsContext.Provider>
    );
};
 
export { StatsContext, StatsProvider };