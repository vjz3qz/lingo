// Chat.js
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ChatBubble from "../ui/ChatBubble";
import ChatInputBar from "../subcomponents/ChatInputBar";
import axios from "axios";

const Chat = ({ language, session }) => {
  const [messages, setMessages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  // const [recordingCompleted, setRecordingCompleted] = useState(false);
  // const [audioUrl, setAudioUrl] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const navigate = useNavigate(); // Initialize useNavigate hook

  const startRecording = async () => {
    if (isRecording) return;
    // Request permission to access the microphone
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
      // setRecordingCompleted(false);
    } catch (err) {
      // Handle the error case
      console.error("Could not start recording", err);
    }
  };

  const stopRecording = async () => {
    // Stop the media recorder
    mediaRecorderRef.current.stop();
    setIsRecording(false);

    // Stop each track in the media stream
    mediaRecorderRef.current.stream
      .getTracks()
      .forEach((track) => track.stop());

    // Handler for when recording is stopped
    mediaRecorderRef.current.onstop = async () => {
      const audioRecording = new Blob(audioChunksRef.current, {
        type: "audio/mpeg",
      });
      // const audioUrl = URL.createObjectURL(audioRecording);
      // setAudioUrl(audioUrl);
      setAudioBlob(audioRecording);
      // setRecordingCompleted(true);

      // Reset the chunks array for future recordings
      audioChunksRef.current = [];
    };
    mediaRecorderRef.current = null;
  };

  useEffect(() => {
    const fetchData = async () => {
      const payload = {
        user_message: "",
        language: language,
        conversation_history: [],
      };
      const result = await axios.post("/api/v1/chat", payload, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });
      const responseMessage = result.data.response;

      setMessages([
        ...messages,
        { text: responseMessage, isUserMessage: false },
      ]);
    };

    fetchData();
  }, []);

  // Add useEffect to watch audioBlob changes
  useEffect(() => {
    if (audioBlob) {
      transcribeAudio();
    }
  }, [audioBlob]); // This useEffect depends on audioBlob

  useEffect(() => {
    if (messages.length === 0) return;
    const lastUserMessage = messages[messages.length - 1].isUserMessage;
    if (lastUserMessage) {
      handleReceivedTranscription();
    }
  }, [messages]);

  const transcribeAudio = async () => {
    // Send audio to the backend
    // Ensure audioBlob is not null
    if (!audioBlob) return;

    try {
      const formData = new FormData();
      formData.append("audio", audioBlob, "user_audio.wav");

      const response = await axios.post("/api/v1/transcribe-audio", formData, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });
      console.log(response);
      if (response.status !== 200) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = response.data;

      setMessages([
        ...messages,
        { text: data.transcription, isUserMessage: true },
      ]);
    } catch (error) {
      console.error("Error sending audio:", error);
    }
  };

  // Handle transcription result
  async function handleReceivedTranscription() {
    const payload = {
      language: language,
      conversation_history: messages,
    };
    const response = await axios.post("/api/v1/chat", payload, {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    if (response.status !== 200) {
      console.error(`Error: ${response.statusText}`);
      return;
    }

    const responseMessage = response.data.response;

    setMessages([...messages, { text: responseMessage, isUserMessage: false }]);
  }

  const handleAnalyze = async () => {
    const payload = {
      language: language,
      conversation_history: messages,
    };
    const response = await axios.post("/api/v1/analyze-proficiency", payload, {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    if (response.status !== 200) {
      console.error(`Error: ${response.statusText}`);
      return;
    }

    navigate("/proficiency");
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
          handleRecordingStop={stopRecording}
          isRecording={isRecording}
        />
      </div>
    </div>
  );
};

export default Chat;
