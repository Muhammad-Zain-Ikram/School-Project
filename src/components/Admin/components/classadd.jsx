import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { sendJSONRequest, getRequest } from "../../../utility/sendJson";
const ClassAdd = () => {
  const [formData, setFormData] = useState({
    label: "Class",
    level: "",
    inchargeId: "",
    next_class:""
  });
  const [redirect, setRedirect] = useState(false);
  const [teacherData, setTeacherData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teacherResponse = await getRequest(
          `${process.env.REACT_APP_PORT}/api/getTeacher`
        );
        setTeacherData(teacherResponse.data);
      } catch (error) {
        console.error("Error fetching class data:", error);
      }
    };

    fetchData();
  }, []);

  const getInchargeName = (inchargeId) => {
    const teacher = teacherData.find((teacher) => teacher._id === inchargeId);
    return teacher ? teacher.name : "Unknown";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await sendJSONRequest(
        `${process.env.REACT_APP_PORT}/portal/add/class`,
        formData
      );
      setRedirect(true);
      console.log("Student added successfully:", response);
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };
  if (redirect) {
    return <Navigate to="/admin/class"></Navigate>;
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Add Class
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="label"
              className="block text-sm font-medium text-gray-700"
            >
              Class Label
            </label>
            <input
              type="text"
              required
              id="label"
              name="label"
              value={formData.label}
              onChange={handleChange}
              placeholder="e.g., 10 A"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="level"
              className="block text-sm font-medium text-gray-700"
            >
              Class Level
            </label>
            <input
              type="number"
              required
              id="level"
              name="level"
              value={formData.level}
              onChange={handleChange}
              placeholder="e.g., 10"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="inchargeId"
              className="block text-sm font-medium text-gray-700"
            >
              Incharge
            </label>
            <select
              id="inchargeId"
              required
              name="inchargeId"
              value={formData.inchargeId}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Incharge</option>
              {teacherData.map((option) => (
                <option key={option._id} value={option._id}>
                  {getInchargeName(option._id)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </form>
        <div className="mt-8 text-center">
          <Link to="/admin/class">
            <button className="py-3 px-6 text-lg font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300">
              Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClassAdd;
