import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import { AuthProvider } from "./context/Auth";
import { SearchProvider } from "./context/Search";
import Dashboard from "./pages/user/Dashboard";
import Private from "./components/routes/Private";
import Admin from "./components/routes/Admin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateProduct from "./pages/admin/CreateProduct";
import Order from "./pages/user/Order";
import Product from "./pages/admin/Product";
import UpdateProducts from "./pages/admin/UpdateProducts";
import Search from "./pages/Search";
import { CartProvider } from "./context/Cart";
import Cart from "./pages/Cart";
import AdminOrder from "./pages/admin/AdminOrder";

const App = () => {
  return (
    <>
    <CartProvider>
      <AuthProvider>
        <SearchProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/dashboard" element={<Private />}>
              <Route path="user" element={<Dashboard />} />
              <Route path="user/order" element={<Order/>} />
            </Route>
            <Route path="/dashboard" element={<Admin />}>
              <Route path="admin" element={<AdminDashboard />}></Route>
              <Route path="admin/create-product" element={<CreateProduct/>}></Route>
              <Route path="admin/update-product/:slug" element={<UpdateProducts/>}></Route>
              <Route path="admin/order" element={<AdminOrder/>}></Route>
              <Route path="admin/product" element={<Product/>}></Route>
            </Route>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<Pagenotfound />} />
            <Route path="/searchproducts" element={<Search/>}/>
            <Route path="/cart" element={<Cart/>}/>
          </Routes>
        </BrowserRouter>
        </SearchProvider>
      </AuthProvider>
      </CartProvider>
    </>
  );
};

export default App;
