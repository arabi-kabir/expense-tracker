import React, { Fragment } from 'react'
import Container from '@mui/material/Container';
import Menu from '../../components/navbar/Menu'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

function ReportIndex() {
    const navigate = useNavigate()

    return (
        <Fragment>
           <Menu />
          
            <Container style={{ 'marginTop': '30px' }}>
                <Card sx={{ maxWidth: 345, cursor: 'pointer' }} onClick={() => navigate('/report/expense')}>
                    <CardMedia
                        component="img"
                        height="200"
                        image="/files/images/expenses.png"
                        alt="green iguana"
                        style={{ width: '100%' }}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Expense Report
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            View / Download Expense Report 
                        </Typography>
                    </CardContent>

                    {/* <CardActions>
                        <Button size="small" onClick={() => navigate('/report/expense')}>view</Button>
                    </CardActions> */}
                </Card>
            </Container>
        </Fragment>
    )
}

export default ReportIndex