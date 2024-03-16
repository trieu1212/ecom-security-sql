import React, { useEffect } from "react";
import star from "../../assets/images/star.png";
import "./HomeProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../../redux/apis/productApiRequests";
import { Link } from "react-router-dom";
const HomeProduct = () => {
  const dispatch = useDispatch();
  const limit = 2;
  useEffect(() => {
    getAllProduct(dispatch, limit);
  }, []);
  const products = useSelector((state) => state.product?.allProduct);
  console.log(products);
  return (
    <>
      <div id="wp-products">
        <h2>SẢN PHẨM TIÊU BIỂU CỦA CHÚNG TÔI</h2>
        <ul id="list-products">
            {products && products.map((product, index) => {
               return (
                <>
                    {product.inStock ?(
                        <>
                        <div class="item">
                            <Link to={`product/${product.id}`}><img className="productImage" src={product.image} alt="" /></Link>
                            <div class="stars">
                            <span>
                                <img src={star} alt="" />
                            </span>
                            <span>
                                <img src={star} alt="" />
                            </span>
                            <span>
                                <img src={star} alt="" />
                            </span>
                            <span>
                                <img src={star} alt="" />
                            </span>
                            <span>
                                <img src={star} alt="" />
                            </span>
                            </div>
                            <div class="name">{product.title}</div>
                            <div class="desc">{product.description}</div>
                            <div class="price">{product.price} VNĐ</div>
                        </div>
                        </>
                    ):""}
                </>
               )     
            })}
        </ul>
        {/* <div class="list-page">
                <div class="item">
                    <a href="">1</a>
                </div>
                <div class="item">
                    <a href="">2</a>
                </div>
                <div class="item">
                    <a href="">3</a>
                </div>
                <div class="item">
                    <a href="">4</a>
                </div>
            </div> */}
      </div>
    </>
  );
};

export default HomeProduct;
