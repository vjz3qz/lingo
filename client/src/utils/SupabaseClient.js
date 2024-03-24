// supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ggqxyucbtqxzubhqavlk.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdncXh5dWNidHF4enViaHFhdmxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEyMTU1MjAsImV4cCI6MjAyNjc5MTUyMH0.UFUd28pIaBKzn-f0JH9fuoU0FkqifM7nDyQ9bWKtFOo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
