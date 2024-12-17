import React, { useEffect } from 'react';
import NavBar from './components/Side';
import { Outlet } from 'react-router-dom';

function Admin() {
  useEffect(() => {
    const handleResize = () => {
      const minWidth = 450;
      const main = document.getElementById('main');
      const message = document.getElementById('message');

      if (window.innerWidth < minWidth) {
        main.classList.add('hidden');
        message.classList.remove('hidden');
      } else {
        main.classList.remove('hidden');
        message.classList.add('hidden');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Show message for small screens */}
      <div
        id="message"
        className="hidden text-center text-red-500 font-bold text-lg p-4"
      >
        Open on larger devices
      </div>

      {/* Main layout */}
      <div id="main" className="flex h-screen">
        {/* Sidebar */}
        <div className="max-w-[50%] bg-white shadow-lg lg:w-[17%]">
          <NavBar />
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Admin;
