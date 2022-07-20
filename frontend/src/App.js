import React, { Fragment, createContext, useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import About from './pages/About';
import Dashboard from './pages/Dashboard'
import Logout from './components/Logout';
import Expenses from './pages/Expenses';

function App() {
    return (
        <Fragment>
			<Router>			
				<Routes>
					<Route path='/' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/about' element={<About />} />
					<Route path='/dashboard' element={<Dashboard />} />
					<Route path='/expenses' element={<Expenses />} />

					<Route path='/logout' element={<Logout />} />
				</Routes>
			</Router>
            
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


