import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import ChatWrapper from "./pages/ChatWrapper";
import Form from "./pages/Form";
import Proficiency from "./pages/Proficiency";
import Authentication from "./pages/Authentication";

function App() {
  const [session, setSession] = useState(null);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route
          path="/auth"
          element={<Authentication session={session} setSession={setSession} />}
        />
        <Route path="/form" element={<Form session={session} />} />
        <Route path="/home" element={<Home session={session} />} />
        <Route
          path="/chat/:language"
          element={<ChatWrapper session={session} />}
        />
        <Route
          path="/proficiency"
          element={<Proficiency session={session} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
