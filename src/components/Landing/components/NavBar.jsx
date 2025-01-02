import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

function NavBar({ logo }) {
  const [mobileNavVisible, setMobileNavVisible] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavVisible((prev) => !prev);
  };

  const closeMobileNav = () => {
    setMobileNavVisible(false);
  };

  return (
    <>
      <nav
        id="home"
        className="motion-preset-bounce motion-duration-1000 flex justify-between items-center bg-white shadow-md h-16 px-5 lg:px-10"
      >
        <img src={logo} alt="Urban Area" className="h-12 w-auto my-2" />
        <ul className="hidden md:flex justify-between w-full max-w-md font-semibold capitalize text-main text-lg">
          {["home", "facilities", "events", "gallery"].map((item) => (
            <li
              key={item}
              className="hover:text-gray-700 transition duration-200"
            >
              <a href={`#${item}`} className="px-3">
                {item}
              </a>
            </li>
          ))}
        </ul>
        <Link
          to="/login"
          className="hidden md:block bg-main text-white px-5 py-2 rounded-lg hover:bg-opacity-90 transition duration-200"
        >
          Portal
        </Link>
        <button
          className="md:hidden text-3xl text-main focus:outline-none"
          onClick={toggleMobileNav}
        >
          <FaBars />
        </button>
      </nav>

      {/* Divider */}
      <div className="border-t border-main" />

      {/* Mobile Navbar */}
      <div
        className={`fixed inset-0 bg-white z-50 transform ${
          mobileNavVisible ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center h-16 px-5 lg:px-10 bg-white shadow-md">
          <img src={logo} alt="Urban Area" className="h-12 w-auto" />
          <button
            className="text-4xl text-main focus:outline-none"
            onClick={toggleMobileNav}
          >
            <IoCloseSharp />
          </button>
        </div>
        <ul className="flex flex-col items-center gap-6 pt-8 font-semibold capitalize text-main text-lg">
          {["home", "facilities", "events", "gallery"].map(
            (item) => (
              <li key={item} onClick={closeMobileNav}>
                <a
                  href={`#${item}`}
                  className="hover:text-gray-700 transition duration-200"
                >
                  {item}
                </a>
              </li>
            )
          )}
          <li>
            <Link
              to="/login"
              className=" bg-overlay text-white block text-lg font-medium rounded-lg px-3 py-2 w-[80vw] text-center mx-4 cursor-pointer"
            >
              Portal
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default NavBar;
