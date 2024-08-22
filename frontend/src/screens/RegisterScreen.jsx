import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';

const RegisterScreen = () => {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();



    const dispatch = useDispatch();
    const userRegister = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userRegister;


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmpassword) {
            setMessage("Password Do not match")
        } else {
            dispatch(register(email, password, name));
        }
    }

    useEffect(() => {
        if (userInfo) {
            navigate('/main');

        }
    }, [navigate, userInfo])
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                {loading && <Loading />}

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    {error && <ErrorMessage>{error}</ErrorMessage>}

                    {message && <ErrorMessage>{message}</ErrorMessage>}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Username"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        value={name} onChange={(e) => setName(e.target.value)} />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="confirmPassword"
                        label="Confirm Password"
                        name="confirmPassword"
                        autoComplete="confirmPassword"
                        autoFocus
                        value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>

                        <Grid item>
                            <Link href="/login" variant="body2">
                                {" Have an account? Log In"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}

export default RegisterScreen
