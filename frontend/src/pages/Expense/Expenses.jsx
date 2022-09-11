import React, { Fragment, useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import moment from 'moment'
import Avatar from '@mui/material/Avatar';

import RestClient from '../../RestAPI/RestClient';
import AppUrl from '../../RestAPI/AppUrl';
import Menu from '../../components/navbar/Menu'
import Spinner from '../../components/Spinner'
import MyModal from '../../components/MyModal';
import { Chip, Divider } from '@mui/material';

  
function Expenses() {
    const navigate = useNavigate()

    const [expenses, setExpenses] = useState([])
    const [expenseViewMode, setExpenseViewMode] = useState(false)
    const [singleExpense, setSingleExpense] = useState(null)
    const [deleteExpenItem, setDeleteExpenItem] = useState(null)
    const [totalPages, setTotalpages] = useState(0)
    const [pageNumber, setPageNumber] = useState(0)
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false);
    const [openDeleteItemModal, setOpenDeleteItemModal] = useState(false);

    // const pages = new Array(totalPages).fill(null).map((v, i) => i)

    useEffect(() => {  
        getExpensedata()
    }, [pageNumber])

    // Open expense view modal
    const handleOpen = (expenseId) => {
        setLoading(true)
        getSingleExpense(expenseId)
    };

    // Close expense view modal
    const handleClose = () => setOpen(false);

    // Open delete modal
    const handleItemDeleteModalOpen = (expense_id, event) => {
        setDeleteExpenItem(expense_id)
        event.stopPropagation();
        setOpenDeleteItemModal(true)
    }

    // Close delete modal
    const handleItemDeleteModalClose = () => {
        setOpenDeleteItemModal(false)
    }

    // Get expenses list
    const getExpensedata = async () => {
        try {
            const url = AppUrl.getExpenses + `?page=${pageNumber}`
            console.log(url);
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

    // Get single expense
    const getSingleExpense = async (expense_id) => {
        try {
            const url = AppUrl.getExpenses + `/${expense_id}`
            return RestClient.getRequest(url)
            .then(result => {
                const data = result.data;

                setSingleExpense(data)
                setExpenseViewMode(true)
                setOpen(true)
                setLoading(false)
            })
        } catch (error) {
            return error
        }
    }

    // Delete expense
    const deleteExpenseItem = async (expense_id) => {
        setLoading(true)

        try {
            const url = AppUrl.getExpenses + `/${expense_id}`

            return RestClient.deleteRequest(url)
            .then(result => {
                if(result.status == 200) {
                    getExpensedata()
                    handleItemDeleteModalClose()
                    setLoading(false)
                    toast.success('Expense Deleted')
                }
            })
        } catch (error) {
            return error
        }
    }

    // Handle expense edit
    const handleItemEdit = (expense_id) => {
        navigate('/edit-expenses/' + expense_id)
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

            <Container maxWidth="md" style={{ marginTop: '20px', paddingBottom: '0', paddingRight: '0', textAlign: 'right' }}>
                
            <Link to={'/add-expenses'} style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="success">Add New Expense</Button>
            </Link>

                
            </Container>

            <Container maxWidth="md" style={{ border: '1px solid #95a5a6', marginTop: '20px', paddingBottom: '20px', backgroundColor: '#ffffff', marginBottom: '40px' }}>
                <div style={{ paddingTop: '10px', textAlign: 'center' }}>
                    <h3>Expenses</h3>
                </div>

                {
                    expenses.map((expense) => (
                        <div key={expense._id}>
                            <Card sx={{ m:1 }} variant="outlined" style={{ cursor: 'pointer' }} onClick={() => handleOpen(expense._id)}>
                                <CardContent style={{ padding: '7px' }} >    
                                    <Grid container spacing={2}>
                                        <Grid item xs={10} style={{ margin: 'auto' }}>
                                            <label style={{ cursor: 'pointer', display: 'block', fontWeight: 'bold'}}>
                                                {expense.expense_name}
                                            </label>    

                                            <Chip
                                                avatar={<Avatar alt="Natacha" src={`/uploads/${expense.expense_categories.category_image}`} />}
                                                label={expense.expense_categories.category_name}
                                                variant="outlined"
                                                style={{ marginTop: '5px', marginRight: '5px' }}
                                            />
                                            <Chip
                                               avatar={<Avatar alt="Natacha" src={`/uploads/${expense.payment_method.book_image}`} />}
                                                label={expense.payment_method.book_name}
                                                variant="outlined"
                                                style={{ marginTop: '5px' }}
                                            />
                                                           
                                        </Grid>
                                        <Grid item xs={2} style={{ textAlign: 'center' }}>
                                            <Button 
                                                fullWidth 
                                                sx={{ mb: 1 }} 
                                                size='small' 
                                                variant="contained"
                                                onClick={(event) => handleItemEdit(expense._id, event)}
                                            >
                                                Edit
                                            </Button>
                                            
                                            <Button 
                                                fullWidth 
                                                sx={{ mt: 1 }} 
                                                size='small' 
                                                variant="contained"
                                                color='error'
                                                onClick={(event) => handleItemDeleteModalOpen(expense._id, event)}
                                            >
                                                Delete
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>            
                        </div>
                    ))
                }

                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Button onClick={gotoPrevious} sx={{ m:1 }}>Previous</Button>
                        <Button onClick={gotoNext}>Next</Button>                             
                    </Grid>
                    <Grid item xs={4}>
                        <h4 style={{ float: 'right', paddingRight: '10px' }}>Page of {pageNumber + 1}</h4>
                    </Grid>
                </Grid>

                {/* {
                    pages.map((pageIndex) => (
                        <button key={pageIndex} onClick={() => setPageNumber(pageIndex)}>{pageIndex + 1}</button>
                    ))
                } */}
            </Container>

            {/* View Modal */}
            <MyModal closeModal={handleClose} open={open} heading="Expense Details">
                {
                    expenseViewMode && (
                        <Fragment>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <span style={{ fontWeight: 'bold' }}>Expense name </span>                         
                                </Grid>
                                <Grid item xs={6}>
                                    {singleExpense.expense_name}
                                </Grid>

                                <Grid item xs={6}>
                                    <span style={{ fontWeight: 'bold' }}>Expense amount </span>                         
                                </Grid>
                                <Grid item xs={6}>
                                    {singleExpense.expense_amount}
                                </Grid>

                                <Grid item xs={6}>
                                    <span style={{ fontWeight: 'bold' }}>Payment method </span>                         
                                </Grid>
                                <Grid item xs={6}>
                                    {singleExpense.payment_method.book_name}
                                </Grid>

                                <Grid item xs={6}>
                                    <span style={{ fontWeight: 'bold' }}>Category name </span>                         
                                </Grid>
                                <Grid item xs={6}>
                                    {singleExpense.expense_categories.category_name}
                                </Grid>

                                <Grid item xs={6}>
                                    <span style={{ fontWeight: 'bold' }}>Expense date </span>                         
                                </Grid>
                                <Grid item xs={6}>
                                    { moment(singleExpense.expense_date).format('LL') }
                                </Grid>
                            </Grid>
                        </Fragment>
                    )
                }
            </MyModal>

            {/* Delete Modal */}
            <MyModal closeModal={handleItemDeleteModalClose} open={openDeleteItemModal} heading="Expense Delete Confirmation">
                {
                    openDeleteItemModal && (
                        <Fragment>
                            <p>Are you sure want to delete this expense ?</p>

                            <Button variant="contained" size="small" onClick={() => deleteExpenseItem(deleteExpenItem)}>Yes confirm</Button>
                        </Fragment>
                    )
                }
            </MyModal>
        </div>
    )
}

export default Expenses