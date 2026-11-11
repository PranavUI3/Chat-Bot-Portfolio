import React from "react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-6 md:px-10 py-4 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/80 shadow-[0_4px_30px_rgba(0,0,0,0.4)] transition-all duration-300">
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-indigo-500/5 to-purple-500/5 pointer-events-none" />

      {/* Logo */}
      <div className="relative flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white font-mono font-bold text-sm tracking-wider">
          P
        </div>
        <span className="text-lg font-bold tracking-tight text-slate-100 font-mono">
          Pranav<span className="text-cyan-400">.dev</span>
        </span>
      </div>

      {/* Heading */}
      <div className="relative text-center hidden sm:block">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Portfolio AI Assistant
        </h1>
        <p className="text-[11px] font-medium text-slate-400 tracking-wide mt-0.5">
          Interactive Resume & Project Guide
        </p>
      </div>

      {/* Action Button */}
      <div className="relative">
        <a
          href="https://github.com" 
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all duration-200 text-white px-5 py-2.5 rounded-xl font-semibold text-xs md:text-sm shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 active:scale-95"
        >
          <span>Let's Connect</span>
          <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
        </a>
      </div>

    </nav>
  );
};

export default Navbar;