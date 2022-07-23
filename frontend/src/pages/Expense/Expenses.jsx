import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Box from '@mui/material/Box';

import RestClient from '../../RestAPI/RestClient';
import AppUrl from '../../RestAPI/AppUrl';
import Menu from '../../components/navbar/Menu'
import Spinner from '../../components/Spinner'
import MyModal from '../../components/MyModal';

  
function Expenses() {
    const [expenses, setExpenses] = useState([])
    const [totalPages, setTotalpages] = useState(0)
    const [pageNumber, setPageNumber] = useState(0)
    const [loading, setLoading] = useState(true)

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

    const viewExpenseDetails = () => {

    }

    // const handleOpenModal = () => {
    //     setModal({ show: true });
    // };



    if(loading) {
        return <Spinner />
    }

 
      


    return (
        <div>
            <Menu />

            <Container maxWidth="md" style={{ marginTop: '20px', paddingBottom: '0', paddingRight: '0', textAlign: 'right' }}>
                
            <Link to={'/add-expenses'} style={{ textDecoration: 'none' }}>
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
                            <Card sx={{ m:1 }} variant="outlined" style={{ cursor: 'pointer' }} >
                                <CardContent style={{ padding: '7px' }}>    
                                    <Grid container spacing={2}>
                                        <Grid item xs={8} style={{ margin: 'auto' }}>
                                            <label>{expense.expense_name}</label>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <IconButton aria-label="delete" size="small" style={{ float: 'right' }} onClick={() => handleOpenModal()}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>            
                        </div>
                    ))
                }

                <Button onClick={gotoPrevious} sx={{ m:1 }} startIcon={<ArrowBackIosNewIcon/>}>Previous</Button>
                <Button onClick={gotoNext} endIcon={<ArrowForwardIosIcon/>}>Next</Button>

                {/* {
                    pages.map((pageIndex) => (
                        <button key={pageIndex} onClick={() => setPageNumber(pageIndex)}>{pageIndex + 1}</button>
                    ))
                } */}
            </Container>

            <Modal closeModal={handleClose}>
                hi
         
            </Modal>

            <Button onClick={handleOpen}>Open modal</Button> 
            
        </div>

        
    )
}

export default Expenses