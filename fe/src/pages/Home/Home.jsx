import React from 'react'
import { useSelector } from 'react-redux'
import Banner from '../../components/Banner/Banner'
import HomeProduct from '../../components/HomeProduct/HomeProduct'
import SaleOff from '../../components/SaleOff/SaleOff'
import HomeComment from '../../components/HomeComment/HomeComment'
import './Home.css'
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
        <div className='homeContainer'>
          <Banner />
          <HomeProduct />
          <SaleOff />
          <HomeComment />
        </div>
    </>
  )
}

export default Home