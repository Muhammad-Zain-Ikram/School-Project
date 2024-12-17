import React from "react";
import { Outlet } from "react-router-dom";
import Home from "./components/home";
const Teachers = () => {
  return (
    <div>
      <Outlet/>
    </div>
  );
};

export default Teachers;
