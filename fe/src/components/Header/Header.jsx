import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/apis/authApiRequests";
import { createAxios } from "../../services/axiosJWT";
import { logout } from "../../redux/authSlice";
import "./Header.css";
import { getUserCart } from "../../redux/apis/cartApiRequests";
import logo from "../../assets/images/logo.png";
import cartImg from "../../assets/images/cart.png";
const Header = () => {
  const location = useLocation();
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser?.accessToken
  );
  const user = useSelector((state) => state.auth.login?.currentUser);
  const refreshToken = useSelector(
    (state) => state.auth.login?.currentUser?.refreshToken
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(user, dispatch, logout, refreshToken);
  useEffect(() => {
    if (user) {
      getUserCart(dispatch, axiosJWT, accessToken, user.id);
    }
  }, [user]);
  const cart = useSelector((state) => state.cart?.currentCart);
  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser(axiosJWT, dispatch, navigate, accessToken, refreshToken);
  };
  const handleMoveToCartPage = () => {
    navigate(`/cart`);
  };
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }
  return (
    <>
      <header>
        <div id="header">
          <Link to="/" class="logo">
            <img src={logo} alt="" />
          </Link>
          <div id="menu">
            <div class="item">
              <Link to="/">Trang chủ</Link>
            </div>
            <div class="item">
              <Link to="/product">Sản phẩm</Link>
            </div>
            <div class="item">
              <Link to="/contact">Liên hệ</Link>
            </div>
          </div>
          <div id="actions">
            <div class="item itemUser">
              {accessToken ? (
                <button className="buttonLogout" onClick={handleLogout}>
                  Đăng xuất
                </button>
              ) : (
                <Link
                  className="buttonLogin"
                  to="/login"
                  style={{ color: "black" }}
                >
                  Đăng nhập
                </Link>
              )}
            </div>
            <div class="item itemCart">
              <img src={cartImg} alt="" onClick={handleMoveToCartPage} />{" "}
              {cart ? `(${cart?.length})` : "(0)"}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
