import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRequest } from "../../../utility/sendJson";
import BackButton from "../../../utility/backbtn";

const Viewtest = () => {
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

  //take class anme
  const getClassName = (cls) => {
    const classname = classData.find((cla) => cla._id === cls);
    return classname ? classname.label : "Unknown";
  };
  const handleRowClick = (classId, testId, TM, status) => {
    if (status === "Marked") {
      alert("This test is already marked.");
      return;
    }
    navigate("/teachers/add-marks", { state: { classId, testId, TM } });
  };
  return (
    <div className="p-4">
      <BackButton link="/teachers" />
      <h2 className="text-2xl font-bold mb-4 text-center text-indigo-700">
        All Tests
      </h2>
      <div className="overflow-x-auto ">
        <table className=" w-full border border-gray-700 ">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="border border-gray-500 px-3 py-2 text-left  ">
                Label
              </th>
              <th className="border border-gray-500 px-3 py-2 text-left  ">
                Class
              </th>
              <th className="border border-gray-500 px-3 py-2 text-left  ">
                Total Marks
              </th>
            </tr>
          </thead>
          <tbody>
            {Data.every((test) => test.status === "Marked") ? (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  No test Available
                </td>
              </tr>
            ) : (
              Data.map(
                (cls, index) =>
                  cls.status == "Not Marked" && (
                    <tr
                      key={index}
                      onClick={() =>
                        handleRowClick(
                          cls.classId,
                          cls._id,
                          cls.total_marks,
                          cls.status
                        )
                      }
                      className=" font-medium "
                    >
                      <td
                        className={
                          "  break-words whitespace-normal cursor-pointer border border-gray-300 px-4 py-2 text-left text-black"
                        }
                      >
                        {cls.label}
                      </td>
                      <td
                        className={
                          " break-words whitespace-normal cursor-pointer border border-gray-300 px-4 py-2 text-left text-black"
                        }
                      >
                        {getClassName(cls.classId)}
                      </td>
                      <td
                        className={
                          " break-words whitespace-normal cursor-pointer border border-gray-300 px-4 py-2 text-left text-black"
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

export default Viewtest;
