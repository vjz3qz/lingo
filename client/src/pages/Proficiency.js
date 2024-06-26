import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Grid,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Ensure axios is imported

const drawerWidth = 240;

function ProficiencyPage({ session }) {
  const sessionRef = useRef(session);

  // Update the ref whenever the token changes
  useEffect(() => {
    sessionRef.current = session;
  }, [session]);

  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState("spanish");
  const [proficiencyScores, setProficiencyScores] = useState({});

  useEffect(() => {
    // Function to fetch proficiency scores from the server
    async function fetchProficiencyScores(language) {
      try {
        const response = await axios.get(
          `/api/v1/get-proficiency-scores/${language}`,
          {
            headers: {
              Authorization: `Bearer ${sessionRef.current.access_token}`,
            },
          }
        );
        if (response.status === 200) {
          setProficiencyScores((prevScores) => ({
            ...prevScores,
            [language]: response.data.proficiency_scores,
          }));
        } else {
          console.error("Failed to fetch data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching proficiency scores:", error);
      }
    }

    if (!sessionRef.current) {
      navigate("/auth");
    } else {
      fetchProficiencyScores(selectedLanguage);
    }
  }, [selectedLanguage, navigate]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to manage drawer open/close
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const selectedData = proficiencyScores[selectedLanguage] || []; // Fallback to an empty array
  const mostRecentData = selectedData[selectedData.length - 1] || {};
  const mostRecentScore = mostRecentData.y || 0;
  const highestScore = selectedData.length
    ? Math.max(...selectedData.map((s) => s.y))
    : 0;
  const mostRecentFeedback = mostRecentData.feedback || "No data available";

  // Function to determine speaker level
  const getSpeakerLevel = (score) => {
    if (score >= 90) return "Native";
    if (score >= 70) return "Expert";
    if (score >= 40) return "Intermediate";
    return "Novice";
  };
  const speakerLevel = getSpeakerLevel(mostRecentScore);
  return (
    <Box sx={{ display: "flex" }}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={toggleDrawer}
        sx={{ mr: 2 }}
      >
        <MenuIcon />{" "}
      </IconButton>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <List>
          {["spanish", "german", "french"].map((language) => (
            <ListItem
              button
              key={language}
              onClick={() => setSelectedLanguage(language)}
            >
              <ListItemText primary={language} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Container component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" component="h1" gutterBotto align="center">
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
            <Paper elevation={3} sx={{ p: 2, width: "100%", height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={selectedData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="timestamp"
                    angle={-45}
                    textAnchor="end"
                    tick={{ fontSize: 10 }}
                    tickFormatter={(timestamp) => {
                      return moment(
                        timestamp,
                        "YYYY-MM-DDTHH:mm:ss.SSSSSZ"
                      ).format("YYYY-MM-DD HH:mm");
                    }}
                    height={70}
                  />
                  <YAxis
                    yAxisId="left"
                    scale="linear"
                    domain={["auto", "auto"]}
                  />
                  <Tooltip
                    tickFormatter={(timestamp) => {
                      return moment(
                        timestamp,
                        "YYYY-MM-DDTHH:mm:ss.SSSSSZ"
                      ).format("YYYY-MM-DD HH:mm");
                    }}
                  />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="y"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
        <Box
          sx={{
            width: "100%",
            mt: 3,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <IconButton
            color="primary"
            onClick={() => navigate("/home")}
            aria-label="go to home"
          >
            <HomeIcon fontSize="large" /> {/* Use the Home icon */}
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}

export default ProficiencyPage;
