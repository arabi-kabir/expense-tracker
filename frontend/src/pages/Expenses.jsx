import React, { useEffect } from 'react'
import Container from '@mui/material/Container';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

import RestClient from '../RestAPI/RestClient';
import AppUrl from '../RestAPI/AppUrl';
import Menu from '../components/navbar/Menu'
import { useState } from 'react';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
];


  
const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];
  

function Expenses() {
    const [expenses, setExpenses] = useState([])
    const [totalPages, setTotalpages] = useState(0)
    const [pageNumber, setPageNumber] = useState(0)

    const pages = new Array(totalPages).fill(null).map((v, i) => i)

    useEffect(() => {
        getExpensedata()
    }, [pageNumber])


    const getExpensedata = async (e) => {
        try {
            const url = AppUrl.getExpenses + `?page=${pageNumber}`
            return RestClient.getRequest(url)
            .then(result => {
                const {expenses, totalPages} = result.data;
                setExpenses(expenses)
                setTotalpages(totalPages)
            })
        } catch (error) {
            return error
        }
    }

    const gotoPrevious = () => {
        setPageNumber(Math.max(0, pageNumber - 1))
    }

    const gotoNext = () => {
        setPageNumber(Math.min(totalPages - 1, pageNumber + 1))
    }

    return (
        <div>
            <Menu />

            <Container maxWidth="md" style={{ border: '1px solid #95a5a6', marginTop: '30px' }}>
                <div style={{ paddingTop: '10px' }}>Expenses</div>

                {/* <div style={{ height: 500, width: '100%', paddingTop: '20px', paddingBottom: '30px' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[5]}
                        // checkboxSelection
                    />
                </div> */}

                <h4>Page of {pageNumber + 1}</h4>

                {
                    expenses.map((expense) => (
                        <div key={expense._id}>
                            <Paper style={{ padding: '8px', margin: '10px' }}>
                                <p style={{ margin: '0' }}>{expense.expense_name}</p>
                            </Paper>                        
                        </div>
                    ))
                }

                <button onClick={() => gotoPrevious()}>Previous</button>

                {/* {
                    pages.map((pageIndex) => (
                        <button key={pageIndex} onClick={() => setPageNumber(pageIndex)}>{pageIndex + 1}</button>
                    ))
                } */}

            <button onClick={() => gotoNext()}>next</button>
            </Container>
        </div>
    )
}

export default Expenses