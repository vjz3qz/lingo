import React, { useState } from 'react';
import { Container, TextField, Button, Select, MenuItem, InputLabel, FormControl, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LanguageLearningForm() {
  const [form, setForm] = useState({
    name: '',
    previous_knowledge: '',
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
    const endpoint = '/api/v1/chat';
    
    try {
      // Axios automatically stringifies the body and sets the content-type header
    //   const response = await axios.post(endpoint, form);

    //   // Axios response has the data property where the server response is contained
    //   console.log('Server response:', response.data);

    const response = { status: 200 };
  
    if (response.status === 200) {
    navigate('/home');
    } else {
    console.error('HTTP error:', response.status);
    }
    } catch (error) {
      console.error('Submitting form failed:', error);
      if (error.response) {
        // The server responded with a status code that falls out of the range of 2xx
        console.error('Server response error:', error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
      }
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
            value={form.previous_knowledge}
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