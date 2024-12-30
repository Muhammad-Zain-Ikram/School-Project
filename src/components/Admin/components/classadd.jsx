import React, { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { sendJSONRequest } from "../../../utility/sendJson";
import { AttendenceContext } from "../../../utility/AttendenceContext";

const ClassAdd = () => {
  const Backend = import.meta.env.BACKEND_URL;
  const [formData, setFormData] = useState({
    label: "Class",
    level: "",
    inchargeId: "",
  });
  const [redirect, setRedirect] = useState(false);
  const { list, classes, updateGrade } = useContext(AttendenceContext);
  const newList = list.filter((teacher) => {
    return !classes.some((el) => {
      return el.incharge === teacher.attendeId;
    });
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendJSONRequest(`${Backend}/portal/add/class`, formData);
      updateGrade("");
      setRedirect(true);
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
              {newList &&
                newList.map((teacher) => (
                  <option key={teacher.attendeId} value={teacher.attendeId}>
                    {teacher.name}
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
