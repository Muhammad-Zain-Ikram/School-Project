import React,{useState,useEffect} from 'react'
import { getRequest } from '../../../utility/sendJson';
const View = () => {
    const [data, setData] = useState([]); 
    const [teacherData, setTeacherData] = useState([]); 

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await getRequest(`${process.env.REACT_APP_PORT}/api/getClass`);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching class data:", error);
        }
    };
    
    fetchData();
}, []);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const teacherResponse = await getRequest(`${process.env.REACT_APP_PORT}/api/getTeacher`);
            setTeacherData(teacherResponse.data);
        } catch (error) {
            console.error("Error fetching class data:", error);
        }
    };
    
    fetchData();
}, []);
const getInchargeName = (inchargeId) => {
    const teacher = teacherData.find((teacher) => teacher._id === inchargeId);
    console.log(inchargeId);
    
    return teacher ? teacher.name : "Unknown";
  };
console.log(teacherData);
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">All Classes</h2>
      <div className="overflow-x-auto ">
        <table className="table-auto w-full border-collapse border border-gray-300 ">
          <thead className="bg-gray-300">
            <tr>
              <th className="border border-gray-500 px-4 py-2 text-left  font-bold text-gray-700">
                Label
              </th>
              <th className="border border-gray-500 px-4 py-2 text-left  font-bold text-gray-700">
                Incharge
              </th>
              <th className="border border-gray-500 px-4 py-2 text-left  font-bold text-gray-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
              {data.map((cls) => (
            <tr key={cls._id} className="hover:bg-gray-50 font-medium ">
                <td className={"cursor-pointer border border-gray-300 px-4 py-2 text-left text-gray-500"}>
                    {cls.label}
                </td>
                <td className={"cursor-pointer border border-gray-300 px-4 py-2 text-left text-gray-500"}>
                {getInchargeName(cls.incharge)}    
                </td>
                <td className={`cursor-pointer border border-gray-300 px-4 py-2 text-left ${cls.status == "Active" ? "text-green-700 ": "text-red-800"} `}>
                    {cls.status}
                </td>
            </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default View
