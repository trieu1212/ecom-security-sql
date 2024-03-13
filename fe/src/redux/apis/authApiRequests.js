import axios from 'axios';
import { loginError, loginStart, loginSuccess, logout, registerError, registerStart, registerSuccess } from '../authSlice';
import Cookies from 'universal-cookie';
export const loginUser =async (user,dispatch,navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post('http://localhost:7000/api/auth/login',user)
        dispatch(loginSuccess(res.data))
        const cookies = new Cookies()
        cookies.set('refreshToken',res.data.refreshToken,{path:'/',httpOnly:true,sameSite:'strict'})
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

export const logoutUser = async (axiosJWT,dispatch,navigate,accessToken,id) =>{
    try {
        const res = await axiosJWT.post('http://localhost:7000/api/auth/logout',id,{
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



