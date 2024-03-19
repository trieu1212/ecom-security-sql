import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Checkout from "./pages/Checkout/Checkout";
import Cart from "./pages/Cart/Cart";
import Register from "./pages/Register/Register";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Header from "./components/Header/Header";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer/Footer";
import AllProduct from "./pages/AllProduct/AllProduct";
import OrderHistory from "./pages/OrderHistory/OrderHistory";
function App() {
  return (
    <>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart/" element={<Cart />} />
          <Route path="/order-history" element={<OrderHistory/>}/>
          <Route path="/product" element={<AllProduct/>}/>
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer/>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </>
  );
}

export default App;
