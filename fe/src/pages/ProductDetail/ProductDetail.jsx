import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneProduct } from "../../redux/apis/productApiRequests";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    getOneProduct(dispatch, id);
  }, []);
  const product = useSelector((state) => state.product?.oneProduct);
//   console.log(product);
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
        {product?.Comments ? (
            <div>
                {product.Comments.map((comment) => (
                    <div key={comment.id}>
                        <p>Người dùng <b>{comment.User.username}</b> đã đánh giá: {comment.comment}</p>
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
