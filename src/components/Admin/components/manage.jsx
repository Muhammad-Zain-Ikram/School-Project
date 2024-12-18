import React,{useState,useEffect} from "react";
import { getRequest, sendJSONRequest } from "../../../utility/sendJson";

const manage = () => {
  const [Data, setData] = useState([]);
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  console.log(selectedTeachers);
  
    // Tecaher Data
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await getRequest(
              `${process.env.REACT_APP_BACKEND_URL}/api/getTeacher`
            );
            setData(response.data);
          } catch (error) {
            console.error("Error fetching Teacher data:", error);
          }
        };
        fetchData();
      }, []);

//   Remove Teacher 
const handleRemoveTeachers = async () => {
    try {
      if (selectedTeachers.length === 0) {
        console.error("No Tecahers selected for removal.");
        return;
      }

      const posting = await sendJSONRequest(
        `${process.env.REACT_APP_BACKEND_URL}/portal/delete/user`,
        {
          id: selectedTeachers,
          delete: "teacher",
        }
      );
      console.log("success: ", posting);
      // const response = await getRequest(
      //   "http://localhost:5000/api/getTeacher"
      // );
      console.log(Data)
      console.log(selectedTeachers)
      setData(prev => prev.filter(el => !selectedTeachers.includes(el._id)));
      

      console.log(Data)
      setSelectedTeachers([]);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCheckboxChange = (id) => {
    setSelectedTeachers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((teacherId) => teacherId !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <div>
      <>
        <div className="flex justify-between items-center md:mx-8 mb-8 flex-col mx-2 md:flex-row">
          <h2 className="text-2xl font-bold">Teachers List</h2>

          <div className="flex justify-center items-center w-full mt-3 md:mt-0 md:w-auto flex-col md:flex-row gap-5">
            <button
              onClick={handleRemoveTeachers}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Remove Teachers
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="overflow-x-auto w-full max-w-4xl">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 border-b text-center">Select</th>
                  <th className="px-4 py-2 border-b text-center">Name</th>
                  <th className="px-4 py-2 border-b text-center">Email</th>
                  <th className="px-4 py-2 border-b text-center">Role</th>
                </tr>
              </thead>
              <tbody>
                {Data.map((teacher, index) => (
                  <tr
                    key={teacher._id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}
                  >
                    <td className="px-4 py-2 border-b text-center">
                      <input
                        type="checkbox"
                        checked={selectedTeachers.includes(teacher._id)}
                        onChange={() => handleCheckboxChange(teacher._id)}
                      />
                    </td>
                    <td className="px-4 py-2 border-b text-center">
                      {teacher.name}
                    </td>
                    <td className="px-4 py-2 border-b text-center">
                      {teacher.email}
                    </td>
                    <td className="px-4 py-2 border-b text-center">
                      {teacher.role}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    </div>
  );
};

export default manage;
