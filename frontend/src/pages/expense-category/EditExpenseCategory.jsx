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
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import RestClient from '../../RestAPI/RestClient';
import Spinner from '../../components/Spinner';
import { toast } from "react-toastify";

function EditExpenseCategory() {
	const navigate = useNavigate()
    let { id } = useParams();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getCategoryInfo()
    }, [])

	const [category, setCategory] = useState({
		category_name: '',
		category_status: '',
		photo: ''
	})

	const onChangeFileUpload = (e) => {
		setCategory({
			...category,
			photo: e.target.files[0]
		})
	}

	const handleChange = (e) => {
		setCategory({
			...category,
			[e.target.name]: e.target.value
		})
	}

    const getCategoryInfo = () => {
        try {
            const url = AppUrl.expenseCategory + `/${id}`
            return RestClient.getRequest(url)
            .then(result => {
                const data = result.data;

                // console.log(data);

                setCategory({
                    category_name: data.category_name,
                    category_status: data.category_status,
                    photo: data.category_image
                })
                setLoading(false)
            })
        } catch (error) {
            console.log(error);
            return error
        }
    }

	const onSubmit = async (e) => {
		e.preventDefault()

		let formdata = new FormData()
		formdata.append('photo', category.photo)
		formdata.append('category_name', category.category_name)
		formdata.append('category_status', category.category_status)

        const url = AppUrl.expenseCategory + `/${id}`

        // console.log(formdata);

		try {
			const res = await RestClient.updateRequest(url, formdata)

            console.log(res);

            // return 0;

            if(res.status == 200) {
                toast.success('Category updated')
                navigate('/expense-category/')
            }
		} catch (error) {
            console.log(error);
			if(error.response.status === 500) {
				console.log('There was a problem with the server');
			} else {
				console.log(error.response.data);
			}
		}
	}

    if(loading) {
        return <Spinner />
    }

    return (
        <Fragment>
            <Menu />

            <Container>
              <h2>Edit Expense Category</h2>

              <div style={{ backgroundColor: '#ffffff', padding: '20px' }}>
                  <form onSubmit={onSubmit} encType="multipart/form-data">
				  		<TextField 
							fullWidth 
							style={{ marginBottom: '20px' }} 
							id="outlined-basic" 
							label="Category Name" 
							variant="outlined" 
							name="category_name"
							value={category.category_name}
							onChange={handleChange}
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

                        <img 
                            src={`/uploads/${category.photo}`} 
                            alt='as' 
                            style={{ display: 'block', width: '200px', marginBottom: '20px', border: '1px solid grey' }} 
                        />

						<input
							type="file"
							name="photo"
							accept=".png, .jpg, .jpeg"
							onChange={onChangeFileUpload}
						/>

						<br />

						<Button sx={{ mt: 2 }} type='submit' variant="contained">Save Changes</Button>
				  </form>
              </div>
            </Container>
        </Fragment>
    )
}

export default EditExpenseCategory