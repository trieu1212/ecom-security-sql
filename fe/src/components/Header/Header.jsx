import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/apis/authApiRequests";
import { createAxios } from "../../services/axiosJWT";
import { logout } from "../../redux/authSlice";
import './Header.css'
const Header = () => {
  const location = useLocation()
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser?.accessToken
  );
  const user = useSelector((state) => state.auth.login?.currentUser);
  const refreshToken = useSelector((state)=>state.auth.login?.currentUser?.refreshToken)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(user, dispatch, logout,refreshToken);
  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser(axiosJWT, dispatch, navigate, accessToken,refreshToken);
  };
  if(location.pathname==="/login" || location.pathname==="/register"){
    return null
  }
  return (
        <>
            {user? (<p>Xin chào {user?.username}!</p>):""}
            {accessToken ? (<button onClick={handleLogout}>Đăng xuất</button>):(<Link to="/login">Đăng nhập</Link>)}
        </>)
};

export default Header;