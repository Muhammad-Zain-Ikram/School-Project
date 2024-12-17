import React from 'react';
import { Link } from 'react-router-dom';
import { IoMdEye } from 'react-icons/io'; 
import { IoMdAdd } from 'react-icons/io'; 

const Test = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold text-blue-600 mb-8 text-center">
          Test Management
        </h2>
        <div className="grid grid-cols-2 gap-6 px-4 py-8 sm:px-8">
          <Link
            to="manage"
           className="p-6 bg-blue-700 text-white flex flex-col justify-center items-center text-center rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300"
          >
            <IoMdEye className="text-5xl mb-3" />
            <p className="text-lg font-semibold">Manage Tests</p>
          </Link>

          <Link
            to="add-test"
            className="p-6 bg-blue-700 text-white flex flex-col justify-center items-center text-center rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300"
          >
            <IoMdAdd className="text-5xl mb-3" />
            <p className="text-lg font-semibold">Add Test</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Test;
