// ChatWrapper.js

import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/Home.css";
import Header from "../ui/Header";
import Chat from "../components/Chat";

function ChatWrapper({ session }) {
  let { language } = useParams();
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
        <Chat language={language} session={session} />
      </div>
    </div>
  );
}

export default ChatWrapper;
