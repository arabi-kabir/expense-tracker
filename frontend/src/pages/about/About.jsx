import React from 'react'
import Container from '@mui/material/Container';
import Menu from '../../components/navbar/Menu'

function About() {
    return (
      <div>
			<Menu />
			
			<Container maxWidth="sm" style={{ border: '1px solid #95a5a6' }} sx={{ mt: 2 }}>
				About

				<div>
					<b>Application : </b> Expense tracker
				</div>
			</Container>
      </div>
    )
}

export default About