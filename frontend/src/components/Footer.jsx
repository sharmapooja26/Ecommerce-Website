import React from "react";
import { assets } from "../assets/assets";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" text-gray-700 font-serif px-6 sm:px-12 pt-16 pb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div className="col-span-1">
          <img src={assets.logo} alt="Logo" className="mb-4 w-32" />
          <p className="text-sm text-gray-600 max-w-xs leading-relaxed">
            Elevate your wardrobe with curated styles crafted for comfort and
            class. Forever is fashion that stays.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg text-neutral-800 mb-4 font-semibold">
            COMPANY
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="hover:text-black cursor-pointer">Home</li>
            <li className="hover:text-black cursor-pointer">Shop</li>
            <li className="hover:text-black cursor-pointer">About Us</li>
            <li className="hover:text-black cursor-pointer">Terms & Privacy</li>
          </ul>
        </div>

        {/* Help & Support */}
        <div>
          <h3 className="text-lg text-neutral-800 mb-4 font-semibold">
            SUPPORT
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="hover:text-black cursor-pointer">Contact Us</li>
            <li className="hover:text-black cursor-pointer">Delivery Info</li>
            <li className="hover:text-black cursor-pointer">Return Policy</li>
            <li className="hover:text-black cursor-pointer">FAQs</li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-lg text-neutral-800 mb-4 font-semibold">
            GET IN TOUCH
          </h3>
          <ul className="text-sm text-gray-600 mb-4 space-y-2">
            <li>📞 +91 12345 67890</li>
            <li>📧 support@forever.com</li>
          </ul>
          <div className="flex gap-4 mt-2">
            <a
              href="#"
              className="text-gray-600 hover:text-black transition text-lg"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-black transition text-lg"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-black transition text-lg"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Divider and Bottom Note */}
      <div className="mt-12">
        <hr className="border-gray-300" />
        <p className="text-center text-sm text-gray-500 py-5">
          © 2025 Forever — Where fashion meets elegance.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
