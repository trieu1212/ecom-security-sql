import React, { useEffect, useState } from "react";
import "./AllProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../redux/apis/categoryApiRequests";
import { getAllProduct } from "../../redux/apis/productApiRequests";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
const AllProduct = () => {
  const dispatch = useDispatch();
  const [isProductEmpty, setIsProductEmpty] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(6);
  const [totalPages, setTotalPages] = useState(0);
  const productList = useSelector((state) => state.product?.allProduct);
  useEffect(() => {
    getAllProduct(dispatch, currentLimit,currentPage);
    getAllCategory(dispatch);
    setTotalPages(productList?.totalPages);
  }, [dispatch,currentPage]);
  const product = productList?.product;
  // console.log(productList);
  const category = useSelector((state) => state.category?.categories);
  const handleGetProductByCategory = async (id) => {
    await getAllProduct(dispatch, currentLimit,currentPage ,id);
  };
  const handleGetAllProduct = async () => {
    await getAllProduct(dispatch, currentLimit,currentPage);
  };
  useEffect(() => {
    setIsProductEmpty(!product || product.length === 0);
  }, [product]);
  const handlePageClick = async(e) => {
    setCurrentPage(+e.selected+1);
  };
  const formatPrice = (price) =>{
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  }
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
                style={{ cursor: "pointer", fontWeight: "bold" }}
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
                    <p className="priceItem">{formatPrice(item.price)}</p>
                  </div>
                </>
              );
            })}
        </div>
      </div>
      <div className="paginate">
        {totalPages>0 && 
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={totalPages}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />}
      </div>
    </>
  );
};

export default AllProduct;
