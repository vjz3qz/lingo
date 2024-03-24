import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, styled } from "@mui/material";
import axios from "axios";

// Language options
const languages = ["Spanish", "German", "French"];

const FullScreenContainer = styled(Box)({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#fff",
});

const CustomButton = styled(Button)(({ theme }) => ({
  fontWeight: "bold",
  borderRadius: "20px",
  padding: "10px 30px",
  fontSize: "1rem",
  letterSpacing: "0.1rem",
  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0px 3px 15px rgba(0,0,0,0.2)",
  },
  margin: "0 10px",
  "&.MuiButton-contained": {
    color: "#3f51b5",
    backgroundColor: "#ffffff",
  },
  "&.MuiButton-outlined": {
    color: "#3f51b5",
    borderColor: "#3f51b5",
  },
}));

const LanguageButton = styled(CustomButton)({
  position: "relative",
  padding: "20px 40px",
  overflow: "hidden",
  backgroundColor: "#e3f2fd",
  "&:hover": {
    backgroundColor: "#bbdefb",
  },
  fontSize: "1.5rem", // Larger font size
  width: "300px", // Increased width
  height: "80px", // Increased height
});

const LanguageOption = styled(Typography)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  whiteSpace: "nowrap",
  userSelect: "none",
  fontSize: "1.5rem", // Larger font size
  width: "100%", // Full width to contain the text
  textAlign: "center",
  visibility: "hidden",
  opacity: 0,
  transition: "visibility 0s, opacity 0.5s linear",
});

function Home({ session }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    if (!session) {
      navigate("/auth");
    }
  }, []);
  const [selectedLanguageIndex, setSelectedLanguageIndex] = useState(0);
  const languageButtonRef = useRef(null);

  useEffect(() => {
    const handleRotation = () => {
      setSelectedLanguageIndex((prevIndex) =>
        prevIndex === languages.length - 1 ? 0 : prevIndex + 1
      );
    };

    let intervalId;

    if (languageButtonRef.current) {
      languageButtonRef.current.addEventListener("mouseenter", () => {
        intervalId = setInterval(handleRotation, 1000);
      });

      languageButtonRef.current.addEventListener("mouseleave", () => {
        clearInterval(intervalId);
        setSelectedLanguageIndex(0);
      });
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  //   const handleStartConversation = () => {
  //     navigate(`/conversation/${languages[selectedLanguageIndex].toLowerCase()}`);
  //   };

  const handleStartConversation = async () => {
    const language = languages[selectedLanguageIndex].toLowerCase();

    try {
      // Send the selected language to the server
      // Navigate to the chat page after successfully sending the data
      navigate(`/chat/${language}`);
    } catch (error) {
      console.error("Starting conversation failed:", error);
    }
  };

  return (
    <FullScreenContainer>
      <Typography variant="h3" gutterBottom>
        Welcome, User
      </Typography>
      <LanguageButton ref={languageButtonRef} onClick={handleStartConversation}>
        {languages.map((language, index) => (
          <LanguageOption
            key={language}
            style={{
              visibility:
                selectedLanguageIndex === index ? "visible" : "hidden",
              opacity: selectedLanguageIndex === index ? 1 : 0,
            }}
          >
            {language}
          </LanguageOption>
        ))}
      </LanguageButton>
      <Box sx={{ display: "flex", flexDirection: "row", mt: 4 }}>
        <CustomButton variant="outlined" onClick={() => navigate("/form")}>
          Edit Personalization
        </CustomButton>
        <CustomButton
          variant="outlined"
          onClick={() => navigate("/proficiency")}
        >
          Proficiency
        </CustomButton>
      </Box>
    </FullScreenContainer>
  );
}

export default Home;
