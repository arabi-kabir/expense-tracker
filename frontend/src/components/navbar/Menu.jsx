import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { Toolbar, Box, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import AuthService from '../../services/auth/auth.service'

function Menu() {
	const navigate = useNavigate()
	
	const logout = async () => {
        try {
            toast.success('Logged out successfully')

            await AuthService.logout()

            navigate('/')
        } catch (error) {
            console.log(error);
            toast.error('Opps! something is wrong.')
        }
    }

	return (
		<Fragment>
			<Box>
				<Paper elevation={3}>
					<Box sx={{ display: 'flex' }}>
						<Toolbar>
							<Link style={{ padding: '20px',textDecoration: 'none' }} to={'/dashboard'}>
								Dashboard
							</Link>
							<Link style={{ padding: '20px', textDecoration: 'none' }} to={'/expenses'}>Expenses</Link>
							<Link style={{ padding: '20px', textDecoration: 'none' }} to={'/my-book'}>My Book</Link>
							<Link style={{ padding: '20px', textDecoration: 'none' }} to={'/expense-category'}>Expense Category</Link>
							<Link style={{ padding: '20px', textDecoration: 'none' }} to={'/reports'}>Report</Link>
							<Link style={{ padding: '20px', textDecoration: 'none' }} to={'/about'}>About</Link>

							<Button style={{ padding: '20px', textDecoration: 'none' }} onClick={() => logout()}>Logout</Button>
						</Toolbar>
					</Box>
				</Paper>
			</Box>
		</Fragment>
	)
}

export default Menu