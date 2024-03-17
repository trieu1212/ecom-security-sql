import React from 'react'
import { useSelector } from 'react-redux'
import Banner from '../../components/Banner/Banner'
import HomeProduct from '../../components/HomeProduct/HomeProduct'
import SaleOff from '../../components/SaleOff/SaleOff'
import HomeComment from '../../components/HomeComment/HomeComment'

const Home = () => {
  const user = useSelector((state) => state.auth.login?.currentUser)
  return (
    <>
        {user ? (
                <div style={{ textAlign:"center" }}>
                  Xin chào <b style={{ fontSize: "20px" }}>{user?.username}! <i class="fa-sharp fa-solid fa-hand-holding-heart fa-xl"></i></b>
                </div>
              ) : (
                ""
              )}
        <Banner />
        <HomeProduct />
        <SaleOff />
        <HomeComment />
    </>
  )
}

export default Home