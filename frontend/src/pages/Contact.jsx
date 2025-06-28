import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const Contact = () => {
  return (
    <div className="px-4">
      {/* Heading */}
      <div className="text-center pt-12 border-t">
        <h2 className="text-3xl font-serif text-gray-800 pb-3">
          GET IN TOUCH WITH <span className="font-bold">Forever</span>
        </h2>
        <p className="text-sm text-gray-500 max-w-xl mx-auto">
          Whether you have a question about your order or want to explore career
          opportunities, we're just a message away.
        </p>
      </div>

      {/* Image */}
      <div className="flex justify-center my-10">
        <img
          src={assets.about_img}
          alt="Contact"
          className="w-full max-w-[500px] rounded-md object-cover"
        />
      </div>

      {/* Info Section */}
      <div className="flex flex-col md:flex-row justify-between gap-12 mb-24 max-w-6xl mx-auto">
        {/* Address Section */}
        <div className="flex flex-col gap-3 text-gray-700">
          <h3 className="text-xl font-semibold">Visit Our Store</h3>
          <p className="text-sm text-gray-600">
            123 Main St
            <br />
            Cityville, ST 12345
          </p>
          <p className="text-sm text-gray-600">
            Email: info@forever.com
            <br />
            Phone: 1234567890
          </p>
        </div>

        {/* Careers Section */}
        <div className="flex flex-col gap-3 text-gray-700">
          <h3 className="text-xl font-semibold">Join Our Team</h3>
          <p className="text-sm text-gray-600">
            We're growing and looking for talented individuals to join our team.
            Check out our open positions and become a part of our journey.
          </p>
          <button className="border border-black px-6 py-2 text-sm hover:bg-black hover:text-white transition duration-300 w-fit">
            Explore Jobs
          </button>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default Contact;
