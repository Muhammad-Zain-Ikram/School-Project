import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-8 px-4 mt-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold">Govt High School Urban Area</h2>
          <p className="text-gray-300">
            Empowering solutions for modern education.
          </p>
        </div>

        <div className="text-center">
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            {["Home", "Facilities", "Events", "Gallery"].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <h3 className="text-xl font-semibold">Follow Us</h3>
          <div className="flex space-x-4 text-gray-300">
            <a href="#" className="hover:text-green-400">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-green-400">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-green-400">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-green-400">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
      <p className="text-center text-gray-400 mt-4">© 2024 ZB Infinity. All rights reserved.</p>
    </footer>
  );
}

export default Footer;