import React from "react";
import { Box, IconButton } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";

function ChatInputBar({ handleStartRecording, handleRecordingStop, isRecording }) {
  return (
    <Box
      sx={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        left: 0,
        p: 2,
        backgroundColor: 'background.paper',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
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
    </Box>
  );
}

export default ChatInputBar;
