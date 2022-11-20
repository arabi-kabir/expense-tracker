import React, { Fragment, useState, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Typography } from '@mui/material';
import RestClient from '../../../RestAPI/RestClient';
import AppUrl from '../../../RestAPI/AppUrl';
import moment from 'moment'
import Spinner from '../../../components/Spinner';

function CashInList() {
    const [loading, setLoading] = useState(true)
    const [totalPages, setTotalpages] = useState(0)
    const [pageNumber, setPageNumber] = useState(0)
    const [previousCashinData, setPreviousCashInData] = useState([])

    useEffect(() => {  
        getCashInData()
    }, [pageNumber])

    const getCashInData = async () => {
        try {
            const url = AppUrl.cashIn

            await RestClient.getRequest(url)
            .then(result => {
                const {cashInData, totalPages} = result.data;
                setPreviousCashInData(cashInData)
                setTotalpages(totalPages)
                setLoading(false)
            }) 
        } catch (error) {
            
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
        <Fragment>
             <Typography variant="overline" display="block" gutterBottom>
                Previous Cash In
            </Typography>

            <Paper elevation={3}>
                <TableContainer component={Paper} >
                    <Table sx={{ minWidth: '100%' }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Cash in title</TableCell>
                                <TableCell align="right">Book</TableCell>
                                <TableCell align="right">Amount</TableCell>
                                <TableCell align="right">Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            previousCashinData.map((row) => (
                                <TableRow
                                    key={row._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    hover={true}
                                >
                                    <TableCell component="th" scope="row">{row.cash_in_title}</TableCell>
                                    <TableCell align="right">{row.cash_in_book.book_name}</TableCell>
                                    <TableCell align="right">{row.amount}</TableCell>
                                    <TableCell align="right">{moment(row.createdAt).format("MMM Do YY")}</TableCell>
                                </TableRow>
                            ))
                        }
                        </TableBody>
                    </Table>
                </TableContainer>

                {
                    previousCashinData.length > 0 && (
                        <Fragment>
                            <Button onClick={gotoPrevious} sx={{ mr: 1, mt: 1 }}>Previous</Button>
                            <Button onClick={gotoNext} sx={{ mr: 1, mt: 1 }}>Next</Button>

                            <h5 style={{ float: 'right', marginTop: '17px', marginRight: '10px' }}>Page of {pageNumber + 1}</h5>
                        </Fragment>
                    )
                }
            </Paper>
        </Fragment>
    )
}

export default CashInList