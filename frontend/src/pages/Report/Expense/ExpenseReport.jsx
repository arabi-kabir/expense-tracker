import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import Menu from '../../../components/navbar/Menu'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import Spinner from '../../../components/Spinner'
import RestClient from '../../../RestAPI/RestClient';
import AppUrl from '../../../RestAPI/AppUrl';

function createData(expense, amount, payment, category, created_at) {
    return { expense, amount, payment, category, created_at };
}

function ExpenseReport() {
    const [expenses, setExpenses] = useState([])
    const [totalPages, setTotalpages] = useState(0)
    const [pageNumber, setPageNumber] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getExpensedata()
    }, [pageNumber])

    // Get expenses list
    const getExpensedata = async () => {
        try {
            const url = AppUrl.expenseReportData + `?page=${pageNumber}`
            return RestClient.getRequest(url)
            .then(result => {
                const {expenses, totalPages} = result.data;
                setExpenses(expenses)
                setTotalpages(totalPages)
                setLoading(false)
            })
        } catch (error) {
            setLoading(false)
            console.log(error);
            return error
        }
    }

    const gotoPrevious = () => {
        setLoading(true)
        setPageNumber(Math.max(0, pageNumber - 1))

        if(pageNumber == 0) {
            setLoading(false)
        }
    }

    const gotoNext = () => {
        setLoading(true)
        setPageNumber(Math.min(totalPages - 1, pageNumber + 1))
    }

    if(loading) {
        return <Spinner />
    }

    return (
        <div>
            <Menu />

            <Container style={{ 'marginTop': '30px' }}>
                
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow style={{ backgroundColor: '#34495e' }}>
                            <TableCell style={{ color: '#ecf0f1' }}>Expense Name</TableCell>
                            <TableCell style={{ color: '#ecf0f1' }} align="right">Amount</TableCell>
                            <TableCell style={{ color: '#ecf0f1' }} align="right">Payment Book</TableCell>
                            <TableCell style={{ color: '#ecf0f1' }} align="right">Category</TableCell>
                            <TableCell style={{ color: '#ecf0f1' }} align="right">Created at</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            expenses.map((row) => (
                                <TableRow
                                    key={row._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    hover
                                >
                                    <TableCell align="left">{row.expense_name}</TableCell>
                                    <TableCell align="right">{row.expense_amount}</TableCell>
                                    <TableCell align="right">{row.payment_method.book_name}</TableCell>
                                    <TableCell align="right">{row.expense_categories.category_name}</TableCell>
                                    <TableCell align="right">{row.createdAt}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <Button onClick={gotoPrevious} sx={{ m:1 }}>Previous</Button>
            <Button onClick={gotoNext}>Next</Button>

            </Container>
        </div>
    )
}

export default ExpenseReport