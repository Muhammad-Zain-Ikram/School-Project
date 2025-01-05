import React, { useState,  useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { sendJSONRequest } from "../../../utility/sendJson";
import { AttendenceContext } from "../../../utility/AttendenceContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Addtest = () => {
  const data = useContext(AttendenceContext);
  const [myclass, setMyClass] = useState(data.classes);
  const [formData, setFormData] = useState({
    label: "",
    total_marks: "",
    teacherId: "",
    classId: "",
  });
  const Backend = import.meta.env.VITE_BACKEND_URL;

  const [redirect, setRedirect] = useState(false);
  const [teacherData, setTeacherData] = useState(data.list);
  const getTeacherName = (teacherId) => {
    const teacher = teacherData.find(
      (teacher) => teacher.attendeId === teacherId
    );
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
        `${Backend}/portal/create/test`,
        formData
      );
  
      toast.success("Test created successfully!",{position:"top-center",
        autoClose:3000});
  
      setTimeout(() => setRedirect(true), 3000);
    } catch (error) {
      console.error("Error Creating Test:", error);
  
      toast.error("Error creating test. Please try again.",{position:"top-center",
        autoClose:3000});
    }
  };
  if (redirect) {
    return <Navigate to="/admin/test"></Navigate>;
  }

  const getClassNameById = (id) => {
    const cls = myclass.find((c) => c._id === id);
    return cls ? cls.label : "Unknown";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Add New Test
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="label"
              className="block text-sm font-medium text-gray-700"
            >
              Test Name
            </label>
            <input
              type="text"
              required
              id="label"
              name="label"
              value={formData.label}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="total_marks"
              className="block text-sm font-medium text-gray-700"
            >
              Total Marks
            </label>
            <input
              type="number"
              required
              id="total_marks"
              name="total_marks"
              value={formData.total_marks}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="teacherId"
              className="block text-sm font-medium text-gray-700"
            >
              Teacher
            </label>
            <select
              id="teacherId"
              required
              name="teacherId"
              value={formData.teacherId}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Teacher</option>
              {teacherData.map((option) => (
                <option key={option.attendeId} value={option.attendeId}>
                  {getTeacherName(option.attendeId)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="classId"
              className="block text-sm font-medium text-gray-700"
            >
              Class
            </label>
            <select
              id="classId"
              required
              name="classId"
              value={formData.classId}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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

          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Create Test
            </button>
          </div>
        </form>
        <div className="mt-8 text-center">
          <Link to="/admin/test">
            <button className="py-3 px-6 text-lg font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300">
              Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Addtest;
