import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomButton = styled(Button)({
  fontWeight: 'bold',
  margin: '10px',
  padding: '10px 30px',
  fontSize: '1rem',
  letterSpacing: '0.1rem',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 3px 15px rgba(0,0,0,0.2)',
  }
});

function HomePage() {
  const navigate = useNavigate();
  const [name, setName] = useState('User'); // Replace 'User' with actual user name

  const handleStartConversation = () => {
    // Logic to start a conversation
    console.log('Start conversation');
  };

  const handleEditPersonalization = () => {
    navigate('/form'); // Navigate to the Form page which is your root URL
  };

  const handleProficiency = () => {
    // TODO: Navigate to the Proficiency page
    navigate('/proficiency');
  };

  return (
    <Container maxWidth="sm" sx={{
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      textAlign: 'center',
      backgroundColor: '#3f51b5', // Or any other pleasant blue shade
      color: '#ffffff',
    }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Welcome, {name}
      </Typography>
      <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <CustomButton
          variant="contained"
          color="primary"
          onClick={handleStartConversation}
        >
          Start Conversation
        </CustomButton>
        <CustomButton
          variant="outlined"
          onClick={handleEditPersonalization}
          sx={{ borderColor: '#ffffff', color: '#ffffff', mt: 1 }}
        >
          Edit Personalization
        </CustomButton>
        <CustomButton
          variant="contained"
          onClick={handleProficiency}
          sx={{ backgroundColor: '#f50057', mt: 1 }}
        >
          Proficiency
        </CustomButton>
      </Box>
    </Container>
  );
}

export default HomePage;
