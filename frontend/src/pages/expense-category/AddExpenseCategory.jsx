import { Button } from '@mui/material'
import { Container } from '@mui/system'
import React, { Fragment } from 'react'
import Menu from '../../components/navbar/Menu'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import axios from 'axios';
import AppUrl from '../../RestAPI/AppUrl';

function AddExpenseCategory() {
	const [category, setCategory] = useState({
		category_name: '',
		category_status: '',
		photo: ''
	})
	// const [uploadedFile, setUploadedFile] = useState({})

	const onChangeFileUpload = (e) => {
		setCategory({
			...category,
			photo: e.target.files[0]
		})

		console.log(category.photo);
	}

	const handleChange = (e) => {
		setCategory({
			...category,
			[e.target.name]: e.target.value
		})
	}

	const onSubmit = async (e) => {
		e.preventDefault()

		const formdata = new FormData()
		formdata.append('file', category.file)
		formdata.append('category_name', category.category_name)
		formdata.append('category_status', category.category_status)

		try {
			const res = await axios.post(AppUrl.expenseCategory, formdata, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})

			const { fileName, filePath } = res.data
			// setUploadedFile({
			// 	fileName, 
			// 	filePath
			// })

			console.log(filePath);
		} catch (error) {
			if(error.response.status === 500) {
				console.log('There was a problem with the server');
			} else {
				console.log(error.response.data);
			}
		}
	}

    return (
        <Fragment>
            <Menu />

            <Container>
              <h2>Add new expense category</h2>

              <div style={{ backgroundColor: '#ffffff', padding: '20px' }}>
                  <form onSubmit={onSubmit} encType="multipart/form-data">
				  		<TextField 
							fullWidth 
							style={{ marginBottom: '20px' }} 
							id="outlined-basic" 
							label="Category Name" 
							variant="outlined" 
							name="category_name"
						/>

						<FormControl fullWidth style={{ marginBottom: '20px' }}>
							<InputLabel id="demo-simple-select-label">Category Status</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={category.category_status}
								label="Category Status"
								onChange={handleChange}
								name="category_status"
							>
								<MenuItem value='Active'>Active</MenuItem>
								<MenuItem value='Inactive'>Inactive</MenuItem>
							</Select>
						</FormControl>

						<input
							type="file"
							name="photo"
							accept=".png, .jpg, .jpeg"
							onChange={onChangeFileUpload}
						/>

						<button type='submit'>Add category</button>
				  </form>
              </div>
            </Container>
        </Fragment>
    )
}

export default AddExpenseCategory