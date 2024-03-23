import React from 'react';
import { Typography, Button, Container, Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function HomePage() {
  const classes = useStyles();
  const [name, setName] = React.useState('Cole'); // You will get the name from your auth context or user state
  const [proficiency, setProficiency] = React.useState('Beginner'); // This should come from user data

  // Dummy function for editing personalization, should link to actual route or state change
  const handleEditPersonalization = () => {
    console.log('Edit personalization clicked');
  };

  // Dummy function for starting a conversation, should link to actual functionality
  const handleStartConversation = () => {
    console.log('Start conversation clicked');
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <Paper elevation={3} className={classes.paper}>
        <Typography component="h1" variant="h5">
          Welcome, {name}
        </Typography>
        <Box my={2}>
          <Typography component="p" variant="body1">
            PROFICIENCY
          </Typography>
          <Typography component="p" variant="subtitle1">
            {proficiency} in Spanish
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleStartConversation}
        >
          Start Conversation
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          className={classes.button}
          onClick={handleEditPersonalization}
        >
          Edit Personalization
        </Button>
      </Paper>
    </Container>
  );
}

export default HomePage;