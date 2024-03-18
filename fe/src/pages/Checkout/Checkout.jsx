import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
const Checkout = () => {
  const location = useLocation();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const cart = useSelector((state) => state.cart?.currentCart);
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
        <input type="text" placeholder="Quốc gia..." />
        <br />
        <input type="text" placeholder="Tỉnh/Thành phố..." /> <br />
        <input type="text" placeholder="Quận/Huyện..." /> <br />
        <button>Thanh toán: COD</button>
      </div>
    </>
  );
};

export default Checkout;
