import "./App.css";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PublicRoute from "./routes/PublicRoute";
import AdminRoute from "./routes/AdminRoute";
import AdminHome from "./pages/ADMIN-PAGES/Home/AdminHome";
import AdminProduct from "./pages/ADMIN-PAGES/Product/AdminProduct";
import Header from "./components/ADMIN-COMPONENTS/Header/Header";
import Footer from "./components/ADMIN-COMPONENTS/Footer/Footer";
import { useEffect } from "react";
function App() {
  const location = useLocation();
  const navigate = useNavigate()
  const renderHeader = location.pathname.includes("/admin");
  const renderFooter = location.pathname.includes("/admin");

  useEffect(()=>{
    if(location.pathname === "/admin" || location.pathname === "/admin/"){
      navigate("/admin/home")
    }
  },[location.pathname,navigate])
  return (
    <>
      <div className="app">
        <PublicRoute />
        {renderHeader && <Header />}
        <AdminRoute path="/admin/home" children={<AdminHome />} />
        <AdminRoute path="/admin/product" children={<AdminProduct />} />
        {renderFooter && <Footer />}
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
