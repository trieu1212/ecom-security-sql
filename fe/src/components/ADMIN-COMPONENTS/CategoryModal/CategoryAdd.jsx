import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../services/axiosJWT";
import { loginSuccess } from "../../../redux/authSlice";
function CategoryAdd(props) {
  const { show, setShow, title,categoryId } = props;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess, user?.refreshToken);
  const handleClose = () => setShow(false);
  const handleAction = async() => {
   if(title==='Thêm danh mục sản phẩm'){
    const data ={
        name: name,
        description: description
    }
    await axiosJWT.post(`http://localhost:7000/api/category/create/${user?.id}`,data,{
        headers: {
            Authorization: `Bearer ${user?.accessToken}`
        }
    })
    setShow(false);
   }
   else if(title==='Xóa danh mục sản phẩm'){
    await axiosJWT.delete(`http://localhost:7000/api/category/delete/${categoryId}/${user?.id}`,{
        headers: {
            Authorization: `Bearer ${user?.accessToken}`
        }
    })
    setShow(false);
   }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {title === "Thêm danh mục sản phẩm" ? (
            <>
                <form>
            <div className="form-group">
              <label htmlFor="name">Tên danh mục</label>
              <input
                type="text"
                className="form-control"
                id="name"
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </form>
            </>
          ) : (
                <><h1>Bạn có chắc là muốn xóa danh mục này không?</h1></>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAction}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CategoryAdd;
