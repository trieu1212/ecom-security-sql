import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputForm from "../../components/InputForm/InputForm";
import { createAxios } from "../../services/axiosJWT";
import { loginSuccess } from "../../redux/authSlice";
import { createOrder } from "../../redux/apis/orderApiRequests";
const Checkout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [nation,setNation] = useState('')
  const [address,setAddress] = useState('')
  const user = useSelector((state) => state.auth.login?.currentUser);
  const cart = useSelector((state) => state.cart?.currentCart);
  let axiosJWT = createAxios(user, dispatch, loginSuccess, user?.refreshToken);
  console.log(cart);
  const navigate = useNavigate();
  const totalPrice = location?.state?.totalPrice;
  if (!user) {
    navigate("/");
  }
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
  const handlePaymentCOD = async() =>{
    const data = {
      amount: totalPrice,
      address:{
        address: address,
        nation: nation
      },
      products:cart
    }
    await createOrder(data,dispatch,navigate,axiosJWT,user?.accessToken,user?.id)
  }
  const handlePaymentCard = async() =>{
    toast.warning('Chức năng thanh toán thẻ tín dụng đang được phát triển')
  }
  return (
    <>
      <div className="checkoutContainer">
        <h1>Checkout</h1>
        <div>
          {cart?.map((item) => {
            return (
              <>
                <h3>{item.Product.title}</h3>
                <h3>giá: {formatPrice(item.Product.price)}</h3>
                <h3>số lượng {item.quantity}</h3>
              </>
            );
          })}
        </div>
        <h3>Tổng tiền: {formatPrice(totalPrice)}</h3>
        <h3>Nhập địa chỉ thông tin người nhận hàng</h3>
        <InputForm type="text" placeholder="Nhập Địa chỉ" data={address} setData={setAddress}/><br />
        <InputForm type="text" placeholder="Nhập quốc gia" data={nation} setData={setNation}/>
        <br />
        <div className="paymentMethod">
          <button onClick={handlePaymentCOD}>Thanh toán: COD</button>
          <button onClick={handlePaymentCard}>Thanh toán: Thẻ tín dụng</button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
