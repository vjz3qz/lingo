// ChatWrapper.js

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import Header from "../ui/Header";
import Chat from "../components/Chat";

function ChatWrapper({ session }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    if (!session) {
      navigate("/auth");
    }
  }, []);
  const user = {
    name: "Varun Pasupuleti",
    avatar: "path-to-avatar-image.png",
  };

  return (
    <div className={`app-container`}>
      <Header user={user} />
      <div className="main-container">
        <Chat user={user} />
      </div>
    </div>
  );
}

export default ChatWrapper;
