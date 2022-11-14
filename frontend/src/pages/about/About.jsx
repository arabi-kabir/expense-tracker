import React from 'react'
import Container from '@mui/material/Container';
import Menu from '../../components/navbar/Menu'

function About() {
    return (
      <div>
			<Menu />
			
			<Container style={{ marginTop: '20px', marginBottom: '60px', backgroundColor: '#ffffff', padding: '30px' }}>
				<h4 style={{ textAlign: 'center' }}>About</h4>

				<div>
					<b>Application : </b> Expense tracker <br/>
					<b>Version : </b> v0.5
				</div>
			</Container>
      </div>
    )
}

export default About