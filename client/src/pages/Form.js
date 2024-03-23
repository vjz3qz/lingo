import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material'; // Import Alert for error message display
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LanguageLearningForm() {
  const [form, setForm] = useState({
    name: '',
    previous_knowledge: '',
    interests: '',
  });

  const [errors, setErrors] = useState({
    name: false,
    previous_knowledge: false,
    interests: false,
    general: '', // General error for form submission issues
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
    // Clear error state upon change
    if (errors[name] || errors.general) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: false,
        general: '', // Also clear the general error if any field is modified
      }));
    }
  };

  const validateForm = () => {
    const newErrors = { ...errors, general: '' }; // Reset general error on validation
    let isFormValid = true;
    Object.keys(form).forEach(key => {
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
      const response = await axios.post('/api/v1/chat', form);
      console.log('Server response:', response.data);
      navigate('/home');
    } catch (error) {
      console.error('Submitting form failed:', error);
      // Update state with a general error message
      setErrors(prevErrors => ({
        ...prevErrors,
        general: 'Failed to submit form. Please try again later.' // Or use error.message for more specific errors
      }));
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{
        bgcolor: 'background.paper',
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
          {/* Form fields... */}

          {/* Display a general error message if present */}
          {errors.general && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errors.general}
            </Alert>
          )}

          {/* Submit button... */}
        </form>
      </Box>
    </Container>
  );
}

export default LanguageLearningForm;
