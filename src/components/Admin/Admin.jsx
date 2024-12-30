import React, { useEffect } from 'react';
import NavBar from './components/Side';
import { Outlet } from 'react-router-dom';

function Admin() {
  useEffect(() => {
    const handleResize = () => {
      const main = document.getElementById('main');
      const message = document.getElementById('message');

      if (window.innerWidth < 450) {
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
      {/* Message for very small screens (optional) */}
      <div
        id="message"
        className="hidden text-center text-red-500 font-bold text-lg p-4"
      >
        Please use a larger screen.
      </div>

      {/* Main Layout */}
      <div id="main" className="flex h-screen">
        {/* Sidebar */}
        <NavBar />

        {/* Content Area */}
        <div className="flex-1 bg-gray-100 px-6 overflow-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Admin;
