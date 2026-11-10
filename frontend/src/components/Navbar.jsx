
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-5 bg-white shadow-sm border-b border-gray-200">

      {/* Logo */}
      <div className="text-2xl font-bold text-blue-600">
        Pranav.dev
      </div>

      {/* Heading */}
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
          My Portfolio Chatbot
        </h1>
        <p className="text-xs md:text-sm text-gray-500 mt-1">
          AI-powered portfolio assistant
        </p>
      </div>

      {/* Action Button */}
      <div>
        <button className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-5 py-2 rounded-lg font-medium">
          Let's Connect
        </button>
      </div>

    </nav>
  );
};

export default Navbar;

