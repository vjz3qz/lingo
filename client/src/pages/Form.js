import React, { useState } from 'react';
import { Container, TextField, Button, Select, MenuItem, InputLabel, FormControl, Typography } from '@mui/material';

function LanguageLearningForm() {
  const [form, setForm] = useState({
    name: '',
    language: '',
    reason: '',
    previousKnowledge: '',
    interests: '',
    learningGoals: '',
    timeCommitment: '',
    preferredLearningStyle: '',
    proficiencyLevel: '',
    learningContext: '',
    // ... add additional state fields as needed
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Replace with your chatbot backend API endpoint
    const chatBotAPIEndpoint = 'https://yourbackend.domain/api/messages';

    try {
      const response = await fetch(chatBotAPIEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include other headers as required, like authorization tokens
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Handle response data
      console.log(data);
      // Here you can redirect the user to the chat interface or perform other actions
    } catch (error) {
      console.error('Error submitting form to chatbot:', error);
      // Handle errors, such as displaying a message to the user
    }
  };

  // Add additional form fields as needed

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Language Learning Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        {/* ... */}
        
        {/* Language Selector */}
        {/* ... */}
        
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
        {/* ... */}
        
        {/* Interests */}
        {/* ... */}
        
        {/* Learning Goals */}
        {/* ... */}
        
        {/* Time Commitment */}
        {/* ... */}
        
        {/* Preferred Learning Style */}
        {/* ... */}
        
        {/* Proficiency Level */}
        {/* ... */}
        
        {/* Learning Context */}
        {/* ... */}
        
        {/* Submit Button */}
        <Button variant="contained" color="primary" type="submit" style={{ marginTop: '20px' }}>
          Start Learning
        </Button>
      </form>
    </Container>
  );
}

export default LanguageLearningForm;
