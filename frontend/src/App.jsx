
import { useState } from "react";

import Navbar from "./components/Navbar";
import ChatWindow from "./components/ChatWindow";
import JDAnalyzer from "./components/JDAnalyzer";
import { analyzeJobDescription } from "./services/api";

function App() {
  const [messages, setMessages] = useState([]);

  const handleAnalyze = async (jobDescription) => {

    // Add user's message
    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: jobDescription,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      // Call backend API
      const result = await analyzeJobDescription(jobDescription);

      // Validate backend response
      if (
        !result ||
        result.success !== true ||
        !result.analysis ||
        typeof result.analysis !== "object"
      ) {
        throw new Error("Backend returned an invalid analysis response.");
      }

      const analysis = result.analysis;

      // Convert JSON analysis into readable text
      const analysisText = `
OVERALL SUITABILITY: ${analysis.overall_suitability?.toUpperCase() ?? "Not available"}

${analysis.overall_assessment ?? "No overall assessment provided."}

STRENGTHS:
${(analysis.strengths ?? []).map((item) => `• ${item}`).join("\n")}

SKILL GAPS:
${(analysis.gaps ?? []).map((item) => `• ${item}`).join("\n")}

RECOMMENDATIONS:
${(analysis.recommendations ?? []).map((item) => `• ${item}`).join("\n")}
`;

      // Add AI response
      const aiMessage = {
        id: Date.now() + 1,
        sender: "ai",
        text: analysisText,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {

      console.error("Analysis error:", error);

      const errorMessage = {
        id: Date.now() + 1,
        sender: "ai",
        text: `Something went wrong: ${error.message}`,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <>
      <Navbar />

      <ChatWindow messages={messages} />

      <JDAnalyzer onAnalyze={handleAnalyze} />
    </>
  );
}

export default App;
