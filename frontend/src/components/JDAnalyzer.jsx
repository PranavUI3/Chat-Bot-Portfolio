import React, { useState } from "react";

const JDAnalyzer = () => {
  const [jobDescription, setJobDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(jobDescription);
  };

  return (
    <section className="left-0 w-full bg-white p-6 shadow-lg">
      <div className="mb-5">
        <h2 className="text-2xl font-bold">Job Description Analyzer</h2>
        <p className="text-gray-500 text-sm">
          Paste a job description to analyze your profile.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <label className="block font-medium mb-2" htmlFor="jobDescription">
          Job Description
        </label>

        <textarea
          id="jobDescription"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here..."
          className="w-full h-40 border rounded-lg p-3 resize-none"
        />

        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Analyze
          </button>
        </div>
      </form>
    </section>
  );
};

export default JDAnalyzer;
