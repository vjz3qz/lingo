import React from "react";
import { Box, IconButton } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import HomeIcon from "@mui/icons-material/Home"; // Import Home icon
import AssessmentIcon from "@mui/icons-material/Assessment"; // Import Proficiency icon
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

function ChatInputBar({
  handleStartRecording,
  handleRecordingStop,
  isRecording,
  handleAnalyze,
}) {
  const navigate = useNavigate(); // Initialize useNavigate hook

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        left: 0,
        p: 2,
        backgroundColor: "background.paper",
        display: "flex",
        justifyContent: "space-evenly", // Adjust to space-evenly for even spacing
      }}
    >
      <IconButton
        color="primary"
        onClick={() => navigate("/home")} // Navigate to home page
        aria-label="go to home"
      >
        <HomeIcon fontSize="large" />
      </IconButton>

      {isRecording ? (
        <IconButton
          color="error"
          onClick={handleRecordingStop}
          aria-label="stop recording"
        >
          <StopIcon fontSize="large" />
        </IconButton>
      ) : (
        <IconButton
          color="primary"
          onClick={handleStartRecording}
          aria-label="start recording"
        >
          <MicIcon fontSize="large" />
        </IconButton>
      )}

      <IconButton
        color="primary"
        onClick={handleAnalyze} // Navigate to proficiency page
        aria-label="go to proficiency page"
      >
        <AssessmentIcon fontSize="large" />
      </IconButton>
    </Box>
  );
}

export default ChatInputBar;
