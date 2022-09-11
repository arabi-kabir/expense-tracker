import React from 'react'
import { Grid, Select, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

function Payment(props) {
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <FormControl sx={{ mb: 2 }} style={{ width: '100%' }}>
                        <InputLabel id="demo-simple-select-helper-label">Book</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={1}
                            label="Book"
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

                <Grid item xs={6}>
                    <TextField 
                        sx={{ mb: 2 }} 
                        style={{ width: '100%' }} 
                        id="outlined-basic" 
                        label="Expense Amount" 
                        variant="outlined" 
                        value={1}
                        onChange={props.handleChange}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default Payment