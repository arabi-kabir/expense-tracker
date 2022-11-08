import { Card, CardContent, Chip, Container, Grid, Typography, Button } from '@mui/material'
import React, { Fragment } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Menu from '../../components/navbar/Menu'
import { useNavigate, useParams } from 'react-router-dom';
import RestClient from '../../RestAPI/RestClient';
import AppUrl from '../../RestAPI/AppUrl';
import Spinner from '../../components/Spinner'
import moment from 'moment'
import PaidIcon from '@mui/icons-material/Paid';
import taka_icon from '../../components/assets/taka_icon.png'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import MyModal from '../../components/MyModal'

function BookDetails() {
    let { id } = useParams();
    const navigate = useNavigate()

    const [book, setBook] = useState(0)
    const [bookExpenses, setBookExpenses] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        getCurrentBalance()
        getLastTransaction()
    }, [])

    const getCurrentBalance = () => {
        try {
            const url = AppUrl.myBook + `/${id}`
            return RestClient.getRequest(url)
            .then(result => {
                const data = result.data;
                setBook(data)
                setLoading(false)
            })
        } catch (error) {
            return error
        }
    }

    const getLastTransaction = () => {
        console.log('hi');
        try {
            const url = AppUrl.myBookLastExpenses + `/${id}`
            
            RestClient.getRequest(url)
            .then(result => {
                console.log(result);
                const data = result.data;
                setBookExpenses(data)
                setLoading(false)
                console.log(bookExpenses);
            })
        } catch (error) {
            console.log(error);
        }
    }

     // Handle expense edit
     const handleItemEdit = () => {
        navigate('/my-book/edit/' + id)
    }

    if(loading) {
        return <Spinner />
    }

    return (
        <Fragment>
            <Menu />

            <Container style={{ 'marginTop': '10px', marginBottom: '50px' }}>
                <Grid container>
                    <Grid item xs={6} style={{ padding: '10px' }}>
                        <div >
                            <Card>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Current Balance
                                    </Typography>

                                    <Typography variant="h5" component="div">
                                        <img src={taka_icon} style={{ width: '20px' }} /> 
                                        {book.current_balance}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                    </Grid>

                    <Grid item xs={6} style={{ padding: '10px' }}>
                        <div >
                            <Card>
                                <CardContent>
                                    <Button 
                                        variant="text" 
                                        style={{ float: 'right' }}
                                        onClick={handleItemEdit}
                                    >
                                        Change
                                    </Button>

                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Book Details
                                    </Typography>

                                    <Typography component="div">
                                        <table style={{ width: '50%' }}>
                                            <tbody>
                                                <tr>
                                                    <td><b>Book Name</b></td>
                                                    <td>{book.book_name}</td>
                                                </tr>
                                                <tr>
                                                    <td><b>Book Tag</b></td>
                                                    <td><Chip size="small"  label={book.book_tag} color="success" /></td>
                                                </tr>
                                                <tr>
                                                    <td><b>Created at</b></td>
                                                    <td>{moment(book.createdAt).format('YYYY-MM-DD')}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                       
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={12} style={{ padding: '10px' }}>
                        <div>
                            <Card>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Last 20 transactions
                                    </Typography>

                                    <Typography variant="h5" component="div">
                                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                            {
                                                bookExpenses.map((expense) => (
                                                    <ListItem style={{ maxWidth: '100%' }}>
                                                        <ListItemAvatar>
                                                            <Avatar style={{ border: '1px solid #dfe6e9' }} alt='image' src={`/uploads/${expense.category[0].category_image}`} />
                                                        </ListItemAvatar>
                                                        <ListItemText 
                                                            primary={expense.expense_name} 
                                                            secondary={`[ ${expense.payments.amount} ] ${moment(expense.createdAt).format('dddd, MMMM Do YYYY')}`}
                                                        />
                                                    </ListItem>
                                                ))
                                            }
                                        </List>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </Fragment>
    )
}

export default BookDetails