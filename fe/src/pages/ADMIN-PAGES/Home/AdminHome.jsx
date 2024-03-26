import React from "react";
import "./AdminHome.css";

const AdminHome = () => {
  return (
    <>
      <div>
        <h1 style={{ textAlign: "center" }}>Trang quản trị</h1>
        <div className="navAdmin">
          <div className="navItem">
            <h3>Tổng số User</h3>
            <h1>100</h1>
          </div>
          <div className="navItem">
            <h3>Best Seller</h3>
            <h1>Quần xì</h1>
          </div>
          <div className="navItem">
            <h3>Best User</h3>
            <h1>Triệu</h1>
          </div>
        </div>
        <hr />
        <div className="report">
          <div className="reportHeader">
            <h3>Báo cáo</h3>
            <div className="finance">Tổng doanh thu: 100000</div>
          </div>
          <hr style={{ margin:"0 1rem" }}/>
          <div className="historyOrder">
              <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>Mã đơn hàng</th>
                      <th>Người mua</th>
                      <th>Ngày mua</th>
                      <th>Doanh thu</th>
                    </tr>
                  </thead>
                  <tbody>
                    
                  </tbody>
              </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
