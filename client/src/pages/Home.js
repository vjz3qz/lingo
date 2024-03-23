// Home.js

import React, { useState } from "react";
import "../styles/Home.css";
import Header from "../ui/Header";
import Chat from "../components/Chat";

const Home = () => {
  const user = {
    name: "Rahul Kumar",
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

export default Home;
