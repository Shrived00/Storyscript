import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FitbitIcon from '@mui/icons-material/Fitbit';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const HomeScreen = () => {
    // const navigate = useNavigate();

    // useEffect(() => {
    //     const userInfo = localStorage.getItem("userInfo");
    //     if (userInfo) {
    //         navigate("/main")
    //     }
    // }, [navigate])
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                className="flex justify-center items-center h-screen"
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <FitbitIcon />
                </Avatar>
                <Typography component="h1" variant="h5"

                >
                    Welcome To The Blog!!!
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Link href="/login" variant="body2">
                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Log In
                                </Button>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/register" variant="body2">
                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default HomeScreen;
