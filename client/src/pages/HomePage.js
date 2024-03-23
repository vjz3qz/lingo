import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, styled } from '@mui/material';

const FullScreenContainer = styled(Box)({
  height: '100vh',
  width: '100vw',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff', // White background for a clean look
  color: '#333', // Darker text for contrast
  textAlign: 'center',
  padding: '20px',
});

const CustomButton = styled(Button)({
  fontWeight: 600,
  borderRadius: '20px', // Softly rounded corners for a modern feel
  textTransform: 'none',
  padding: '12px 36px',
  fontSize: '1.1rem', // Slightly larger font size
  margin: '10px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Subtle shadow for depth
  '&:hover': {
    boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
  },
  '&.MuiButton-contained': {
    backgroundColor: '#e0e0e0', // Light grey for a soft appearance
    color: '#333',
  },
});

const ActionButtonGroup = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  marginTop: '20px',
});

function HomePage() {
  const navigate = useNavigate();
  const [name, setName] = useState('User'); // Replace 'User' with the actual user name from auth

  const handleStartConversation = () => {
    navigate('/conversation'); // Replace with actual route
  };

  const handleEditPersonalization = () => {
    navigate('/form'); // Replace with actual route
  };

  const handleProficiency = () => {
    navigate('/proficiency'); // Replace with actual route
  };

  return (
    <FullScreenContainer>
      <Typography variant="h4" sx={{ fontWeight: '700', mb: 2 }}>
        Welcome, {name}
      </Typography>
      <CustomButton variant="contained" onClick={handleStartConversation} sx={{ maxWidth: '300px', width: '100%' }}>
        Start Conversation
      </CustomButton>
      <ActionButtonGroup>
        <CustomButton variant="outlined" onClick={handleEditPersonalization}>
          Edit Personalization
        </CustomButton>
        <CustomButton variant="outlined" onClick={handleProficiency}>
          Proficiency
        </CustomButton>
      </ActionButtonGroup>
    </FullScreenContainer>
  );
}

export default HomePage;
