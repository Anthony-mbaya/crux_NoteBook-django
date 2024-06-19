import {Navigate} from 'react-router-dom'  // Helps navigate between pages
import {jwtDecode} from 'jwt-decode'  // Decodes the special token
import api from '../api' // This is a custom module for making API requests.
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants'
import { useState,useEffect } from 'react'


export const ProtectedRoute =( {children} )=>{
    // State to check if the user is authorized
    const [isAuthorized, setIsAuthorized] = useState(null)

    // Runs the auth function once when the component loads
    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    // Function to refresh the access token using the refresh token
    const refreshToken = async () => {
        // Retrieve the refresh token from localStorage
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try {
            const res = await api.post('/api/token/refresh/',{refresh : refreshToken, });
            if (res.status === 200){
                // If successful, store the new access token in localStorage
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            }else{
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }

    }
    // Function to authenticate the user by checking the access token
    const auth = async () => {
        // Retrieve the access token from localStorage
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token){
            setIsAuthorized(false)
            return
        }
        // Decode the JWT to extract the expiration time
        const decoded = jwtDecode(token)
        const tokenExpiration = decoded.exp 
        const now = Date.now() / 1000
        if(tokenExpiration < now){
            // If the token is expired, attempt to refresh it
            await refreshToken();
        }else{
            // If the token is valid, set the authorization state to true
            setIsAuthorized(true);
        }

    }
    if (isAuthorized === null) {
        return <div>Loading ...</div>
    }

    return isAuthorized ? children : <Navigate to='login' />
}