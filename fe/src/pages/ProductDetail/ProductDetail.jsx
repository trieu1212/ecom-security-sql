import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneProduct } from "../../redux/apis/productApiRequests";
import { createAxios } from "../../services/axiosJWT";
import { loginSuccess } from "../../redux/authSlice";
import {
  addCommentByUser,
  deleteCommentByUser,
  getProductComments,
} from "../../redux/apis/commentApiRequests";
import {
  addUserCart,
  getUserCart,
  updateUserCart,
} from "../../redux/apis/cartApiRequests";

const ProductDetail = () => {
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const refreshToken = useSelector(
    (state) => state.auth.login?.currentUser?.refreshToken
  );
  const accessToken = useSelector(
    (state) => state.auth.login?.currentUser?.accessToken
  );
  const cart = useSelector((state) => state.cart?.currentCart);
  const dispatch = useDispatch();
  let axiosJWT = createAxios(user, dispatch, loginSuccess, refreshToken);
  const product = useSelector((state) => state.product?.oneProduct);
  const comments = useSelector((state) => state.comment.comments);
  const commentFetching = useSelector((state) => state.comment.isFetching);
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!comment) {
      alert("Vui lòng nhập nhận xét");
    } else {
      const data = {
        comment: comment,
        productId: id,
      };
      await addCommentByUser(data, dispatch, axiosJWT, accessToken, user.id);
      await getProductComments(dispatch, id);
    }
    setComment("");
  };
  const handleDeleteComment = async (commentId) => {
    await deleteCommentByUser(
      commentId,
      dispatch,
      axiosJWT,
      accessToken,
      user.id
    );
    await getProductComments(dispatch, id);
  };
  useEffect(() => {
    getOneProduct(dispatch, id);
    getProductComments(dispatch, id);
  }, [dispatch, id]);
  const handleAddCart = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng");
    } else {
      const existProduct = cart.find((item) => item.productId === id);
      if (existProduct) {
        const data = {
          productId: id,
          quantity: existProduct.quantity + 1,
        };
        await updateUserCart(data, dispatch, accessToken, axiosJWT, user.id);
        await getUserCart(dispatch, axiosJWT, accessToken, user.id);
      } else {
        const data = {
          productId: id,
          quantity: 1,
        };
        try {
          await addUserCart(data, dispatch, axiosJWT, accessToken, user.id);
          await getUserCart(dispatch, axiosJWT, accessToken, user.id);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  return (
    <>
      <div>
        {product ? (
          <div>
            <h1>{product.title}</h1>
            <p>Mô tả sản phẩm: {product.description}</p>
            <p>Danh mục sản phẩm: {product.Category.name}</p>
            <img src={product.image} alt="" height="320px" width="240px" />
            <p>Giá sản phẩm: {product.price} VNĐ</p>
            <button onClick={handleAddCart}>Thêm vào giỏ</button>
          </div>
        ) : (
          <p>Không tìm thấy sản phẩm</p>
        )}
      </div>
      <hr />
      <div>
        <h2>Đánh giá sản phẩm</h2>
        {user ? (
          <div>
            <textarea
              placeholder="Nhập nhận xét"
              cols="30"
              rows="10"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button onClick={handleAddComment}>Thêm đánh giá</button>
          </div>
        ) : (
          <h2>Hãy đăng nhập để bình luận!</h2>
        )}
        {comments ? (
          <div>
            {comments.map((comment) => (
              <div key={comment.id}>
                <p>
                  Người dùng <b>{comment.User?.username}</b> đã đánh giá:{" "}
                  {comment.comment}
                  {user && user.id === comment.userId ? (
                    <button onClick={() => handleDeleteComment(comment.id)}>
                      Xóa
                    </button>
                  ) : (
                    ""
                  )}
                  {commentFetching && user && user.id === comment.userId ? (
                    <p>Đang xóa...</p>
                  ) : (
                    ""
                  )}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>Chưa có đánh giá nào cho sản phẩm này</p>
        )}
      </div>
    </>
  );
};

export default ProductDetail;
