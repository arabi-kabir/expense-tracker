import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormControl from '@mui/material/FormControl';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Paper from '@mui/material/Paper';
import RestClient from '../../RestAPI/RestClient';
import AppUrl from '../../RestAPI/AppUrl';
import Menu from '../../components/navbar/Menu'
import Spinner from '../../components/Spinner'
import { Grid } from '@mui/material';
import Payment from '../../components/reusable/Payment';

  
function AddExpense() {
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [expenseCategory, setExpenseCatyegory] = useState([])
    const [bookList, setBookList] = useState([])

    const [expense, setExpense] = useState({
		expenseName: '',
		expenseCategory: '',
        expenseDate: new Date(),
        payments: [
            {
                'method' : '',
                'amount' : 0,
            }
        ]
	})

    useEffect(() => {  
        getExpensecategory()
        getMyBookList()

        setLoading(false)
    }, [])

    const handleChange = (e) => {
        if(e.target != undefined) {
            setExpense({
                ...expense,
                [e.target.name]: e.target.value
            })
        } else {
            setExpense({
                ...expense,
                expenseDate: e 
            })
        }
	}

    const handlePaymentDataChange = (e) => {
        const input_name = (e.target.name);
        let name = input_name.substring(0, 6)

        if(name === 'amount') {
            const indexNum = input_name.substring(6, 7)
            let newPayment = expense.payments;
            newPayment[indexNum].amount = e.target.value

            setExpense({
                ...expense,
                payments: [
                    ...newPayment
                ]
            })
        } else {
            const indexNum = input_name.substring(7, 8) 

            let newPayment = expense.payments; 
            newPayment[indexNum].method = e.target.value

            setExpense({
                ...expense,
                payments: [
                    ...newPayment
                ]
            })
        }
    }

    const getExpensecategory = async () => {
        try {
            const url = AppUrl.expenseCategory
            await RestClient.getRequest(url)
            .then(result => {
                setExpenseCatyegory(result.data)
            })
        } catch (error) {
            return error
        }
    }

    const getMyBookList = async () => {
        try {
            const url = AppUrl.getMyBook
            await RestClient.getRequest(url)
            .then(result => {
                setBookList(result.data)
            })
        } catch (error) {
            return error
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        // try {
        //     const url = AppUrl.insertExpense
        //     return await RestClient.postRequest(url, {
        //         expense_name: expenseNameForm,
        //         expense_amount: expenseAmountForm,
        //         payment_method: expenseBookForm,
        //         expense_categories: expenseCategoryForm,
        //         expense_date: expenseDateForm
        //     .then(result => {
        //         if(result.status) {
        //             navigate('/expenses')
        //             toast.success('Expense Added')
        //         }
        //     })
        // } catch (error) {
        //     console.log(error);
        //     toast.success('Something is wrong')
        // }
    } 

    const addPayment = () => {
        let newPaymentObj = {
            method : '',
            amount : 0,
        }

        setExpense({
            ...expense,
			payments : [
                ...expense.payments,
                newPaymentObj
            ]
        })
    }

    if(loading) {
        return <Spinner />
    }

    return (
        <div>
            <Menu />

            <Container maxWidth="md" style={{ border: '1px solid #95a5a6', marginTop: '20px', paddingBottom: '20px', marginBottom: '40px', backgroundColor: '#fff' }}>
                <div style={{ paddingTop: '10px', textAlign: 'center' }}>
                    <h3 style={{ fontWeight: 'lighter' }}>Add New Expense</h3>

                    <form>
                        <TextField 
                            sx={{ mb: 2 }} 
                            style={{ width: '100%' }} 
                            id="outlined-basic" 
                            label="Expense Name" 
                            variant="outlined"
                            name='expenseName' 
                            value={expense.expenseName}
                            onChange={handleChange}
                        />

                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FormControl sx={{ mb: 2 }} style={{ width: '100%' }}>
                                    <InputLabel id="demo-simple-select-helper-label">Expense Category</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={expense.expenseCategory}
                                        label="Expense Category"
                                        onChange={handleChange}
                                        name='expenseCategory' 
                                    >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {
                                        expenseCategory.map((category) => (
                                            <MenuItem value={category._id} key={category._id}>{category.category_name}</MenuItem>
                                        ))
                                    }                
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl sx={{ mb: 2 }} style={{ width: '100%' }}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DesktopDatePicker
                                            label="Expense Date"
                                            inputFormat="dd/MM/yyyy"
                                            value={expense.expenseDate}
                                            onChange={handleChange}
                                            renderInput={(params) => <TextField {...params} />}
                                            name='expenseDate'
                                        />
                                    </LocalizationProvider>
                                </FormControl>
                            </Grid>
                        </Grid>
                        
                   
                        {/* Payment Fields */}
                        <Paper sx={{ p: 2, mb: 3 }} elevation={3}>
                            <p>Payments</p> 
                            <Button sx={{m: 1}} onClick={addPayment}>+ add</Button>
                            {
                                expense.payments.map((index, i) => {
                                    return <Payment key={i} bookList={bookList} handleChange={handlePaymentDataChange} data={index} index={i} />
                                })
                            }
                        </Paper>

                        <Button 
                            fullWidth 
                            startIcon={<AddCircleIcon />} 
                            variant="contained" 
                            color="success"
                            onClick={handleFormSubmit}
                        >
                                Submit Expense
                        </Button>
                    </form>
                </div>
            </Container>
        </div>
    )
}

export default AddExpense