import React, { useEffect } from 'react'
import Container from '@mui/material/Container';
import Menu from '../components/navbar/Menu'
import RestClient from '../RestAPI/RestClient';
import AppUrl from '../RestAPI/AppUrl';
import Grid from '@mui/material/Grid';
import {faker} from '@faker-js/faker';
import { getDatesBetweenTwoDate } from '../services/date/dateFunctions';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
  
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

// export const options = {
// 	responsive: true,
// 	plugins: {
// 		legend: {
// 			position: 'top',
// 		},
// 		title: {
// 			display: true,
// 			text: 'Chart.js Line Chart',
// 		},
// 	},
// };

// export const data = {
//     labels,
//     datasets: [
//         {
//             fill: true,
//             label: 'Dataset 2',
//             data: labels.map(() => faker.datatype.number({ min: 400, max: 5000 })),
//             borderColor: 'rgb(53, 162, 235)',
//             backgroundColor: 'rgba(53, 162, 235, 0.5)',
//         },
//     ],
// };

const getChartData = async (labels) => {
	try {
		const url = AppUrl.expenseChartData

    const data = JSON.stringify(labels)

		return RestClient.postRequest(url, {
      data
    })
		.then(result => {
			if(result.status == 200) {
				console.log(result.data);
			}
		})
	} catch (error) {
		return error
	}
}


function Dashboard() {

	useEffect(() => {
		console.log('hiiii');
		var today = new Date();
		var priorDate = new Date(new Date().setDate(today.getDate() - 30));
	
		  const labels = getDatesBetweenTwoDate(priorDate, today)

      //console.log(labels);

		  getChartData(labels)
	}, [])

    // console.log(labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),)
    return (
        <div>
            <Menu />

            {/* <Container style={{ marginTop: '20px', marginBottom: '20px' }}>
                <h4 style={{ textAlign: 'center' }}>Dashboard</h4>

                <Grid container>
                    <Grid item xs={8} style={{ border: '1px solid #EEF1F1'}}>
                        Chart

                        <Line options={options} data={data} />
                    </Grid>

                    <Grid item xs={4} style={{ border: '1px solid #EEF1F1'}}>
                        last 5 items
                    </Grid>
                </Grid>
            </Container> */}
        </div>
    )
}

export default Dashboard