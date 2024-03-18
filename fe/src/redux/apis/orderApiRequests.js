import { createOrderError, createOrderStart, createOrderSuccess } from "../orderSlice"
import { clearUserCart } from "../cartSlice"
import { toast } from "react-toastify"
export const createOrder = async(data,dispatch,navigate,axiosJWT,accessToken,userId)=>{
    dispatch(createOrderStart())
    try {
        const res = await axiosJWT.post(`http://localhost:7000/api/order/create/${userId}`,data,{
            headers:{
                Authorization: `Bearer ${accessToken}`
            }
        })
        dispatch(createOrderSuccess(res.data))
        dispatch(clearUserCart())
        navigate('/')
        toast.success('Đặt hàng thành công')
    } catch (error) {
        dispatch(createOrderError())
        toast.error('Đặt hàng thất bại')
    }
}