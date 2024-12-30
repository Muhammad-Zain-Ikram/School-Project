import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import image1 from "../../../assets/school/image1.jpg";
import image2 from "../../../assets/school/image2.jpg";
import image3 from "../../../assets/school/image3.jpg";
import image4 from "../../../assets/school/image4.jpg";
import image6 from "../../../assets/school/image6.jpg";
import image7 from "../../../assets/school/image7.jpg";
import image8 from "../../../assets/school/image8.jpg";
import image9 from "../../../assets/school/image9.jpg";
import image10 from "../../../assets/school/image10.jpg";
import image11 from "../../../assets/school/image11.jpg";

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const images = [
    { src: image1, caption: "A beautiful morning at school" },
    { src: image2, caption: "Students engaging in activities" },
    { src: image3, caption: "Classrooms designed for learning" },
    { src: image4, caption: "Celebrating cultural diversity" },
    { src: image6, caption: "Interactive learning environment" },
    { src: image7, caption: "Extracurricular activities" },
    { src: image8, caption: "Bright smiles on faces" },
    { src: image9, caption: "Sports and teamwork in action" },
    { src: image10, caption: "Library with endless resources" },
    { src: image11, caption: "Community bonding events" },
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    if (!isPaused) {
      const intervalId = setInterval(handleNext, 3000); // Autoplay every 3 seconds
      return () => clearInterval(intervalId); // Clear interval on unmount
    }
  }, [isPaused]);

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") handlePrev();
    if (event.key === "ArrowRight") handleNext();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      id="gallery"
      className="relative w-full my-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <h2 className="text-center text-main font-extrabold text-5xl my-16">Gallery</h2>
      <div className="relative h-96 overflow-hidden rounded-lg">
        {images.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex justify-center items-center transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <img
              src={item.src}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
              style={{ objectPosition: "center center" }}
            />
            <div
              className={`absolute bottom-5 left-5 bg-black bg-opacity-50 text-white text-sm px-4 py-2 rounded ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              } transition-opacity duration-1000`}
            >
              {item.caption}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute inset-0 flex justify-between items-center px-4">
        <button
          onClick={handlePrev}
          className="bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 focus:outline-none"
        >
          <FaArrowLeft size={20} />
        </button>
        <button
          onClick={handleNext}
          className="bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 focus:outline-none"
        >
          <FaArrowRight size={20} />
        </button>
      </div>

      {/* Indicators */}
      <div className="flex justify-center items-center mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full mx-1 focus:outline-none ${
              index === currentIndex ? "bg-main" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>

      {/* Thumbnails */}
      <div className="flex justify-center mt-6 overflow-x-auto space-x-4 px-4">
        {images.map((item, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-20 h-14 border-2 ${
              index === currentIndex ? "border-main" : "border-gray-200"
            } rounded-md overflow-hidden`}
          >
            <img src={item.src} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
