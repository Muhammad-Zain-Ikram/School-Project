import React, { useState, useEffect } from "react";
import { IoFilterSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { getRequest, sendJSONRequest } from "../../../utility/sendJson";

const Students = () => {
  const [Data, setData] = useState([]);
  const [myclass, setMyClass] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  // Post data
  const handleRemoveStudents = async () => {
    try {
      if (selectedStudents.length === 0) {
        console.error("No students selected for removal.");
        return;
      }

      const posting = await sendJSONRequest(
        `${process.env.REACT_APP_PORT}/portal/delete/user`,
        {
          id: selectedStudents,
          delete: "student",
        }
      );
      console.log("success: ", posting);
      const response = await sendJSONRequest(
        `${process.env.REACT_APP_PORT}/api/getStudents`
      );
      setData(response.data);

      setSelectedStudents([]);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch class data
  useEffect(() => {
    const fetchClass = async () => {
      try {
        const response = await getRequest(`${process.env.REACT_APP_PORT}/api/getClass`);
        setMyClass(response.data);
      } catch (error) {
        console.error("Error fetching class data:", error);
      }
    };
    fetchClass();
  }, []);

  // Fetch student data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sendJSONRequest(
          `${process.env.REACT_APP_PORT}/api/getStudents`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchData();
  }, []);

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleCheckboxChange = (id) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((studentId) => studentId !== id)
        : [...prevSelected, id]
    );
  };

  const filteredStudents =
    selectedClass === ""
      ? Data
      : Data.filter((student) => student.class[0] === selectedClass);

  const getClassNameById = (id) => {
    const cls = myclass.find((c) => c._id === id);
    return cls ? cls.label : "Unknown";
  };

  return (
    <>
      <div className="flex justify-between items-center md:mx-8 mb-8 flex-col mx-2 md:flex-row">
        <h2 className="text-2xl font-bold">Students List</h2>

        <div className="flex justify-center items-center w-full mt-3 md:mt-0 md:w-auto flex-col md:flex-row gap-5">
          <Link to="add">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Add New Student
            </button>
          </Link>
          <button
            onClick={handleRemoveStudents}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Remove Student
          </button>
        </div>
      </div>

      <div className="relative flex justify-end items-center gap-3 mr-6 my-7 text-lg">
        <IoFilterSharp
          className="text-blue-500 text-2xl cursor-pointer"
          aria-label="Filter icon"
        />
        <div className="relative">
          <select
            value={selectedClass}
            onChange={handleClassChange}
            className="p-3 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out hover:bg-blue-50"
            aria-label="Select Class Filter"
          >
            <option value="">All Classes</option>
            {myclass.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="overflow-x-auto w-full max-w-4xl">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 border-b text-center">Select</th>
                <th className="px-4 py-2 border-b text-center">Name</th>
                <th className="px-4 py-2 border-b text-center">Father Name</th>
                <th className="px-4 py-2 border-b text-center">Phone</th>
                <th className="px-4 py-2 border-b text-center">Class</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr
                  key={student._id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}
                >
                  <td className="px-4 py-2 border-b text-center">
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student._id)}
                      onChange={() => handleCheckboxChange(student._id)}
                    />
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {student.name}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {student.fatherName}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {student.phoneNumber}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {`${getClassNameById(student.class[0])}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Students;
