import React, { useEffect } from 'react'
import { getAllProduct } from '../redux/apis/productApiRequests'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
const AllProduct = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        getAllProduct(dispatch)
    },[])
    const products = useSelector((state)=>state.product?.allProduct)
  return (
    <>
        <h1>All product</h1>
        {products && products.map((product,index)=>{
            return (
                <div key={index}>
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                    <Link to={`product/${product.id}`}><img src={product.image} alt="" height="80px" width="60px"/></Link>
                    <p>{product.price}</p>
                </div>
            )
        })}
    </>
  )
}

export default AllProduct