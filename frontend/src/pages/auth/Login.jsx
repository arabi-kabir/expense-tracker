import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import AuthService from '../../services/auth/auth.service'

function Login() {
    const [formData, setformData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate()

    const { email, password } = formData

    const onTextChange = (e) => {
        setformData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    };

    const handleReset = () => setTextValue("");

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await AuthService.login(email, password)
            if(res) {
                navigate('/dashboard')

                toast.success('Logged in successfully')
            }
        } catch (error) {
            console.log(error);
            toast.success('Opps! something is wrong.')
        }
    }

    return (
        <div>
            <Container maxWidth="sm">
                <Box sx={{ mx: "auto" }}> 
                    <Paper style={{ padding: '20px', marginTop: '40px' }} elevation={5}>
                        <form>
                            <h2 style={{ marginTop: '0' }}>User Login</h2>

                            <TextField
                                fullWidth
                                id="email"
                                onChange={onTextChange}
                                value={email}
                                label={"Email"}
                                style={{ marginBottom: '20px' }}
                            />

                            <TextField
                                fullWidth
                                id="password"
                                label="Password"
                                type="password"
                                onChange={onTextChange}
                                value={password}
                                autoComplete="current-password"
                            />

                            <Grid container spacing={2} columns={16} sx={{ mt: 1 }}>
                                <Grid item xs={8}></Grid>
                                <Grid item xs={8}>
                                    <Button style={{ float: 'right' }} variant="contained" color="success" onClick={handleSubmit}>Login</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Box>
            </Container>
        </div>
    )
}

export default Login