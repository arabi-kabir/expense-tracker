import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import About from '../src/pages/about/About';
import Dashboard from './pages/dashboard/Dashboard'
import Logout from './components/Logout';
import Expenses from './pages/expense/Expenses';
import AddExpense from './pages/expense/AddExpense';
import EditExpense from './pages/expense/EditExpense';
import ReportIndex from './pages/report/ReportIndex';
import ExpenseReport from './pages/report/Expense/ExpenseReport';
import BookList from './pages/my-book/BookList';
import BookDetails from './pages/my-book/BookDetails';
import AddExpenseCategory from './pages/expense-category/AddExpenseCategory';
import ExpenseCategory from './pages/expense-category/ExpenseCategory';
import BookAdd from './pages/my-book/BookAdd';
import BookEdit from './pages/my-book/BookEdit';

require('dotenv').config()

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
					<Route path='/add-expenses' element={<AddExpense />} />
					<Route path='/edit-expenses/:id' element={<EditExpense />} />

					<Route path='/my-book' element={<BookList />} />
					<Route path='/my-book/add' element={<BookAdd />} />
					<Route path='/my-book/:id' element={<BookDetails />} />
					<Route path='/my-book/edit/:id' element={<BookEdit />} />

					<Route path='/reports' element={<ReportIndex />} />
					<Route path='/report/expense' element={<ExpenseReport />} />

					<Route path='/expense-category' element={<ExpenseCategory />} />
					<Route path='/expense-category/add' element={<AddExpenseCategory />} />
				

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


