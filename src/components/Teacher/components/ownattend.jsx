import { useState, useEffect } from "react";
import { MonthPicker, MonthInput } from "react-lite-month-picker";
import { sendJSONRequest } from "../../../utility/sendJson";
import BackBtn from "../../../utility/backbtn";

function Ownattend() {
  const Backend = import.meta.env.BACKEND_URL;
  const currentDate = new Date();
  const [Data, setData] = useState();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const [selectedMonthData, setSelectedMonthData] = useState({
    month: currentMonth + 1,
    year: currentYear,
  });
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const [monthDays, setMonthDays] = useState([]);

  useEffect(() => {
    const getDaysInMonth = () => {
      const year = selectedMonthData.year;
      const month = selectedMonthData.month - 1;
      const date = new Date(year, month, 1);
      const days = [];

      while (date.getMonth() === month) {
        days.push({
          date: new Date(date),
          dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
          dayNumber: date.getDate(),
        });
        date.setDate(date.getDate() + 1);
      }

      setMonthDays(days);
    };

    getDaysInMonth();
  }, [selectedMonthData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sendJSONRequest(
          `${Backend}/api/getTodayAttendence`,
          {
            type: "Teacher",
            year: selectedMonthData.year,
            month: selectedMonthData.month,
          }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching Teacher data:", error);
      }
    };
    fetchData();
  }, [selectedMonthData]);

  currentDate.setHours(0, 0, 0, 0);
  const currentTimestamp = currentDate.getTime();

  return (
    <>
      <BackBtn link="/teachers" />
      <div className="flex justify-end items-center m-2">
        <div className="">
          <MonthInput
            selected={selectedMonthData}
            setShowMonthPicker={setIsPickerOpen}
            showMonthPicker={isPickerOpen}
            size="small"
          />
          {isPickerOpen ? (
            <MonthPicker
              setIsOpen={setIsPickerOpen}
              selected={selectedMonthData}
              onChange={setSelectedMonthData}
              size="small"
            />
          ) : null}
        </div>
      </div>
      <table className="w-full table-auto text-gray-800 mb-4 border border-black">
        <thead className="text-sm font-bold text-white bg-gradient-to-r from-teal-400 to-blue-500">
          <tr>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {!Data
            ? "Loading.."
            : monthDays.map((element) => {
                const elementDate = new Date(element.date);
                elementDate.setHours(0, 0, 0, 0);
                const elementTimestamp = elementDate.getTime();

                const status = Data.some((el) => {
                  const attendanceDate = new Date(el.date);
                  attendanceDate.setHours(0, 0, 0, 0);
                  return attendanceDate.getTime() === elementTimestamp;
                });

                let isPresent;
                if (status) isPresent = "A";
                else isPresent = element.dayName === "Sun" ? "Sun" : "P";

                if (elementTimestamp <= currentTimestamp)
                  return (
                    <tr
                      key={elementTimestamp}
                      className="bg-white  transition duration-200 ease-in-out"
                    >
                      <td className="px-6 py-4 text-sm">
                        {elementDate.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        {" "}
                        <span
                          className={`text-sm sm:text-lg font-medium w-8 h-8 flex justify-center items-center rounded-full ${
                            !status
                              ? isPresent === "P"
                                ? "bg-green-700"
                                : "bg-yellow-400"
                              : "bg-red-700"
                          } text-white`}
                        >
                          {isPresent}
                        </span>
                      </td>
                    </tr>
                  );
              })}
        </tbody>
      </table>
    </>
  );
}

export default Ownattend;
