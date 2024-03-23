import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

function ProficiencyPage() {
  const [scores, setScores] = useState({
    pastScores: [2, 5.5, 2, 8.5, 1.5, 5],
    currentScore: null, // or the current score if you have it
    highScore: null // or the high score if you have it
  });

  useEffect(() => {
    // Calculate the highest score
    const highScore = Math.max(...scores.pastScores);
    setScores((prevState) => ({
      ...prevState,
      highScore: highScore,
    }));
  }, [scores.pastScores]);

  // Function to update the graph with a new score
  const addNewScore = (newScore) => {
    setScores((prevState) => ({
      pastScores: [...prevState.pastScores, newScore],
      currentScore: newScore,
      highScore: Math.max(prevState.highScore, newScore)
    }));
  };

  // Imagine this function is called when a new score is obtained
  // addNewScore(7); // Add this new score to the graph

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Language Proficiency Scores
      </Typography>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h6" component="h2">
          Current Score: {scores.currentScore}
        </Typography>
        <Typography variant="h6" component="h2">
          Highest Score: {scores.highScore}
        </Typography>
        <LineChart
          xAxis={[{ data: scores.pastScores.map((score, index) => index + 1) }]}
          series={[{ data: scores.pastScores }]}
          height={300}
          margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
          grid={{ vertical: true, horizontal: true }}
        />
        {/* Display past scores here */}
        <Typography variant="body1">
          Past Scores: {scores.pastScores.join(', ')}
        </Typography>
      </Paper>
      {/* Other page content */}
    </Container>
  );
}

export default ProficiencyPage;
