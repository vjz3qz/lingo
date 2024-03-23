import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import moment from 'moment';

// Sample data now includes datetime strings
const sampleData = [
  { datetime: '2023-09-01 08:00', y: 1 },
  { datetime: '2023-09-01 09:00', y: 10 },
  { datetime: '2023-09-01 10:00', y: 30 },
  { datetime: '2023-09-01 11:00', y: 50 },
  { datetime: '2023-09-01 12:00', y: 70 },
  { datetime: '2023-09-01 13:00', y: 90 },
  { datetime: '2023-09-01 14:00', y: 100 },
];

export default function ProficiencyPage() {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Language Proficiency Scores
      </Typography>
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
                height={70} // Increase height to accommodate tilted labels
              />
              <YAxis yAxisId="left" scale="linear" domain={['auto', 'auto']} />
              <YAxis yAxisId="right" orientation="right" scale="log" domain={['auto', 'auto']} />
              <Tooltip labelFormatter={(label) => moment(label).format('YYYY-MM-DD HH:mm')} />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="y" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Paper>
    </Container>
  );
}
