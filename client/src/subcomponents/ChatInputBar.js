import React from "react";

function ChatInputBar({ inputValue, setInputValue, handleSendMessage }) {
  return (
    <div className="chat-bar">
      <input
        type="text"
        className="chat-input"
        placeholder={"Send a message..."}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        // disabled={false}
      />
      <button
        className="chat-send-button"
        onClick={handleSendMessage}
        // disabled={false}
      >
        Send
      </button>
    </div>
  );
}

export default ChatInputBar;
