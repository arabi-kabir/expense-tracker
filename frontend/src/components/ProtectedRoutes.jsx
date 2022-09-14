import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

function ProtectedRoutes() {
    const token = localStorage.getItem("token");
    if(!token) {
        return (
            <Navigate to='/' />
        ) 
    }else {
        return (
            <Outlet />
        )
    }
}

export default ProtectedRoutes