import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteUserCart, getUserCart } from "../../redux/apis/cartApiRequests";
import { loginSuccess } from "../../redux/authSlice";
import { createAxios } from "../../services/axiosJWT";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartChanged, setCartChanged] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart?.currentCart);
  const user = useSelector((state) => state.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess, user?.refreshToken);
  useEffect(() => {
    if (cartChanged && cart) {
      cartList(cart);
      setCartChanged(false);
    }
  },[cartChanged, cart]);
  useEffect(() => {
    if (cart) {
      cartList(cart);
    }
  }, []);
  const cartList = (cartItems) => {
    const groupedItems = cartItems.reduce((acc, currentItem) => {
      const existingItem = acc.find(
        (item) => item.productId === currentItem.productId
      );
      if (existingItem) {
        existingItem.quantity += currentItem.quantity;
      } else {
        acc.push({ ...currentItem });
      }
      return acc;
    }, []);
    setCartItems(groupedItems);
    getTotalPrice(groupedItems);
  };
  const getTotalPrice = (cartItems) => {
    let total = 0;
    cartItems.map((item) => {
      total += item.Product.price * item.quantity;
    });
    setTotalPrice(total);
  };
  const handleNavigateToCheckout = () => {
    navigate("/checkout");
  };
  const handleDeleteProduct = async (productId) => {
    await deleteUserCart(
      productId,
      dispatch,
      axiosJWT,
      user?.accessToken,
      user.id
    );
    await getUserCart(dispatch, axiosJWT, user?.accessToken, user.id);
    setCartChanged(true);
  };
  return (
    <>
      <h1>Trang giỏ hàng</h1>
      {!user ? (
        <Link to="/login">Hãy đăng nhập để xem giỏ hàng</Link>
      ) : (
        <div>
          {cartItems.length === 0 ? (
            <h2>Giỏ hàng trống</h2>
          ) : (
            <div>
              {cartItems.map((item) => {
                return (
                  <>
                    <div key={item.id}>
                      <h3>{item.Product.title}</h3>
                      <img
                        src={item.Product.image}
                        alt=""
                        height={80}
                        width={60}
                      />
                      <p>Giá: {item.Product.price}</p>
                      <label>
                        Số lượng:
                        <input
                          type="number"
                          min={1}
                          max={100}
                          value={item.quantity}
                        />
                      </label>
                    </div>
                    <button onClick={() => handleDeleteProduct(item.productId)}>
                      Xóa khỏi giỏ
                    </button>
                  </>
                );
              })}
            </div>
          )}
          <div>
            {user && cart ? (
              <>
                <h2>Tổng giá: {totalPrice} VND </h2>
                <button onClick={handleNavigateToCheckout}>Thanh toán</button>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
