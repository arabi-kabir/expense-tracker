import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Link } from 'react-router-dom';

import RestClient from '../../RestAPI/RestClient';
import AppUrl from '../../RestAPI/AppUrl';
import Menu from '../../components/navbar/Menu'
import Spinner from '../../components/Spinner'
  
function Expenses() {
    const [expenses, setExpenses] = useState([])
    const [totalPages, setTotalpages] = useState(0)
    const [pageNumber, setPageNumber] = useState(0)
    const [loading, setLoading] = useState(true)

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
                setLoading(false)
            })
        } catch (error) {
            return error
        }
    }

    const gotoPrevious = () => {
        setLoading(true)
        setPageNumber(Math.max(0, pageNumber - 1))
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

            <Container maxWidth="md" style={{ marginTop: '20px', paddingBottom: '0', paddingRight: '0', textAlign: 'right' }}>
                
            <Link to={'/add-expenses'}>
                <Button variant="contained" color="success">Add New Expense</Button>
            </Link>

                
            </Container>

            <Container maxWidth="md" style={{ border: '1px solid #95a5a6', marginTop: '20px', paddingBottom: '20px' }}>
                <div style={{ paddingTop: '10px', textAlign: 'center' }}>
                    <h3>Expenses</h3>
                </div>

                <h4 style={{ marginLeft: '7px' }}>Page of {pageNumber + 1}</h4>

                {
                    expenses.map((expense) => (
                        <div key={expense._id}>
                            <Card sx={{ m:1 }} variant="outlined">
                                <CardContent style={{ padding: '7px' }}>    
                                    <span>{expense.expense_name}</span>
                                </CardContent>
                            </Card>            
                        </div>
                    ))
                }

                <Button variant="contained" onClick={gotoPrevious} sx={{ m:1 }}>Previous</Button>
                <Button variant="contained" onClick={gotoNext}>Next</Button>

                {/* {
                    pages.map((pageIndex) => (
                        <button key={pageIndex} onClick={() => setPageNumber(pageIndex)}>{pageIndex + 1}</button>
                    ))
                } */}
            </Container>
        </div>
    )
}

export default Expenses