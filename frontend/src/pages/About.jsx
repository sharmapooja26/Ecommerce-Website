import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div className="bg-white">
      <div>
        <h2 className="text-2xl font-bold font-serif tracking-wide text-gray-800 text-center">
          About Forever
        </h2>
      </div>

      <div className="my-14 relative">
        <img
          className="absolute inset-0 w-full h-full object-cover opacity-50 z-0"
          src={assets.about_img}
          alt="about-background"
        />
        <div className="relative z-10 px-6 md:px-20 py-16 flex flex-col items-center text-center md:text-left text-gray-700 font-serif italic">
          <div className="max-w-3xl">
            <p className="font-bold text-xl text-white-200 mb-28">
              At Forever, we believe fashion is a form of self-expression. Our
              mission is to empower you with trendy, affordable, and quality
              fashion choices that let your personality shine.
            </p>
            <p className="text-base font-light mb-4">
              We curate collections that blend contemporary design with comfort
              and style to enhance your everyday fashion journey.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              Our Mission
            </h3>
            <p className="text-base font-light">
              To become your go-to destination for fashion-forward clothing and
              accessories. We are committed to offering a seamless shopping
              experience with fast delivery and reliable customer support.
            </p>
          </div>
        </div>
      </div>

      <div className="py-8 text-center">
        <h2 className="text-2xl md:text-2xl font-bold text-gray-800 tracking-wide font-serif">
          What Makes Forever Unique:)
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-16 mb-20">
        <div className="border px-8 py-12 flex flex-col gap-5 rounded-lg shadow-md hover:shadow-xl transition duration-300 bg-white">
          <b className="text-lg text-gray-800">Top-Quality Fashion</b>
          <p className="text-gray-600 font-light">
            Discover well-crafted pieces made from premium materials that
            elevate your style and confidence.
          </p>
        </div>

        <div className="border px-8 py-12 flex flex-col gap-5 rounded-lg shadow-md hover:shadow-xl transition duration-300 bg-white">
          <b className="text-lg text-gray-800">Hassle-Free Shopping</b>
          <p className="text-gray-600 font-light">
            Enjoy an intuitive website design, secure checkout, and fast
            shipping right to your doorstep.
          </p>
        </div>

        <div className="border px-8 py-12 flex flex-col gap-5 rounded-lg shadow-md hover:shadow-xl transition duration-300 bg-white">
          <b className="text-lg text-gray-800">Customer-First Support</b>
          <p className="text-gray-600 font-light">
            Our team is always here to help you with quick responses, easy
            returns, and personalized assistance.
          </p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default About;
