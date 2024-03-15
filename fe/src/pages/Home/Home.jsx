import React, { useEffect } from 'react'
import AllProduct from '../../components/AllProduct'
import { useSelector } from 'react-redux'
import Banner from '../../components/Banner/Banner'

const Home = () => {
  const user = useSelector((state) => state.auth.login?.currentUser)
  return (
    <>
        {user ? (
                <div style={{ textAlign:"center" }}>
                  Xin chào <b style={{ fontSize: "20px" }}>{user?.username}!</b>
                </div>
              ) : (
                ""
              )}
        <Banner />
        <AllProduct />
    </>
  )
}

export default Home