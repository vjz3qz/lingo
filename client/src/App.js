import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChatWrapper from "./pages/ChatWrapper";
import Form from './pages/Form';
import Proficiency from './pages/Proficiency';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/form" element={<Form />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/chat" element = {<ChatWrapper />} />
        <Route path="/proficiency" element = {<Proficiency />} />
      </Routes>
    </Router>
  );
}

export default App;

