import React, { memo } from "react";

const Attendance = memo(function attendence({ name, data, onStatusChange }) {
  return (
    <div className="bg-gray-50 rounded-lg shadow-lg">
      {/* Title */}
      <h2 className="mt-6 text-2xl text-center pb-6 font-bold lg:text-3xl text-blue-700">
        {name}
      </h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
          {/* Table Header */}
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left font-semibold text-sm lg:text-base">
                Name
              </th>
              <th className="py-3 px-4 text-left font-semibold text-sm lg:text-base">
                Status
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {!data ? (
              <tr>
                <td colSpan="2" className="text-center py-6 text-gray-500">
                  No data available
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr
                  key={row.attendeId}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-blue-50 transition duration-200`}
                >
                  <td className="py-4 px-4 text-gray-700 text-sm lg:text-base border-b border-gray-200">
                    {row.name}
                  </td>
                  <td className="py-4 px-4 text-gray-700 text-sm lg:text-base border-b border-gray-200">
                    {/* Toggle Button */}
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={row.status === "Present" ? true : false}
                        onChange={() => onStatusChange(row.attendeId)}
                        className="sr-only peer"
                        aria-checked={row.status === "Present" ? true : false}
                        role="checkbox"
                      />
                      <div className="relative w-12 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-6 peer-checked:bg-green-500 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600"></div>
                    </label>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export { Attendance };
