import React, { useState } from "react";
import { sendJSONRequest } from "../../../utility/sendJson";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Session = () => {
  const [pass, setPass] = useState("");
  const [label, setLabel] = useState("");
  const [error, setError] = useState("");
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const Backend = import.meta.env.VITE_BACKEND_URL;

  const years = Array.from({ length: 5 }, (_, i) => currentYear + i);

  const open = (id) => {
    const element = document.getElementById(id);
    element.style.display = "flex";

    if (id === "Password") close("new");
    if (id === "info") {
      if (!pass.trim()) {
        toast.error("Password is required!",{position:"top-center",
          autoClose:3000});
        close("Password");
        return;
      }
    }
  };

  const close = (id) => {
    const element = document.getElementById(id);
    element.style.display = "none";
    setError("");
  };

  const handleChange = (e) => {
    setPass(e.target.value);
  };

  const handleChangeLabel = (e) => {
    setLabel(e.target.value);
  };

  const sumbit = async () => {
    if (!label.trim()) {
      setError("Session name is required!");
      toast.error("Session name is required!",{position:"top-center",
        autoClose:3000});
      return;
    }
    if (!selectedYear) {
      setError("You must select a year!");
      toast.error("You must select a year!",{position:"top-center",
        autoClose:3000});
      return;
    }

    const sessionDetails = {
      password: pass,
      label,
      year: selectedYear,
    };
    try {
      await sendJSONRequest(`${Backend}/portal/start/session`, sessionDetails);
      close("info");
      toast.success("New session started successfully!",{position:"top-center",
        autoClose:3000});
    } catch (e) {
      console.error(e);
      toast.error("Failed to start the session. Please try again.",{position:"top-center",
        autoClose:3000});
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
          <h2 className="text-3xl font-extrabold text-blue-800 mb-8 text-center">
            Session Management
          </h2>
          <div className="flex flex-col items-center justify-center ">
            <button
              onClick={() => open("new")}
              className="bg-green-500 text-white font-bold py-4 px-8 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
            >
              Start New Session
            </button>
          </div>
        </div>

        {/* Start New Session Modal */}
        <div
          id="new"
          className="hidden fixed inset-0 bg-black bg-opacity-50 items-center justify-center z-50"
        >
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full sm:max-w-md md:max-w-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
              Start New Session
            </h2>
            <div className="bg-red-600 text-white mb-1 text-lg px-2 py-1 rounded-lg shadow-lg inline-block">
              <p>Warnings</p>
            </div>
            <p className="text-sm leading-6">
              <span className="block">1. This action will be irreversible.</span>
              <span className="block">
                2. Starting a new session will trigger an automatic setting of
                the student's status "Graduated" for level 10 students.
              </span>
              <span className="block">
                3. After that, you need to transfer students to new classes
                manually for the new year.
              </span>
              <span className="block">
                4. You will not be able to access the tests from the previous
                session along with the students of level 10.
              </span>
            </p>
            <div className="flex justify-between gap-4 mt-6">
              <button
                onClick={() => close("new")}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg w-full hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => open("Password")}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 transition"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Password Modal */}
        <div
          id="Password"
          className="hidden fixed inset-0 bg-black bg-opacity-50 items-center justify-center z-50"
        >
          <div className="bg-white p-6 rounded-md shadow-lg w-120">
            <h2 className="text-xl font-bold ">Enter Password </h2>
            <p className="text-xs">Provide Password for Confirmation</p>

            <div className="my-3">
              <label htmlFor="pass" className="text-sm mb-1 text-gray-800">
                Password
              </label>
              <input
                type="password"
                id="pass"
                required
                value={pass}
                onChange={handleChange}
                placeholder="Enter Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => close("Password")}
                className="bg-gray-200 px-6 py-2 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={() => open("info")}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>

        {/* Info Modal */}
        <div
          id="info"
          className="hidden fixed inset-0 bg-black bg-opacity-50 items-center justify-center z-50"
        >
          <div className="bg-white p-6 rounded-md shadow-lg w-120">
            <h2 className="text-xl font-bold ">
              Fill the Details for New Session
            </h2>
            {error && (
              <div className="bg-red-100 text-red-800 border border-red-300 p-2 rounded-md text-sm my-3">
                {error}
              </div>
            )}
            <div className="my-3">
              <label htmlFor="label" className="text-sm mb-1 text-gray-800">
                Enter the Name of the New Session
              </label>
              <input
                type="text"
                id="label"
                value={label}
                onChange={handleChangeLabel}
                placeholder="Enter Session Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex flex-col items-start space-y-2 w-full">
              <label
                htmlFor="year-select"
                className="text-sm font-medium text-gray-600"
              >
                Select Year:
              </label>
              <select
                id="year-select"
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-gray-400 transition duration-200"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => close("info")}
                className="bg-gray-200 px-6 py-2 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={sumbit}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Start New Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Session;
