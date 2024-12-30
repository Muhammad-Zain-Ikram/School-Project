import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getRequest } from "../../../utility/sendJson";
import BackBtn from "../../../utility/backbtn";
const View = () => {
  const Backend = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [Data, setData] = useState([]);
  const [classData, setClassData] = useState([]);
  const location = useLocation();
  const [classId, setClassId] = useState(() => {
    return location.state?.classId || localStorage.getItem("selectedClassId");
  });
  useEffect(() => {
    if (classId) {
      localStorage.setItem("selectedClassId", classId);
    }
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

  const getClassName = (cls) => {
    const classname = classData.find((cla) => cla._id === cls);
    return classname ? classname.label : "Unknown";
  };
  const handleRowClick = (classId, testId, TM) => {
    localStorage.setItem("selectedClassId", classId);
    navigate("/headmaster/view-marks", { state: { testId, classId, TM } });
  };

  const brandbefore = Data.filter((test) => test.classId == classId);
  const brand = brandbefore.reverse();
  return (
    <div className="container mx-auto p-2 lg:p-4">
      <BackBtn link="/headmaster/result" />
      <h2 className="text-2xl font-bold mb-4 text-center text-sky-700">
        All Tests
      </h2>
      <div className="overflow-x-auto ">
        <table className="table-auto w-full overflow-hidden rounded-lg shadow-lg border border-gray-200">
          <thead className="bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 text-white">
            <tr>
              <th className="px-4 py-3 text-center font-semibold uppercase tracking-wide text-sm lg:text-lg">
                Label
              </th>
              <th className="px-4 py-3 text-center font-semibold uppercase tracking-wide text-sm  lg:text-lg">
                Class
              </th>
              <th className="px-4 py-3 text-center font-semibold uppercase tracking-wide text-sm lg:text-lg">
                Total Marks
              </th>
            </tr>
          </thead>
          <tbody>
            {brand.every((test) => test.status === "Unmarked") ? (
              <tr>
                <td
                  colSpan={3}
                  className="text-center py-6 text-gray-500 font-medium italic"
                >
                  No tests marked
                </td>
              </tr>
            ) : (
              brand.map(
                (cls, index) =>
                  cls.status === "Marked" && (
                    <tr
                      key={index}
                      onClick={() =>
                        handleRowClick(cls.classId, cls._id, cls.total_marks)
                      }
                      className="hover:bg-blue-100 transition-colors duration-200 border-b border-b-gray-3300"
                    >
                      <td className="px-4 py-2 text-left text-black font-medium text-base lg:text-xl lg:py-3">
                        {cls.label}
                      </td>
                      <td className="px-4 py-2 text-left text-black font-medium text-base lg:text-xl lg:py-3">
                        {getClassName(cls.classId)}
                      </td>
                      <td className="px-4 py-2 text-left text-black font-medium text-base lg:text-xl lg:py-3">
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

export default View;
