import React from "react";
import Message from "./Message";

const ChatWindow = () => {
  const messages = [
    {
      id: 1,
      sender: "ai",
      text: "Hello! I'm your AI Portfolio Assistant. How can I help you?",
    },
    {
      id: 2,
      sender: "user",
      text: "Tell me about your technical skills.",
    },
    {
      id: 3,
      sender: "ai",
      text: "I work with React, Node.js, Express, MongoDB and AI integrations.",
    },
  ];

  return (
    <section className="max-w-4xl mx-auto mt-10 bg-white rounded-2xl shadow-lg border border-gray-200">
      {/* Chat Header */}
      <div className="p-5 border-b border-gray-200">
        <h2 className="text-xl font-bold">AI Assistant</h2>
        <p className="text-sm text-gray-500">
          Ask me anything about my portfolio
        </p>
      </div>

      {/* Messages */}
      {/* Messages */}
      <div className="p-6 space-y-5 min-h-80">
        {messages.map((item) => (
          <Message key={item.id} message={item} />
        ))}
      </div>

      {/* Message Input */}
      <div className="p-5 border-t border-gray-200">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none"
          ></input>

          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl">
            Send
          </button>
        </div>
      </div>
    </section>
  );
};

export default ChatWindow;
