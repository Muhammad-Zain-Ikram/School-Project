import React from "react";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { sendJSONRequest } from "../../../utility/sendJson";
import { AttendenceContext } from "../../../utility/AttendenceContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Substitution = () => {
  const { list } = useContext(AttendenceContext);
  const present = list.filter((teacher) => teacher.status === "Present");
  const absent = list.filter((teacher) => teacher.status === "Absent");
  const Backend = import.meta.env.VITE_BACKEND_URL;
  const [selectedPresent, setSelectedPresent] = useState("");
  const [selectedAbsent, setSelectedAbsent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      presentId: selectedPresent,
      absentId: selectedAbsent,
    };

    try {
      await sendJSONRequest(`${Backend}/portal/substitute/teacher`, data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-gray-100 to-blue-50 flex items-center justify-center py-12 px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-xl p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Substitute Teacher
        </h3>

        {present && absent ? (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="present"
                className="block text-lg font-medium text-gray-700"
              >
                Present Teachers
              </label>
              <select
                id="present"
                name="present"
                value={selectedPresent}
                onChange={(e) => setSelectedPresent(e.target.value)}
                className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base p-3 bg-white"
              >
                                <option value="">Select Absent Teacher</option>

                {present.map((pre) => (
                  <option key={pre.attendeId} value={pre.attendeId}>
                    {pre.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="absent"
                className="block text-lg font-medium text-gray-700"
              >
                Absent Teachers
              </label>
              <select
                id="absent"
                name="absent"
                value={selectedAbsent}
                onChange={(e) => setSelectedAbsent(e.target.value)}
                className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base p-3 bg-white"
              >
                <option value="">Select Absent Teacher</option>
                {absent.map((abs) => (
                  <option key={abs.attendeId} value={abs.attendeId}>
                    {abs.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-6 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
              >
                Substitute
              </button>
            </div>
          </form>
        ) : (
          "Loading..."
        )}
        <div className="mt-8 text-center">
          <Link to="/admin/teachers">
            <button className="py-3 px-6 text-lg font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300">
              Back to Students
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Substitution;
