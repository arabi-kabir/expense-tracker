import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import RestClient from '../../RestAPI/RestClient';
import AppUrl from '../../RestAPI/AppUrl';
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"

function Register() {
    const [formData, setformData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate()

    const { name, email, password } = formData

    const onTextChange = (e) => {
        setformData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        try {
            RestClient.postRequest(AppUrl.authRegister, { name, email, password })
            .then(result => {
                if(result.status == 201) {
                    navigate('/dashboard')
                    toast.success('User registered successfully')
                } else {
                    const res = result.response.data;
                    toast.error(res)
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    const handleReset = () => setTextValue("");

    return (
        <div>
            <Container maxWidth="sm">
                <Box sx={{ mx: "auto" }}> 
                    <Paper style={{ padding: '20px', marginTop: '40px' }} elevation={5}>
                        <form>
                            <h2 style={{ marginTop: '0' }}>User Registration</h2>

                            <TextField
                                fullWidth
                                id="name"
                                onChange={onTextChange}
                                value={name}
                                label={"Name"}
                                style={{ marginBottom: '20px' }}
                            />

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
                                onChange={onTextChange}
                                label="Password"
                                value={password}
                                type="password"
                                autoComplete="current-password"
                            />

                            <Grid container spacing={2} columns={16} sx={{ mt: 1 }}>
                                <Grid item xs={8}>
                                    <Button variant="contained" onClick={handleReset}>Reset</Button>    
                                </Grid>
                                <Grid item xs={8}>
                                    <Button style={{ float: 'right' }} variant="contained" color="success" onClick={handleSubmit}>Register User</Button>
                                </Grid>
                            </Grid>
                        </form>
                        
                    </Paper>
                </Box>
            </Container>
        </div>
    )
}

export default Register