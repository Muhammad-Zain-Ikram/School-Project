import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoMdAdd } from "react-icons/io";
import { HiOutlineUserGroup } from "react-icons/hi"; 
import { TfiReload } from "react-icons/tfi";
const Teachers = () => {
  return (
    <div>
        <div className="grid grid-cols-2 gap-8 px-8 py-12 sm:px-16 md:px-24">
        <NavLink
          to="add"
          className="p-6 bg-blue-600 text-white flex flex-col justify-center items-center text-2xl text-center rounded-lg shadow-lg hover:scale-105 transition-transform"
        >
          <span className="text-5xl pb-3">
            <IoMdAdd />
          </span>
          <p>Add Teacher</p>
        </NavLink>

        <NavLink
          to="manage"
          className="p-6 bg-blue-600 text-white flex flex-col justify-center items-center text-2xl text-center rounded-lg shadow-lg hover:scale-105 transition-transform"
        >
          <span className="text-5xl pb-3">
            <HiOutlineUserGroup  />
          </span>
          <p>Manage Teachers</p>
        </NavLink>


      </div>

      <div className="flex justify-center px-8 py-2">
        <NavLink
          to="substitution"
          className="p-5 bg-blue-600 text-white flex flex-col justify-center items-center text-2xl text-center rounded-lg shadow-lg hover:scale-105 transition-transform"
        >
          <span className="text-4xl pb-3">
            <TfiReload />
          </span>
          <p>Substitution</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Teachers