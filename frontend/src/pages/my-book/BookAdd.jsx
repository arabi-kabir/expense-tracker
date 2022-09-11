import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/system'
import React, { Fragment, useState } from 'react'
import Menu from '../../components/navbar/Menu'
import TextField from '@mui/material/TextField';
import AppUrl from '../../RestAPI/AppUrl';
import RestClient from '../../RestAPI/RestClient';
import { toast } from "react-toastify";


function BookAdd() {
    const navigate = useNavigate()

	const [book, setBook] = useState({
		book_name: '',
		book_tag: '',
		photo: ''
	})

	const onChangeFileUpload = (e) => {
		setBook({
			...book,
			photo: e.target.files[0]
		})
	}

	const handleChange = (e) => {
		setBook({
			...book,
			[e.target.name]: e.target.value
		})
	}

	const onSubmit = async (e) => {
		e.preventDefault()

		const formdata = new FormData()
		formdata.append('photo', book.photo)
		formdata.append('bookName', book.book_name)
		formdata.append('bookTag', book.book_tag)

		try {
			const res = await RestClient.postRequest(AppUrl.myBook, formdata)
			if(res.status == 201) {
				toast.success('Book created')
				navigate('/my-book')
			} else {
				toast.error(res)
			}
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
              <h2>Add New Book</h2>

              <div style={{ backgroundColor: '#ffffff', padding: '20px' }}>
                  <form onSubmit={onSubmit} encType="multipart/form-data">
				  		<TextField 
							fullWidth 
							style={{ marginBottom: '20px' }} 
							id="outlined-basic" 
							label="Book Name" 
							variant="outlined" 
							name="book_name"
							value={book.book_name}
							onChange={handleChange}
						/>

                        <TextField 
							fullWidth 
							style={{ marginBottom: '20px' }} 
							id="outlined-basic" 
							label="Book Tag" 
							variant="outlined" 
							name="book_tag"
							value={book.book_tag}
							onChange={handleChange}
						/>

						<input
							type="file"
							name="photo"
							accept=".png, .jpg, .jpeg"
							onChange={onChangeFileUpload}
						/>

						<br />

						<Button sx={{ mt: 2 }} type='submit' variant="contained">Add New Book</Button>
				  </form>
              </div>
            </Container>
        </Fragment>
    )
}

export default BookAdd