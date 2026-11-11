import { useState } from "react";

import Navbar from "./components/Navbar";
import ChatWindow from "./components/ChatWindow";
import JDAnalyzer from "./components/JDAnalyzer";

function App() {
  return (
    <>
      <Navbar />
      <ChatWindow />
      <JDAnalyzer />
    </>
  );
}

export default App;
