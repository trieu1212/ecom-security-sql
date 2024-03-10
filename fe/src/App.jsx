import {Routes,Route} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
// import Register from './pages/Register/Register';
// import Checkout from './pages/Checkout/Checkout';
// import Cart from './pages/Cart/Cart';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
function App() {
  const accessToken = useSelector(state=>state.auth.login.currentUser?.accessToken)
  console.log(accessToken)
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login/>}/>
        {/* <Route path='/register' element={<Register/>}/> */}
        {/* <Route path="/login" element={accessToken?<Navigate to='/'/>:<Login/>} /> */}
        {/* <Route path='/register' element={accessToken?<Navigate to='/'/>:<Register/>}/> */}
        {/* <Route path="/checkout" element={<Checkout/>} />
        <Route path="/cart" element={<Cart/>} /> */}
      </Routes>
    </>
  );
}

export default App;
