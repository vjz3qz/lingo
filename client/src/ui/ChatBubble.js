// ChatBubble.js

import React from "react";
import "../styles/ChatBubble.css"; // Ensure you have the corresponding CSS file

const ChatBubble = ({ message, isUserMessage, timestamp, logo }) => {
  const bubbleClass = isUserMessage
    ? "chat-bubble user-bubble"
    : "chat-bubble bot-bubble";

  return (
    <div className={bubbleClass}>
      {!isUserMessage && logo && <img src={logo} alt="Logo" className="logo" />}
      <div className="timestamp">{timestamp}</div>
      <div className="message-text">{message}</div>
    </div>
  );
};

export default ChatBubble;
