import React, { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ggqxyucbtqxzubhqavlk.supabase.co", // Use the environment variable for the URL
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdncXh5dWNidHF4enViaHFhdmxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEyMTU1MjAsImV4cCI6MjAyNjc5MTUyMH0.UFUd28pIaBKzn-f0JH9fuoU0FkqifM7nDyQ9bWKtFOo" // Use the environment variable for the key
);

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Retrieve the current session and set up a subscription for session changes
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const value = { session, setSession };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
