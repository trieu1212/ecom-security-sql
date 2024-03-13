import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneProduct } from "../../redux/apis/productApiRequests";
import { createAxios } from "../../services/axiosJWT";
import { loginSuccess } from "../../redux/authSlice";
import { addCommentByUser } from "../../redux/apis/commentApiRequests";

const ProductDetail = () => {
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const refreshToken = useSelector((state)=>state.auth.login?.currentUser?.refreshToken)
  const accessToken = useSelector(
    (state) => state.auth.login?.currentUser?.accessToken
  );
  const dispatch = useDispatch();
  let axiosJWT = createAxios(user, dispatch, loginSuccess,refreshToken);
  const product = useSelector((state) => state.product?.oneProduct);
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!comment) {
      alert("Vui lòng nhập nhận xét");
    } else {
      const data = {
        comment: comment,
        productId: id,
        userId: user.id,
      };
      addCommentByUser(data, dispatch, axiosJWT, accessToken,user.id);
    }
    setComment("");
  };
  useEffect(() => {
    getOneProduct(dispatch, id);
  }, []);
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
            <button>Thêm vào giỏ</button>
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
        {product?.Comments ? (
          <div>
            {product.Comments.map((comment) => (
              <div key={comment.id}>
                <p>
                  Người dùng <b>{comment.User.username}</b> đã đánh giá:{" "}
                  {comment.comment}
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
