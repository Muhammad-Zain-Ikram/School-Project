import React, { useState, useEffect } from "react";
import { getRequest, sendJSONRequest } from "../../../utility/sendJson";
import { MdDeleteOutline, MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Manage = () => {
  const Backend = import.meta.env.VITE_BACKEND_URL;
  const [Data, setData] = useState([]);
  const [CTeacher, setCTeacher] = useState("");
  const [newPass, setNewPass] = useState("");
  const [selectedTeachers, setSelectedTeachers] = useState([]);

  const fetchData = async () => {
    try {
      const response = await getRequest(`${Backend}/api/getTeacher`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching Teacher data:", error);
      toast.error("Failed to load teacher data. Please try again.",{position:"top-center",
        autoClose:3000});
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedTeachers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((teacherId) => teacherId !== id)
        : [...prevSelected, id]
    );
  };

  const handleRemoveTeachers = async () => {
    if (selectedTeachers.length === 0) {
      toast.warn("No teachers selected for removal.",{position:"top-center",
        autoClose:3000});
      return;
    }
    try {
      await sendJSONRequest(`${Backend}/portal/delete/user`, {
        id: selectedTeachers,
        delete: "teacher",
      });
      setData((prev) => prev.filter((el) => !selectedTeachers.includes(el._id)));
      setSelectedTeachers([]);
      toast.success("Selected teachers removed successfully.",{position:"top-center",
        autoClose:3000});
    } catch (error) {
      console.error("Error removing teachers:", error);
      toast.error("Failed to remove selected teachers. Please try again.",{position:"top-center",
        autoClose:3000});
    }
  };

  const sumbit = async () => {
    if (!CTeacher || !newPass) {
      toast.warn("Please fill out all fields before submitting.",{position:"top-center",
        autoClose:3000});
      return;
    }

    try {
      await sendJSONRequest(`${Backend}/portal/change/password`, {
        id: CTeacher,
        password: newPass,
      });
      toast.success("Password updated successfully.",{position:"top-center",
        autoClose:3000});
      fetchData();
      setCTeacher("");
      setNewPass("");
      onClose();
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Failed to update password. Please try again.",{position:"top-center",
        autoClose:3000});
    }
  };

  const onClose = () => {
    document.getElementById("changePassword").style.display = "none";
  };

  const open = () => {
    document.getElementById("changePassword").style.display = "flex";
  };

  return (
    <div className="p-4">
      <ToastContainer />
      <div className="flex justify-between items-center md:mx-8 mb-8 flex-col mx-2 md:flex-row">
        <h2 className="text-2xl font-bold">Teachers List</h2>
        <div className="flex justify-center items-center w-full mt-3 md:mt-0 md:w-auto flex-col md:flex-row gap-5">
          <button
            onClick={open}
            className="bg-orange-500 text-2xl text-white px-4 py-2 rounded-md shadow-md hover:bg-orange-600 transition"
          >
            <MdOutlineDriveFileRenameOutline />
          </button>
          <button
            onClick={handleRemoveTeachers}
            className="bg-red-500 text-2xl text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition"
          >
            <MdDeleteOutline />
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="overflow-x-auto w-full max-w-4xl shadow-lg shadow-black">
          <table className="min-w-full table-auto border-collapse rounded-lg overflow-hidden border border-white">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-4 py-2 text-center">Select</th>
                <th className="px-4 py-2 text-center">Name</th>
                <th className="px-4 py-2 text-center">Email</th>
                <th className="px-4 py-2 text-center">Role</th>
              </tr>
            </thead>
            <tbody>
              {Data.map((teacher) => (
                <tr
                  key={teacher._id}
                  className="bg-white hover:bg-blue-100 transition"
                >
                  <td className="px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-blue-500"
                      checked={selectedTeachers.includes(teacher._id)}
                      onChange={() => handleCheckboxChange(teacher._id)}
                    />
                  </td>
                  <td className="px-4 py-2">{teacher.name}</td>
                  <td className="px-4 py-2">{teacher.email}</td>
                  <td className="px-4 py-2">{teacher.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div
        id="changePassword"
        className="hidden fixed inset-0 bg-black bg-opacity-50 items-center justify-center z-50"
      >
        <div className="bg-white p-6 rounded-md shadow-lg w-80">
          <h2 className="text-xl font-bold mb-4">Change Password</h2>
          <div className="my-4">
            <label htmlFor="tId" className="text-sm mb-1 text-gray-800">
              Select Teacher
            </label>
            <select
              value={CTeacher}
              id="tId"
              onChange={(e) => setCTeacher(e.target.value)}
              className="w-full p-2 border border-gray-300 px-2 rounded-lg bg-slate-100"
            >
              <option value="" disabled>
                Select a Teacher
              </option>
              {Data.map((Teacher) => (
                <option key={Teacher._id} value={Teacher._id}>
                  {Teacher.name}
                </option>
              ))}
            </select>
          </div>
          <div className="my-3">
            <label htmlFor="pass" className="text-sm mb-1 text-gray-800">
              New Password
            </label>
            <input
              type="text"
              id="pass"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              placeholder="Enter New Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
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

export default Manage;
