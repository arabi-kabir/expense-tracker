import React, { useState, useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import AppUrl from '../RestAPI/AppUrl';
import RestClient from '../RestAPI/RestClient';

function ProtectedRoutes() {
    const token = localStorage.getItem("token");
    const [tokenStatus, setTokenStatus] = useState('')

    useEffect(() => {
        getTokenStatus()
    }, [])

    const getTokenStatus = async () => {
        const response = await RestClient.getRequest(AppUrl.validateToken)
        setTokenStatus(response.data)
    }

    if(!token || tokenStatus === 'user not found') {
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