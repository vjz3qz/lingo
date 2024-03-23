import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LanguageLearningForm() {
  const [form, setForm] = useState({
    name: "",
    previous_knowledge: "",
    interests: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    previous_knowledge: false,
    interests: false,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    // Also clear error state upon change
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: false,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
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
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post("/api/v1/chat", form);
      console.log("Server response:", response.data);
      navigate("/home");
    } catch (error) {
      console.error("Submitting form failed:", error);
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
        <Typography variant="h4" component="h1" gutterBottom>
          Language Learning Profile
        </Typography>
        <form onSubmit={handleSubmit}>
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
            sx={{ marginBottom: 2 }}
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
            sx={{ backgroundColor: "#fff", marginBottom: 2 }}
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
            sx={{ backgroundColor: "#fff", marginBottom: 2 }}
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              marginTop: 2,
              bgcolor: "primary.main",
              "&:hover": {
                bgcolor: "primary.dark",
              },
            }}
          >
            Submit Profile
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default LanguageLearningForm;
