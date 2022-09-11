import { Container } from '@mui/system'
import React, { Fragment } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Grid } from '@mui/material';
import Menu from '../../components/navbar/Menu'
import { useState } from 'react';
import { useEffect } from 'react';
import AppUrl from '../../RestAPI/AppUrl';
import RestClient from '../../RestAPI/RestClient';
import { useNavigate } from 'react-router-dom';

function BookList() {
    const navigate = useNavigate()

    const [books, setBooks] = useState([])

    useEffect(() => {
        getBookList()
    }, [])

    const getBookList = async () => {
        try {
            const url = AppUrl.myBook 
            return RestClient.getRequest(url)
            .then(result => {
                const data = result.data;
                setBooks(data);
                console.log(data);
            })
        } catch (error) {
            console.log(error);
        }
    }

    const openBook = (book_id) => {
        navigate('/my-book/' + book_id)
    }

    return (
        <Fragment>
            <Menu />

            <Container style={{ 'marginTop': '30px' }}>
                <Button variant="contained" sx={{ mb: 2 }} onClick={() => navigate('/my-book/add')}>
                    Add New Book
                </Button>

                <Grid container>
                    {
                        books.map((book) => (
                            <Grid item xs={4} style={{ marginBottom: '30px' }} key={book._id}>
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={`/uploads/${book.book_image}`}
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {book.book_name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <b>Balance : </b> {book.current_balance}
                                        </Typography>
                                        </CardContent>
                                    </CardActionArea>

                                    <CardActions>
                                        <Button size="small" color="primary" onClick={() => openBook(book._id)}>Details</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>
            </Container>
        
        </Fragment>
    )
}

export default BookList