import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { sendJSONRequest } from "../../../utility/sendJson";
import BackBtn from "../../../utility/backbtn";
const Viewmarks = () => {
  const Backend = import.meta.env.VITE_BACKEND_URL;
  const [Data, setData] = useState([]);
  const [SData, setSData] = useState([]);
  const location = useLocation();
  const { classId, testId } = location.state || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sendJSONRequest(`${Backend}/api/getMarks`, {
          testId,
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching Teacher data:", error);
      }
    };
    fetchData();
  }, [Backend, testId]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sendJSONRequest(`${Backend}/api/getStudents`, {
          classes: classId,
        });
        setSData(response.data);
      } catch (error) {
        console.error("Error fetching Teacher data:", error);
      }
    };
    fetchData();
  }, []);

  const getStudentName = (stdId) => {
    const student = SData.find((std) => std._id === stdId);
    return student ? student.name : "Unknown";
  };

  return (
    <div className="container mx-auto p-8">
      <BackBtn link="/teachers/all-test" />
      <h1 className="text-center text-2xl font-bold mb-4 text-purple-700">
        View Marks
      </h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-700 ">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="border border-gray-500 px-4 py-2 text-left ">
                Student Name
              </th>
              <th className="border border-gray-500 px-4 py-2 text-left">
                Marks
              </th>
            </tr>
          </thead>
          <tbody>
            {Data &&
              Data.map((item, index) => (
                <tr
                  key={index}
                  className={`border-b border-black
                }`}
                >
                  <td
                    className={
                      "cursor-pointer border border-gray-300 px-3 py-2 text-left text-black"
                    }
                  >
                    {getStudentName(item.studentId)}
                  </td>
                  <td
                    className={
                      "cursor-pointer border border-gray-300 px-3 py-2 text-left text-black"
                    }
                  >
                    {item.score}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Viewmarks;
