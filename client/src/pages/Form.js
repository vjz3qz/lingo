import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  TextField,
  Typography,
  Box,
  Alert,
  IconButton,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SendIcon from "@mui/icons-material/Send"; // Import the send icon
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LanguageLearningForm({ session }) {
  const sessionRef = useRef(session);

  // Update the ref whenever the token changes
  useEffect(() => {
    sessionRef.current = session;
  }, [session]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    if (!sessionRef.current) {
      navigate("/auth");
    }
  }, [navigate]);

  const [form, setForm] = useState({
    name: "",
    previous_knowledge: "",
    interests: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    previous_knowledge: false,
    interests: false,
    general: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    if (errors[name] || errors.general) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: false,
        general: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = { ...errors, general: "" };
    let isFormValid = true;
    Object.keys(form).forEach((key) => {
      if (!form[key].trim()) {
        newErrors[key] = true;
        isFormValid = false;
      }
    });
    setErrors(newErrors);
    return isFormValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post("/api/v1/update-user", form, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });
      console.log("Server response:", response.data);
      navigate("/home");
    } catch (error) {
      console.error("Submitting form failed:", error);
      let errorMessage = "Failed to submit form. Please try again later.";
      // Check for server not found or network error
      if (!error.response) {
        errorMessage = "Server not found or network error.";
      } else if (error.response.status === 404) {
        errorMessage = "Endpoint not found.";
      } else if (error.response.data && error.response.data.errors) {
        // Assuming the server responds with an object that contains an 'errors' field with specific field validations
        const fieldErrors = error.response.data.errors;
        Object.keys(fieldErrors).forEach((field) => {
          if (form[field] !== undefined) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              [field]: fieldErrors[field], // Set the specific error message for the field
            }));
          }
        });
        return; // Exit the function to avoid overwriting specific field errors with the general error message
      }
      // Set general error message if specific field errors are not set
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: errorMessage,
      }));
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          boxShadow: 1,
          mt: 2,
          mb: 3,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center" // Centers the text
          sx={{
            fontFamily: "Roboto, sans-serif", // Apply the font family (this is already the default for Material-UI)
            fontWeight: 500, // Adjust the font weight as needed
          }}
        >
          Language Learning Profile
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Conditional Alert for displaying general error messages */}
          {errors.general && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errors.general}
            </Alert>
          )}
          <TextField
            fullWidth
            label="What should we call you?"
            name="name"
            value={form.name}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            error={errors.name}
            helperText={errors.name && "This field is required."}
            sx={{ fontFamily: "Roboto, sans-serif", marginBottom: 2 }}
          />

          <TextField
            fullWidth
            label="Specify any previous language knowledge."
            name="previous_knowledge"
            value={form.previous_knowledge}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            multiline
            rows={1}
            error={errors.previous_knowledge}
            helperText={errors.previous_knowledge && "This field is required."}
            sx={{
              fontFamily: "Roboto, sans-serif",
              backgroundColor: "#fff",
              marginBottom: 2,
            }}
          />

          <TextField
            fullWidth
            label="List any of your interests."
            name="interests"
            value={form.interests}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            multiline
            rows={5}
            error={errors.interests}
            helperText={errors.interests && "This field is required."}
            sx={{
              fontFamily: "Roboto, sans-serif",
              backgroundColor: "#fff",
              marginBottom: 2,
            }}
          />

          {/* Submit and Home icon buttons */}
          <Box sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}>
            <IconButton
              color="primary"
              type="submit" // Specify type to submit form
              sx={{ "&:hover": { bgcolor: "primary.dark" } }}
              aria-label="submit profile"
            >
              <SendIcon fontSize="large" />
            </IconButton>
            <IconButton
              color="primary"
              onClick={() => navigate("/home")}
              aria-label="go to home"
            >
              <HomeIcon fontSize="large" />
            </IconButton>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
export default LanguageLearningForm;
