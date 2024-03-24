import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";  
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from 'react-toastify';
import { createAxios } from "../../../services/axiosJWT";
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../../../redux/authSlice';
const ProductModal = (props) => {
    const {show,setShow,title,productId} = props
    const [name,setName] = useState('')
    const [description,setDescription] = useState('')
    const [image,setImage] = useState('')
    const [inStock,setInStock] = useState(false)
    const [category,setCategory] = useState([])
    const [categoryId,setCategoryId] = useState(0)
    const [price,setPrice] = useState(0)
    const dispatch = useDispatch()
    const user = useSelector((state)=>state.auth?.login?.currentUser)
    let axiosJWT = createAxios(user, dispatch, loginSuccess, user?.refreshToken);
    const handleClose=()=>{
        setShow(false)
    }
    const handleAction = async () =>{
        if(title === 'Thêm sản phẩm'){
            const data ={
                title:name,
                description,
                image,
                inStock,
                categoryId,
                price
            }
            if(!name || !description || !image || !inStock || !categoryId || price<=0){
                toast.error('Vui lòng điền đầy đủ thông tin sản phẩm')
            }
            else{
              await axiosJWT.post(`http://localhost:7000/api/product/create/${user?.id}`,data,{
                headers:{
                  Authorization: `Bearer ${user?.accessToken}`,
                }
              }).then((res)=>{
                toast.success('Thêm sản phẩm thành công')
                
                setShow(false)
              })
            }
        }
        else if(title === 'Xóa sản phẩm'){
          
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
                  <label htmlFor="description">Giá</label>
                  <input
                    type="number"
                    className="form-control"
                    id="description"
                    placeholder='Nhập giá sản phẩm'
                    value={price}
                    min={1}
                    max={100000000}
                    onChange={(e) => setPrice(e.target.value)}
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
          {title === "Xóa sản phẩm" ? (<><h3>Bạn có chắc là muốn xóa sản phẩm này không?</h3></>):null}
          {title === "Sửa sản phẩm" ? (
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