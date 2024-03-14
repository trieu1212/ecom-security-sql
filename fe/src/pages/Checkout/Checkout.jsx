import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
const Checkout = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const navigate = useNavigate()
  if(!user){
    navigate('/')
  }
  return (
    <div>{user?.accessToken}</div>
  )
}

export default Checkout