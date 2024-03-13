import axios from 'axios';
import { loginError, loginStart, loginSuccess, logout, registerError, registerStart, registerSuccess } from '../authSlice';
export const loginUser =async (user,dispatch,navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post('http://localhost:7000/api/auth/login',user)
        dispatch(loginSuccess(res.data))
        navigate('/')
    } catch (error) {
        dispatch(loginError())
    }
}

export const registerUser = async (user,dispatch,navigate) =>{
    dispatch(registerStart())
    try {
        const res = await axios.post('http://localhost:7000/api/auth/register',user)
        dispatch(registerSuccess(res.data))
        navigate('/login')
    } catch (error) {
        dispatch(registerError())
    }
}

export const logoutUser = async (axiosJWT,dispatch,navigate,accessToken,refreshToken) =>{
    try {
        const res = await axiosJWT.post('http://localhost:7000/api/auth/logout',refreshToken,{
            headers:{
                Authorization: `Bearer ${accessToken}`
            }
        })
        dispatch(logout(res.data))
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}



