import React, { useState } from 'react';
import { Container, Typography, Paper, Box, Drawer, List, ListItem, ListItemText, Grid, IconButton, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import moment from 'moment';
import { useNavigate } from 'react-router-dom'; // Import useNavigate



// Sample data for each language
const languageData = {
    Spanish: [
        { datetime: '2023-09-01 08:00', y: 1, feedback: 'Getting started' },
        { datetime: '2023-09-01 09:00', y: 10, feedback: 'Improvement visible' },
        { datetime: '2023-09-01 10:00', y: 30, feedback: 'Good progress' },
        { datetime: '2023-09-01 14:00', y: 90, feedback: 'Excellent work' },
    ],
    German: [
        { datetime: '2023-09-01 09:30', y: 15, feedback: 'Improving' },
        { datetime: '2023-09-01 09:45', y: 5, feedback: 'Improvement visible' },
        { datetime: '2023-09-01 10:00', y: 25, feedback: 'Good progress' },
        { datetime: '2023-09-01 14:00', y: 45, feedback: 'Excellent work' },
    ],
    French: [
        { datetime: '2023-09-02 09:30', y: 40, feedback: 'Excellent' },
        
    ],
};

const drawerWidth = 240;

function ProficiencyPage() {
    const navigate = useNavigate(); // Create an instance of useNavigate

    const [selectedLanguage, setSelectedLanguage] = useState('Spanish');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to manage drawer open/close

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };


    const selectedData = languageData[selectedLanguage];
    const mostRecentData = selectedData[selectedData.length - 1] || {};
    const mostRecentScore = mostRecentData.y;
    const highestScore = Math.max(...selectedData.map(s => s.y));
    const mostRecentFeedback = mostRecentData.feedback;

    // Determine speaker level based on the most recent score
    const getSpeakerLevel = (score) => {
        if (score >= 90) return 'Native';
        if (score >= 70) return 'Expert';
        if (score >= 40) return 'Intermediate';
        return 'Novice';
    };
    const speakerLevel = getSpeakerLevel(mostRecentScore);

    return (
    <Box sx={{ display: 'flex' }}>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
        >
        <MenuIcon /> {/* Replace MenuIcon with ArrowForwardIosIcon if you prefer an arrow */}
        </IconButton>
        <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={toggleDrawer}
            sx={{
                width: drawerWidth,
                '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
            }}
        >
        <List>
            {['Spanish', 'German', 'French'].map((language) => (
            <ListItem button key={language} onClick={() => setSelectedLanguage(language)}>
                <ListItemText primary={language} />
            </ListItem>
            ))}
        </List>
        </Drawer>
        <Container component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
            Language Proficiency: {selectedLanguage}
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
            <Paper elevation={3} sx={{ p: 2, width: '100%', height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                <LineChart data={selectedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
            </Paper>
            </Grid>
        </Grid>
        <Box sx={{ width: '100%', mt: 3, display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" color="primary" onClick={() => navigate('/home')}>
            Back to Home
            </Button>
        </Box>
        </Container>
    </Box>
    );
    }

    export default ProficiencyPage;
