import React from 'react'
import { Button, Grid, Select, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function Payment(props) {

    const deleteItem = () => {
        props.hanldeDeleteItem(props.index)
    }

    const renderDeleteIcon = () => {
        if(props.index != 0) {
            return (
                <Grid item xs={1}>
                    <IconButton aria-label="delete" size="large" color='error' onClick={deleteItem}>
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                </Grid>
            )
        }
    }

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <FormControl sx={{ mb: 2 }} style={{ width: '100%' }}>
                        <InputLabel id="demo-simple-select-helper-label">Book</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={props.data.method}
                            label="Book"
                            name={`payment${props.index}`}
                            onChange={props.handleChange}
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {
                            props.bookList.map((book) => (
                                <MenuItem value={book._id} key={book._id}>{book.book_name}</MenuItem>
                            ))
                        } 
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={5}>
                    <TextField 
                        sx={{ mb: 2 }} 
                        style={{ width: '100%' }} 
                        id="outlined-basic" 
                        label="Expense Amount" 
                        variant="outlined" 
                        value={props.data.amount}
                        name={`amount${props.index}`}
                        onChange={props.handleChange}
                    />
                </Grid>
                { renderDeleteIcon() }
            </Grid>
        </div>
    )
}

export default Payment