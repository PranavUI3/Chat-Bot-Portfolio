import { useState } from "react";

import Navbar from "./components/Navbar";
import ChatWindow from "./components/ChatWindow";
import Message from "./components/Message";

function App() {
  return (
    <>
      <Navbar />
      <ChatWindow />
    </>
  );
}

export default App;
