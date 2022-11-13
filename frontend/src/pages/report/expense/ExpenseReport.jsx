import React, { Fragment, useEffect, useState } from 'react'
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
import { addDays, subDays } from 'date-fns';
import moment from 'moment'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

import Excel from 'exceljs';
import { saveAs } from 'file-saver';

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import Spinner from '../../../components/Spinner'
import RestClient from '../../../RestAPI/RestClient';
import AppUrl from '../../../RestAPI/AppUrl';
import { Avatar, Chip } from '@mui/material';

function ExpenseReport() {
    const [expenses, setExpenses] = useState([])
    const [totalPages, setTotalpages] = useState(0)
    const [pageNumber, setPageNumber] = useState(0)
    const [books, setBooks] = useState([])
    const [expensecategory, setExpensecategory] = useState([])
    const [filterData, setFilterData] = useState({
        book: '',
        category: '',
        expenseName: ''
    })
    const [loading, setLoading] = useState(true)
    const [date_range, setDateRange] = useState([
        {
            startDate: subDays(new Date(), 7),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ]);

    useEffect(() => {
        getExpensedata()
        getBookList()
        getAllExpensecategory()
    }, [pageNumber])

    // Get expenses list
    const getExpensedata = async () => {
        try {
            let start_date = moment(date_range[0].startDate, moment.ISO_8601).format()
            let end_date = moment(date_range[0].endDate, moment.ISO_8601).format()
            start_date = start_date.substring(0, 10);
            end_date = end_date.substring(0, 10);

            const url = AppUrl.expenseReportData + `?page=${pageNumber}` + `&start_date=${start_date}` + `&end_date=${end_date}` + `&book=${filterData.book}` + `&category=${filterData.category}` + `&expenseName=${filterData.expenseName}`

            RestClient.getRequest(url)
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

    // EXPORT REPORT
    const downloadReport = async () => {
        setLoading(true)
        await getExpenseDataForExport(exportExpenseData)
    }

    const exportExpenseData = async (expenses) => {
        const columns = [
            { header: 'Expense Name', key: 'expense_name' },
            { header: 'Category', key: 'category' },
            { header: 'Total amount', key: 'total_amount' },
            { header: 'Create at', key: 'created_at' }
        ];

        const workSheetName = 'Worksheet-1';
        const workBookName = 'expense_report';

        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet(workSheetName);
        worksheet.columns = columns;
        worksheet.getRow(1).font = { bold: true };

        const fileName = workBookName;

        worksheet.columns.forEach(function (column, i) {
            var maxLength = 0;
            column["eachCell"]({ includeEmpty: true }, function (cell) {
                var columnLength = cell.value ? cell.value.toString().length : 10;
                if (columnLength > maxLength ) {
                    maxLength = columnLength;
                }
            });
            column.width = maxLength < 20 ? 20 : maxLength;
        });

        expenses.forEach(singleData => {
            let data = {
                expense_name: singleData.expense_name,
                category: singleData.expense_category[0].category_name,
                total_amount: singleData.expense_total,
                created_at: moment(singleData.expense_date).format('YYYY-MM-DD HH:mm:ss')
            }
            worksheet.addRow(data);
        });

        const buf = await workbook.xlsx.writeBuffer();
        setLoading(false)
        saveAs(new Blob([buf]), `${fileName}.xlsx`);
        workbook.removeWorksheet(workSheetName);
    }

    const getExpenseDataForExport = async (exportExpenseData) => {
        try {
            let start_date = moment(date_range[0].startDate, moment.ISO_8601).format()
            let end_date = moment(date_range[0].endDate, moment.ISO_8601).format()
            start_date = start_date.substring(0, 10);
            end_date = end_date.substring(0, 10);

            const url = AppUrl.expenseReportData + `?page=${pageNumber}` + `&start_date=${start_date}` + `&end_date=${end_date}` + `&book=${filterData.book}` + `&category=${filterData.category}` + `&expenseName=${filterData.expenseName}`

            await RestClient.getRequest(url)
            .then(result => {
                const {expenses} = result.data;
                exportExpenseData(expenses)
            })
        } catch (error) {
            console.log(error);
        }
    }

    // Get book List
    const getBookList = async () => {
        try {
            try {
                const url = AppUrl.myBook 
                RestClient.getRequest(url)
                .then(result => {
                    const data = result.data;
                    setBooks(data);
                })
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            
        }
    }

    // Get category list
    const getAllExpensecategory = async () => {
        try {
            const url = AppUrl.expenseCategory 
            return RestClient.getRequest(url)
            .then(result => {
                const data = result.data;
                setExpensecategory(data);
            })
        } catch (error) {
            console.log(error);
        }
    }

    const filterReport = () => {
        getExpensedata()
    }

    const handleChange = (e) => {
        if(e.target.value != null) {
            setFilterData({
                ...filterData,
                [e.target.name]: e.target.value
            });
        }
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
                    <Grid container spacing={2}>
                        <Grid item xs={6} style={{ marginTop: '10px' }}>
                            <Paper>
                                <DateRangePicker
                                    onChange={item => setDateRange([item.selection])}
                                    showSelectionPreview={true}
                                    moveRangeOnFirstSelection={false}
                                    months={1}
                                    ranges={date_range}
                                    direction="horizontal"
                                    style={{ width: '90%' }}
                                />
                            </Paper>
                        </Grid>

                        <Grid item xs={6} style={{ marginTop: '10px' }} >
                            <Paper>
                            <div style={{ padding: '16px' }}>
                                <FormControl sx={{ mb: 2 }} size="small" style={{ width: '100%' }}>
                                    <InputLabel id="demo-simple-select-label">Book</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={filterData.book}
                                        label="Book"
                                        name='book'
                                        onChange={handleChange}
                                        style={{ width: '100%' }}
                                    >
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        {
                                            books.map((book) => (
                                                <MenuItem key={book._id} value={book._id}>{book.book_name}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>

                                <FormControl sx={{ mb: 2 }} size="small" style={{ width: '100%' }}>
                                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={filterData.category}
                                        label="Category"
                                        name='category'
                                        onChange={handleChange}
                                        style={{ width: '100%' }}
                                    >
                                          <MenuItem value=""><em>None</em></MenuItem>
                                        {
                                            expensecategory.map((category) => (
                                                <MenuItem key={category._id} value={category._id}>{category.category_name}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>

                                <FormControl sx={{ mb: 2 }} style={{ width: '100%' }}>
                                    <TextField onChange={handleChange} size="small" name='expenseName' id="outlined-basic" label="Expense Name" variant="outlined" value={filterData.expenseName} />
                                </FormControl>

                                <FormControl sx={{ mr: 2 }}>
                                    <Button fullWidth variant="contained" onClick={() => filterReport()} startIcon={<FilterAltIcon />}>
                                        Filter report
                                        </Button>
                                </FormControl>

                                <FormControl >
                                    <Button fullWidth variant="contained" onClick={() => downloadReport()} startIcon={<CloudDownloadIcon />}>Download report</Button>
                                </FormControl>
                            </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
                
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow style={{ backgroundColor: '#34495e' }}>
                                <TableCell style={{ color: '#ecf0f1' }}>Expense Name</TableCell>
                                <TableCell style={{ color: '#ecf0f1' }} align="right">Category</TableCell>
                                <TableCell style={{ color: '#ecf0f1' }} align="right">Total Amount</TableCell>
                                <TableCell style={{ color: '#ecf0f1' }} align="right">Payment</TableCell>
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
                                        <TableCell align="right">{row.expense_category[0].category_name}</TableCell>
                                        <TableCell align="right">{row.expense_total}</TableCell>
                                        <TableCell align="right">
                                        {
                                            row.paymentData.map((payment) => (
                                                <Grid container sx={{ mb: 0 }} key={payment._id}>
                                                    <Grid item xs={6}>
                                                        <Chip
                                                            avatar={<Avatar alt="Natacha" src={`/uploads/${payment.book_image}`}  />}
                                                            label={payment.book_name}
                                                            variant="outlined"
                                                            size="small"
                                                        >
                                                            
                                                        </Chip>
                                                   
                                                    </Grid>

                                                    <Grid item xs={6}>
                                                        {payment.amount}
                                                    </Grid>
                                                </Grid>
                                          
                                            ))
                                        }
                                        </TableCell>
                                        <TableCell align="right">{moment(row.expense_date).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                                    </TableRow>
                                ))
                            }
                            {
                                expenses.length == 0 && (
                                    <TableRow> <TableCell style={{ textAlign: 'center' }} colSpan={5}>No records found</TableCell> </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                {
                    expenses.length > 0 && (
                        <Fragment>
                            <Button onClick={gotoPrevious} sx={{ mr: 1, mt: 1 }}>Previous</Button>
                            <Button onClick={gotoNext} sx={{ mr: 1, mt: 1 }}>Next</Button>

                            <h4 style={{ float: 'right', marginTop: '17px' }}>Page of {pageNumber + 1}</h4>
                        </Fragment>
                    )
                }

 

            </Container>
        </div>
    )
}

export default ExpenseReport