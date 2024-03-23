// Chat.js

import React, { useState } from "react";
import ChatBubble from "../ui/ChatBubble";
import ChatInputBar from "../subcomponents/ChatInputBar";
// import axios from "axios";

const Chat = ({ user }) => {
  // State Declarations
  const [messages, setMessages] = useState([
    { text: "Hello!", isUserMessage: false },
    { text: "How can I help you today?", isUserMessage: false },
  ]);
  const [inputValue, setInputValue] = useState("");

  // Message Handling Functions
  async function handleSendMessage() {
    if (inputValue.trim()) {
      // const payload = {
      //   user_message: inputValue,
      //   conversation_history: messages.map((m) => m.content),
      // };
      // const result = await axios.post("/api/v1/lingo-chat", payload);
      // const responseMessage = result.data.response;
      const responseMessage = "Hola";
      setMessages([
        ...messages,
        { text: inputValue, isUserMessage: true },
        { text: responseMessage, isUserMessage: false },
      ]);
      setInputValue("");
      setInputValue("");
    }
  }

  // Render Functions
  const ChatBubbles = () => {
    return (
      <div className={`chat-container half-width`}>
        {messages.map((message, index) => (
          <ChatBubble
            key={index}
            timestamp={new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            message={message.text}
            isUserMessage={message.isUserMessage}
          />
        ))}
      </div>
    );
  };

  // Main Render
  return (
    <div className="chat-component">
      <main className={`main-content ${"show-chat"}`}>
        <ChatBubbles />
      </main>
      <div className={`bottom-container ${"half-width"}`}>
        <div className="action-buttons"></div>
        <ChatInputBar
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
