// ChatWrapper.js

import React from "react";
import "../styles/Home.css";
import Header from "../ui/Header";
import Chat from "../components/Chat";

const ChatWrapper = () => {
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
};

export default ChatWrapper;
