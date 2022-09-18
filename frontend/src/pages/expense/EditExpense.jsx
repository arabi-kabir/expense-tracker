import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import SaveIcon from '@mui/icons-material/Save';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Grid, Paper } from '@mui/material';
import RestClient from '../../RestAPI/RestClient';
import AppUrl from '../../RestAPI/AppUrl';
import Menu from '../../components/navbar/Menu'
import Spinner from '../../components/Spinner'
import IconButton from '@mui/material/IconButton';
import ExpenseSchema from '../../services/validation/expense.insert.validator'
import toast from 'react-hot-toast';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Payment from '../../components/reusable/Payment';``

  
function EditExpense() {
    const navigate = useNavigate()
    let { id } = useParams();

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
        setLoading(true)

        getExpensecategory()
        getMyBookList()
        getExpenseDetails()
    }, [])

    // Get expense details
    const getExpenseDetails = async () => {
        try {
            const url = AppUrl.getExpenses + `/${id}`
            return RestClient.getRequest(url)
            .then(result => {
                const data = result.data;

                const paymentsData = data.payments.map(payment => {
                    return {
                        method: payment.method._id,
                        amount: payment.amount
                    }
                })

                setExpense({
                    expenseName: data.expense_name,
                    expenseCategory: data.expense_categories._id,
                    expenseDate: data.expense_date,
                    payments: paymentsData
                })

                setLoading(false)
            })
        } catch (error) {
            return error
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
            let newPayment = [...expense.payments];
            newPayment[indexNum].amount = Number(e.target.value)

            setExpense({
                ...expense,
                payments: [
                    ...newPayment
                ]
            })
        } else {
            const indexNum = input_name.substring(7, 8) 

            let newPayment = [...expense.payments]; 
            newPayment[indexNum].method = e.target.value

            setExpense({
                ...expense,
                payments: [
                    ...newPayment
                ]
            })
        }
    }

    const handleDeleteItem = (indexValue) => {
        toast.success('Payment item deleted')

        let payment = expense.payments
        payment.splice(indexValue, 1)

        setExpense({
            ...expense,
            payments: [
                ...payment
            ]
        })
    }

    // const handleFormSubmit = async (e) => {
    //     e.preventDefault()

    //     try {
    //         const url = AppUrl.getExpenses + `/${id}`

    //         return await RestClient.updateRequest(url, {
    //             expense_name: expenseNameForm,
    //             expense_amount: expenseAmountForm,
    //             payment_method: expenseBookForm,
    //             expense_categories: expenseCategoryForm,
    //             expense_date: expenseDateForm
    //         })
    //         .then(result => {
    //             if(result.status) {
    //                 navigate('/expenses')
    //                 toast.success('Expense Updated')
    //             }
    //         })
    //     } catch (error) {
    //         console.log(error);
    //         toast.success('Something is wrong')
    //     }
    // } 

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        // data validation
        const errors = ExpenseSchema.validate(expense)

        if(errors.length == 0) {
            try {
                const url = AppUrl.getExpenses + `/${id}`

                return await RestClient.updateRequest(url, {
                    expense_name: expense.expenseName,
                    expense_categories: expense.expenseCategory,
                    expense_date: expense.expenseDate,
                    payments: expense.payments
                })
                .then(result => {
                    if(result.status == 200) {
                        //navigate('/expenses')
                        toast.success('Expense Updated Successfully')
                    }
                })
            } catch (error) {
                console.log(error);
                toast.success('Something is wrong')
            }
        } else {
            errors.forEach(error => {
                toast.error(error.message)
            })
        }
    } 

    const addPayment = () => {
        const newPaymentObj = {
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

            {/* <Container maxWidth="md" style={{ border: '1px solid #95a5a6', marginTop: '20px', paddingBottom: '20px', backgroundColor: '#fff' }}>
                <div style={{ paddingTop: '10px', textAlign: 'center' }}>
                    <h3 style={{ fontWeight: 'lighter' }}>Edit Expense</h3>

                    <form>
                        <TextField 
                            sx={{ mb: 2 }} 
                            style={{ width: '100%' }} 
                            id="outlined-basic" 
                            label="Expense Name" 
                            variant="outlined" 
                            value={expenseNameForm}
                            onChange={handleExpenseName}
                        />
                        
                        <TextField 
                            sx={{ mb: 2 }} 
                            style={{ width: '100%' }} 
                            id="outlined-basic" 
                            label="Expense Amount" 
                            variant="outlined" 
                            value={expenseAmountForm}
                            onChange={handleExpenseAmount}
                        />

                        <FormControl sx={{ mb: 2 }} style={{ width: '100%' }}>
                            <InputLabel id="demo-simple-select-helper-label">Expense Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={expenseCategoryForm}
                                label="Expense Category"
                                onChange={handleExpencategoryChange}
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

                        <FormControl sx={{ mb: 2 }} style={{ width: '100%' }}>
                            <InputLabel id="demo-simple-select-helper-label">Book</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={expenseBookForm}
                                label="Book"
                                onChange={handleExpenseBookChange}
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {
                                bookList.map((book) => (
                                    <MenuItem value={book._id} key={book._id}>{book.book_name}</MenuItem>
                                ))
                            } 
                            </Select>
                        </FormControl>

                        <FormControl sx={{ mb: 2 }} style={{ width: '100%' }}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label="Expense Date"
                                    inputFormat="dd/MM/yyyy"
                                    value={expenseDateForm}
                                    onChange={handleDateChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </FormControl>

                        <Button 
                            fullWidth 
                            startIcon={<SaveIcon />} 
                            variant="contained" 
                            color="success"
                            onClick={handleFormSubmit}
                        >
                                Save Changes
                        </Button>
                    </form>
                </div>
            </Container> */}

            <Container maxWidth="md" style={{ border: '1px solid #95a5a6', marginTop: '20px', paddingBottom: '20px', marginBottom: '40px', backgroundColor: '#fff' }}>
                <div style={{ paddingTop: '10px', textAlign: 'center' }}>
                    <h3 style={{ fontWeight: 'normal', float: 'left' }}>Expense Information</h3>

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
                        <Grid container>
                            <Grid item xs={6}>
                                <h3 style={{ fontWeight: 'normal', float: 'left' }}>Payment Information</h3>
                            </Grid>

                            <Grid item xs={6}>
                                <IconButton aria-label="add" onClick={addPayment} style={{ float: 'right' }}>
                                    <AddCircleIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                        
                        
                        {
                            expense.payments.map((index, i) => {
                                return (
                                    <Payment 
                                        key={i} 
                                        bookList={bookList} 
                                        handleChange={handlePaymentDataChange} 
                                        data={index} 
                                        index={i} 
                                        hanldeDeleteItem={handleDeleteItem}
                                    />
                                )
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
                </div>
            </Container>
        </div>
    )
}

export default EditExpense