import React, { useState, useEffect } from "react";
import { getRequest, sendJSONRequest } from "../../../utility/sendJson";
import { TbXboxX } from "react-icons/tb";
import { FaRegCircleCheck } from "react-icons/fa6";
import { AiFillDelete } from "react-icons/ai";

const Managetest = () => {
  const Backend = import.meta.env.BACKEND_URL;
  const [Data, setData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [selectedTest, setSelectedTest] = useState([]);

  //get test
  const fetchData = async () => {
    try {
      const response = await getRequest(`${Backend}/api/getTests`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching Teacher data:", error);
    }
  };
  useEffect(() => {
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
        const teacherResponse = await getRequest(`${Backend}/api/getclass`);
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

  const handleCheckboxChange = (test) => {
    if (test.status !== "Not Marked") {
      return;
    }
    setSelectedTest((prevSelected) => {
      const exists = prevSelected.some((selected) => selected.id === test._id);

      if (exists) {
        return prevSelected.filter((selected) => selected.id !== test._id);
      } else {
        return [...prevSelected, { id: test._id }];
      }
    });
  };
  const handleRemoveTest = async () => {
    try {
      if (selectedTest.length === 0) {
        alert("Please select at least one Unmarked test to remove.");
      }
      const testIds = selectedTest.map((el) => {
        return el.id;
      });
      await sendJSONRequest(`${Backend}/portal/delete/test`, {
        test_Ids: testIds,
      });
      fetchData();
    } catch (error) {
      console.error("Error in Remove test", error);
    }
  };
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6 flex-col md:flex-row">
        <h2 className="text-2xl font-bold mb-4 text-center">All Tests</h2>
        <button
          onClick={handleRemoveTest}
          className="bg-red-500 text-white px-4 text-2xl py-2 rounded-md shadow-md hover:bg-red-600 transition"
        >
          <AiFillDelete />
        </button>
      </div>
      <div className="overflow-x-auto ">
        <table className="border-separate border-spacing-2 table-auto w-full border border-gray-700 ">
          <thead className="bg-slate-600 text-white">
            <tr>
              <th className="border border-gray-500 px-4 py-2 text-left  font-bold ">
                Select
              </th>
              <th className="border border-gray-500 px-4 py-2 text-left  font-bold ">
                Label
              </th>
              <th className="border border-gray-500 px-4 py-2 text-left  font-bold ">
                Incharge
              </th>
              <th className="border border-gray-500 px-4 py-2 text-left  font-bold ">
                Class
              </th>
              <th className="border border-gray-500 px-4 py-2 text-left  font-bold ">
                Total Marks
              </th>
              <th className="border border-gray-500 px-4 py-2 text-left  font-bold ">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {Data.map((cls, index) => (
              <tr key={index} className="hover:bg-gray-200 font-medium ">
                <td className="px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-blue-500"
                    checked={selectedTest.some(
                      (selected) => selected.id === cls._id
                    )}
                    onChange={() => handleCheckboxChange(cls)}
                  />
                </td>
                <td
                  className={
                    "cursor-pointer border border-gray-300 px-4 py-2 text-left text-gray-800"
                  }
                >
                  {cls.label}
                </td>
                <td
                  className={
                    "cursor-pointer border border-gray-300 px-4 py-2 text-left text-gray-800"
                  }
                >
                  {getInchargeName(cls.teacherId)}
                </td>
                <td
                  className={
                    "cursor-pointer border border-gray-300 px-4 py-2 text-left text-gray-800"
                  }
                >
                  {getClassName(cls.classId)}
                </td>
                <td
                  className={
                    "cursor-pointer border border-gray-300 px-4 py-2 text-left text-gray-800"
                  }
                >
                  {cls.total_marks}
                </td>

                <td
                  className={`cursor-pointer text-2xl border border-gray-300 px-4 py-2 text-left ${
                    cls.status == "Marked" ? "text-green-700 " : "text-red-800"
                  } `}
                >
                  {cls.status == "Marked" ? <FaRegCircleCheck /> : <TbXboxX />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Managetest;
