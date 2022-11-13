import React from 'react'
import Container from '@mui/material/Container';
import Menu from '../../components/navbar/Menu'

function About() {
    return (
      <div>
			<Menu />
			
			<Container style={{ marginTop: '20px', marginBottom: '60px', backgroundColor: '#ffffff', padding: '30px' }}>
				About

				<div>
					<b>Application : </b> Expense tracker
				</div>
			</Container>
      </div>
    )
}

export default About