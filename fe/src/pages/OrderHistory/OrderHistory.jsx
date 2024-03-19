import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './OrderHistory.css'
import { getUserOrder } from '../../redux/apis/orderApiRequests';
import {createAxios} from '../../services/axiosJWT'
import { loginSuccess } from '../../redux/authSlice';
const OrderHistory = () => {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess, user?.refreshToken);
    const navigate = useNavigate();
    useEffect(()=>{
        getUserOrder(dispatch,axiosJWT,user?.accessToken,user?.id)
    },[])
    const order = useSelector((state)=>state.order.currentOrder)
    if(!user){
        navigate('/')
    }
  return (
    <>
        <h1 style={{ textAlign:"center",margin:"1rem 0" }}>Thông tin tài khoản</h1>
        <div className='contentContainer'>
            <div className='info'>
                <div className='infoUser'>
                    <i style={{ fontSize:"50px",marginBottom:"2rem" }} class="fa-solid fa-user-large fa-2xl"></i>
                    <h3>{user?.username}</h3>
                    <p style={{ marginBottom:"0.5rem" }}>{user?.email}</p>
                </div>
            </div>
            <div className='orderHistory'>
                <div className='orderHistoryItem'>
                    <div><img src="" alt="" /></div>
                    <div>title x2</div>
                    <div>Giá</div>
                </div>
                <div>
                    helo
                </div>
            </div>
        </div>
    </>
  )
}

export default OrderHistory