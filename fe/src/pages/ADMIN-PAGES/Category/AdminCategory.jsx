import React, { useEffect } from 'react'
import axios from 'axios'
import CategoryAdd from '../../../components/ADMIN-COMPONENTS/CategoryModal/CategoryAdd'

const AdminCategory = () => {
  const [categories, setCategories] = React.useState([])
  const [show, setShow] = React.useState(false)
  const [title, setTitle] = React.useState('')
  const [categoryId, setCategoryId] = React.useState('')
  const getAllCategory = async() => {
      const res = await axios.get('http://localhost:7000/api/category')
      console.log(res.data)
      setCategories(res.data)
  }
  const handleAdd = () => {
      setShow(true)
      setTitle('Thêm danh mục sản phẩm')
  }
  const handleDelete = (id) => {
    setShow(true)
    setTitle('Xóa danh mục sản phẩm')
    setCategoryId(id)
  }
  useEffect(()=>{
      getAllCategory()
  },[show])
  return (
    <>
      <h1 style={{ textAlign:"center" }}>Tất cả danh mục</h1>
      <button className='btn btn-success mb-2' onClick={handleAdd}>Thêm danh mục</button>
      <table className='table table-bordered table-striped'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên danh mục</th>
            <th>Mô tả</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category,index)=>{
            return(
              <tr key={index}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>
                  <button className='btn btn-primary mx-2'>Sửa</button>
                  <button className='btn btn-danger' onClick={()=>handleDelete(category.id)}>Xóa</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <CategoryAdd show={show} setShow={setShow} title={title} categoryId={categoryId}/>
    </>
  )
}

export default AdminCategory