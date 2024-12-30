import React, { useEffect, useState } from "react";

const SuccessPopup = ({ message, visible }) => {
  const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    setIsVisible(visible);
    if (visible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible]);
  return (
    isVisible && (
      <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-80">
        <div className="rounded-md bg-[#00c851] p-4 w-[50%]">
          <p className="flex items-center justify-center text-lg font-semibold text-[#ffffff]">
            <span className="pr-3">
              <svg
                width={30}
                height={30}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx={10} cy={10} r={10} fill="#ffffff" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.1203 6.78954C14.3865 7.05581 14.3865 7.48751 14.1203 7.75378L9.12026 12.7538C8.85399 13.02 8.42229 13.02 8.15602 12.7538L5.88329 10.4811C5.61703 10.2148 5.61703 9.78308 5.88329 9.51682C6.14956 9.25055 6.58126 9.25055 6.84753 9.51682L8.63814 11.3074L13.156 6.78954C13.4223 6.52328 13.854 6.52328 14.1203 6.78954Z"
                  fill="#00c851"
                />
              </svg>
            </span>
            {message}
          </p>
        </div>
      </div>
    )
  );
};

const ErrorPopup = ({ message, visible }) => {
  const [isVisible, setIsVisible] = useState(visible);
  useEffect(() => {
    setIsVisible(visible);
    if (visible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000); // Show for 3 seconds
      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    isVisible && (
      <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-80">
        <div className="rounded-md bg-red-600 p-4 w-[50%]">
          <p className="flex items-center justify-center text-lg font-semibold text-[#ffffff]">
            <span className="pr-3">
              <svg
                width={30}
                height={30}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx={10} cy={10} r={10} fill="#ffffff" />
                <path d="M5 5L15 15" stroke="red" strokeWidth="2" />
                <path d="M15 5L5 15" stroke="red" strokeWidth="2" />
              </svg>
            </span>
            {message}
          </p>
        </div>
      </div>
    )
  );
};

export { SuccessPopup, ErrorPopup };
