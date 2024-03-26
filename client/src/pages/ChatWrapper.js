// ChatWrapper.js

import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/Home.css";
import Header from "../ui/Header";
import Chat from "../components/Chat";

function ChatWrapper({ session }) {
  let { language } = useParams();
  const navigate = useNavigate();
  const sessionRef = useRef(session);

  // Update the ref whenever the token changes
  useEffect(() => {
    sessionRef.current = session;
  }, [session]);

  useEffect(() => {
    // Check if the user is authenticated
    if (!sessionRef.current) {
      navigate("/auth");
    }
  }, [navigate]);
  const user = {
    name: "Varun Pasupuleti",
    avatar: "path-to-avatar-image.png",
  };

  return (
    <div className={`app-container`}>
      <Header user={user} />
      <div className="main-container">
        <Chat language={language} session={session} />
      </div>
    </div>
  );
}

export default ChatWrapper;
