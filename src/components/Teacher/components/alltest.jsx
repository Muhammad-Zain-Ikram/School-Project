import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRequest } from "../../../utility/sendJson";
import BackBtn from "../../../utility/backbtn";
const Alltest = () => {
  const Backend = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [Data, setData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [classData, setClassData] = useState([]);

  //get test
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRequest(`${Backend}/api/getTests`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching Teacher data:", error);
      }
    };
    fetchData();
  }, []);

  //get teacher
  useEffect(() => {
    const fetchData = async () => {
      try {
        const teacherResponse = await getRequest(`${Backend}/api/getTeacher`);
        setTeacherData(teacherResponse.data);
      } catch (error) {
        console.error("Error fetching class data:", error);
      }
    };
    fetchData();
  }, []);

  //get class
  useEffect(() => {
    const fetchData = async () => {
      try {
        const teacherResponse = await getRequest(
          `${Backend}/api/getclass?type=test`
        );
        setClassData(teacherResponse.data);
      } catch (error) {
        console.error("Error fetching class data:", error);
      }
    };
    fetchData();
  }, []);

  // take teacher name
  const getInchargeName = (inchargeId) => {
    const teacher = teacherData.find((teacher) => teacher._id === inchargeId);
    return teacher ? teacher.name : "Unknown";
  };

  //take class anme
  const getClassName = (cls) => {
    const classname = classData.find((cla) => cla._id === cls);
    return classname ? classname.label : "Unknown";
  };
  const handleRowClick = (classId, testId, TM) => {
    navigate("/teachers/view-marks", { state: { testId, classId, TM } });
  };
  return (
    <div className="p-4">
      <BackBtn link="/teachers" />
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
        All Tests
      </h2>
      <div className="overflow-x-auto ">
        <table className="w-full border border-gray-700 ">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="border border-gray-500 px-2 py-2 text-center ">
                Label
              </th>
              <th className="border border-gray-500 px-2 py-2 text-center ">
                Class
              </th>
              <th className="border border-gray-500 px-2 py-2 text-center ">
                Total Marks
              </th>
            </tr>
          </thead>
          <tbody>
            {Data.every((test) => test.status == "Unmarked") ? (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">
                  No test Markd
                </td>
              </tr>
            ) : (
              Data.map(
                (cls, index) =>
                  cls.status == "Marked" && (
                    <tr
                      key={index}
                      onClick={() =>
                        handleRowClick(cls.classId, cls._id, cls.total_marks)
                      }
                      className=" font-medium "
                    >
                      <td
                        className={
                          "break-words whitespace-normal cursor-pointer border border-gray-300 px-2 py-2 text-left text-black"
                        }
                      >
                        {cls.label}
                      </td>
                      <td
                        className={
                          "break-words whitespace-normal cursor-pointer border border-gray-300 px-2 py-2 text-left text-black"
                        }
                      >
                        {getClassName(cls.classId)}
                      </td>
                      <td
                        className={
                          "break-words whitespace-normal cursor-pointer border border-gray-300 px-2 py-2 text-left text-black"
                        }
                      >
                        {cls.total_marks}
                      </td>
                    </tr>
                  )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Alltest;
