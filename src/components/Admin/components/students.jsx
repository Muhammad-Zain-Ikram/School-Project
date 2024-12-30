import React, { useState, useEffect } from "react";
import { IoFilterSharp } from "react-icons/io5";
import { getRequest, sendJSONRequest } from "../../../utility/sendJson";
import { MdDelete } from "react-icons/md";
import { TbArrowsExchange } from "react-icons/tb";

const Students = () => {
  const [Data, setData] = useState([]);
  const [myclass, setMyClass] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const Backend = import.meta.env.VITE_BACKEND_URL;
  const [toClassId, setToClassId] = useState("");

  const onSelect = (value) => {
    setToClassId(value);
  };

  const onClose = () => {
    document.getElementById("level").style.display = "none";
  };
  const open = () => {
    document.getElementById("level").style.display = "flex";
  };
  const sumbit = async () => {
    try {
      if (selectedStudents.length === 0 || toClassId == "") {
        alert("Please select at least one student to Transfer");
        return;
      } else {
        const transferData = selectedStudents.map((student) => student.id);

        await sendJSONRequest(`${Backend}/portal/transfer/students`, {
          studentsId: transferData,
          toClassId, // target class ID
        });

        const response = await sendJSONRequest(`${Backend}/api/getStudents`);
        setData(response.data);
        setSelectedStudents([]);
        onClose();
      }
    } catch (error) {
      console.error("Error Transferring students:", error);
    }
  };
  // Remove Students
  const handleRemoveStudents = async () => {
    try {
      if (selectedStudents.length === 0) {
        alert("Please select at least one student to remove.");
        return;
      }

      const studentIds = selectedStudents.map((student) => student.id);

      await sendJSONRequest(`${Backend}/portal/delete/user`, {
        id: studentIds,
        delete: "student",
      });

      const response = await sendJSONRequest(`${Backend}/api/getStudents`);
      setData(response.data);
      setSelectedStudents([]);
    } catch (error) {
      console.error("Error removing students:", error);
    }
  };

  // Fetch class data
  useEffect(() => {
    const fetchClass = async () => {
      try {
        const response = await getRequest(`${Backend}/api/getClass`);
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
        const response = await sendJSONRequest(`${Backend}/api/getStudents`);
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

  const handleCheckboxChange = (student) => {
    setSelectedStudents((prevSelected) => {
      const exists = prevSelected.some(
        (selected) => selected.id === student._id
      );

      if (exists) {
        return prevSelected.filter((selected) => selected.id !== student._id);
      } else {
        return [...prevSelected, { id: student._id, class: student.class[0] }];
      }
    });
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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6 flex-col md:flex-row">
        <h2 className="text-3xl font-bold">Students List</h2>

        <div className="flex items-center gap-4">
          <button
            onClick={open}
            className="bg-green-600 text-white px-4 text-2xl py-2 rounded-md shadow-md hover:bg-green-700 transition"
          >
            <TbArrowsExchange />
          </button>
          <button
            onClick={handleRemoveStudents}
            className="bg-red-500 text-white px-4 text-2xl py-2 rounded-md shadow-md hover:bg-red-600 transition"
          >
            <MdDelete />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 mb-6">
        <IoFilterSharp
          className="text-blue-500 text-2xl"
          aria-label="Filter icon"
        />
        <select
          value={selectedClass}
          onChange={handleClassChange}
          className="p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          aria-label="Select Class Filter"
        >
          <option value="">All Classes</option>
          {myclass.map((cls) => {
            if (cls.status === "Active")
              return (
                <option key={cls._id} value={cls._id}>
                  {cls.label}
                </option>
              );
          })}
        </select>
      </div>

      {filteredStudents.length === 0 ? (
        <p className="text-center text-gray-500">
          No students found for the selected class.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-4 py-2 text-center">Select</th>
                <th className="px-4 py-2 text-center">Name</th>
                <th className="px-4 py-2 text-center">Father Name</th>
                <th className="px-4 py-2 text-center">Phone</th>
                <th className="px-4 py-2 text-center">Class</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr
                  key={student._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-blue-100 transition`}
                >
                  <td className="px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-blue-500"
                      checked={selectedStudents.some(
                        (selected) => selected.id === student._id
                      )}
                      onChange={() => handleCheckboxChange(student)}
                    />
                  </td>
                  <td className="px-4 py-2 text-center">{student.name}</td>
                  <td className="px-4 py-2 text-center">
                    {student.fatherName}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {student.phoneNumber}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {getClassNameById(student.class[0])}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div
        id="level"
        className="hidden fixed inset-0 bg-black bg-opacity-50 items-center justify-center z-50"
      >
        <div className="bg-white p-6 rounded-md shadow-lg w-80">
          <h2 className="text-xl font-bold mb-4">Select a Class</h2>

          {/* Dropdown Menu */}
          <select
            value={toClassId}
            onChange={(e) => onSelect(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            <option value="" disabled>
              Select an option
            </option>
            {myclass.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.label}
              </option>
            ))}
          </select>

          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={onClose}
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              onClick={sumbit}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
