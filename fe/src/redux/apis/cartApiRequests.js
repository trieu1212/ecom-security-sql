import {
  addUserCartError,
  addUserCartStart,
  addUserCartSuccess,
  deleteProductFromCartError,
  deleteProductFromCartStart,
  deleteProductFromCartSuccess,
  getUserCartError,
  getUserCartStart,
  getUserCartSuccess,
  updateUserCartError,
  updateUserCartStart,
  updateUserCartSuccess,
} from "../cartSlice";


export const getUserCart = async (dispatch, axiosJWT, accessToken, userId) => {
  dispatch(getUserCartStart());
  try {
    const res = await axiosJWT.get(`http://localhost:7000/api/cart/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch(getUserCartSuccess(res.data));
  } catch (error) {
    dispatch(getUserCartError());
  }
};

export const addUserCart = async (
  data,
  dispatch,
  axiosJWT,
  accessToken,
  userId
) => {
  dispatch(addUserCartStart());
  try {
    const res = await axiosJWT.post(
      `http://localhost:7000/api/cart/create/${userId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(addUserCartSuccess(res.data));
  } catch (error) {
    dispatch(addUserCartError());
  }
};

export const updateUserCart = async (
  data,
  dispatch,
  accessToken,
  axiosJWT,
  userId
) => {
  dispatch(updateUserCartStart());
  try {
    const res = await axiosJWT.put(
      `http://localhost:7000/api/cart/update/${userId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(updateUserCartSuccess(res.data));
  } catch (error) {
    dispatch(updateUserCartError());
  }
};

export const deleteUserCart = async (productId,dispatch,axiosJWT,accessToken,userId)=>{
  dispatch(deleteProductFromCartStart())
  try {
    const res = await axiosJWT.delete(`http://localhost:7000/api/cart/delete/${userId}/${productId}`,{
      headers:{
        Authorization:`Bearer ${accessToken}`
      }
    })
    dispatch(deleteProductFromCartSuccess(res.data))
  } catch (error) {
    dispatch(deleteProductFromCartError())
  }
}
