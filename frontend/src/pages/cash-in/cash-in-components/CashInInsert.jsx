import { FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography, Button } from '@mui/material'
import RestClient from '../../../RestAPI/RestClient';
import AppUrl from '../../../RestAPI/AppUrl';
import React, { Fragment, useEffect, useState } from 'react'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import toast from 'react-hot-toast';

function CashInInsert() {
    const [loading, setLoading] = useState(true)
    const [bookList, setBookList] = useState([])
    
    const [cashInData, setCashInData] = useState({
        title: '',
        book: '',
        amount: '',
        date: new Date(),
    })

    useEffect(() => {  
        getMyBookList()

        setLoading(false)
    }, [])

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

    const handleChangeInput = (e) => {
        if(e.target != undefined) {
            setCashInData({
                ...cashInData,
                [e.target.name]: e.target.value
            })
        } else {
            setCashInData({
                ...cashInData,
                date: e
            })
        }
    }

    const submitCashIn = async (e) => {
        e.preventDefault()

        try {
            const url = AppUrl.cashIn

            await RestClient.postRequest(url, {
                cash_in_title: cashInData.title,
                amount: cashInData.amount,
                cash_in_book: cashInData.book,
                cash_in_date: cashInData.date
            })
            .then(result => {
                if(result.status == 201) {
                    setCashInData({
                        title: '',
                        book: '',
                        amount: '',
                        date: new Date()
                    })
                    toast.success('Cash in submitted')
                }
            })
        } catch (error) {
            console.log(error);
            toast.success('Something is wrong')
        }
    }

    return (
        <Fragment>
            <Typography variant="overline" display="block" gutterBottom>
                Cash In
            </Typography>

            <Paper elevation={3} spacing={2} style={{ padding: '10px' }}>
                <div>
                    <TextField id="outlined-basic" label="Title" variant="outlined" size="small" fullWidth sx={{ mb: 2 }} name="title" value={cashInData.title} onChange={handleChangeInput} />

                    <FormControl sx={{ mb: 2 }} style={{ width: '100%' }} size="small">
                        <InputLabel id="demo-simple-select-helper-label">Book</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={cashInData.book}
                            label="Book"
                            name="book"
                            onChange={handleChangeInput}
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

                    <TextField id="outlined-basic" label="Amount" variant="outlined" size="small" fullWidth sx={{ mb: 2 }} name="amount" value={cashInData.amount} onChange={handleChangeInput} />

                    <FormControl sx={{ mb: 2 }} style={{ width: '100%' }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                            size="sm"
                                label="Expense Date"
                                inputFormat="dd/MM/yyyy"
                                value={cashInData.date}
                                onChange={handleChangeInput}
                                renderInput={(params) => <TextField {...params} />}
                                name='date'
                            />
                        </LocalizationProvider>
                    </FormControl>

                    <Button variant="contained" fullWidth size="sm" onClick={submitCashIn}>Create Cash In</Button>
                </div>
            </Paper>
        </Fragment>
    )
}

export default CashInInsert