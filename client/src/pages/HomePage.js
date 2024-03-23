import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function HomePage() {
  const navigate = useNavigate();
  const [name, setName] = useState('User'); // Replace 'User' with actual user name
  const [selectedLanguage, setSelectedLanguage] = useState('Spanish'); // Default selected language
  const [proficiencyLevels, setProficiencyLevels] = useState({
    Spanish: 'Beginner',
    German: 'Intermediate',
    French: 'Advanced'
    // Populate this object with actual data from your backend or state management
  });

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleStartConversation = () => {
    console.log('Start conversation');
  };

  const handleEditPersonalization = () => {
    navigate('/form'); // Navigate to the Form page which is your root URL
  };

  return (
    <Container maxWidth="sm" sx={{
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      textAlign: 'center',
    }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Welcome, {name}
      </Typography>
      <Box sx={{ mb: 4 }}>
        <FormControl fullWidth>
          <InputLabel id="language-select-label">Select a Language</InputLabel>
          <Select
            labelId="language-select-label"
            value={selectedLanguage}
            label="Select a Language"
            onChange={handleLanguageChange}
            sx={{ mb: 2 }}
          >
            <MenuItem value="Spanish">Spanish</MenuItem>
            <MenuItem value="German">German</MenuItem>
            <MenuItem value="French">French</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="h6" gutterBottom>
          Your Proficiency: {proficiencyLevels[selectedLanguage]}
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleStartConversation}
        sx={{ mb: 2, width: '100%' }}
      >
        Start Conversation
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleEditPersonalization}
        sx={{ width: '100%' }}
      >
        Edit Personalization
      </Button>
    </Container>
  );
}

export default HomePage;
