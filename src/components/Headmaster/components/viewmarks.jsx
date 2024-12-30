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
    <div className="container mx-auto p-3 lg:p-8">
      <BackBtn link="/headmaster/view" />
      <h1 className="text-center text-2xl font-bold mb-4 text-teal-700">
        View Marks
      </h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full overflow-hidden rounded-xl shadow-md border border-gray-300">
          <thead className="bg-teal-500 text-white">
            <tr>
              <th className="px-6 py-3 lg:py-4 text-left text-sm lg:text-lg font-bold uppercase tracking-wide">
                Student Name
              </th>
              <th className="px-6 py-3 lg:py-4 text-left text-sm lg:text-lg font-bold uppercase tracking-wide">
                Marks
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Data &&
              Data.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-teal-50 transition-colors duration-200"
                >
                  <td className="px-6 py-2 text-base text-black font-medium">
                    {getStudentName(item.studentId)}
                  </td>
                  <td className="px-6 py-2 text-base text-black  font-medium">
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
