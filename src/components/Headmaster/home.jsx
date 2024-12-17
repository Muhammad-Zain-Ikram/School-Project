import React from "react";
import Dashboard from "./components/Dashboard";
import { Outlet } from "react-router-dom";

const Home = () => {

  return (
    <>
    <Outlet/>
    </>
  );
};

export default Home;
