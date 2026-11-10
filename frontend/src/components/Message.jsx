import React from "react";

const Message = ({ message }) => {
  const isAi = message.sender === "ai";

  return (
    <div
      className={`flex flex-col gap-1 w-full ${isAi ? "items-start" : "items-end"}`}
    >
      {/* Message Row */}
      <div
        className={`flex gap-3 items-start max-w-[85%] ${isAi ? "flex-row" : "flex-row-reverse"}`}
      >
        {/* Avatar */}
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-medium ${
            isAi
              ? "bg-blue-100 text-blue-700"
              : "bg-emerald-100 text-emerald-700"
          }`}
        >
          {isAi ? "AI" : "You"}
        </div>

        {/* Message Content */}
        <div
          className={`p-4 rounded-xl ${
            isAi
              ? "bg-gray-100 text-gray-800 rounded-tl-none"
              : "bg-emerald-600 text-white rounded-tr-none"
          }`}
        >
          <h3 className="font-semibold text-xs opacity-75 mb-1">
            {isAi ? "Assistant" : "User"}
          </h3>
          <p className="text-sm leading-relaxed">{message.text}</p>
        </div>
      </div>

      {/* Timestamp */}
      <span
        className={`text-xs text-gray-400 ${isAi ? "pl-13" : "pr-13"}`}
      >
        {message.timestamp}
      </span>
    </div>
  );
};

export default Message;
