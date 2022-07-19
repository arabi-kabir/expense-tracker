import React, { Fragment, createContext, useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import About from './pages/About';
import Dashboard from './pages/Dashboard'

import Navbar from './components/Navbar'
import AuthService from './services/auth/auth.service'
import Layout from './components/layout/layout';
import AuthLayout from './components/layout/authLayout';
import LayoutContainer from './components/layout/layoutContainer';

function App() {
	const [isLogged, setIsLogged] = useState(false)

    useEffect( () => {
		const user = authCheck()
		// // console.log(JSON.parse(JSON.stringify(user)));
		console.log(isLogged);
        
    }, [])

	const authCheck = async () => {
		const user = await AuthService.getCurrentUser()
		if(user) {
            setIsLogged(true)
        }
		return (user);
	}  

    return (
        <Fragment>


			{/* <Layout> */}
				<Router>			
					<Routes>
						<Route path='/' element={<Login />} />
						<Layout>
							<Route path='/dashboard' element={<Dashboard />} />
						</Layout>
						<Route path='/register' element={<Register />} />
						<Route path='/about' element={<About />} />
					
					</Routes>

					{/* <Navbar /> */}
				</Router>
			{/* </Layout> */}
            

			<ToastContainer
				position="top-right"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={true}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss={false}
				draggable
				pauseOnHover
			/>
        </Fragment>
    )
}

export default App


