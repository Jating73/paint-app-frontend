import React from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),
        backgroundColor: '#f8f8f8', // add a background color
        backgroundImage: 'linear-gradient(180deg, #cfd9df, #e2ebf0, #edf6f9)', // add a gradient background
    },
    heading: {
        marginBottom: theme.spacing(2),
        fontSize: '48px', // increase the font size
        fontFamily: 'Indie Flower', // use a more playful font
        textShadow: '2px 2px #eee', // add a subtle text shadow
    },
    image: {
        width: '100%',
        maxWidth: '800px',
        marginBottom: theme.spacing(4),
    },
    button: {
        marginTop: theme.spacing(2),
        borderRadius: '30px', // make the button more rounded
        padding: '12px 48px',
        background: '#ff6347', // change the button color
        color: 'white',
        fontSize: '18px',
        fontWeight: 'bold',
        transition: 'all 0.3s ease-in-out', // add a transition effect
        '&:hover': {
            background: '#d43f2e', // add a hover effect
            transform: 'scale(1.05)',
            boxShadow: '2px 2px 4px rgba(0,0,0,0.4)',
        },
    },
}));

function HomePage() {
    const classes = useStyles();
    const navigate = useNavigate();

    const handleStart = () => {
        navigate('/login');
    };

    return (
        <Box className={classes.root}>
            <Typography variant="h2" className={classes.heading}>
                Welcome to My Paint App!
            </Typography>
            <img src={`${process.env.PUBLIC_URL}/images/painting.jpg`} alt="painting" className={classes.image} /> {/* add an image */}
            <Typography variant="body1">
                Our app lets you unleash your creativity and express yourself through digital art.
            </Typography>
            <Button variant="contained" color="primary" className={classes.button} onClick={handleStart}>
                Get Started
            </Button>
        </Box>
    );
}

export default HomePage;
