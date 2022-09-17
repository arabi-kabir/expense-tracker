import React from 'react'
import spinner from '../components/assets/spinner_2.gif'
import Grid from '@mui/material/Grid';

function Spinner() {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
        >
            <img src={spinner} alt='Loading...' />
        </Grid> 
    )
}

export default Spinner