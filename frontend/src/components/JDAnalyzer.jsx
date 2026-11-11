import React, { useState } from "react";

const JDAnalyzer = ({ onAnalyze }) => {
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!jobDescription.trim() || isAnalyzing) return;

    setIsAnalyzing(true);
    if (onAnalyze) {
      onAnalyze(jobDescription);
    }
    // Optional timeout fallback if parent handler is async
    setTimeout(() => setIsAnalyzing(false), 1200);
  };

  return (
    <section className="fixed bottom-0 left-0 w-full bg-slate-900/80 backdrop-blur-xl border-t border-slate-800/80 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] px-4 py-5 z-50 transition-all duration-300">
      
      {/* Background Accent Glow */}
      <div className="absolute inset-0 bg-linear-to-r from-cyan-500/5 via-indigo-500/5 to-purple-500/5 pointer-events-none" />

      <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto">
        
        {/* Label Header */}
        <div className="flex items-center justify-between mb-2.5">
          <label
            htmlFor="jobDescription"
            className="flex items-center gap-2 text-sm font-semibold text-slate-200 tracking-wide"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            Job Description
            <span className="text-xs font-normal text-slate-400 border-l border-slate-700 pl-2.5">
              Paste the role target specifications
            </span>
          </label>
          
          <span className="text-[11px] font-mono text-cyan-400/80 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-800/40 hidden sm:inline-block">
            {jobDescription.length} chars
          </span>
        </div>

        {/* Input & Button Container */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch">
          
          <div className="relative flex-1 group">
            <textarea
              id="jobDescription"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the complete job description here to extract key requirements..."
              rows={3}
              className="w-full resize-none rounded-xl border border-slate-700/80 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all duration-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:bg-slate-950/90 group-hover:border-slate-600 scrollbar-thin scrollbar-thumb-slate-800"
            />
          </div>

          <button
            type="submit"
            disabled={!jobDescription.trim() || isAnalyzing}
            className="sm:self-end h-12 sm:h-auto flex items-center justify-center gap-2.5 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:from-cyan-400 hover:to-blue-500 hover:shadow-cyan-500/35 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-cyan-500 disabled:hover:to-blue-600 disabled:shadow-none"
          >
            {isAnalyzing ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <span>Analyze JD</span>
                <span className="text-base leading-none transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </>
            )}
          </button>

        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between mt-2.5 px-1">
          <p className="text-xs text-slate-400 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Evaluates matching technical stack & qualifications instantly.
          </p>
        </div>

      </form>
    </section>
  );
};

export default JDAnalyzer;