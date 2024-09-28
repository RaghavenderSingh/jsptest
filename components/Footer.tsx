import React from "react";
import { FaYoutube, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 fixed bottom-0 left-0 w-full">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col items-center space-y-3">
          <div className="flex flex-col sm:flex-row justify-between items-center w-full space-y-2 sm:space-y-0">
            <p className="text-sm text-gray-600">© 2024 जन सुराज</p>
            <div className="flex items-center space-x-4">
              <p className="text-sm text-gray-600">सभी अधिकार सुरक्षित हैं।</p>
              <div className="h-4 w-px bg-gray-300 hidden sm:block"></div>
              <p className="text-sm text-gray-600 hover:text-gray-800 cursor-pointer">
                प्राइवेसी पॉलिसी
              </p>
            </div>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-red-600">
              <FaYoutube size={20} />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-400">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="text-gray-600 hover:text-pink-600">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
