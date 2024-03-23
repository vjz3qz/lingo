import React from 'react';
import { Container, Typography, Paper, Box, Grid } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import moment from 'moment';

const sampleData = [
  // Assuming each data point includes a feedback property for the most recent feedback
  { datetime: '2023-09-01 08:00', y: 1, feedback: 'Getting started' },
  { datetime: '2023-09-01 09:00', y: 10, feedback: 'Improvement visible' },
  { datetime: '2023-09-01 10:00', y: 30, feedback: 'Good progress' },
  // Additional data points
  { datetime: '2023-09-01 14:00', y: 100, feedback: 'Excellent achievement' },
];

// Function to determine speaker level based on score
const getSpeakerLevel = (score) => {
    if (score >= 90) return 'Native';
    if (score >= 70) return 'Expert';
    if (score >= 40) return 'Intermediate';
    return 'Novice';
  };

function ProficiencyPage() {
  // Calculate highest score and most recent score and feedback and speakerLevel
  const highestScore = Math.max(...sampleData.map(s => s.y));
  const mostRecentData = sampleData[sampleData.length - 1];
  const mostRecentScore = mostRecentData.y;
  const mostRecentFeedback = mostRecentData.feedback;
  const speakerLevel = getSpeakerLevel(mostRecentScore);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Language Proficiency Scores
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Most Recent Score: {mostRecentScore}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Highest Score: {highestScore}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Speaker Level: {speakerLevel}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Most Recent Feedback: {mostRecentFeedback}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box sx={{ width: '100%', height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sampleData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="datetime"
                    angle={-45}
                    textAnchor="end"
                    tick={{ fontSize: 10 }}
                    tickFormatter={(datetime) => moment(datetime).format('YYYY-MM-DD HH:mm')}
                    height={70}
                  />
                  <YAxis yAxisId="left" scale="linear" domain={['auto', 'auto']} />
                  <Tooltip labelFormatter={(label) => moment(label).format('YYYY-MM-DD HH:mm')} />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="y" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProficiencyPage;