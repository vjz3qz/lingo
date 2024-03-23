import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';

function HomePage() {
  const navigate = useNavigate();
  const [name, setName] = useState('User'); // Replace 'User' with actual user name
  const [proficiency, setProficiency] = useState('Beginner'); // Replace 'Beginner' with actual proficiency

  useEffect(() => {
    // Fetch and set the user's name and proficiency here
  }, []);

  const handleStartConversation = () => {
    // Logic for starting a conversation
    console.log('Start conversation');
  };

  const handleEditPersonalization = () => {
    navigate('/'); // Navigate to the Form page which is your root URL
  };

  return (
    <Container maxWidth="sm" sx={{
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // Use the full screen height
      textAlign: 'center', // Center text horizontally
    }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Welcome, {name}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Your Current Proficiency
      </Typography>
      <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
        {proficiency} in Spanish
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleStartConversation}
        sx={{ mb: 2, width: '100%' }} // Full width button
      >
        Start Conversation
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleEditPersonalization}
        sx={{ width: '100%' }} // Full width button
      >
        Edit Personalization
      </Button>
    </Container>
  );
}

export default HomePage;