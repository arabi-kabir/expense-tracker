import React, { Fragment } from 'react'
import Menu from '../../components/navbar/Menu'
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Grid, Container } from '@mui/material';
import { useState, useEffect } from 'react';
import AppUrl from '../../RestAPI/AppUrl';
import RestClient from '../../RestAPI/RestClient';

function ExpenseCategory() {
    const navigate = useNavigate()
    const [expensecategory, setExpensecategory] = useState([])

    useEffect(() => {
        getAllExpensecategory()
    }, [])

    const getAllExpensecategory = async () => {
        try {
            const url = AppUrl.expenseCategory 
            return RestClient.getRequest(url)
            .then(result => {
                const data = result.data;
                setExpensecategory(data);
                console.log(data);
            })
        } catch (error) {
            console.log(error);
        }
    }

    const openCategory = (cat_id) => {
        navigate('/expense-category/edit/' + cat_id)
    }

    return (
        <Fragment>
            <Menu />

            <Container>
                <Button sx={{mt: 2, mb: 2}} variant="contained" onClick={() => navigate('/expense-category/add')}>
                    Add New Category
                </Button>

                {/* <Container style={{ 'marginTop': '30px' }}> */}
                    <Grid container spacing={2}>
                        {
                            expensecategory.map((category) => (
                                <Grid item xs={3} style={{ marginBottom: '10px', }} key={category._id}>
                                    <Card sx={{ maxWidth: 345 }}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                image={`/uploads/${category.category_image}`}
                                                alt="green iguana"
                                            />
                                            <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {category.category_name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <b>Status : </b> {category.category_status}
                                            </Typography>
                                            </CardContent>
                                        </CardActionArea>

                                        <CardActions>
                                            <Button size="small" color="primary" onClick={() => openCategory(category._id)}>Details</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))
                        }
                    </Grid>
                {/* </Container> */}
            </Container>
        </Fragment>
    )
}

export default ExpenseCategory