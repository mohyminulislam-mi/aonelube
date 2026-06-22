"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// JSON Data Structure
const sliderData = [
  {
    id: 1,
    title: "Keep Your Engine Running Like New",
    subtitle: "Mobil 1™ Advanced Full Synthetic Motor Oil",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1920&auto=format&fit=crop",
    ctaText: "Explore Products",
    ctaLink: "#",
  },
  {
    id: 2,
    title: "Ultimate Performance for Heavy Duty",
    subtitle: "Mobil Delvac™ Commercial Vehicle Lubricants",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1920&auto=format&fit=crop",
    ctaText: "Find Your Oil",
    ctaLink: "#",
  },
  {
    id: 3,
    title: "Ride with Ultimate Confidence",
    subtitle: "Mobil Super™ Moto for Two-Wheelers",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1920&auto=format&fit=crop",
    ctaText: "View Offers",
    ctaLink: "#",
  },
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? sliderData.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = useCallback(() => {
    const isLastSlide = currentIndex === sliderData.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex]);

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  // Auto Play Logic
  useEffect(() => {
    if (isHovered) return;

    const slideInterval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [nextSlide, isHovered]);

  return (
    <div 
      className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px] overflow-hidden group bg-gray-900"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides Container */}
      <div className="w-full h-full relative">
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Background Image with Overlay */}
            <div
              style={{ backgroundImage: `url(${slide.image})` }}
              className="w-full h-full bg-cover bg-center bg-no-repeat"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="absolute inset-0 z-20 flex flex-col justify-center items-start max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 text-white">
              <span className="text-[#ED1C24] text-xs sm:text-sm lg:text-base font-bold tracking-widest uppercase mb-2 sm:mb-3">
                {slide.subtitle}
              </span>
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight max-w-xl sm:max-w-2xl leading-tight mb-4 sm:mb-6">
                {slide.title}
              </h1>
              <a
                href={slide.ctaLink}
                className="bg-[#ED1C24] hover:bg-[#005CA9] text-white font-bold text-xs sm:text-sm px-6 py-3 sm:px-8 sm:py-3.5 rounded-full uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {slide.ctaText}
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="hidden md:group-hover:flex absolute top-1/2 -translate-y-1/2 left-5 z-30 p-2.5 rounded-full bg-white/20 hover:bg-white text-white hover:text-black transition-all cursor-pointer backdrop-blur-sm"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="hidden md:group-hover:flex absolute top-1/2 -translate-y-1/2 right-5 z-30 p-2.5 rounded-full bg-white/20 hover:bg-white text-white hover:text-black transition-all cursor-pointer backdrop-blur-sm"
      >
        <ChevronRight size={24} />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-2.5 bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-xs">
        {sliderData.map((_, slideIndex) => (
          <button
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              currentIndex === slideIndex 
                ? "bg-[#ED1C24] w-6 h-2" 
                : "bg-white/60 hover:bg-white w-2 h-2"
            }`}
            aria-label={`Go to slide ${slideIndex + 1}`}
          />
        ))}
      </div>
    </div>
  );
}