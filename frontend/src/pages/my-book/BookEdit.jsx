import { Button } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom';
import { Container } from '@mui/system'
import React, { Fragment, useState } from 'react'
import Menu from '../../components/navbar/Menu'
import TextField from '@mui/material/TextField';
import { toast } from "react-toastify";
import AppUrl from '../../RestAPI/AppUrl';
import { useEffect } from 'react';
import RestClient from '../../RestAPI/RestClient';
import Spinner from '../../components/Spinner';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';

function BookEdit() {
    const navigate = useNavigate()
    let { id } = useParams();

	const [book, setBook] = useState({
		book_name: '',
		book_tag: '',
		photo: '',
        current_balance: ''
	})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getBookDetails()
    }, [])

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

     // Get expense details
     const getBookDetails = async () => {
        try {
            const url = AppUrl.myBook + `/${id}`
            return RestClient.getRequest(url)
            .then(result => {
                const data = result.data;

                setBook({
                    book_name: data.book_name,
                    book_tag: data.book_tag,
                    photo: data.book_image,
                    current_balance: data.current_balance,
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

		const formdata = new FormData()
		formdata.append('photo', book.photo)
		formdata.append('bookName', book.book_name)
		formdata.append('bookTag', book.book_tag)
        formdata.append('currentBalance', book.current_balance)

        const url = AppUrl.myBook + `/${id}`

		try {
			const res = await RestClient.updateRequest(url, formdata)

            if(res.status == 200) {
                toast.success('Book updated')
                navigate('/my-book/' + id)
            }
		} catch (error) {
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
                <h2>
                    <IconButton aria-label="GO BACK" onClick={() => navigate('/my-book/' + id)}>
                        <ArrowBackIcon />
                    </IconButton>
                    <span>Change Book Information</span>
                </h2>

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

                        <TextField 
                            fullWidth 
                            style={{ marginBottom: '20px' }} 
                            id="outlined-basic" 
                            label="Current balance" 
                            variant="outlined" 
                            name="current_balance"
                            value={book.current_balance}
                            onChange={handleChange}
                        />

                        <img 
                            src={`/uploads/${book.photo}`} 
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

export default BookEdit