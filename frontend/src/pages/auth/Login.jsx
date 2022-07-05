import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

function Login() {
    const [textValue, setTextValue] = useState('');

    const onTextChange = (e) => setTextValue(e.target.value);
    const handleSubmit = () => console.log(textValue);
    const handleReset = () => setTextValue("");

    return (
        <div>
            <Container maxWidth="sm">
                <Box sx={{ mx: "auto" }}> 
                    <Paper style={{ padding: '20px', marginTop: '40px' }} elevation={5}>
                        <form>
                            <h2 style={{ marginTop: '0' }}>User Login</h2>

                            <TextField
                                fullWidth
                                onChange={onTextChange}
                                value={textValue}
                                label={"Email"}
                                style={{ marginBottom: '20px' }}
                            />

                            <TextField
                                fullWidth
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                            />

                            <Grid container spacing={2} columns={16} sx={{ mt: 1 }}>
                                <Grid item xs={8}>
                                    <Button variant="contained" onClick={handleReset}>Reset</Button>    
                                </Grid>
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