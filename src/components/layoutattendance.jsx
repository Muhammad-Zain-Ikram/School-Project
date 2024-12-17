import React,{memo} from 'react';
const Attendance = memo(function attendence({ name, data, onStatusChange}){
  console.log(data)
  return (
    <div>
      <h2 className="text-2xl text-center py-4 font-bold lg:text-4xl motion-preset-slide-right motion-duration-2000 ">{name}</h2>

      <table className="min-w-full border-collapse motion-preset-slide-left motion-duration-2000">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 lg:px-4 py-2 text-left px-2">Name</th>
            <th className="border border-gray-300 lg:px-4 py-2 text-left px-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="2" className="text-center py-4">No data available</td>
            </tr>
          ) : (
            data.map((row, index) => (
            <tr key={row.attendeId} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                <td className="border border-gray-300 px-4 py-2">{row.name}</td>
                {/* <td className="border border-gray-300 px-4 py-2">{row._id}</td> */}
                <td className="border border-gray-300 px-4 py-2 text-right">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={row.status === "Present" ? true : false}
                      onChange={() => onStatusChange(row.attendeId)}
                      className="sr-only peer"
                      aria-checked={row.status === 'Present' ? true : false}
                      role="checkbox"
                    />
                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                  </label>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
});

export  {Attendance};
