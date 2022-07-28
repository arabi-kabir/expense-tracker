import React, { Fragment } from 'react'
import Container from '@mui/material/Container';
import Menu from '../../components/navbar/Menu'

function ReportIndex() {
    return (
        <Fragment>
           <Menu />
          
            <Container style={{ border: '1px solid #95a5a6', 'marginTop': '30px' }}>
                Report
            </Container>
        </Fragment>
    )
}

export default ReportIndex