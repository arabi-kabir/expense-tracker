import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const AuthLayout = (props) => (
        <>
            <h4>Auth layout</h4>
            {props.children}
        </>
    )


export default AuthLayout;