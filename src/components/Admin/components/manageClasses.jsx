import React, { useState, useContext } from "react";
import { sendJSONRequest } from "../../../utility/sendJson";
import { AttendenceContext } from "../../../utility/AttendenceContext";
import { TfiReload } from "react-icons/tfi";
import { MdOutlinePowerSettingsNew } from "react-icons/md";
import { GoPin } from "react-icons/go";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const onSelect = (value) => setToClassId(value);
  const onSelectT = (value) => setTeacher(value);
  const onSelectS = (value) => setSelectedClass(value);
  const onSelectActive = (value) => setIncharge(value);
  const onSelectActiveS = (value) => setActiveGrade(value);

  const onClose = () => (document.getElementById("level").style.display = "none");
  const open = () => (document.getElementById("level").style.display = "flex");
  const onCloseS = () => (document.getElementById("level1").style.display = "none");
  const openS = () => (document.getElementById("level1").style.display = "flex");
  const onCloseActive = () => (document.getElementById("Active").style.display = "none");
  const openActive = () => (document.getElementById("Active").style.display = "flex");

  const sumbit = async () => {
    try {
      if (!Teacher || !toClassId) {
        toast.warning("Please fill in all details.",{position:"top-center",
          autoClose:3000});
        return;
      }

      await sendJSONRequest(`${Backend}/portal/change/incharge`, {
        incharge: Teacher,
        tograde: toClassId,
      });
      toast.success("Incharge changed successfully!",{position:"top-center",
        autoClose:3000});
      updateGrade("");
    } catch (error) {
      toast.error("Error transferring students. Please try again.",{position:"top-center",
        autoClose:3000});
      console.error("Error:", error);
    }
    onClose();
  };

  const Active = async () => {
    try {
      if (!Incharge || !activeGrade) {
        toast.warning("Please fill in all details.",{position:"top-center",
          autoClose:3000});
        return;
      }

      await sendJSONRequest(`${Backend}/portal/reactivate/class`, {
        gradeid: activeGrade,
        inchargeId: Incharge,
      });
      toast.success("Class activated successfully!",{position:"top-center",
        autoClose:3000});
      updateGrade("");
    } catch (error) {
      toast.error("Error activating class. Please try again.",{position:"top-center",
        autoClose:3000});
      console.error("Error:", error);
    }
    onCloseActive();
  };

  const sumbitS = async () => {
    try {
      if (!selectedClass) {
        toast.warning("Please select a class to remove.",{position:"top-center",
          autoClose:3000});
        return;
      }

      await sendJSONRequest(`${Backend}/portal/delete/class`, {
        gradeid: selectedClass,
      });
      toast.success("Class removed successfully!",{position:"top-center",
        autoClose:3000});
      updateGrade("");
    } catch (error) {
      toast.error("Error removing class. Please try again.",{position:"top-center",
        autoClose:3000});
      console.error("Error:", error);
    }
    onCloseS();
  };

  return (
    <>
      <div className="p-4 ">
        <ToastContainer />
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
        {/* Modals for Change Incharge, Activate Class, and Remove Class */}
      </div>
    </>
  );
};

export default View;
