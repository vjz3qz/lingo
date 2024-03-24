import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";

export default function Authentication({ session, setSession }) {
  const navigate = useNavigate();

  const supabase = createClient(
    "https://ggqxyucbtqxzubhqavlk.supabase.co", // Use the environment variable for the URL
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdncXh5dWNidHF4enViaHFhdmxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEyMTU1MjAsImV4cCI6MjAyNjc5MTUyMH0.UFUd28pIaBKzn-f0JH9fuoU0FkqifM7nDyQ9bWKtFOo" // Use the environment variable for the key
  );

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        navigate("/home"); // Navigate to /home if there is an active session
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        navigate("/home"); // Navigate to /home if there is an active session
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <div
        style={{
          width: "60%",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "10px",
        }}
      >
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      </div>
    );
  } else {
    return <div>Logged in!</div>;
  }
}
