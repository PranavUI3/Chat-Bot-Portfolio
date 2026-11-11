import React from "react";
import Message from "./Message";

const ChatWindow = ({ messages }) => {
  return (
    <section className="h-[50%] max-w-4xl mx-auto mt-10 rounded-2xl shadow-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-300">
      
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
            <div className="absolute -inset-0.5 rounded-full bg-emerald-500/30 blur-xs"></div>
          </div>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 tracking-wide">
            AI Assistant
          </h2>
        </div>
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800/40">
          Online
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="p-6 space-y-6 max-h-150 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800 bg-slate-50/30 dark:bg-slate-950/20">
        {messages && messages.length > 0 ? (
          messages.map((message) => (
            <Message key={message.id} message={message} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-slate-400 dark:text-slate-600">
            <p className="text-sm">No messages yet. Start a conversation!</p>
          </div>
        )}
      </div>

    </section>
  );
};

export default ChatWindow;