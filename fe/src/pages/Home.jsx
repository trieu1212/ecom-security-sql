import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../redux/apis/authApiRequests'
import { loginSuccess } from '../redux/authSlice'
import { createAxios } from '../services/axiosJWT'

const Home = () => {
  const accessToken = useSelector(state=>state.auth.login.currentUser?.accessToken)
  const user = useSelector(state=>state.auth.login?.currentUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let axiosJWT = createAxios(user,dispatch,loginSuccess)
  const handleLogout = (e) =>{
    e.preventDefault()
    logoutUser(axiosJWT,dispatch,navigate,accessToken)
  } 
  useEffect(()=>{
    if(!user){
      navigate('/login')
    }
  },[])
  return (
    <>
        <h1>Home</h1>
        {accessToken && <button onClick={handleLogout}>Logout</button>}
    </>
  )
}

export default Home