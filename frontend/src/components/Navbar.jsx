import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import InfoIcon from '@mui/icons-material/Info';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

import AuthService from '../services/auth/auth.service'

function Navbar({ isLogged }) {
    const navigate = useNavigate()
    const [value, setValue] = React.useState(0);

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    {
                        !isLogged && (
                            <BottomNavigationAction label="Login" icon={<LoginIcon />} onClick={() => navigate('/')} />
                        )
                    }
                    {
                        !isLogged && (
                            <BottomNavigationAction label="Register" icon={<AppRegistrationIcon />} onClick={() => navigate('/register')} />
                        )
                    }

                    <BottomNavigationAction label="About" icon={<InfoIcon />} onClick={() => navigate('/about')} />
                </BottomNavigation>
            </Paper>
        </Box>

    )
}

export default Navbar