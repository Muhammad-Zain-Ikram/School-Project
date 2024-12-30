import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SuccessPopup, ErrorPopup } from "../../../utility/Popups";
import { sendJSONRequest } from "../../../utility/sendJson";
import BackBtn from "../../../utility/backbtn";
import Redirect from "../../../utility/redirect";
const Addmarks = () => {
  const Backend = import.meta.env.VITE_BACKEND_URL;
  const [Data, setData] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [marks, setMarks] = useState({});
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const { classId, testId, TM } = location.state || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sendJSONRequest(`${Backend}/api/getStudents`, {
          classes: classId,
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchData();
  }, []);

  const handleMarksChange = (e, studentId) => {
    const value = e.target.value;
    if (value > TM) {
      setError(`Marks cannot exceed total marks (${TM})`);
    } else {
      setError("");
      setMarks({
        ...marks,
        [studentId]: value,
      });
    }
  };

  const handleSubmit = async () => {
    if (error) {
      console.error("Cannot submit due to validation error:", error);
      setErrorMessage(error);
      return;
    }

    const marksData = Data.map((student) => ({
      testId,
      studentId: student._id,
      score: marks[student._id] || 0,
    }));

    try {
      const response = await sendJSONRequest(`${Backend}/portal/test/marks`, {
        data: marksData,
      });
      setSuccessMessage("Marks submitted successfully!");
      setRedirect(true);
    } catch (error) {
      console.error("Error submitting marks:", error);
      setErrorMessage("Error submitting marks. Please try again.");
    }
  };
  if (redirect) {
    return <Redirect link="/teachers" />;
  }
  return (
    <div className="container mx-auto p-4">
      <BackBtn link="/teachers/all-test" />
      <h1 className="text-2xl font-bold mb-4 text-center">Add Marks</h1>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <div className="overflow-x-auto">
        <table className="border-collapse min-w-full bg-white border border-black rounded-lg shadow-md">
          <thead className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Marks</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {Data.map((student, index) => (
              <tr
                key={index}
                className={`border-b border-black ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="py-3 px-6 text-left">{student.name}</td>
                <td className="py-3 px-6 text-left">
                  <input
                    required
                    type="number"
                    name="marks"
                    value={marks[student._id] || ""}
                    onChange={(e) => handleMarksChange(e, student._id)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg font-medium shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
        >
          Submit Marks
        </button>
      </div>
      <SuccessPopup message={successMessage} visible={!!successMessage} />
      <ErrorPopup message={errorMessage} visible={!!errorMessage} />
    </div>
  );
};

export default Addmarks;
