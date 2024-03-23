import React, { useState } from 'react';
import { Container, TextField, Button, Select, MenuItem, InputLabel, FormControl, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LanguageLearningForm() {
  const [form, setForm] = useState({
    name: '',
    previousKnowledge: '',
    interests: '',

  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const endpoint = '/chat';
    
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include other headers as required, e.g., authorization tokens
        },
        body: JSON.stringify(form),
      });
  
      if (response.ok) {
        // If the server responds with a success code, redirect to /home
        navigate('/home');
      } else {
        console.error('HTTP error:', response.status);
        // Optionally, implement error handling logic here
      }
    } catch (error) {
      console.error('Submitting form failed:', error);
      // Optionally, implement error handling logic here
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{
        bgcolor: 'background.paper', // or any light shade color
        p: 4,
        borderRadius: 2,
        boxShadow: 1,
        mt: 2,
        mb: 3,
      }}>
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
            variant="outlined"
            sx={{
              marginBottom: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.23)', // default border color
                },
                '&:hover fieldset': {
                  borderColor: 'primary.main', // border color on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main', // border color when focused
                },
              },
            }}
          />

         {/* Previous Language Knowledge */}
         <TextField
            fullWidth
            label="Specify any previous language knowledge."
            name="previousKnowledge"
            value={form.previousKnowledge}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            multiline
            rows={1} // Adjust the number of rows as needed for this field
            sx={{ backgroundColor: '#fff', marginBottom: 2 }}
          />

          
          {/* Interests */}
          <TextField
            fullWidth
            label="List any of your interests."
            name="interests"
            value={form.interests}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            multiline
            rows={4} // Increased size for this field to accommodate more text
            sx={{ backgroundColor: '#fff', marginBottom: 2 }}
          />

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              marginTop: 2,
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.dark',
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