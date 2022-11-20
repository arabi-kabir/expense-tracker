import { Container, Grid } from '@mui/material'
import React, { Fragment } from 'react'
import Menu from '../../components/navbar/Menu'
import CashInInsert from './cash-in-components/CashInInsert'
import CashInList from './cash-in-components/CashInList'

function CashInIndex() {
    return (
        <Fragment>
            <Menu />

            <Container style={{ marginTop: '20px', marginBottom: '60px', backgroundColor: '#ffffff' }}>
                <h4 style={{ textAlign: 'center', 'paddingTop': '20px' }}>Cash In</h4>

                <Grid container spacing={3} style={{ paddingBottom: '40px' }}>
                    <Grid item xs={7}>
                        <CashInList />
                    </Grid>
                    <Grid item xs={5}>
                        <CashInInsert />
                    </Grid>
                </Grid>
            </Container>
        </Fragment>
    )
}

export default CashInIndex