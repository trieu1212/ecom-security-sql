import React, { useEffect, useState } from "react";
import "./AllProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../redux/apis/categoryApiRequests";
import { getAllProduct } from "../../redux/apis/productApiRequests";
import { Link } from "react-router-dom";

const AllProduct = () => {
  const dispatch = useDispatch();
  const [isProductEmpty, setIsProductEmpty] = useState(false);
  useEffect(() => {
    getAllProduct(dispatch, 6);
    getAllCategory(dispatch);
  }, [dispatch]);
  const product = useSelector((state) => state.product?.allProduct);
  const category = useSelector((state) => state.category?.categories);
  const handleGetProductByCategory = async (id) => {
    await getAllProduct(dispatch, 6, id);
  };
  const handleGetAllProduct = async () => {
    await getAllProduct(dispatch, 6);
  }
  useEffect(() => {
    setIsProductEmpty(!product || product.length === 0);
  }, [product]);
  return (
    <>
      <div className="allProductContainer">
        <div className="sideBar">
          <div className="sideBarContent">
            <label className="title" htmlFor="">
              Danh mục sản phẩm
            </label>
            <div className="categoryView">
            <p
              style={{ cursor: "pointer",fontWeight:"bold" }}
              onClick={handleGetAllProduct}
            >
              Tất cả sản phẩm
            </p>
            </div>
            {category &&
              category.map((item, index) => {
                return (
                  <div className="categoryView">
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() => handleGetProductByCategory(item.id)}
                    >
                      {item.name}
                    </p>
                  </div>
                );
              })}
          </div>
          <div className="line"></div>
        </div>
        <div className="productList">
          {isProductEmpty && <div>Không tìm thấy sản phẩm nào</div>}
          {product &&
            product.map((item, index) => {
              return (
                <>
                  <div className="product">
                    <Link to={`/product/${item.id}`}>
                      <img src={item.image} alt="" />
                    </Link>
                    <h3 className="name">{item.title}</h3>
                    <p className="desc">{item.description}</p>
                    <p className="price">{item.price} VNĐ</p>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default AllProduct;
