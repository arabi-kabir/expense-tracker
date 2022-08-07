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
import { DateRangePicker } from 'react-date-range';
import Grid from '@mui/material/Grid';
import { addDays } from 'date-fns';
import moment from 'moment'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import Spinner from '../../../components/Spinner'
import RestClient from '../../../RestAPI/RestClient';
import AppUrl from '../../../RestAPI/AppUrl';

function ExpenseReport() {
    const [expenses, setExpenses] = useState([])
    const [totalPages, setTotalpages] = useState(0)
    const [pageNumber, setPageNumber] = useState(0)
    const [loading, setLoading] = useState(true)
    const [date_range, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ]);
    const [bookFilter, setBookFilter] = useState('')

    useEffect(() => {
        getExpensedata()
    }, [pageNumber])

    // Get expenses list
    const getExpensedata = async () => {
        try {
            let start_date = moment(date_range[0].startDate, moment.ISO_8601).format()
            let end_date = moment(date_range[0].endDate, moment.ISO_8601).format()
            start_date = start_date.substring(0, 10);
            end_date = end_date.substring(0, 10);

            const url = AppUrl.expenseReportData + `?page=${pageNumber}` + `&start_date=${start_date}` + `&end_date=${end_date}`

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

    const filterReport = () => {
        getExpensedata()
        console.log('filtered');
    }

    const handleChange = (event) => {
        setBookFilter(event.target.value);
    };

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

            <Container style={{ 'marginTop': '10px', marginBottom: '50px' }}>
                <div style={{  marginBottom: '20px' }}>
                    <Grid container>
                        <Grid item xs={6} >
                            <FormControl sx={{ mt: 1 }} style={{ border: '1px solid #dfe6e9' }}>
                                <DateRangePicker
                                    onChange={item => setDateRange([item.selection])}
                                    showSelectionPreview={true}
                                    moveRangeOnFirstSelection={false}
                                    months={1}
                                    ranges={date_range}
                                    direction="horizontal"
                                    style={{ width: '100%' }}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} style={{ marginTop: '10px' }} >
                            <div style={{ padding: '16px', backgroundColor: '#fff' }}>
                                <FormControl sx={{ mb: 2 }} size="small" style={{ width: '100%' }}>
                                    <InputLabel id="demo-simple-select-label">Book</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={bookFilter}
                                        label="Book"
                                        onChange={handleChange}
                                        style={{ width: '100%' }}
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl sx={{ mb: 2 }} size="small" style={{ width: '100%' }}>
                                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={bookFilter}
                                        label="Category"
                                        onChange={handleChange}
                                        style={{ width: '100%' }}
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl sx={{ mb: 2 }} style={{ width: '100%' }}>
                                    <TextField size="small" id="outlined-basic" label="Expense Name" variant="outlined" />
                                </FormControl>

                                <FormControl sx={{ mr: 2 }}>
                                    <Button fullWidth variant="contained" onClick={() => filterReport()} startIcon={<FilterAltIcon />}>
                                        Filter report
                                        </Button>
                                </FormControl>

                                <FormControl >
                                    <Button fullWidth variant="contained" onClick={() => filterReport()} startIcon={<CloudDownloadIcon />}>Download report</Button>
                                </FormControl>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                
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
                                        <TableCell align="right">{moment(row.createdAt).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

                <Button onClick={gotoPrevious} sx={{ mr: 1, mt: 1 }}>Previous</Button>
                <Button onClick={gotoNext} sx={{ mr: 1, mt: 1 }}>Next</Button>

                <h4 style={{ float: 'right', marginTop: '17px' }}>Page of {pageNumber + 1}</h4>

            </Container>
        </div>
    )
}

export default ExpenseReport