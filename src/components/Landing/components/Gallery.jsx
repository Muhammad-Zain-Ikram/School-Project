import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import image1 from "../../../assets/school/image1.jpg";
import image2 from "../../../assets/school/image2.jpg";
import image3 from "../../../assets/school/image3.jpg";
import image4 from "../../../assets/school/image4.jpg";
import image5 from "../../../assets/school/image5.jpg";
import image6 from "../../../assets/school/image6.jpg";
import image7 from "../../../assets/school/image7.jpg";
import image8 from "../../../assets/school/image8.jpg";
import image9 from "../../../assets/school/image9.jpg";
import image10 from "../../../assets/school/image10.jpg";
import image11 from "../../../assets/school/image11.jpg";

function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    const intervalId = setInterval(handleNext, 3000); // Automatically move to next slide every 3 seconds
    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  return (
    <div id="gallery" className="relative w-full my-8" data-carousel="slide">
      <h2 className="text-center text-main font-extrabold text-5xl my-16">Gallery</h2>
      <div className="relative h-96 overflow-hidden rounded-lg md:h-96">
        {images.map((src, index) => (
          <div
            key={index}
            className={`${
              index === currentIndex ? "opacity-100" : "opacity-0"
            } duration-1000 ease-in-out absolute inset-0 flex justify-center items-center transition-opacity`}
            data-carousel-item={index === currentIndex ? "active" : ""}
          >
            <img
              src={src}
              className="w-full h-full object-cover transform scale-100 transition-transform duration-700 ease-in-out"
              alt={`Slide ${index + 1}`}
              style={{ objectPosition: "center center" }} // Ensure the image is centered
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center pt-4">
        <button
          type="button"
          onClick={handlePrev}
          className="flex justify-center items-center mr-4 h-full cursor-pointer group focus:outline-none bg-white rounded-full p-2 hover:bg-gray-200 transition-all"
        >
          <FaArrowLeft className="text-main w-6 h-6" />
          <span className="sr-only">Previous</span>
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="flex justify-center items-center h-full cursor-pointer group focus:outline-none bg-white rounded-full p-2 hover:bg-gray-200 transition-all"
        >
          <FaArrowRight className="text-main w-6 h-6" />
          <span className="sr-only">Next</span>
        </button>
      </div>
    </div>
  );
}

export default Gallery;