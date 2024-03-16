import axios from 'axios';
import { getAllProductError, getAllProductStart, getAllProductSuccess, getOneProductError, getOneProductStart, getOneProductSuccess } from '../productSlice';

export const getAllProduct = async(dispatch,limit) =>{
    dispatch(getAllProductStart());
    try {
        const res = await axios.get(`http://localhost:7000/api/product/?limit=${limit}`);
        dispatch(getAllProductSuccess(res.data))
    } catch (error) {
        dispatch(getAllProductError())
    }
}

export const getOneProduct = async(dispatch,id) =>{
    dispatch(getOneProductStart());
    try {
        const res = await axios.get(`http://localhost:7000/api/product/${id}`)
        dispatch(getOneProductSuccess(res.data))
    } catch (error) {
        dispatch(getOneProductError())
    }
}