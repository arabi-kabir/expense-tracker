import React, { useEffect } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useState } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

function AreaChart(props) {
    const [labels, setLabels] = useState([])
    const [dataset, setDataset] = useState([])

    useEffect(() => {
        drawChart()
    }, [labels, dataset])

    const drawChart = () => {
        setLabels(props.labels);
        setDataset(props.dataset);
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            // title: {
            //     display: true,
            //     text: 'Chart.js Line Chart',
            // },
        },
    };

    const data = {
        labels,
        datasets: [
            {
                label: 'Expense for last 30 days',
                data: dataset,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return (
        <div>
            <Bar options={options} data={data} />
        </div>
    )
}

export default AreaChart