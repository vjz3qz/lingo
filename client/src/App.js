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
import { createClient } from "@supabase/supabase-js";

function App() {
  const [session, setSession] = useState(null);

  const supabase = createClient(
    "https://ggqxyucbtqxzubhqavlk.supabase.co", // Use the environment variable for the URL
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdncXh5dWNidHF4enViaHFhdmxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEyMTU1MjAsImV4cCI6MjAyNjc5MTUyMH0.UFUd28pIaBKzn-f0JH9fuoU0FkqifM7nDyQ9bWKtFOo" // Use the environment variable for the key
  );
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route
          path="/auth"
          element={
            <Authentication
              supabase={supabase}
              session={session}
              setSession={setSession}
            />
          }
        />
        <Route path="/form" element={<Form session={session} />} />
        <Route
          path="/home"
          element={<Home supabase={supabase} session={session} />}
        />
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
