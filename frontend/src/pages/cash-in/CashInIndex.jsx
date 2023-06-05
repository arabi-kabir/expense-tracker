import { Container, Grid } from '@mui/material'
import React, { Fragment } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Menu from '../../components/navbar/Menu'
import CashInInsert from './cash-in-components/CashInInsert'
import CashInList from './cash-in-components/CashInList'

function forceRerender () {
    const [value, setValue] = useState(0); 
    console.log('bla bla');
    return () => setValue(value => value + 1); 
}

function CashInIndex() {
    // const [cashInsertFlag, setCashInsertFlag] = useState(0)
    const forceUpdateHook = forceRerender()

    // useEffect(() => {

    // }, [cashInsertFlag])

    // const updateInsertFlag = () => {
    //     console.log('flag class');
    //     console.log(cashInsertFlag);
    //     setCashInsertFlag(cashInsertFlag+1)
    //     console.log(cashInsertFlag);
    // }
    
    return (
        <Fragment>
            <Menu />

            <Container style={{ marginTop: '20px', marginBottom: '0px', backgroundColor: '' }}>
                <h4 style={{ textAlign: 'center', 'paddingTop': '20px' }}>CASH IN</h4>

                <Grid container spacing={3} style={{ paddingBottom: '40px' }}>
                    <Grid item xs={2}>
                        {/* <CashInList /> */}
                    </Grid>

                    <Grid item xs={8}>
                        <CashInInsert />
                    </Grid>

                    <Grid item xs={2}></Grid>

                </Grid>
            </Container>
        </Fragment>
    )
}

export default CashInIndex