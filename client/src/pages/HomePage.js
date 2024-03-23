import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';

function HomePage() {
  const [name, setName] = useState('User'); // Replace 'User' with actual user name from your authentication logic or state
  const [proficiency, setProficiency] = useState('Beginner'); // Replace 'Beginner' with actual proficiency from user data

  useEffect(() => {
    // You can fetch the user's name and proficiency from the database or local storage here
    // and update the state accordingly.
  }, []);

  const handleStartConversation = () => {
    // Implement the logic to start a conversation with the AI
    console.log('Start conversation');
  };

  const handleEditPersonalization = () => {
    // Implement the logic to edit personalization
    console.log('Edit personalization');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome, {name}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 4 }}>
        <Typography variant="subtitle1" gutterBottom>
          Your Current Proficiency
        </Typography>
        <Typography variant="h5" gutterBottom>
          {proficiency} in Spanish
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleStartConversation}
          sx={{ mt: 2, mb: 1 }}
        >
          Start Conversation
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleEditPersonalization}
          sx={{ mt: 1 }}
        >
          Edit Personalization
        </Button>
      </Box>
    </Container>
  );
}

export default HomePage;
