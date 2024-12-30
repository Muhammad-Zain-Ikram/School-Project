import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRequest } from "../../../utility/sendJson";
import BackBtn from "../../../utility/backbtn";
const TestResult = () => {
  const Backend = import.meta.env.BACKEND_URL;
  const navigate = useNavigate();
  const [classData, setClassData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teacherResponse = await getRequest(`${Backend}/api/getclass`);
        setClassData(teacherResponse.data);
      } catch (error) {
        console.error("Error fetching class data:", error);
      }
    };
    fetchData();
  }, []);

  const handleRowClick = (classId) => {
    navigate("/headmaster/view", { state: { classId } });
  };

  return (
    <div className="container p-8 mx-auto">
      <BackBtn link="/headmaster" />
      <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">
        All Class
      </h2>
      <div className="overflow-x-auto ">
        <table className="w-full border-collapse overflow-hidden rounded-lg shadow-lg">
          <thead className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
            <tr>
              <th className="px-6 py-4 text-center font-semibold text-lg">
                Class
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {classData.map((cls) => (
              <tr
                key={cls._id}
                onClick={() => handleRowClick(cls._id)}
                className="cursor-pointer hover:bg-gradient-to-r hover:from-indigo-100 hover:via-purple-100 hover:to-pink-100 transition duration-200"
              >
                <td className="px-6 py-4 text-left text-black font-medium break-words whitespace-normal text-xl">
                  {cls.label}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestResult;
