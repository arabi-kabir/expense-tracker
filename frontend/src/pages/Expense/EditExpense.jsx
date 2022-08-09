import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import { useNavigate, useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import SaveIcon from '@mui/icons-material/Save';

import RestClient from '../../RestAPI/RestClient';
import AppUrl from '../../RestAPI/AppUrl';
import Menu from '../../components/navbar/Menu'
import Spinner from '../../components/Spinner'

  
function EditExpense() {
    const navigate = useNavigate()
    let { id } = useParams();

    const [expenseNameForm, setExpenseName] = useState('')
    const [expenseAmountForm, setExpenseAmount] = useState('')
    const [expenseCategoryForm, setExpenseCategory] = useState('')
    const [expenseBookForm, setExpenseBook] = useState('')
    const [loading, setLoading] = useState(true)
    const [expenseCategory, setExpenseCatyegory] = useState([])
    const [bookList, setBookList] = useState([])

    const handleExpencategoryChange = (event) => {
        setExpenseCategory(event.target.value);
    }

    const handleExpenseBookChange = (event) => {
        setExpenseBook(event.target.value);
    }

    const handleExpenseName = (event) => {
        setExpenseName(event.target.value);
    }

    const handleExpenseAmount = (event) => {
        setExpenseAmount(event.target.value);
    }


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

                setExpenseName(data.expense_name);
                setExpenseBook(data.payment_method._id)
                setExpenseAmount(data.expense_amount)
                setExpenseCategory(data.expense_categories._id)

               
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

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        try {
            const url = AppUrl.getExpenses + `/${id}`

            return await RestClient.updateRequest(url, {
                expense_name: expenseNameForm,
                expense_amount: expenseAmountForm,
                payment_method: expenseBookForm,
                expense_categories: expenseCategoryForm
            })
            .then(result => {
                if(result.status) {
                    navigate('/expenses')
                    toast.success('Expense Updated')
                }
            })
        } catch (error) {
            console.log(error);
            toast.success('Something is wrong')
        }
    } 

    if(loading) {
        return <Spinner />
    }

    return (
        <div>
            <Menu />

            <Container maxWidth="md" style={{ border: '1px solid #95a5a6', marginTop: '20px', paddingBottom: '20px' }}>
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
            </Container>
        </div>
    )
}

export default EditExpense