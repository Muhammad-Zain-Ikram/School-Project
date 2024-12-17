import React, { useState, useEffect } from "react";
import image1 from "../../../assets/school/image1.jpg";
import image2 from "../../../assets/school/image2.jpg";
import image3 from "../../../assets/school/image3.jpg";
import image4 from "../../../assets/school/image4.jpg";

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [image1, image2, image3, image4];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Slide every 3 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Slider Container */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          Govt High School Urban Area
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl font-medium tracking-wide drop-shadow-md">
          Empowering Solutions for Modern Education
        </p>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50"></div>

     
    </div>
  );
};

export default ImageSlider;
