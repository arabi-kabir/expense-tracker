import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import AuthService from '../services/auth/auth.service'

function Logout() {
    const navigate = useNavigate()

    useEffect(() => {
        console.log('use eff called');
        logout()
    },[])

    const logout = async () => {
        try {
            toast.success('Logged out successfully')
            await AuthService.logout()

            navigate('/')

        
            console.log('ji');
        } catch (error) {
            console.log(error);
            toast.error('Opps! something is wrong.')
        }
    }
 
    return (
        <div>

        </div>
    )
}

export default Logout