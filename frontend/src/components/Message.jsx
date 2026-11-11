import React from "react";

const Message = ({ message }) => {
  const isAi = message.sender === "ai";

  return (
    <div
      className={`flex flex-col gap-1 w-full ${isAi ? "items-start" : "items-end"} group`}
    >
      {/* Message Row */}
      <div
        className={`flex gap-3 items-start max-w-[85%] sm:max-w-[75%] ${isAi ? "flex-row" : "flex-row-reverse"}`}
      >
        {/* Avatar */}
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-xs font-semibold shadow-sm transition-transform duration-200 group-hover:scale-105 ${
            isAi
              ? "bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-cyan-500/20"
              : "bg-gradient-to-br from-slate-700 to-slate-800 text-slate-200 border border-slate-700/60 shadow-slate-900/20"
          }`}
        >
          {isAi ? (
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round5"
                strokeWidth={2}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          ) : (
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          )}
        </div>

        {/* Message Content */}
        <div
          className={`p-4 rounded-2xl shadow-sm transition-all duration-200 ${
            isAi
              ? "bg-slate-900/90 text-slate-100 border border-slate-800/80 rounded-tl-none shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
              : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-tr-none shadow-[0_4px_20px_rgba(6,182,212,0.15)]"
          }`}
        >
          <div className="flex items-center justify-between gap-4 mb-1">
            <h3
              className={`font-semibold text-[11px] tracking-wide uppercase ${isAi ? "text-cyan-400" : "text-cyan-100/90"}`}
            >
              {isAi ? "Assistant" : "You"}
            </h3>
          </div>
          <p className="text-sm leading-relaxed whitespace-pre-line">
            {message.text}
          </p>
        </div>
      </div>

      {/* Timestamp */}
      <span
        className={`text-[10px] font-medium text-slate-500 px-1 transition-opacity duration-200 ${
          isAi ? "pl-12" : "pr-12"
        }`}
      >
        {message.timestamp}
      </span>
    </div>
  );
};

export default Message;
