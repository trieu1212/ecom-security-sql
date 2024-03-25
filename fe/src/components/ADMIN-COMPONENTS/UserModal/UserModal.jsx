import React, { useEffect } from 'react'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {useDispatch, useSelector} from 'react-redux'
import {loginSuccess} from '../../../redux/authSlice'
import {createAxios} from '../../../services/axiosJWT'
const UserModal = (props) => {
    const {show, setShow, title, userId} = props
    const [username, setUsername] = React.useState('')
    const [isAdmin, setIsAdmin] = React.useState(false)
    const [email, setEmail] = React.useState('')
    const user =useSelector((state)=>state.auth?.login?.currentUser)
    const dispatch = useDispatch()
    let axiosJWT = createAxios(user, dispatch, loginSuccess, user?.refreshToken);
    const handleClose = () =>{
        setShow(false)
    }
    const handleAction = () =>{
        if(title === 'Xóa người dùng'){
            axiosJWT.delete(`http://localhost:7000/api/user/delete/${userId}`,{
                headers:{
                    Authorization: `Bearer ${user?.accessToken}`
                }
            }).then(()=>{
                setShow(false)
            })
        }
        else if(title === 'Sửa người dùng'){

        }
    }
    useEffect(()=>{
        if(title === 'Sửa người dùng'){
            const getUser = async()=>{
                const res = await axiosJWT.get(`http://localhost:7000/api/user/${userId}/${user?.id}`,{
                    headers:{
                        Authorization: `Bearer ${user?.accessToken}`
                    }
                })
                setUsername(res.data.username)
                setIsAdmin(res.data.isAdmin)
                setEmail(res.data.email)
            }
            getUser()
        }
    },[show, title, userId])
  return (
    <>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {title === 'Xóa người dùng' ? 'Bạn có chắc chắn muốn xóa người dùng này không?' : ''}
            {title === 'Sửa người dùng' ? (
            <form>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" 
                    value={username} 
                    className="form-control" 
                    id="username" 
                    placeholder="Nhập tên người dùng"
                    onChange={(e)=>setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" 
                    value={email} 
                    disabled={true} 
                    className="form-control" 
                    id="email" 
                    placeholder="Nhập email"
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group ">
                    <label htmlFor="">Chức vụ</label>
                    <select value={isAdmin} onChange={(e)=>setIsAdmin(e.target.value)} className='form-control'>
                        <option value={true}>Admin</option>
                        <option value={false}>Người dùng</option>
                    </select>
                </div>
            </form>
            ) : ''}
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

export default UserModal