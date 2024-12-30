import React, { useState,  useContext } from "react";
import { sendJSONRequest } from "../../../utility/sendJson";
import { AttendenceContext } from "../../../utility/AttendenceContext";
import { TfiReload } from "react-icons/tfi";
import { MdOutlinePowerSettingsNew } from "react-icons/md";
import { GoPin } from "react-icons/go";
const View = () => {
  const { classes, updateGrade } = useContext(AttendenceContext);
  const data = classes;
  const [activeGrade, setActiveGrade] = useState("");
  const [Incharge, setIncharge] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [toClassId, setToClassId] = useState("");
  const [Teacher, setTeacher] = useState("");
  const Backend = import.meta.env.VITE_BACKEND_URL;
  const { list } = useContext(AttendenceContext);

  data.sort((a, b) => a.level - b.level);

  const getInchargeName = (inchargeId) => {
    const teacher = list.find((teacher) => teacher.attendeId === inchargeId);
    return teacher ? teacher.name : "Unknown";
  };
  const onSelect = (value) => {
    setToClassId(value);
  };
  const onSelectT = (value) => {
    setTeacher(value);
  };
  const onSelectS = (value) => {
    setSelectedClass(value);
  };
  const onSelectActive = (value) => {
    setIncharge(value);
  };
  const onSelectActiveS = (value) => {
    setActiveGrade(value);
  };
  const onClose = () => {
    document.getElementById("level").style.display = "none";
  };
  const open = () => {
    document.getElementById("level").style.display = "flex";
  };
  const onCloseS = () => {
    document.getElementById("level1").style.display = "none";
  };
  const openS = () => {
    document.getElementById("level1").style.display = "flex";
  };
  const onCloseActive = () => {
    document.getElementById("Active").style.display = "none";
  };
  const openActive = () => {
    document.getElementById("Active").style.display = "flex";
  };

  const sumbit = async () => {
    try {
      if (Teacher == "" || toClassId == "") {
        alert("Please select at least Fill All detail.");
      }

      await sendJSONRequest(`${Backend}/portal/change/incharge`, {
        incharge: Teacher,
        tograde: toClassId,
      });
      updateGrade("");
    } catch (error) {
      console.error("Error Transferring students:", error);
    }
    onClose();
  };

  const Active = async () => {
    try {
      if (Incharge == "" || activeGrade == "") {
        alert("Please select at least Fill All detail.");
      }

      await sendJSONRequest(`${Backend}/portal/reactivate/class`, {
        gradeid: activeGrade,
        inchargeId: Incharge,
      });
      updateGrade("");
    } catch (error) {
      console.error("Error Transferring students:", error);
    }
    onCloseActive();
  };
  const sumbitS = async () => {
    try {
      if (selectedClass.length === 0) {
        alert("Please select at least one class to remove.");
      }

      await sendJSONRequest(`${Backend}/portal/delete/class`, {
        gradeid: selectedClass,
      });
      updateGrade("");
    } catch (error) {
      console.error("Error in Remove Class", error);
    }
    onCloseS();
  };

  return (
    <>
      <div className="p-4 ">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">Manage Classes</h2>
          <div className="flex justify-end items-center gap-4">
            <button
              onClick={openActive}
              className="bg-green-500 rounded-lg flex  items-center gap-2 py-2 px-3"
            >
              <span className="text-2xl text-white ">
                <GoPin />
              </span>
            </button>
            <button
              onClick={openS}
              className="bg-red-500 rounded-lg flex  items-center gap-2 py-2 px-3"
            >
              <span className="text-2xl text-white ">
                <MdOutlinePowerSettingsNew />
              </span>
            </button>
            <button
              onClick={open}
              className="bg-orange-500 rounded-lg flex items-center gap-2 py-2 px-3"
            >
              <span className="text-2xl text-white ">
                <TfiReload />
              </span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto pb-2 rounded-lg shadow-lg bg-white">
          <table className="table-auto w-full border-collapse rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-slate-800 to-slate-700">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-white text-sm uppercase tracking-wider">
                  Label
                </th>
                <th className="px-6 py-4 text-left font-semibold text-white text-sm uppercase tracking-wider">
                  Incharge
                </th>
                <th className="px-6 py-4 text-left font-semibold text-white text-sm uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {data.map((cls) => (
                <tr
                  key={cls._id}
                  className="hover:bg-slate-50 transition-all duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                    {cls.label}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                    {getInchargeName(cls.incharge)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-3 py-1 rounded-full font-medium
                    ${
                      cls.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                    >
                      {cls.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          id="level"
          className="hidden fixed inset-0 bg-black bg-opacity-50 items-center justify-center z-50"
        >
          <div className="bg-white p-6 rounded-md shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4">Change Incharge</h2>
            <div className="my-3">
              <label htmlFor="f" className="mt-2 text-sm  text-gray-800">
                Select Grade
              </label>
              <select
                value={toClassId}
                id="f"
                onChange={(e) => onSelect(e.target.value)}
                className="w-full p-2 border border-gray-300 px-2 rounded-lg bg-slate-100"
              >
                <option value="" disabled>
                  Select an Grade
                </option>
                {data.map((cls) => {
                  if (cls.status === "Active")
                    return (
                      <option
                        key={cls._id}
                        value={cls._id}
                        className=" rounded-xl mx-4 hover:bg-transparent bg-slate-100 "
                      >
                        {cls.label}
                      </option>
                    );
                })}
              </select>
            </div>
            <div className="my-4">
              <label htmlFor="f" className=" text-sm mb-1 text-gray-800">
                Select Teacher
              </label>
              <select
                value={Teacher}
                id="f"
                onChange={(e) => onSelectT(e.target.value)}
                className="w-full p-2 border border-gray-300 px-2 rounded-lg bg-slate-100"
              >
                <option value="" disabled>
                  Select a Teacher
                </option>
                {list.map((cls) => {
                  if (!data.some((el) => el.incharge === cls.attendeId))
                    return (
                      <option
                        key={cls.attendeId}
                        value={cls.attendeId}
                        className=" rounded-xl mx-4 hover:bg-transparent bg-slate-100 "
                      >
                        {cls.name}
                      </option>
                    );
                })}
              </select>
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

        <div
          id="Active"
          className="hidden fixed inset-0 bg-black bg-opacity-50 items-center justify-center z-50"
        >
          <div className="bg-white p-6 rounded-md shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4">Activate Class</h2>
            <div className="my-3">
              <label htmlFor="active" className="mt-2 text-sm  text-gray-800">
                Select Grade
              </label>
              <select
                value={activeGrade}
                id="active"
                onChange={(e) => onSelectActiveS(e.target.value)}
                className="w-full p-2 border border-gray-300 px-2 rounded-lg bg-slate-100"
              >
                <option value="" disabled>
                  Select an Grade
                </option>
                {data.map((cls) => {
                  if (cls.status === "Inactive")
                    return (
                      <option
                        key={cls._id}
                        value={cls._id}
                        className=" rounded-xl mx-4 hover:bg-transparent bg-slate-100 "
                      >
                        {cls.label}
                      </option>
                    );
                })}
              </select>
            </div>
            <div className="my-4">
              <label htmlFor="inch" className=" text-sm mb-1 text-gray-800">
                Select Incharge
              </label>
              <select
                value={Incharge}
                id="inch"
                onChange={(e) => onSelectActive(e.target.value)}
                className="w-full p-2 border border-gray-300 px-2 rounded-lg bg-slate-100"
              >
                <option value="" disabled>
                  Select a Incharge
                </option>
                {list.map((cls) => {
                  if (!data.some((el) => el.incharge === cls.attendeId))
                    return (
                      <option
                        key={cls.attendeId}
                        value={cls.attendeId}
                        className=" rounded-xl mx-4 hover:bg-transparent bg-slate-100 "
                      >
                        {cls.name}
                      </option>
                    );
                })}
              </select>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={onCloseActive}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={Active}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>

        <div
          id="level1"
          className="hidden fixed inset-0 bg-black bg-opacity-50 items-center justify-center z-50"
        >
          <div className="bg-white p-6 rounded-md shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4">Remove Class</h2>
            <div className="my-3">
              <label htmlFor="R" className="mt-2 text-sm  text-gray-800">
                Select Grade
              </label>
              <select
                value={selectedClass}
                id="R"
                onChange={(e) => onSelectS(e.target.value)}
                className="w-full p-2 border border-gray-300 px-2 rounded-lg bg-slate-100"
              >
                <option value="" disabled>
                  Select an Grade
                </option>
                {data.map((cls) => {
                  if (cls.status === "Active")
                    return (
                      <option
                        key={cls._id}
                        value={cls._id}
                        className=" rounded-xl mx-4 hover:bg-transparent bg-slate-100 "
                      >
                        {cls.label}
                      </option>
                    );
                })}
              </select>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={onCloseS}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={sumbitS}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default View;
