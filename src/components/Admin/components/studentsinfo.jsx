import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { sendJSONRequest, getRequest } from "../../../utility/sendJson"; // Assuming this function handles POST requests.

const StudentsInfo = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [redirect, setRedirect] = useState(false);
  const Backend = import.meta.env.VITE_BACKEND_URL;
  // Fetch classes from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRequest(`${Backend}/api/getClass`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching class data:", error);
      }
    };

    fetchData();
  }, []);
  const studentData = {
    name,
    fatherName,
    phoneNumber,
    classId: selectedClass,
    add: "student",
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      await sendJSONRequest(
        `${Backend}/portal/add/user`,
        studentData
      );
      setRedirect(true);
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };
  if (redirect) {
    return <Navigate to="/admin/students"></Navigate>;
  }
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-gray-100 to-blue-50 flex items-center justify-center py-12 px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-xl p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Add New Student
        </h3>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Student Name */}
          <div>
            <label
              htmlFor="student-name"
              className="block text-lg font-medium text-gray-700"
            >
              Student Name
            </label>
            <input
              type="text"
              id="student-name"
              name="student-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base p-3"
              placeholder="Enter the student's full name"
            />
          </div>

          <div>
            <label
              htmlFor="fatherName"
              className="block text-lg font-medium text-gray-700"
            >
              Father Name
            </label>
            <input
              type="text"
              id="fatherName"
              name="fatherName"
              value={fatherName}
              onChange={(e) => setFatherName(e.target.value)}
              className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base p-3"
              placeholder="Enter the Father name"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-lg font-medium text-gray-700"
            >
              Phone Number
            </label>
            <div className="relative mt-2">
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base p-3"
                placeholder="Enter a valid phone number"
              />
            </div>
          </div>

          {/* Email */}

          {/* Class Selection */}
          <div>
            <label
              htmlFor="class"
              className="block text-lg font-medium text-gray-700"
            >
              Choose a Class
            </label>
            <select
              id="class"
              name="class"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base p-3 bg-white"
            >
              <option value="">Select a class</option>
              {data.map((grade) => {
                if (grade.status === "Active")
                  return (
                    <option key={grade._id} value={grade._id}>
                      {grade.label}
                    </option>
                  );
              })}
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-6 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <Link to="/admin/students">
            <button className="py-3 px-6 text-lg font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300">
              Back to Students
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentsInfo;
