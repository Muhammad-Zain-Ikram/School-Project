import React from 'react';
import { Link } from 'react-router-dom';
import { IoMdEye } from 'react-icons/io'; 
import { IoMdAdd } from 'react-icons/io'; 

const Class = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold text-indigo-700 mb-8 text-center">
          Class Management
        </h2>
        <div className="grid grid-cols-2 gap-6 px-4 py-8 sm:px-8">
          <Link
            to="view"
            className="p-6 bg-blue-800 text-white flex flex-col justify-center items-center text-center rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300"
          >
            <IoMdEye className="text-5xl mb-3" />
            <p className="text-lg font-semibold">View Classes</p>
          </Link>

          <Link
            to="add"
            className="p-6 bg-blue-800 text-white flex flex-col justify-center items-center text-center rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300"
          >
            <IoMdAdd className="text-5xl mb-3" />
            <p className="text-lg font-semibold">Add Class</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Class;
