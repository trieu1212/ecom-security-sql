import {Routes,Route} from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Checkout from './pages/Checkout/Checkout';
import Cart from './pages/Cart/Cart';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Register from './pages/Register/Register';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Header from './components/Header';
function App() {
  return (
    <>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login/>}/>
        <Route path ='/register' element={<Register/>}/>
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/cart" element={<Cart/>} />

        <Route path='/product/:id' element={<ProductDetail/>}/>
      </Routes>
    </>
  );
}

export default App;
