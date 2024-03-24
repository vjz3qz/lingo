import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatWrapper from "./pages/ChatWrapper";
import Form from "./pages/Form";
import Proficiency from "./pages/Proficiency";
import Authentication from "./pages/Authentication";
import { AuthProvider } from "./contexts/AuthenticationProvider";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Authentication />} />
        <Route path="/form" element={<Form />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/chat" element={<ChatWrapper />} />
        <Route path="/proficiency" element={<Proficiency />} />
      </Routes>
    </Router>
  );
}

export default App;
