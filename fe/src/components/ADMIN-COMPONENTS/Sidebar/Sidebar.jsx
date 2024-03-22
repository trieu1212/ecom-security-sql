import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
const Sidebar = () => {
  return (
    <>
        <div class="sidebar">
        <ul>
            <li><Link to="#">Trang chủ</Link></li>
            <li><Link to="#">Danh mục</Link></li>
            <li><Link to="#">Sản phẩm</Link></li>
            <li><Link to="#">Liên hệ</Link></li>
        </ul>
    </div>
    </>
  )
}

export default Sidebar