import React from 'react'
import { Link } from 'react-router-dom';
const Removeteacher = () => {
const classes = ['Nursery', 'Class 1', 'Class 2', 'Class 3'];
  return (
    <div>
        <div className="min-h-screen bg-gradient-to-r from-blue-50 via-gray-100 to-blue-50 flex items-center justify-center py-12 px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-xl p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Remove teacher</h3>

        <form className="space-y-6">
          {/* teacher Name */}
          <div>
            <label
              htmlFor="teacher-name"
              className="block text-lg font-medium text-gray-700"
            >
              teacher Name
            </label>
            <input
              type="text"
              id="teacher-name"
              name="teacher-name"
              className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base p-3"
              placeholder="Enter the teacher's full name"
            />
          </div>



          {/* Class Selection */}
          <div>
            <label
              htmlFor="class"
              className="block text-lg font-medium text-gray-700"
            >
              Choose a Class
            </label>
            <select
              id="class"
              name="class"
              className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base p-3 bg-white"
            >
              {classes.map((className, index) => (
                <option key={index} value={className}>
                  {className}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-6 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
            >
              Remove Teacher
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <Link to="/admin/teachers">
            <button
              className="py-3 px-6 text-lg font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
            >
              Back to teachers
            </button>
          </Link>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Removeteacher