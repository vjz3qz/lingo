// Chat.js
import React, { useState } from "react";
import ChatBubble from "../ui/ChatBubble";
import ChatInputBar from "../subcomponents/ChatInputBar";
import axios from 'axios';

const Chat = ({ user }) => {
  const [messages, setMessages] = useState([
    { text: "Hello!", isUserMessage: false },
    { text: "How can I help you today?", isUserMessage: false },
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);

  const startRecording = async () => {
    if (isRecording) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (event) => {
        setAudioChunks(currentChunks => [...currentChunks, event.data]);
      };
      recorder.onstop = handleRecordingStop; // Attach handleRecordingStop to onstop event
      recorder.start();

      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop(); // This will trigger the onstop event and call handleRecordingStop
      setIsRecording(false);
    }
  };


  // Handle transcription result
  async function handleReceivedTranscription(transcribedText){
     const payload = {
        user_message: transcribedText.trim(),
        conversation_history: messages.map((m) => m.content),
      };
      const result = await axios.post("/api/v1/chat", payload);
      const responseMessage = result.data.response;

      setMessages([
        ...messages,
        { text: transcribedText, isUserMessage: true },
        { text: responseMessage, isUserMessage: false },
      ]);
  };

  const handleRecordingStop = async () => {
    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
    setAudioChunks([]);

    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'user_audio.wav');

      const response = await fetch('/api/v1/transcribe-audio', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      handleReceivedTranscription(data.transcription);
    } catch (error) {
      console.error('Error sending audio:', error);
    }
  };


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
          handleStartRecording={startRecording}
          handleRecordingStop={stopRecording} // This should match what you define in ChatInputBar props
          isRecording={isRecording}
        />
      </div>
    </div>
  );
};

export default Chat;
