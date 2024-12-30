import React from "react";
import { Link } from "react-router-dom";

const BackBtn = ({ link }) => {
  return (
    <div className="absolute top-4 left-4">
      <Link
        to={`${link}`}
        className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out"
      >
        <svg
          className="w-4 h-4 md:w-6 md:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
      </Link>
    </div>
  );
};

export default BackBtn;
