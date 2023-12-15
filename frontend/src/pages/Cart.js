import React, {useState } from "react";
import Layout from "../components/layouts/Layout";
import { useAuth } from "../context/Auth";
import { useCart } from "../context/Cart";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Cart = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();

  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: auth?.token,
      "Content-Type": "application/json",
    },
  };

  const RemoveCart = async (id) => {
    try {
      let myCart = [...cart];
      let new_cart = myCart.filter((p) => p._id !== id);
      setCart(new_cart);
      localStorage.setItem("cart", JSON.stringify(new_cart));
    } catch (error) {
      console.log(error);
    }
  };

  const totalPrice = () => {
    try {
      let sum = 0;
      //  console.log(cart);
      cart?.map((p) => {
        sum += (p.price*p.quantity);
      });
      return sum;
    } catch (error) {
      console.log(error);
    }
  };

  const cashPayment = async () => {
    try {
      const { data } = await axios.post(
        "https://busy-pink-chinchilla-suit.cyclic.app/api/product/payment/cod",
        { cart, id: auth.user._id },
        config
      );
      // console.log(data)
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/order");
      toast.success(data.success);
    } catch (error) {
      console.log(error);
    }
  };

  const incrementQuantity = (productId) => {
    const updatedCart = cart.map((item) => {
      if (item._id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
  
    setCart(updatedCart);
  };

  const decrementQuantity = (productId) => {
    // Find the product in the cart
    const updatedCart = cart.map(item => {
      if (item._id === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2">
              {auth?.user?.name == undefined
                ? "Welcome"
                : `Welcome ${auth?.user?.name} !!!`}
            </h1>
            <h4 className="text-center">
              {cart && cart.length > 1
                ? `You have ${cart.length} item in your cart ${
                    auth?.token ? " " : " Please login to checkout!!! "
                  }`
                : ""}
            </h4>
          </div>
          <div className="row">
            <div className="col-md-7">
              {cart?.map((c) => (
                <div
                  className="row"
                  style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
                >
                  <div className="col-md-4 flex-row">
                    <img
                      src={`https://busy-pink-chinchilla-suit.cyclic.app/api/product/product-photo/${c._id}`}
                      className="card-img-top"
                      style={{
                        width: "150px",
                        height: "150px",
                        margin: "20px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      }}
                      alt="product_photo"
                    />
                  </div>
                  <div className="col-md-6" style={{ margin: "20px" }}>
                    <h5 className="card-title">Title : {c.name}</h5>
                    <h6 className="card-text" style={{ marginTop: "20px" }}>
                      Description : {c.description.substring(0, 30)}
                    </h6>
                    <h5 className="card-text">Price : {c.price}</h5>
                    <h6 className="card-text">Item in inventory : {c.inventory}</h6>
                    <div style={{justifyContent:"space-between",display:"flex"}}>
                    <div className="quantity-control">
                      <button
                        className="btn btn-secondary"
                        onClick={() => decrementQuantity(c._id)}
                      >
                        -
                      </button>
                      <span style={{ margin: "0 10px" }}>{c.quantity}</span>
                      <button
                        className="btn btn-secondary"
                        onClick={() => incrementQuantity(c._id)}
                        disabled={c.inventory <= c.quantity}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        RemoveCart(c._id);
                      }}
                    >
                      Remove
                    </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div
              className="col-md-4 text-center"
              style={{
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                margin: "40px",
              }}
            >
              <h4>Chart Summary</h4>
              <hr />
              <h5 style={{ color: "green" }}>Total | Payment </h5>
              <hr />
              <h4>Total : {totalPrice()}</h4>
              <hr />
              {auth?.user?.address ? (
                <div className="mb-3">
                  <h4>Current Address :</h4>
                  <h5>{auth?.user?.address}</h5>
                </div>
              ) : (
                <div className="mb-3">
                  <div className="mb-3">
                    {auth?.token ? (
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        Updade Address
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline-success"
                        onClick={() => navigate("/login", { state: "/cart" })}
                      >
                        Login to purchase items!!!
                      </button>
                    )}
                  </div>
                </div>
              )}{" "}
              <div className="mt-2">
                
                <button onClick={cashPayment} className="btn btn-success">
                  Cash On delivery
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
