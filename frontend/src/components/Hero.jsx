import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="w-full flex flex-col items-center text-center py-10 px-4 gap-6 bg-gradient-to-b from-pink-50 to-white border border-gray-300">
      {/* Hero Image */}
      <img className="w-full max-w-3xl" src={assets.hero_img} alt="" />

      {/* Hero Text Content */}
      <div className="text-[#141414] max-w-xl">
        <p className="text-pink-600 font-semibold text-sm md:text-base tracking-widest uppercase mb-2">
          new collection
        </p>
        <h1 className="text-4xl md:text-6xl font-extrabold font-serif leading-snug mb-4">
          Elevate Your Everyday Look
        </h1>
        <p className="text-base md:text-lg font-medium text-gray-600">
          Discover timeless fashion pieces made for comfort and style.
        </p>
      </div>
    </div>
  );
};

export default Hero;
