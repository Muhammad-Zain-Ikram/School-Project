import { sendJSONRequest } from "../../../utility/sendJson";
import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { ErrorPopup, SuccessPopup } from "../../../utility/Popups";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTeacher = () => {
  const roles = ["Admin", "Teacher", "Principal"];
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(roles[1]);
  const [redirect, setRedirect] = useState(false);
  const Backend = import.meta.env.VITE_BACKEND_URL;
  function validatePassword(password) {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!validatePassword(password)) {
      toast.error(
        "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, and one number.",
        {position:"top-center",
          autoClose:3000}
      );
      return;
    }
  
    const formData = {
      name,
      email,
      password,
      role,
      add: "teacher",
    };
  
    try {
      await sendJSONRequest(`${Backend}/portal/add/user`, formData);
      toast.success("Teacher added successfully!",{position:"top-center",
        autoClose:3000});
      setTimeout(() => {
        setRedirect(true);
      }, 3000);
    } catch (error) {
      toast.error("Something went wrong while adding the teacher.",{position:"top-center",
        autoClose:3000});
      console.error("Error adding teacher:", error);
    }
  };

  if (redirect) {
    return <Navigate to="/admin/teachers"></Navigate>;
  }
  return (
    <div>
      <ToastContainer />
      <div className="min-h-screen bg-gradient-to-r from-blue-50 via-gray-100 to-blue-50 flex items-center justify-center py-12 px-6 lg:px-8">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Add New Teacher
          </h3>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Teacher Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-lg font-medium text-gray-700"
              >
                Teacher Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base p-3"
                placeholder="Enter the teacher's full name"
                value={name}
                onChange={(e) => setname(e.target.value)} // Update state
              />
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="relative mt-2">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base p-3"
                  placeholder="Enter Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update state
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-lg font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative mt-2">
                <input
                  type="text"
                  id="password"
                  name="password"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base p-3"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update state
                />
              </div>
            </div>

            {/* Choose a Role */}
            <div>
              <label
                htmlFor="role"
                className="block text-lg font-medium text-gray-700"
              >
                Choose a Role
              </label>
              <select
                id="role"
                name="role"
                className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base p-3 bg-white"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                {roles.map((role, index) => (
                  <option key={index} value={role}>
                    {role}
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
                Add Teacher
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <Link to="/admin/teachers">
              <button className="py-3 px-6 text-lg font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300">
                Back to Teachers
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTeacher;
