import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";

function LanguageLearningForm() {
  const [form, setForm] = useState({
    name: "",
    language: "",
    reason: "",
    previousKnowledge: "",
    interests: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Here you would send the form data to your backend
    // For now, let's just log it to the console
    console.log(form);

    // const endpoint = '/chat';
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Language Learning Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <TextField
          fullWidth
          label="What should we call you?"
          name="name"
          value={form.name}
          onChange={handleChange}
          margin="normal"
        />

        {/* Language Selector */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="language-selector-label">
            Select the language you are trying to learn
          </InputLabel>
          <Select
            labelId="language-selector-label"
            name="language"
            value={form.language}
            onChange={handleChange}
          >
            <MenuItem value="Spanish">Spanish</MenuItem>
            {/* Add more languages here */}
          </Select>
        </FormControl>

        {/* Reason for Learning */}
        <TextField
          fullWidth
          label="Why are you looking to practice this language?"
          name="reason"
          value={form.reason}
          onChange={handleChange}
          margin="normal"
        />

        {/* Previous Language Knowledge */}
        <TextField
          fullWidth
          label="Specify any previous language knowledge."
          name="previousKnowledge"
          value={form.previousKnowledge}
          onChange={handleChange}
          margin="normal"
        />

        {/* Interests */}
        <TextField
          fullWidth
          label="List any of your interests."
          name="interests"
          value={form.interests}
          onChange={handleChange}
          margin="normal"
        />

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: "20px" }}
        >
          Submit Profile
        </Button>
      </form>
    </Container>
  );
}

export default LanguageLearningForm;
