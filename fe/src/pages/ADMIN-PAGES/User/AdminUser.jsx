import React, { useEffect } from 'react'
import {createAxios} from '../../../services/axiosJWT'
import {useDispatch, useSelector} from 'react-redux'
import {loginSuccess} from '../../../redux/authSlice'
const AdminUser = () => {
  const [users, setUsers] = React.useState([])
  const user =useSelector((state)=>state.auth?.login?.currentUser)
  const dispatch = useDispatch()
  let axiosJWT = createAxios(user, dispatch, loginSuccess, user?.refreshToken);
  useEffect(()=>{
      const getAllUser = async()=>{
        const res = await axiosJWT.get(`http://localhost:7000/api/user/${user?.id}`,{
          headers:{
            Authorization: `Bearer ${user?.accessToken}`
          }
        })
        setUsers(res.data)
      }
      getAllUser()
  },[])
  console.log(users)
  return (
    <>
      <h1 style={{ textAlign:"center" }}>Quản lý người dùng</h1>
      <table className='table table-bordered table-striped'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên người dùng</th>
            <th>Email</th>
            <th>Chức vụ</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user)=>{
            return(
              <tr>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "Admin" : "Người dùng"}</td>
                <td>
                  <button className='btn btn-danger mx-2'>Xóa</button>
                  <button className='btn btn-warning'>Sửa</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default AdminUser