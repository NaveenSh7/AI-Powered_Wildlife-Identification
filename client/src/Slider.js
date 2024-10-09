import React, { useState, useEffect } from "react";
import deer from "./Images/deer.jpg";
import elephant from "./Images/elephant.jpg";
import redpanda from "./Images/redpanda.jpg";
import rhino from "./Images/rhino.jpg";
import zebra from "./Images/zebra.jpg";
import polarbear from "./Images/polarbear.jpg";

const images = [
  { src: elephant, alt: "Carousel 2" },
  { src: redpanda, alt: "Carousel 3" },
  { src: zebra, alt: "Carousel 4" },
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // useEffect to handle automatic sliding
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <div id="indicators-carousel" className="relative w-full">
      <div className="relative h-40 overflow-hidden md:h-[35vh] opacity-90">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute block w-full transition-opacity duration-700 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
            data-carousel-item={index === currentIndex ? "active" : ""}
          >
            <img
              src={image.src}
              className="relative block w-full h-full object-contain -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt={image.alt}
            />
          </div>
        ))}
      </div>

      <div className="absolute z-0 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-blue-500" : "bg-gray-300"}`}
            aria-current={index === currentIndex}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>

      <button type="button" className="absolute top-0 start-0 z-0 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" onClick={prevSlide}>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>

      <button type="button" className="absolute top-0 end-0 z-0 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" onClick={nextSlide}>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default Slider;
