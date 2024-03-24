import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";  
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import toast from 'react-toastify'
const ProductModal = (props) => {
    const {show,setShow,title} = props
    const [name,setName] = useState('')
    const [description,setDescription] = useState('')
    const [image,setImage] = useState('')
    const [inStock,setInStock] = useState(false)
    const [category,setCategory] = useState([])
    const [categoryId,setCategoryId] = useState(0)
    const handleClose=()=>{
        setShow(false)
    }
    const handleAction = () =>{
        if(title === 'Thêm sản phẩm'){
            const data ={
                name,
                description,
                image,
                inStock,
                categoryId
            }
            if(!name || !description || !image || !inStock || !categoryId){
                toast.error('Vui lòng điền đầy đủ thông tin sản phẩm')
            }
            else{
                
            }
        }
    }
    const getAllCategory = async()=>{
        const res = await axios.get(`http://localhost:7000/api/category`)
        setCategory(res.data)
    }
    useEffect(()=>{
        getAllCategory()
    },[])
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {title === "Thêm sản phẩm" ? (
            <>
              <form>
                <div className="form-group">
                  <label htmlFor="name">Tên sản phẩm</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder='Nhập tên sản phẩm'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Mô tả</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    placeholder='Nhập mô tả sản phẩm'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Hình ảnh</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    placeholder='Nhập URL hình sản phẩm'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                  <img src={image} alt="" style={{width:"50%"}} />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Mở bán?</label>
                  <select onChange={(e)=>setInStock(e.target.value)} className='form-control'>
                        <option value="">- Xác nhận mở bán -</option>
                        <option value="true">Có</option>
                        <option value="false">Không</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="description">Danh mục</label>
                  <select onChange={(e)=>setCategoryId(e.target.value)} className='form-control'>
                        <option value="">- Danh mục sản phẩm -</option>
                        {category.map((item,index)=>{
                            return(
                                <option value={item.id} >{item.name}</option>
                            )
                        })}
                  </select>
                </div>
              </form>
            </>
          ) : null}
          {title === "Xóa danh mục sản phẩm" ? (<><h3>Bạn có chắc là muốn xóa danh mục này không?</h3></>):null}
          {title === "Sửa danh mục sản phẩm" ? (
            <>
              <form>
                <div className="form-group">
                  <label htmlFor="name">Tên danh mục</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Mô tả</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    
                  />
                </div>
              </form>
            </>
          ):null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleAction}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ProductModal