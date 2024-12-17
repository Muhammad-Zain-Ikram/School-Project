import React from "react";

function Cards({ source, order, heading, detail }) {
  return (
    <div
      className="flex flex-col lg:flex-row justify-center items-center mx-auto mt-8 p-6 rounded-md border border-gray-300 bg-white shadow-lg max-w-5xl transition-transform duration-300 hover:scale-105"
    >
      <div
        className={`basis-[40%] mb-6 lg:mb-0 ${
          order === 0 ? "lg:order-0" : "lg:order-1"
        }`}
      >
        <img
          src={source}
          alt={`${heading}`}
          className="w-full rounded-md shadow-md hover:shadow-xl transition-all duration-300"
        />
      </div>
      <div
        className="basis-[50%] lg:px-10 text-center lg:text-left space-y-4"
      >
        <h2 className="text-3xl font-semibold text-blue-700">{heading}</h2>
        <p className="text-md text-gray-700 leading-loose">{detail}</p>
      </div>
    </div>
  );
}
export default Cards;