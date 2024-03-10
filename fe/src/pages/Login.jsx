import React from 'react'
import { useState } from 'react'
import { loginUser } from '../redux/apis/authApiRequests'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            username: username,
            password: password
        }
        loginUser(data,dispatch,navigate)
    }
  return (
    <>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" 
            placeholder="username" 
            value={username} 
            onChange={(e)=>setUsername(e.target.value)}
            />
            <input type="password" 
            placeholder="password" 
            value={password} 
            onChange={(e)=>setPassword(e.target.value)}
            />
            <input type="submit" value="Login"/>
        </form>
    </>
  )
}

export default Login