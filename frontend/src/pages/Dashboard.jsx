import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import Menu from '../components/navbar/Menu'
import RestClient from '../RestAPI/RestClient';
import AppUrl from '../RestAPI/AppUrl';
import Grid from '@mui/material/Grid';
import { getDatesBetweenTwoDate } from '../services/date/dateFunctions';
import AreaChart from '../components/chart/AreaChart';

function Dashboard() {
    const [labels, setLabels] = useState([])
    const [dataset, setDataset] = useState(null)

	useEffect(() => {
		getChartData()
	}, [dataset])

    const getChartData = async () => {
        var today = new Date(); 
        var date = today.setDate(today.getDate() + 1);
		var priorDate = new Date(new Date().setDate(today.getDate() - 30));
	
		const last30Days = getDatesBetweenTwoDate((priorDate), (date))

        try {
            const url = AppUrl.expenseChartData
            const data = JSON.stringify(last30Days)
    
            return RestClient.postRequest(url, {
                data
            })
            .then(result => {
                if(result.status == 200) {
                    result = result.data

                    setLabels(last30Days)
                    setDataset(result)
                }
            })
        } catch (error) {
            return error
        }
    }

    return (
        <div>
            <Menu />

            <Container style={{ marginTop: '20px', marginBottom: '20px' }}>
                <h4 style={{ textAlign: 'center' }}>Dashboard</h4>

                <Grid container>
                    <Grid item xs={12} style={{ border: '1px solid #EEF1F1', padding: '10px'}}>
                        {
                            dataset && (
                                <AreaChart labels={labels} dataset={dataset} />
                            )
                        }
                      
                    </Grid>

                    <Grid item xs={12} style={{ border: '1px solid #EEF1F1', marginTop: '20px'}}>
                        last 5 items
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Dashboard