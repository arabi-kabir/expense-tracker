import { Button, Container } from '@mui/material'
import React, { Fragment } from 'react'
import Menu from '../../components/navbar/Menu'
import { useNavigate } from 'react-router-dom';

function ExpenseCategory() {
    const navigate = useNavigate()

    return (
        <Fragment>
            <Menu />

            <Container>
                <Button sx={ {mt: 2} } variant="contained" onClick={() => navigate('/expense-category/add')}>Add New Category</Button>
            </Container>
        </Fragment>
    )
}

export default ExpenseCategory